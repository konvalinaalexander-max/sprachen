/* Welt "Rue Lepic" – Paris bei Nacht im Regen, dann die Wohnung im dritten Stock.
   Haussmann-Fassaden mit durchlaufenden Balkonen im 2. und 5. Stock, Zinkdächer
   mit Schornsteinreihen, grüne Laternen, nasser Asphalt. Innen: Fischgrätparkett,
   Stuck, ein Fenster mit echtem Blick auf die Strasse, fünf Gegenstände. */
(function (L) {
  'use strict';
  var h = L.h, B = L.Build;

  var STONE = ['#d9d2c3', '#cbc3b2', '#e2dccd', '#bfb7a6', '#d4ccbb'];

  function parisWindowTex() {
    return B.canvasTex(64, 128, function (c, w, hh) {
      c.fillStyle = '#e9e3d6'; c.fillRect(0, 0, w, hh);
      c.fillStyle = '#ffffff'; c.fillRect(6, 6, w - 12, hh - 12);
      c.fillStyle = '#4a4540';
      c.fillRect(w / 2 - 1, 6, 2, hh - 12);
      for (var y = 6; y < hh - 6; y += (hh - 12) / 3) c.fillRect(6, y, w - 12, 2);
    });
  }

  /* Ein gemaltes Bild: Hafen bei Sonnenuntergang, für den Rahmen an der Wand */
  function paintingTex() {
    return B.canvasTex(256, 192, function (c, w, hh) {
      var g = c.createLinearGradient(0, 0, 0, hh);
      g.addColorStop(0, '#5b6fa8'); g.addColorStop(0.5, '#e8956a'); g.addColorStop(0.62, '#f6c98a'); g.addColorStop(0.7, '#2e3a52'); g.addColorStop(1, '#1a2238');
      c.fillStyle = g; c.fillRect(0, 0, w, hh);
      c.fillStyle = '#ffd9a0'; c.beginPath(); c.arc(w * 0.62, hh * 0.6, 18, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#1b2233';
      [[30, 20], [70, 34], [120, 26], [170, 40], [215, 22]].forEach(function (m) { c.fillRect(m[0], hh * 0.7 - 6, 3, -m[1]); });
      c.fillStyle = 'rgba(255,220,160,.35)'; c.fillRect(w * 0.55, hh * 0.72, 36, hh * 0.28);
      c.strokeStyle = 'rgba(0,0,0,.15)'; c.lineWidth = 1;
      for (var i = 0; i < 40; i++) { c.beginPath(); c.moveTo(Math.random() * w, Math.random() * hh); c.lineTo(Math.random() * w, Math.random() * hh); c.stroke(); }
    });
  }

  function clockTex() {
    return B.canvasTex(128, 128, function (c, w, hh) {
      c.fillStyle = '#f4efe3'; c.beginPath(); c.arc(64, 64, 62, 0, Math.PI * 2); c.fill();
      c.strokeStyle = '#2a2420'; c.lineWidth = 3; c.stroke();
      c.fillStyle = '#2a2420';
      for (var i = 0; i < 12; i++) { var a = i / 12 * Math.PI * 2; c.fillRect(64 + Math.cos(a) * 50 - 1.5, 64 + Math.sin(a) * 50 - 1.5, 3, 3); }
      c.lineWidth = 4; c.beginPath(); c.moveTo(64, 64); c.lineTo(64 + Math.cos(-Math.PI / 2 + Math.PI * 2 * 7.66 / 12) * 30, 64 + Math.sin(-Math.PI / 2 + Math.PI * 2 * 7.66 / 12) * 30); c.stroke();   // 19h40
      c.lineWidth = 3; c.beginPath(); c.moveTo(64, 64); c.lineTo(64 + Math.cos(-Math.PI / 2 + Math.PI * 2 * 40 / 60) * 44, 64 + Math.sin(-Math.PI / 2 + Math.PI * 2 * 40 / 60) * 44); c.stroke();
    });
  }

  function parquetTex() {
    return B.canvasTex(256, 256, function (c, w, hh) {
      c.fillStyle = '#5a4030'; c.fillRect(0, 0, w, hh);
      var s = 32;
      for (var y = -s; y < hh + s; y += s) for (var x = -s; x < w + s; x += s) {
        c.fillStyle = ((x / s + y / s) % 2 === 0) ? '#6b4c38' : '#5d4230';
        c.save(); c.translate(x, y); c.rotate(Math.PI / 4); c.fillRect(-s / 2, -s / 8, s, s / 4); c.restore();
        c.fillStyle = 'rgba(0,0,0,.18)'; c.save(); c.translate(x + s / 2, y + s / 2); c.rotate(-Math.PI / 4); c.fillRect(-s / 2, -s / 8, s, s / 4); c.restore();
      }
    }, 5, 4);
  }

  function buildStreet(W, rnd) {
    var T = W.T, scene = W.scene;
    var out = { lights: [], dormers: [] };
    var matAsphalt = new T.MeshStandardMaterial({ color: '#1b2029', roughness: 0.22, metalness: 0.05 });
    var ground = new T.Mesh(new T.PlaneGeometry(600, 600), matAsphalt);
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
    var matWalk = B.mat('#3a3f48', { roughness: 0.6 });
    [-8.5, 8.5].forEach(function (x) { scene.add(B.box(5, 0.16, 400, matWalk, x, 0.08, 0)); });
    var matZinc = B.mat('#5d6670', { metalness: 0.35, roughness: 0.5 });
    var matDark = B.mat('#2a2622'), matIron = B.mat('#1d1b19', { metalness: 0.5, roughness: 0.55 });
    var matChim = B.mat('#b8724e');

    var winTex = parisWindowTex();
    var winMat = new T.MeshBasicMaterial({ color: 0xffffff, map: winTex, fog: true });
    var wins = new T.InstancedMesh(new T.PlaneGeometry(1.25, 2.5), winMat, 4000), wi = 0;
    var m4 = new T.Matrix4(), q = new T.Quaternion(), pos = new T.Vector3(), one = new T.Vector3(1, 1, 1);
    var litColor = new T.Color('#ffd9a0'), darkColor = new T.Color('#1c2130');

    function facade(side, z0, width) {
      var x = side * (11 + 7), depth = 14, cx = x, cz = z0 + width / 2;
      var floors = 6, hgt = floors * 3.2 + 0.6;
      var mat = B.mat(B.pick(STONE), { roughness: 0.9 });
      scene.add(B.box(depth, hgt, width, mat, cx, undefined, cz));
      scene.add(B.box(depth + 0.1, 3.6, width + 0.1, B.mat('#3a3330'), cx, 1.8, cz));      // Erdgeschoss
      /* Balkonreihen im 2. und 5. Stock, wie Haussmann es vorschrieb */
      [2, 5].forEach(function (f) {
        var y = f * 3.2 + 0.4;
        scene.add(B.box(0.06, 1.0, width - 0.6, matIron, cx - side * (depth / 2 + 0.45), y + 0.5, cz));
        scene.add(B.box(0.9, 0.12, width - 0.6, B.mat('#d9d2c3'), cx - side * (depth / 2 + 0.45), y, cz));
      });
      /* Fenster zur Strasse */
      for (var f = 1; f < floors; f++) {
        var y = f * 3.2 + 1.9, cols = Math.floor(width / 2.9);
        for (var i = 0; i < cols; i++) {
          var z = z0 + 1.5 + i * (width - 3) / Math.max(1, cols - 1);
          q.setFromAxisAngle(new T.Vector3(0, 1, 0), side > 0 ? -Math.PI / 2 : Math.PI / 2);
          pos.set(cx - side * (depth / 2 + 0.03), y, z); m4.compose(pos, q, one);
          wins.setMatrixAt(wi, m4);
          wins.setColorAt(wi, rnd() < 0.42 ? litColor : darkColor);
          wi++;
        }
      }
      /* Mansarde aus Zink mit Gauben und Schornsteinen */
      var roof = B.box(depth + 0.6, 3.4, width + 0.6, matZinc, cx, hgt + 1.7, cz);
      roof.scale.x = 0.86; scene.add(roof);
      scene.add(B.box(depth * 0.6, 1.2, width + 0.6, matZinc, cx, hgt + 3.9, cz));
      for (var d = 0; d < Math.floor(width / 5); d++) {
        var dz = z0 + 2.5 + d * 5;
        var dm = new T.MeshStandardMaterial({ color: '#ffe3b0', emissive: '#ffb860', emissiveIntensity: rnd() < 0.5 ? 1.4 : 0.1 });
        var dorm = B.box(0.7, 1.1, 0.9, dm, cx - side * (depth / 2 - 0.2), hgt + 1.6, dz); scene.add(dorm);
        out.dormers.push(dm);
      }
      for (var ch = 0; ch < Math.floor(width / 7); ch++) {
        var cz2 = z0 + 3 + ch * 7 + rnd() * 2, cxx = cx + (rnd() - 0.5) * 4;
        scene.add(B.box(1.2, 1.6, 0.8, matDark, cxx, hgt + 4.8, cz2));
        for (var pot = 0; pot < 3; pot++) scene.add(B.cyl(0.16, 0.16, 0.7, matChim, cxx - 0.4 + pot * 0.4, hgt + 5.9, cz2, 8));
      }
      return { x: cx, z: cz, h: hgt, depth: depth, side: side };
    }

    var blocks = [];
    for (var side = -1; side <= 1; side += 2) {
      var z = -90;
      while (z < 90) { var w = 16 + Math.floor(rnd() * 3) * 6; blocks.push(facade(side, z, w)); z += w + 0.4; }
    }
    wins.count = wi; wins.instanceMatrix.needsUpdate = true; wins.instanceColor.needsUpdate = true;
    scene.add(wins);

    /* Laternen, grün und alt */
    var lantMat = new T.MeshStandardMaterial({ color: '#f6e6c0', emissive: '#ffc070', emissiveIntensity: 2.4 });
    var matGreen = B.mat('#1f3a2c', { metalness: 0.3, roughness: 0.6 });
    for (var lz = -80; lz <= 80; lz += 20) {
      [-1, 1].forEach(function (sd) {
        var lx = sd * 9.6;
        scene.add(B.cyl(0.09, 0.13, 4.4, matGreen, lx, undefined, lz, 8));
        scene.add(B.box(0.55, 0.7, 0.55, lantMat, lx, 4.6, lz));
        scene.add(B.box(0.75, 0.12, 0.75, matGreen, lx, 5.0, lz));
        if (Math.abs(lz) <= 40) { var pl = new T.PointLight(0xffc070, 34, 24, 1.8); pl.position.set(lx, 4.4, lz); scene.add(pl); out.lights.push(pl); }
      });
    }
    /* Pfützen */
    var puddle = new T.MeshStandardMaterial({ color: '#2a3446', roughness: 0.04, metalness: 0.1 });
    for (var pd = 0; pd < 18; pd++) {
      var pm = new T.Mesh(new T.CircleGeometry(1 + rnd() * 1.8, 18), puddle);
      pm.rotation.x = -Math.PI / 2; pm.position.set((rnd() - 0.5) * 16, 0.02, (rnd() - 0.5) * 140); pm.scale.x = 1.6; scene.add(pm);
    }
    /* Café mit roter Markise auf der rechten Seite */
    var awnTex = B.canvasTex(256, 64, function (c, w, hh) { c.fillStyle = '#8e1b1b'; c.fillRect(0, 0, w, hh); c.fillStyle = '#f2e9dc'; c.font = '700 40px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('CAFÉ DES ABBESSES', w / 2, hh / 2 + 3); }, 1, 1);
    var awn = new T.Mesh(new T.BoxGeometry(2.4, 0.12, 9), new T.MeshStandardMaterial({ color: '#8e1b1b', roughness: 0.85 }));
    awn.position.set(11 - 1.3, 3.4, 14); awn.rotation.z = -0.35; scene.add(awn);
    var cafeSign = new T.Mesh(new T.PlaneGeometry(8, 1.2), new T.MeshBasicMaterial({ map: awnTex }));
    cafeSign.position.set(10.95, 4.6, 14); cafeSign.rotation.y = -Math.PI / 2; scene.add(cafeSign);
    var cafeGlow = new T.MeshStandardMaterial({ color: '#ffe0b0', emissive: '#ffb860', emissiveIntensity: 1.2 });
    [[10.5], [14], [17.5]].forEach(function (p) { var g = new T.Mesh(new T.PlaneGeometry(2.4, 2.2), cafeGlow); g.position.set(10.94, 1.9, p[0]); g.rotation.y = -Math.PI / 2; scene.add(g); });
    var cl = new T.PointLight(0xffb860, 26, 18, 1.6); cl.position.set(8.5, 2.6, 14); scene.add(cl);
    var chair = B.mat('#2b2b2f', { metalness: 0.5, roughness: 0.4 });
    [[8.6, 11], [8.6, 14], [8.6, 17]].forEach(function (p) {
      scene.add(B.cyl(0.42, 0.42, 0.06, chair, p[0], 0.76, p[1], 14)); scene.add(B.cyl(0.03, 0.03, 0.74, chair, p[0], undefined, p[1], 6));
      scene.add(B.box(0.4, 0.45, 0.4, B.mat('#7a1f1f'), p[0] - 0.8, 0.45, p[1])); scene.add(B.box(0.4, 0.45, 0.4, B.mat('#7a1f1f'), p[0] + 0.8, 0.45, p[1]));
    });
    /* Hausnummer 12 auf der linken Seite */
    var numTex = B.canvasTex(128, 128, function (c, w, hh) { c.fillStyle = '#1e3a8a'; c.fillRect(0, 0, w, hh); c.strokeStyle = '#fff'; c.lineWidth = 6; c.strokeRect(8, 8, w - 16, hh - 16); c.fillStyle = '#fff'; c.font = '700 70px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('12', w / 2, hh / 2 + 4); });
    var num = new T.Mesh(new T.PlaneGeometry(0.6, 0.6), new T.MeshBasicMaterial({ map: numTex }));
    num.position.set(-10.94, 2.9, -2.2); num.rotation.y = Math.PI / 2; scene.add(num);
    scene.add(B.box(0.2, 2.8, 1.5, B.mat('#1f2a44'), -10.9, undefined, -0.8));     // Haustür, blau
    /* Das Fenster der Wohnung, warm erleuchtet, 3. Stock */
    var flatWin = new T.Mesh(new T.PlaneGeometry(1.3, 2.5), new T.MeshStandardMaterial({ color: '#ffe6c0', emissive: '#ffc070', emissiveIntensity: 1.6 }));
    flatWin.position.set(-10.93, 3 * 3.2 + 1.9, 0); flatWin.rotation.y = Math.PI / 2; scene.add(flatWin);
    out.flatWin = flatWin;
    out.matAsphalt = matAsphalt;
    return out;
  }

  /* ---------------------------------------------------------------
     Die Wohnung: ein Zimmer im dritten Stock von Nummer 12
     --------------------------------------------------------------- */
  function buildFlat(W, rnd) {
    var T = W.T, scene = W.scene;
    var R = new T.Group();
    var RX = -18, RY = 3 * 3.2 + 0.4, RZ = 0;         // Zimmermitte im Gebäude links
    R.position.set(RX, RY, RZ);
    var Wd = 7.4, Hd = 3.3, Dd = 6.2;
    var wall = B.mat('#e6dfd0', { roughness: 0.95 });
    var floor = new T.Mesh(new T.PlaneGeometry(Wd, Dd), new T.MeshStandardMaterial({ map: parquetTex(), roughness: 0.55 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; R.add(floor);
    var ceil = new T.Mesh(new T.PlaneGeometry(Wd, Dd), B.mat('#f2ede2')); ceil.rotation.x = Math.PI / 2; ceil.position.y = Hd; R.add(ceil);
    /* Wände: hinten (x-), links (z-), rechts (z+); vorne (x+, zur Strasse) mit Fensteröffnung */
    var back = B.box(0.2, Hd, Dd, wall, -Wd / 2, Hd / 2, 0); R.add(back);
    R.add(B.box(Wd, Hd, 0.2, wall, 0, Hd / 2, -Dd / 2));
    R.add(B.box(Wd, Hd, 0.2, wall, 0, Hd / 2, Dd / 2));
    var fx = Wd / 2;
    R.add(B.box(0.2, Hd, (Dd - 1.5) / 2, wall, fx, Hd / 2, -Dd / 4 - 0.375));
    R.add(B.box(0.2, Hd, (Dd - 1.5) / 2, wall, fx, Hd / 2, Dd / 4 + 0.375));
    R.add(B.box(0.2, 0.9, 1.5, wall, fx, 0.45, 0));
    R.add(B.box(0.2, 0.5, 1.5, wall, fx, Hd - 0.25, 0));
    var glass = new T.Mesh(new T.PlaneGeometry(1.5, 1.9), new T.MeshPhysicalMaterial({ color: '#cfe0f5', transmission: 0.92, roughness: 0.08, thickness: 0.05, transparent: true, opacity: 0.35 }));
    glass.position.set(fx - 0.05, 1.85, 0); glass.rotation.y = -Math.PI / 2; R.add(glass);
    var frame = B.mat('#f4f0e6');
    R.add(B.box(0.12, 1.9, 0.08, frame, fx - 0.05, 1.85, 0));
    R.add(B.box(0.12, 0.08, 1.5, frame, fx - 0.05, 1.85, 0));
    /* Stuck und Sockelleiste */
    var moul = B.mat('#efe9dc');
    [-Dd / 2 + 0.11, Dd / 2 - 0.11].forEach(function (z) { R.add(B.box(Wd, 0.14, 0.06, moul, 0, Hd - 0.12, z)); R.add(B.box(Wd, 0.12, 0.05, moul, 0, 0.06, z)); });
    R.add(B.box(0.06, 0.14, Dd, moul, -Wd / 2 + 0.11, Hd - 0.12, 0));
    [[-2.2, 0.9], [1.4, 1.2]].forEach(function (m) {
      var f = new T.Mesh(new T.BoxGeometry(0.04, 1.4, m[1] * 2), moul); f.position.set(-Wd / 2 + 0.11, 1.9, m[0]); R.add(f);
      var inner = B.box(0.05, 1.2, m[1] * 2 - 0.2, wall, -Wd / 2 + 0.12, 1.9, m[0]); R.add(inner);
    });
    /* Teppich, Sofa, Regal mit Büchern, Stehlampe */
    var rug = new T.Mesh(new T.PlaneGeometry(3.2, 2.2), B.mat('#7a2e2e', { roughness: 1 })); rug.rotation.x = -Math.PI / 2; rug.position.set(0.4, 0.01, 0.6); R.add(rug);
    var sofa = B.mat('#3b4a5c', { roughness: 0.9 });
    R.add(B.box(2.0, 0.45, 0.9, sofa, 0.4, 0.22, 2.4)); R.add(B.box(2.0, 0.5, 0.25, sofa, 0.4, 0.7, 2.75));
    R.add(B.box(0.25, 0.55, 0.9, sofa, -0.6, 0.55, 2.4)); R.add(B.box(0.25, 0.55, 0.9, sofa, 1.4, 0.55, 2.4));
    var shelf = B.mat('#3b2a1e');
    for (var s = 0; s < 4; s++) R.add(B.box(1.8, 0.04, 0.3, shelf, 2.4, 0.4 + s * 0.6, -Dd / 2 + 0.3));
    var bookCols = ['#8a2b2b', '#2b4a8a', '#c9a24a', '#2f5d3f', '#e8e3d9', '#5a3a6a', '#b8724e'];
    for (var s2 = 0; s2 < 4; s2++) { var bx = 1.55; while (bx < 3.2) { var bw = 0.06 + rnd() * 0.08, bh = 0.32 + rnd() * 0.18; R.add(B.box(bw, bh, 0.24, B.mat(B.pick(bookCols)), bx + bw / 2, 0.42 + s2 * 0.6 + bh / 2, -Dd / 2 + 0.3)); bx += bw + 0.01; } }
    R.add(B.cyl(0.02, 0.02, 1.6, B.mat('#c9a227', { metalness: 0.7, roughness: 0.3 }), 2.9, undefined, 2.4, 6));
    var shade = new T.Mesh(new T.CylinderGeometry(0.28, 0.34, 0.4, 16, 1, true), new T.MeshStandardMaterial({ color: '#f2e2c4', emissive: '#ffcf8a', emissiveIntensity: 0.9, side: T.DoubleSide }));
    shade.position.set(2.9, 1.7, 2.4); R.add(shade);
    var lampLight = new T.PointLight(0xffc98a, 18, 9, 1.7); lampLight.position.set(2.9, 1.6, 2.4); R.add(lampLight);
    var roomAmb = new T.PointLight(0xfff0dc, 6, 12, 1.4); roomAmb.position.set(0, 3.0, 0); R.add(roomAmb);

    /* --- Die fünf Gegenstände --- */
    var picks = {};
    function pickable(group, id) { group.userData.pick = id; group.traverse(function (o) { o.userData.pick = id; }); picks[id] = group; R.add(group); W.pickables.push(group); }

    /* Kamin mit Pendule */
    var chim = new T.Group();
    chim.add(B.box(0.5, 1.2, 1.8, B.mat('#d9d2c3'), -Wd / 2 + 0.36, 0.6, 0));
    chim.add(B.box(0.4, 0.8, 1.2, B.mat('#1a1614'), -Wd / 2 + 0.42, 0.45, 0));
    chim.add(B.box(0.6, 0.08, 2.0, B.mat('#cfc7b5'), -Wd / 2 + 0.4, 1.24, 0));
    R.add(chim);
    var pend = new T.Group();
    var body = B.box(0.16, 0.5, 0.42, B.mat('#3b2a1e'), -Wd / 2 + 0.42, 1.55, 0.02); pend.add(body);
    var face = new T.Mesh(new T.CircleGeometry(0.16, 24), new T.MeshBasicMaterial({ map: clockTex() }));
    face.position.set(-Wd / 2 + 0.505, 1.6, 0.02); face.rotation.y = Math.PI / 2; pend.add(face);
    pend.rotation.z = -0.12;           // sie ist gekippt, die Vitre gesprungen
    pickable(pend, 'pendule');

    /* Sekretär */
    var sec = new T.Group();
    var wood = B.mat('#4a3322', { roughness: 0.6 });
    sec.add(B.box(1.2, 0.05, 0.6, wood, -2.0, 0.78, -Dd / 2 + 0.55));
    [[-2.55, -Dd / 2 + 0.3], [-1.45, -Dd / 2 + 0.3], [-2.55, -Dd / 2 + 0.8], [-1.45, -Dd / 2 + 0.8]].forEach(function (p) { sec.add(B.cyl(0.03, 0.04, 0.76, wood, p[0], undefined, p[1], 8)); });
    sec.add(B.box(1.2, 0.5, 0.25, wood, -2.0, 1.05, -Dd / 2 + 0.38));
    sec.add(B.box(1.1, 0.18, 0.02, B.mat('#5a4030'), -2.0, 1.0, -Dd / 2 + 0.51));
    sec.add(B.box(0.3, 0.005, 0.22, B.mat('#f7f3ea'), -1.85, 0.81, -Dd / 2 + 0.6));
    pickable(sec, 'secretaire');

    /* Telefon auf einem Tischchen */
    var tel = new T.Group();
    tel.add(B.cyl(0.25, 0.28, 0.02, wood, 2.6, 0.7, -0.8, 14)); tel.add(B.cyl(0.03, 0.05, 0.7, wood, 2.6, undefined, -0.8, 8));
    tel.add(B.box(0.28, 0.12, 0.2, B.mat('#1a1614', { roughness: 0.3 }), 2.6, 0.77, -0.8));
    var combine = B.cyl(0.035, 0.035, 0.28, B.mat('#1a1614'), 2.6, 0.87, -0.8, 8);
    combine.rotation.z = Math.PI / 2; tel.add(combine);                        // Hörer – nicht tel.add(...).rotation!
    var led = new T.Mesh(new T.SphereGeometry(0.02, 8, 8), new T.MeshStandardMaterial({ color: '#ff3b30', emissive: '#ff3b30', emissiveIntensity: 3 }));
    led.position.set(2.72, 0.84, -0.7); tel.add(led);
    pickable(tel, 'telephone');
    var telLed = led.material;

    /* Koffer bei der Tür */
    var val = new T.Group();
    var leather = B.mat('#6b4a2e', { roughness: 0.7 });
    val.add(B.box(0.7, 0.45, 0.28, leather, 2.4, 0.225, 1.0)); val.add(B.box(0.7, 0.02, 0.28, B.mat('#3b2a1e'), 2.4, 0.46, 1.0));
    var lid = B.box(0.7, 0.42, 0.02, leather, 2.4, 0.66, 1.15); lid.rotation.x = 0.5; val.add(lid);   // Deckel offen
    val.add(B.box(0.3, 0.02, 0.2, B.mat('#e8e3d9'), 2.4, 0.47, 1.0));
    pickable(val, 'valise');

    /* Bild an der linken Wand */
    var tab = new T.Group();
    tab.add(B.box(1.3, 1.0, 0.05, B.mat('#c9a227', { metalness: 0.6, roughness: 0.35 }), 0.8, 1.85, -Dd / 2 + 0.13));
    var canvas = new T.Mesh(new T.PlaneGeometry(1.15, 0.85), new T.MeshStandardMaterial({ map: paintingTex(), roughness: 0.9 }));
    canvas.position.set(0.8, 1.85, -Dd / 2 + 0.16); tab.add(canvas);
    tab.rotation.z = 0.02;
    pickable(tab, 'tableau');

    /* Die Tür, rechte Wand, mit Angel */
    var doorPivot = new T.Group(); doorPivot.position.set(-1.0, 0, Dd / 2 - 0.1);
    var door = B.box(1.0, 2.25, 0.08, B.mat('#2b2320', { roughness: 0.5 }), 0.5, 1.125, 0);
    doorPivot.add(door);
    doorPivot.add(B.box(0.7, 0.8, 0.02, B.mat('#332a26'), 0.5, 0.6, -0.05)); doorPivot.add(B.box(0.7, 0.8, 0.02, B.mat('#332a26'), 0.5, 1.55, -0.05));
    var knob = new T.Mesh(new T.SphereGeometry(0.04, 12, 12), B.mat('#c9a227', { metalness: 0.8, roughness: 0.25 }));
    knob.position.set(0.9, 1.05, -0.07); doorPivot.add(knob);
    R.add(doorPivot);
    R.add(B.box(1.2, 0.08, 0.16, moul, -0.5, 2.3, Dd / 2 - 0.1));
    var doorGlow = new T.PointLight(0xffe6b0, 0, 8, 1.5); doorGlow.position.set(-0.5, 1.8, Dd / 2 - 0.6); R.add(doorGlow);

    scene.add(R);
    return { group: R, at: [RX, RY, RZ], picks: picks, door: doorPivot, doorGlow: doorGlow, telLed: telLed, lampLight: lampLight, size: [Wd, Hd, Dd] };
  }

  L.stages.lepic = function (lesson) {
    if (!window.THREE || !L.hasWebGL()) return L.stages.enquete(lesson);
    var S = L.session;
    var root = h('div', { class: 'enquete world3d' });
    var host = h('div', { class: 'world-host' }); root.appendChild(host);
    var loading = h('div', { class: 'world-loading', text: 'Il pleut sur la rue Lepic …' }); root.appendChild(loading);
    var hint = h('div', { class: 'world-hint', text: 'glisse pour regarder · touche un objet' }); root.appendChild(hint);

    var rnd = B.seeded(120912);
    var W = L.World(host, {
      fov: 58, fogNear: 40, fogFar: 170, shadows: false, sunPath: { azimuth: 0.4 },
      palette: {
        top: ['#0b0f1c', '#0d1220', '#2a3a5c', '#6f86b0'],
        mid: ['#141c2e', '#182236', '#4a5a80', '#c9a58c'],
        low: ['#2a3450', '#2e3a56', '#7a6a80', '#f0c9a0'],
        sun: ['#3a4a7a', '#3a4a7a', '#8a7ab0', '#ffd9a0'],
        amb: ['#2a3550', '#2e3a58', '#5a6a90', '#a9c2ff']
      }
    });
    var street = buildStreet(W, rnd);
    var flat = buildFlat(W, rnd);
    var rain = W.rain(2400, { x: 60, y: 30, z: 120 });
    W.setTime(0);
    var A = flat.at, Wd = flat.size[0], Dd = flat.size[2];
    var roomCam = { pos: [A[0] - 1.6, A[1] + 1.55, A[2] + 1.6], look: [A[0] + 1.2, A[1] + 1.2, A[2] - 1.2] };
    var objCam = {
      pendule:   { pos: [A[0] - Wd / 2 + 2.2, A[1] + 1.6, A[2] + 0.9], look: [A[0] - Wd / 2 + 0.45, A[1] + 1.5, A[2]] },
      secretaire:{ pos: [A[0] - 1.9, A[1] + 1.5, A[2] - Dd / 2 + 2.6], look: [A[0] - 2.0, A[1] + 0.9, A[2] - Dd / 2 + 0.5] },
      telephone: { pos: [A[0] + 1.4, A[1] + 1.4, A[2] + 0.4], look: [A[0] + 2.6, A[1] + 0.8, A[2] - 0.8] },
      valise:    { pos: [A[0] + 1.0, A[1] + 1.3, A[2] + 0.2], look: [A[0] + 2.4, A[1] + 0.4, A[2] + 1.0] },
      tableau:   { pos: [A[0] + 0.8, A[1] + 1.7, A[2] - Dd / 2 + 2.4], look: [A[0] + 0.8, A[1] + 1.85, A[2] - Dd / 2 + 0.2] }
    };
    var streetCam = { pos: [-3, 1.7, 22], look: [-10.5, 9, 0] };
    W.jumpTo([2, 1.7, 40], [-10.5, 8, 0]);
    W.start();
    setTimeout(function () { loading.classList.add('weg'); }, 400);
    setTimeout(function () { loading.remove(); }, 1300);
    L.ambience.start('paris');

    /* Pulsieren der ungelösten Gegenstände */
    var pulse = {};
    Object.keys(flat.picks).forEach(function (id) {
      var halo = new W.T.PointLight(0xffd27a, 0, 2.2, 2);
      var bb = new W.T.Box3().setFromObject(flat.picks[id]); var c = bb.getCenter(new W.T.Vector3());
      halo.position.copy(flat.group.worldToLocal(c.clone())); flat.group.add(halo);
      pulse[id] = halo;
    });
    var doorOpen = false, doorK = 0;
    W.tick(function (dt, t) {
      Object.keys(pulse).forEach(function (id) {
        var solved = S.stage && S.stage.resolus && S.stage.resolus[id];
        pulse[id].intensity = solved ? 0 : 1.6 + Math.sin(t * 2.4 + id.length) * 1.2;
      });
      flat.telLed.emissiveIntensity = (Math.sin(t * 6) > 0) ? 3 : 0.2;
      if (doorOpen && doorK < 1) { doorK += dt / 1.6; flat.door.rotation.y = -Math.min(1, doorK) * 1.9; flat.doorGlow.intensity = 30 * Math.min(1, doorK); }
    });
    var timeTween = null;
    W.tick(function (dt) {
      if (!timeTween) return;
      timeTween.k += dt / timeTween.dur; var k = Math.min(1, timeTween.k);
      W.setTime(timeTween.a + (timeTween.b - timeTween.a) * (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2));
      if (k >= 1) timeTween = null;
    });
    W.snapTime = function () { if (timeTween) { W.setTime(timeTween.b); timeTween = null; } };

    var inside = false;
    function enterFlat() {
      if (inside) return; inside = true;
      W.flyTo([-9.6, A[1] + 1.5, 2.5], [A[0], A[1] + 1.4, A[2]], 4.2).then(function () {
        W.flyTo(roomCam.pos, roomCam.look, 2.6);
      });
    }

    var ui = L.enqueteUI(lesson, root, {
      mountObjects: function (objets, ouvrir) {
        W.onPick = function (o) { var id = o.userData.pick; var ob = objets.filter(function (x) { return x.id === id; })[0]; if (ob) ouvrir(ob); };
      },
      onOpen: function (o) { var c = objCam[o.id]; if (c) W.flyTo(c.pos, c.look, 1.4); hint.style.opacity = '0'; },
      onClose: function () { if (inside) W.flyTo(roomCam.pos, roomCam.look, 1.4); },
      onProgress: function () {},
      onReady: function () { flat.doorGlow.intensity = 8; },
      onDoor: function () {
        doorOpen = true;
        timeTween = { a: W.time, b: 1, k: 0, dur: 9 };
        street.dormers.forEach(function (m) { m.emissiveIntensity = 0.1; });
        rain.visible = false;
        W.flyTo([A[0] + 0.2, A[1] + 1.5, A[2] + 1.0], [A[0] - 0.5, A[1] + 1.3, A[2] + Dd / 2 + 2], 3.5);
      }
    });

    /* Vorspann: draussen im Regen; beim Start geht es durchs Fenster hinein */
    if (S.stage.phase === 'intro') {
      W.flyTo(streetCam.pos, streetCam.look, 12);
      var starter = root.querySelector('.dossier .btn-enq');
      if (starter) starter.addEventListener('click', enterFlat);
    } else {
      W.jumpTo(roomCam.pos, roomCam.look); inside = true;
    }
    return root;
  };

})(window.LEKTION);
