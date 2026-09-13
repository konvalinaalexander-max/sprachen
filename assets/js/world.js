/* Sprachen - Welt.
   Eine kleine Engine über Three.js: Himmelskuppel mit Tageszeit, Sonne und
   Mond, Sterne, Regen, Kamerafahrten, Umsehen per Ziehen, Anklicken von
   Dingen. Alles prozedural – nicht eine Textur kommt von aussen. */
(function (L) {
  'use strict';

  L.hasWebGL = function () {
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
    } catch (e) { return false; }
  };

  var SKY_VS = 'varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }';
  var SKY_FS = 'uniform vec3 top; uniform vec3 mid; uniform vec3 low; uniform vec3 sunDir; uniform float glow; varying vec3 vW;' +
    'void main(){ vec3 d = normalize(vW); float h = d.y;' +
    ' vec3 c = h > 0.0 ? mix(mid, top, pow(h, 0.55)) : mix(mid, low, pow(-h, 0.7));' +
    ' float s = max(dot(d, normalize(sunDir)), 0.0);' +
    ' c += glow * (pow(s, 24.0) * 0.9 + pow(s, 3.0) * 0.18) * vec3(1.0, 0.72, 0.42);' +
    ' gl_FragColor = vec4(c, 1.0); }';

  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  /* ---------------------------------------------------------------
     L.World(container, opts) -> Welt
     opts.palette: { top:[...], mid:[...], low:[...], sun:[...], amb:[...] } je 4 Stützfarben
     --------------------------------------------------------------- */
  L.World = function (container, opts) {
    var T = window.THREE;
    opts = opts || {};
    var W = {};

    var renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth || 800, container.clientHeight || 600, false);
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = !!opts.shadows;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.domElement.className = 'world-canvas';
    container.appendChild(renderer.domElement);

    var scene = new T.Scene();
    var camera = new T.PerspectiveCamera(opts.fov || 52, 1, 0.1, 900);
    camera.position.set(0, 6, 20);
    var lookAt = new T.Vector3(0, 3, 0);

    scene.fog = new T.Fog(0x000000, opts.fogNear || 60, opts.fogFar || 260);

    /* Himmel */
    var skyMat = new T.ShaderMaterial({
      uniforms: {
        top: { value: new T.Color('#4a5fa8') }, mid: { value: new T.Color('#e8814a') },
        low: { value: new T.Color('#ffc46b') }, sunDir: { value: new T.Vector3(0, 0.2, -1) },
        glow: { value: 1.0 }
      },
      vertexShader: SKY_VS, fragmentShader: SKY_FS, side: T.BackSide, depthWrite: false, fog: false
    });
    var sky = new T.Mesh(new T.SphereGeometry(420, 32, 20), skyMat);
    scene.add(sky);

    /* Sonne, Mond, Sterne */
    var sun = new T.Mesh(new T.SphereGeometry(9, 24, 16), new T.MeshBasicMaterial({ color: 0xffe2a8, fog: false }));
    scene.add(sun);
    var moon = new T.Mesh(new T.SphereGeometry(5, 24, 16), new T.MeshBasicMaterial({ color: 0xe9ecf6, fog: false }));
    scene.add(moon);
    var starGeo = new T.BufferGeometry();
    var sp = new Float32Array(900 * 3);
    for (var i = 0; i < 900; i++) {
      var a = Math.random() * Math.PI * 2, e = Math.random() * 0.5 * Math.PI * 0.92 + 0.06;
      var r = 390;
      sp[i * 3] = Math.cos(a) * Math.cos(e) * r; sp[i * 3 + 1] = Math.sin(e) * r; sp[i * 3 + 2] = Math.sin(a) * Math.cos(e) * r;
    }
    starGeo.setAttribute('position', new T.BufferAttribute(sp, 3));
    var starMat = new T.PointsMaterial({ color: 0xffffff, size: 1.7, sizeAttenuation: false, transparent: true, opacity: 0, fog: false });
    var stars = new T.Points(starGeo, starMat);
    scene.add(stars);

    /* Licht */
    var sunLight = new T.DirectionalLight(0xffd9a0, 2.0);
    sunLight.position.set(40, 60, 20);
    if (opts.shadows) {
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.set(2048, 2048);
      sunLight.shadow.camera.left = -90; sunLight.shadow.camera.right = 90;
      sunLight.shadow.camera.top = 90; sunLight.shadow.camera.bottom = -90;
      sunLight.shadow.camera.far = 300; sunLight.shadow.bias = -0.0008;
    }
    scene.add(sunLight);
    var hemi = new T.HemisphereLight(0xa9c2ff, 0x5a4a3a, 0.7);
    scene.add(hemi);

    var pal = opts.palette || {
      top: ['#5b74b8', '#34386a', '#161c3e', '#090b18'],
      mid: ['#dfa07a', '#8a5a7a', '#2c2856', '#10142a'],
      low: ['#f6cf95', '#d98a6a', '#4e3a5a', '#1a1e36'],
      sun: ['#ffe4bf', '#ffb07a', '#8a7ab0', '#4a5a8a'],
      amb: ['#a9c2ff', '#8a7aa8', '#3d4d80', '#202848']
    };
    var sunPath = opts.sunPath || { azimuth: -0.35 };

    W.time = 0;
    W.setTime = function (t) {
      W.time = t = Math.max(0, Math.min(1, t));
      skyMat.uniforms.top.value.set(L.ramp(pal.top, t));
      skyMat.uniforms.mid.value.set(L.ramp(pal.mid, t));
      skyMat.uniforms.low.value.set(L.ramp(pal.low, t));
      scene.fog.color.set(L.mixHex(L.ramp(pal.mid, t), L.ramp(pal.low, t), 0.55));
      var elev = (0.32 - t * 0.55) * Math.PI;              // sinkt unter den Horizont
      var az = sunPath.azimuth;
      var sd = new T.Vector3(Math.cos(elev) * Math.sin(az), Math.sin(elev), -Math.cos(elev) * Math.cos(az));
      sun.position.copy(sd).multiplyScalar(380);
      sun.visible = elev > -0.06;
      skyMat.uniforms.sunDir.value.copy(sd);
      skyMat.uniforms.glow.value = Math.max(0, 1 - t * 1.6);
      sunLight.position.copy(sd).multiplyScalar(90);
      var day = Math.max(0, 1 - t * 1.45);
      sunLight.intensity = 0.05 + day * 1.7;
      sunLight.color.set(L.ramp(pal.sun, t));
      hemi.color.set(L.ramp(pal.amb, t));
      hemi.intensity = 0.22 + day * 0.7;
      var melev = (-0.2 + t * 0.6) * Math.PI;
      moon.position.set(Math.cos(melev) * -180, Math.sin(melev) * 300 + 20, -300);
      moon.visible = t > 0.45;
      starMat.opacity = Math.max(0, Math.min(1, (t - 0.28) / 0.4));
      renderer.toneMappingExposure = 0.95 - t * 0.1;
      if (W.onTime) W.onTime(t, day);
    };

    /* Regen als Strichsegmente */
    W.rain = function (count, box) {
      var g = new T.BufferGeometry();
      var n = count || 1600, p = new Float32Array(n * 6), v = new Float32Array(n);
      box = box || { x: 40, y: 26, z: 40 };
      for (var i = 0; i < n; i++) {
        var x = (Math.random() - 0.5) * box.x, y = Math.random() * box.y, z = (Math.random() - 0.5) * box.z;
        p[i * 6] = x; p[i * 6 + 1] = y; p[i * 6 + 2] = z;
        p[i * 6 + 3] = x + 0.08; p[i * 6 + 4] = y - 0.55; p[i * 6 + 5] = z;
        v[i] = 9 + Math.random() * 7;
      }
      g.setAttribute('position', new T.BufferAttribute(p, 3));
      var m = new T.LineBasicMaterial({ color: 0xbfd0e6, transparent: true, opacity: 0.38, fog: true });
      var lines = new T.LineSegments(g, m);
      lines.frustumCulled = false;
      scene.add(lines);
      var arr = g.attributes.position.array;
      W.tick(function (dt) {
        lines.position.x = camera.position.x; lines.position.z = camera.position.z;
        for (var i = 0; i < n; i++) {
          var dy = v[i] * dt;
          arr[i * 6 + 1] -= dy; arr[i * 6 + 4] -= dy;
          if (arr[i * 6 + 4] < -1) { var ny = box.y + Math.random() * 4; arr[i * 6 + 1] = ny; arr[i * 6 + 4] = ny - 0.55; }
        }
        g.attributes.position.needsUpdate = true;
      });
      return lines;
    };

    /* Kamera: fliegen, umsehen, leicht atmen */
    var fly = null, yaw = 0, pitch = 0, drift = { t: 0 };
    W.flyTo = function (pos, look, dur) {
      return new Promise(function (resolve) {
        fly = {
          p0: camera.position.clone(), p1: new T.Vector3().fromArray(pos),
          l0: lookAt.clone(), l1: new T.Vector3().fromArray(look),
          t: 0, dur: dur || 2.4, done: resolve
        };
        yaw = 0; pitch = 0;
      });
    };
    W.jumpTo = function (pos, look) {
      camera.position.fromArray(pos); lookAt.fromArray(look); fly = null; yaw = 0; pitch = 0;
    };
    /* Laufenden Flug sofort beenden – für reduced-motion und für Tests. */
    W.finishFly = function () {
      if (!fly) return;
      camera.position.copy(fly.p1); lookAt.copy(fly.l1);
      var d = fly.done; fly = null; d();
    };

    var dragging = false, lx = 0, ly = 0;
    var el = renderer.domElement;
    el.addEventListener('pointerdown', function (e) { dragging = true; lx = e.clientX; ly = e.clientY; });
    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      yaw -= (e.clientX - lx) * 0.0032; pitch -= (e.clientY - ly) * 0.0022;
      pitch = Math.max(-0.5, Math.min(0.45, pitch));
      lx = e.clientX; ly = e.clientY;
    });
    window.addEventListener('pointerup', function () { dragging = false; });

    /* Anklicken */
    var ray = new T.Raycaster(), ndc = new T.Vector2();
    W.pickables = [];
    W.pickAt = function (clientX, clientY) {
      var r = el.getBoundingClientRect();
      ndc.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      var hits = ray.intersectObjects(W.pickables, true);
      for (var i = 0; i < hits.length; i++) {
        var o = hits[i].object;
        while (o && !o.userData.pick) o = o.parent;
        if (o) return o;
      }
      return null;
    };
    var downAt = null;
    el.addEventListener('pointerdown', function (e) { downAt = [e.clientX, e.clientY]; });
    el.addEventListener('pointerup', function (e) {
      if (!downAt) return;
      var moved = Math.abs(e.clientX - downAt[0]) + Math.abs(e.clientY - downAt[1]);
      downAt = null;
      if (moved < 6 && W.onPick) { var o = W.pickAt(e.clientX, e.clientY); if (o) W.onPick(o); }
    });
    W.hoverCheck = function (clientX, clientY) { return W.pickAt(clientX, clientY); };
    el.addEventListener('pointermove', function (e) {
      if (!W.pickables.length || dragging) return;
      el.style.cursor = W.pickAt(e.clientX, e.clientY) ? 'pointer' : '';
    });

    /* Schleife */
    var ticks = [], running = false, last = 0, raf = 0;
    W.tick = function (fn) { ticks.push(fn); };
    function resize() {
      var w = container.clientWidth || window.innerWidth, hh = container.clientHeight || window.innerHeight;
      renderer.setSize(w, hh, false);
      camera.aspect = w / hh; camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    function frame(now) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      var dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
      drift.t += dt;
      if (fly) {
        fly.t += dt / fly.dur;
        var k = ease(Math.min(1, fly.t));
        camera.position.lerpVectors(fly.p0, fly.p1, k);
        lookAt.lerpVectors(fly.l0, fly.l1, k);
        if (fly.t >= 1) { var d = fly.done; fly = null; d(); }
      }
      /* Blickrichtung = Ziel + Umsehen + leichtes Atmen */
      var dir = new T.Vector3().subVectors(lookAt, camera.position);
      var len = dir.length(); dir.normalize();
      var sph = new T.Spherical().setFromVector3(dir);
      sph.theta += yaw + Math.sin(drift.t * 0.23) * 0.012;
      sph.phi += -pitch + Math.sin(drift.t * 0.31) * 0.006;
      sph.phi = Math.max(0.15, Math.min(Math.PI - 0.15, sph.phi));
      var target = new T.Vector3().setFromSpherical(sph).multiplyScalar(len).add(camera.position);
      camera.lookAt(target);
      for (var i = 0; i < ticks.length; i++) ticks[i](dt, drift.t);
      renderer.render(scene, camera);
    }
    W.start = function () { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); };
    W.stop = function () { running = false; cancelAnimationFrame(raf); };
    W.dispose = function () {
      W.stop();
      window.removeEventListener('resize', resize);
      scene.traverse(function (o) {
        if (o.geometry) o.geometry.dispose();
        if (o.material) { [].concat(o.material).forEach(function (m) { if (m.map) m.map.dispose(); m.dispose(); }); }
      });
      renderer.dispose();
      try { renderer.forceContextLoss(); } catch (e) {}
      if (el.parentNode) el.parentNode.removeChild(el);
    };

    W.T = T; W.renderer = renderer; W.scene = scene; W.camera = camera; W.lookAt = lookAt;
    W.sunLight = sunLight; W.hemi = hemi; W.sky = sky;
    W.setTime(0);
    L.activeWorld = W;
    return W;
  };

  /* ---------------------------------------------------------------
     Baukasten: kleine prozedurale Dinge, die beide Welten brauchen
     --------------------------------------------------------------- */
  L.Build = {
    mat: function (color, extra) {
      var T = window.THREE;
      var m = new T.MeshStandardMaterial(Object.assign({ color: color, roughness: 0.86, metalness: 0.02 }, extra || {}));
      return m;
    },
    box: function (w, h, d, mat, x, y, z) {
      var T = window.THREE;
      var m = new T.Mesh(new T.BoxGeometry(w, h, d), mat);
      m.position.set(x || 0, (y === undefined ? h / 2 : y), z || 0);
      m.castShadow = true; m.receiveShadow = true;
      return m;
    },
    cyl: function (r1, r2, h, mat, x, y, z, seg) {
      var T = window.THREE;
      var m = new T.Mesh(new T.CylinderGeometry(r1, r2, h, seg || 14), mat);
      m.position.set(x || 0, (y === undefined ? h / 2 : y), z || 0);
      m.castShadow = true; m.receiveShadow = true;
      return m;
    },
    /* Ein gemaltes Bild als Textur – Fischgrät, Streifen, Kacheln … */
    canvasTex: function (w, h, draw, repeatX, repeatY) {
      var T = window.THREE;
      var c = document.createElement('canvas'); c.width = w; c.height = h;
      draw(c.getContext('2d'), w, h);
      var t = new T.CanvasTexture(c);
      t.wrapS = t.wrapT = T.RepeatWrapping;
      t.repeat.set(repeatX || 1, repeatY || 1);
      t.colorSpace = T.SRGBColorSpace;
      t.anisotropy = 4;
      return t;
    },
    rnd: function (a, b) { return a + Math.random() * (b - a); },
    pick: function (arr) { return arr[Math.floor(Math.random() * arr.length)]; },
    /* Deterministischer Zufall, damit die Stadt bei jedem Öffnen dieselbe ist */
    seeded: function (seed) {
      var s = seed >>> 0 || 1;
      return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    }
  };

})(window.LEKTION);
