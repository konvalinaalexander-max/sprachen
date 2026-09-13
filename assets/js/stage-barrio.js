/* Welt "El barrio" – ein prozedurales Madrid in 3D.
   Sieben mal sieben Häuserblöcke um eine Plaza, Kirche mit Kuppel, Bar mit
   Markise, Churrería, Metro-Raute, Azotea mit Wäscheleine. Die Kamera fliegt
   von Szene zu Szene, der Himmel dreht mit der Uhrzeit, ~15 000 Fenster gehen
   nach und nach an. Kein Bild, keine Textur von aussen: alles gerechnet. */
(function (L) {
  'use strict';
  var h = L.h, B = L.Build;

  var BLOCK = 26, STREET = 9, PITCH = BLOCK + STREET, N = 3;

  var FACADES = ['#d9a066', '#c8623c', '#e8dcc6', '#b5453a', '#efe6d6', '#c99a5b', '#a86a48', '#d4b27a', '#cf8a5a'];
  var LIT = ['#ffd27a', '#ffe3a6', '#ffc26b', '#f5e6c8', '#ffcf8e'];

  function textTexture(text, opts) {
    opts = opts || {};
    return B.canvasTex(opts.w || 512, opts.h || 128, function (c, w, hh) {
      c.fillStyle = opts.bg || '#1a0f0a'; c.fillRect(0, 0, w, hh);
      c.fillStyle = opts.fg || '#ffd27a';
      c.font = (opts.weight || '700') + ' ' + (opts.size || 72) + 'px Georgia, serif';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(text, w / 2, hh / 2 + 4);
    });
  }

  function buildCity(W, rnd) {
    var T = W.T, scene = W.scene;
    var mats = FACADES.map(function (c) { return B.mat(c); });
    var matDark = B.mat('#241b1c'), matRoof = B.mat('#5a4a44'), matMetal = B.mat('#8a8f96', { metalness: 0.5, roughness: 0.5 });
    var matShop = B.mat('#3b312c', { roughness: 0.7 });
    var matStone = B.mat('#a8977d'), matAsphalt = B.mat('#2a2b30', { roughness: 0.95 });
    var out = { heights: {}, lamps: [], glow: [], lights: [] };

    /* Boden */
    var ground = new T.Mesh(new T.PlaneGeometry(900, 900), matAsphalt);
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

    /* Fenster als Instanzen – mit gemaltem Rahmen, damit auch dunkle Fenster wie Fenster aussehen */
    var winGeo = new T.PlaneGeometry(1.15, 1.55);
    var winTex = B.canvasTex(64, 96, function (c, w, hh) {
      c.fillStyle = '#efe6d8'; c.fillRect(0, 0, w, hh);               // heller Rahmen (Stein)
      c.fillStyle = '#ffffff'; c.fillRect(7, 7, w - 14, hh - 14);     // Glas = weiss, Instanzfarbe färbt
      c.fillStyle = '#3a3230'; c.fillRect(w / 2 - 1, 7, 2, hh - 14); c.fillRect(7, hh * 0.42, w - 14, 2);
    });
    var winMat = new T.MeshBasicMaterial({ color: 0xffffff, map: winTex, fog: true });
    var balGeo = new T.BoxGeometry(1.7, 0.95, 0.08);
    var balMat = B.mat('#2c2422', { metalness: 0.4, roughness: 0.6 });
    var bals = new T.InstancedMesh(balGeo, balMat, 6000), bi = 0;
    var slabGeo = new T.BoxGeometry(1.8, 0.1, 0.55), slabMat = B.mat('#cfc4b2');
    var slabs = new T.InstancedMesh(slabGeo, slabMat, 6000);
    function addBalcony(x, y, z, rotY) {
      if (bi >= 6000) return;
      q.setFromAxisAngle(new T.Vector3(0, 1, 0), rotY);
      var out = new T.Vector3(0, 0, 0.32).applyQuaternion(q);
      pos.set(x + out.x, y - 0.35, z + out.z); m4.compose(pos, q, one); bals.setMatrixAt(bi, m4);
      pos.set(x + out.x * 0.9, y - 0.83, z + out.z * 0.9); m4.compose(pos, q, one); slabs.setMatrixAt(bi, m4);
      bi++;
    }
    var MAXW = 20000;
    var wins = new T.InstancedMesh(winGeo, winMat, MAXW);
    var wi = 0, thresholds = new Float32Array(MAXW), litColors = [];
    var m4 = new T.Matrix4(), q = new T.Quaternion(), pos = new T.Vector3(), one = new T.Vector3(1, 1, 1);
    function addWindow(x, y, z, rotY, balcony) {
      if (wi >= MAXW) return;
      q.setFromAxisAngle(new T.Vector3(0, 1, 0), rotY);
      pos.set(x, y, z); m4.compose(pos, q, one);
      wins.setMatrixAt(wi, m4);
      wins.setColorAt(wi, new T.Color('#1a2030'));
      thresholds[wi] = rnd();
      litColors[wi] = new T.Color(B.pick(LIT));
      wi++;
      if (balcony) addBalcony(x, y, z, rotY);
    }

    function building(cx, cz, wx, wz, floors, mat, opts) {
      opts = opts || {};
      var hgt = floors * 3.1 + 0.8;
      var bx = B.box(wx, hgt, wz, mat, cx, undefined, cz);
      scene.add(bx);
      scene.add(B.box(wx + 0.08, 3.5, wz + 0.08, matShop, cx, 1.75, cz));             // Ladenzeile
      scene.add(B.box(wx + 0.14, 0.25, wz + 0.14, matDark, cx, 3.6, cz));             // Gesims
      scene.add(B.box(wx + 0.5, 0.6, wz + 0.5, matDark, cx, hgt + 0.2, cz));           // Brüstung
      if (rnd() < 0.4) scene.add(B.cyl(0.9, 0.9, 1.7, matMetal, cx + (rnd() - 0.5) * wx * 0.5, hgt + 1.3, cz + (rnd() - 0.5) * wz * 0.5, 10));
      if (rnd() < 0.5) scene.add(B.cyl(0.05, 0.05, 3.5, matMetal, cx + (rnd() - 0.5) * wx * 0.7, hgt + 2.2, cz + (rnd() - 0.5) * wz * 0.7, 6));
      if (rnd() < 0.5) scene.add(B.box(1.1, 0.7, 0.8, matMetal, cx + (rnd() - 0.5) * wx * 0.6, hgt + 0.8, cz + (rnd() - 0.5) * wz * 0.6));
      /* Fenster an allen vier Seiten, Erdgeschoss ausgespart */
      var cols, i, f;
      for (f = 1; f < floors; f++) {
        var y = f * 3.1 + 1.9;
        var balRow = rnd() < 0.55;                                     // ganze Balkonreihen, wie in Madrid
        cols = Math.floor(wx / 2.7);
        for (i = 0; i < cols; i++) {
          var x = cx - wx / 2 + 1.35 + i * (wx - 2.7) / Math.max(1, cols - 1);
          addWindow(x, y, cz + wz / 2 + 0.03, 0, balRow);
          addWindow(x, y, cz - wz / 2 - 0.03, Math.PI, balRow);
        }
        cols = Math.floor(wz / 2.7);
        for (i = 0; i < cols; i++) {
          var z = cz - wz / 2 + 1.35 + i * (wz - 2.7) / Math.max(1, cols - 1);
          addWindow(cx + wx / 2 + 0.03, y, z, Math.PI / 2, balRow);
          addWindow(cx - wx / 2 - 0.03, y, z, -Math.PI / 2, balRow);
        }
      }
      /* Markise im Erdgeschoss */
      if (opts.awning !== false && rnd() < 0.35) {
        var aw = B.box(3.4, 0.12, 1.4, B.mat(B.pick(['#b5453a', '#3d6b4a', '#2f4f8a', '#c8a24a'])), cx + (rnd() - 0.5) * (wx - 4), 3.1, cz + wz / 2 + 0.7);
        aw.rotation.x = 0.35; scene.add(aw);
      }
      return hgt;
    }

    /* Häuserblöcke */
    for (var gx = -N; gx <= N; gx++) for (var gz = -N; gz <= N; gz++) {
      var cx = gx * PITCH, cz = gz * PITCH;
      var key = gx + ',' + gz;
      if (gx === 0 && gz === 0) continue;                       // Plaza
      if (gx === -2 && gz === -1) { church(cx, cz); continue; }
      var ring = Math.max(Math.abs(gx), Math.abs(gz));
      var splitX = 0.35 + rnd() * 0.3, splitZ = 0.35 + rnd() * 0.3;
      var parts = [
        [cx - BLOCK / 2 + BLOCK * splitX / 2, cz - BLOCK / 2 + BLOCK * splitZ / 2, BLOCK * splitX, BLOCK * splitZ],
        [cx + BLOCK / 2 - BLOCK * (1 - splitX) / 2, cz - BLOCK / 2 + BLOCK * splitZ / 2, BLOCK * (1 - splitX), BLOCK * splitZ],
        [cx - BLOCK / 2 + BLOCK * splitX / 2, cz + BLOCK / 2 - BLOCK * (1 - splitZ) / 2, BLOCK * splitX, BLOCK * (1 - splitZ)],
        [cx + BLOCK / 2 - BLOCK * (1 - splitX) / 2, cz + BLOCK / 2 - BLOCK * (1 - splitZ) / 2, BLOCK * (1 - splitX), BLOCK * (1 - splitZ)]
      ];
      var maxH = 0;
      parts.forEach(function (p) {
        var floors = ring <= 1 ? 5 + Math.floor(rnd() * 3) : 3 + Math.floor(rnd() * 3);
        var hgt = building(p[0], p[1], p[2] - 0.6, p[3] - 0.6, floors, B.pick(mats));
        maxH = Math.max(maxH, hgt);
      });
      out.heights[key] = maxH;
    }
    wins.count = wi;
    wins.instanceMatrix.needsUpdate = true;
    if (wins.instanceColor) wins.instanceColor.needsUpdate = true;
    scene.add(wins);
    bals.count = bi; slabs.count = bi; bals.instanceMatrix.needsUpdate = true; slabs.instanceMatrix.needsUpdate = true;
    bals.castShadow = true; scene.add(bals); scene.add(slabs);

    /* Parkende Autos entlang der Strassen */
    var carCols = ['#c9c9c9', '#2a2a2e', '#8a1f1f', '#e8e8e8', '#3a4a8a', '#5a5a5a', '#d9d9d9', '#1f4d3a'];
    for (var ci = 0; ci < 44; ci++) {
      var along = (rnd() < 0.5), idx = -N + Math.floor(rnd() * (2 * N)), off = (rnd() - 0.5) * PITCH * 0.8;
      var street = idx * PITCH + PITCH / 2, side = rnd() < 0.5 ? -3.6 : 3.6;
      var carX = along ? off * 4 : street + side, carZ = along ? street + side : off * 4;
      if (Math.abs(carX) < 20 && Math.abs(carZ) < 20) continue;        // Plaza freihalten
      var cm = B.mat(B.pick(carCols), { metalness: 0.5, roughness: 0.35 });
      var body = B.box(along ? 4.2 : 1.8, 0.7, along ? 1.8 : 4.2, cm, carX, 0.55, carZ); scene.add(body);
      var top = B.box(along ? 2.2 : 1.6, 0.6, along ? 1.6 : 2.2, B.mat('#1c1f28', { metalness: 0.3, roughness: 0.2 }), carX, 1.2, carZ); scene.add(top);
    }
    out.wins = wins; out.thresholds = thresholds; out.litColors = litColors; out.winCount = wi;

    function church(cx, cz) {
      var cream = B.mat('#e6d9c2');
      scene.add(B.box(14, 16, 24, cream, cx - 4, undefined, cz));
      scene.add(B.box(15, 1.2, 25, matRoof, cx - 4, 16.6, cz));
      scene.add(B.box(7, 30, 7, cream, cx + 7, undefined, cz - 8));
      scene.add(B.box(2.2, 3, 0.4, matDark, cx + 7, 26, cz - 4.4));
      var dome = new T.Mesh(new T.SphereGeometry(4.2, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2), B.mat('#6b7f8c', { metalness: 0.3, roughness: 0.5 }));
      dome.position.set(cx + 7, 30, cz - 8); dome.castShadow = true; scene.add(dome);
      scene.add(B.box(0.3, 3, 0.3, matMetal, cx + 7, 35.5, cz - 8));
      scene.add(B.box(1.6, 0.3, 0.3, matMetal, cx + 7, 36.2, cz - 8));
      out.heights['-2,-1'] = 17;
    }

    /* Plaza */
    var paving = B.box(BLOCK + 2, 0.12, BLOCK + 2, matStone, 0, 0.06, 0); scene.add(paving);
    scene.add(B.cyl(5.2, 5.4, 0.7, matStone, 0, undefined, 0, 28));
    var water = B.cyl(4.9, 4.9, 0.5, B.mat('#3f7fae', { roughness: 0.15, metalness: 0.3, emissive: '#1a3f5c', emissiveIntensity: 0.3 }), 0, 0.5, 0, 28); scene.add(water);
    scene.add(B.cyl(1.9, 2.4, 1.6, matStone, 0, 1.4, 0, 20));
    scene.add(B.cyl(0.6, 0.9, 2.6, matStone, 0, 3.2, 0, 14));
    var trunk = B.mat('#5a3d2a'), crown = B.mat('#3f6b3a'), crown2 = B.mat('#4a7a42');
    [[-9, -9], [9, -9], [-9, 9], [9, 9], [0, -10.5], [0, 10.5]].forEach(function (p) {
      scene.add(B.cyl(0.28, 0.36, 3.2, trunk, p[0], undefined, p[1], 8));
      var c1 = new T.Mesh(new T.IcosahedronGeometry(2.6, 2), crown); c1.position.set(p[0], 5.0, p[1]); c1.castShadow = true; scene.add(c1);
      var c2 = new T.Mesh(new T.IcosahedronGeometry(1.9, 2), crown2); c2.position.set(p[0] + 1.2, 6.1, p[1] - 0.8); c2.castShadow = true; scene.add(c2);
      var c3 = new T.Mesh(new T.IcosahedronGeometry(1.6, 2), crown2); c3.position.set(p[0] - 1.3, 5.8, p[1] + 0.9); scene.add(c3);
    });
    var bench = B.mat('#5a4030');
    [[-5, 6, 0], [5, 6, 0], [-5, -6, 0], [5, -6, 0], [7, 0, Math.PI / 2], [-7, 0, Math.PI / 2]].forEach(function (p) {
      var bb = B.box(2, 0.45, 0.55, bench, p[0], 0.36, p[1]); bb.rotation.y = p[2]; scene.add(bb);
    });
    scene.add(B.box(3, 3.2, 2.4, B.mat('#2f5d3f'), -10, undefined, -1));            // Kiosco
    scene.add(B.box(3.6, 0.3, 3, matDark, -10, 3.35, -1));

    /* Laternen */
    var lantMat = new T.MeshStandardMaterial({ color: '#f4e2a8', emissive: '#ffb347', emissiveIntensity: 0, roughness: 0.5 });
    function lamp(x, z, withLight) {
      scene.add(B.cyl(0.11, 0.14, 5.2, matDark, x, undefined, z, 8));
      var lan = B.box(0.55, 0.6, 0.55, lantMat, x, 5.3, z); scene.add(lan);
      if (withLight) {
        var pl = new T.PointLight(0xffb060, 0, 26, 1.8); pl.position.set(x, 5.1, z); scene.add(pl); out.lights.push(pl);
      }
    }
    for (var a = -N; a <= N; a++) {
      lamp(a * PITCH + PITCH / 2, PITCH / 2, Math.abs(a) <= 1);
      lamp(a * PITCH + PITCH / 2, -PITCH / 2, Math.abs(a) <= 1);
      lamp(PITCH / 2, a * PITCH + PITCH / 2, Math.abs(a) <= 1 && a !== 0);
      lamp(-PITCH / 2, a * PITCH + PITCH / 2, Math.abs(a) <= 1 && a !== 0);
    }
    out.lantMat = lantMat;

    /* Bar Manolo – Westseite des Blocks (1,0), zur Plaza hin */
    var bx0 = PITCH - BLOCK / 2;                    // x der Westfassade ≈ 22
    var stripes = B.canvasTex(256, 64, function (c, w, hh) {
      for (var i = 0; i < 8; i++) { c.fillStyle = i % 2 ? '#f3ecdf' : '#b8352e'; c.fillRect(i * 32, 0, 32, hh); }
    }, 4, 1);
    var awn = new T.Mesh(new T.BoxGeometry(11, 0.14, 2.6), new T.MeshStandardMaterial({ map: stripes, roughness: 0.8 }));
    awn.position.set(bx0 - 1.3, 3.4, 0); awn.rotation.z = 0.32; awn.castShadow = true; scene.add(awn);
    var barGlow = new T.MeshStandardMaterial({ color: '#ffd9a0', emissive: '#ffb85c', emissiveIntensity: 0.15 });
    [[-3.2], [0], [3.2]].forEach(function (p) {
      var wg = new T.Mesh(new T.PlaneGeometry(2.4, 2.2), barGlow); wg.position.set(bx0 - 0.08, 1.8, p[0]); wg.rotation.y = -Math.PI / 2; scene.add(wg);
    });
    var sign = new T.Mesh(new T.PlaneGeometry(6, 1.5), new T.MeshBasicMaterial({ map: textTexture('BAR MANOLO', { bg: '#2a1410', fg: '#ffd27a', size: 64 }) }));
    sign.position.set(bx0 - 0.1, 5.2, 0); sign.rotation.y = -Math.PI / 2; scene.add(sign);
    var table = B.mat('#3a3a40', { metalness: 0.6, roughness: 0.4 });
    [[bx0 - 4.5, -3], [bx0 - 4.5, 0.5], [bx0 - 4.5, 4], [bx0 - 7.5, -1.5], [bx0 - 7.5, 2.5]].forEach(function (p) {
      scene.add(B.cyl(0.55, 0.55, 0.08, table, p[0], 0.78, p[1], 16));
      scene.add(B.cyl(0.04, 0.04, 0.75, table, p[0], undefined, p[1], 6));
      [[0.9, 0], [-0.9, 0], [0, 0.9], [0, -0.9]].forEach(function (d) { scene.add(B.box(0.42, 0.45, 0.42, table, p[0] + d[0], 0.45, p[1] + d[1])); });
    });
    out.glow.push(barGlow);
    var barLight = new T.PointLight(0xffb060, 0, 22, 1.6); barLight.position.set(bx0 - 3, 3.2, 0); scene.add(barLight); out.lights.push(barLight);

    /* Churrería – Nordseite von Block (0,1) */
    var cz0 = PITCH - BLOCK / 2;                    // z der Nordfassade ≈ 22
    var chGlow = new T.MeshStandardMaterial({ color: '#fff0c8', emissive: '#ffc94a', emissiveIntensity: 0.15 });
    [[-2.6], [0], [2.6]].forEach(function (p) {
      var wg = new T.Mesh(new T.PlaneGeometry(2, 2.2), chGlow); wg.position.set(p[0] + 2, 1.9, cz0 - 0.08); wg.rotation.y = Math.PI; scene.add(wg);
    });
    var sign2 = new T.Mesh(new T.PlaneGeometry(7, 1.4), new T.MeshBasicMaterial({ map: textTexture('CHURRERÍA', { bg: '#7a1f1a', fg: '#ffe9a8', size: 62 }) }));
    sign2.position.set(2, 4.6, cz0 - 0.1); sign2.rotation.y = Math.PI; scene.add(sign2);
    out.glow.push(chGlow);
    var chLight = new T.PointLight(0xffc04a, 0, 18, 1.6); chLight.position.set(2, 2.6, cz0 - 3); scene.add(chLight); out.lights.push(chLight);

    /* Metro – Ecke bei (-PITCH/2, PITCH/2) */
    var mx = -PITCH / 2 - 2.5, mz = PITCH / 2 + 2.5;
    scene.add(B.box(3.2, 0.25, 6, B.mat('#07080c'), mx, 0.05, mz));
    scene.add(B.box(0.08, 1.0, 6, matMetal, mx - 1.6, 0.6, mz)); scene.add(B.box(0.08, 1.0, 6, matMetal, mx + 1.6, 0.6, mz));
    scene.add(B.cyl(0.08, 0.08, 4.2, matMetal, mx, undefined, mz - 3.6, 8));
    var metroTex = B.canvasTex(256, 256, function (c, w, hh) {
      c.fillStyle = '#0b1a3a'; c.fillRect(0, 0, w, hh);
      c.save(); c.translate(w / 2, hh / 2); c.rotate(Math.PI / 4);
      c.fillStyle = '#d0202a'; c.fillRect(-88, -88, 176, 176); c.restore();
      c.fillStyle = '#1e4aa8'; c.fillRect(0, hh / 2 - 26, w, 52);
      c.fillStyle = '#fff'; c.font = '700 40px Arial, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText('Metro', w / 2, hh / 2 + 2);
    });
    var msign = new T.Mesh(new T.PlaneGeometry(2.2, 2.2), new T.MeshBasicMaterial({ map: metroTex, side: T.DoubleSide }));
    msign.position.set(mx, 4.2, mz - 3.6); scene.add(msign);
    var mLight = new T.PointLight(0x9fc4ff, 0, 14, 1.8); mLight.position.set(mx, 4, mz - 3); scene.add(mLight); out.lights.push(mLight);

    /* Portal – Südfassade von Block (0,-1) */
    var pz = -PITCH + BLOCK / 2;                    // ≈ -22
    scene.add(B.box(1.6, 2.7, 0.35, B.mat('#2a1a12'), 1, undefined, pz + 0.3));
    var pisoWin = new T.Mesh(new T.PlaneGeometry(1.4, 1.7), new T.MeshStandardMaterial({ color: '#ffe0a8', emissive: '#ffb85c', emissiveIntensity: 1.2 }));
    pisoWin.position.set(1, 14.3, pz + 0.05); scene.add(pisoWin);
    out.glow.push(pisoWin.material);

    /* Azotea – Dach von Block (1,-1) */
    var az = out.heights['1,-1'] || 18;
    var ax = PITCH, azz = -PITCH;
    var cuerda = B.cyl(0.02, 0.02, 9, matMetal, ax, az + 2.1, azz - 4, 4);   // Wäscheleine
    cuerda.rotation.z = Math.PI / 2;                                           // NICHT scene.add(...).rotation – das dreht die Szene
    scene.add(cuerda);
    [[-3, '#d9d2c4'], [-1, '#3a5c8a'], [1, '#e2b27a'], [3, '#c25b4a']].forEach(function (p) {
      scene.add(B.box(0.9, 1.3, 0.05, B.mat(p[1]), ax + p[0], az + 1.5, azz - 4));
    });
    [[-2.5, 2], [2.5, 2]].forEach(function (p) { scene.add(B.box(0.5, 0.9, 0.5, B.mat('#eee6d5'), ax + p[0], undefined, azz + p[1])); });
    scene.add(B.cyl(0.5, 0.35, 0.7, B.mat('#b8603c'), ax - 4, az + 0.95, azz + 3, 10));
    scene.add(B.cyl(0.05, 0.05, 1.4, B.mat('#2f6b3a'), ax - 4, az + 1.9, azz + 3, 6));
    out.azotea = [ax, az + 0.9, azz];
    return out;
  }

  /* ---------------------------------------------------------------
     Kamerapunkte je Ort
     --------------------------------------------------------------- */
  function camFor(punto, city) {
    var P = PITCH, Bh = BLOCK / 2;
    var az = city.azotea;
    return {
      portal:    { pos: [1, 2.0, -P + Bh + 1.5], look: [0, 3.5, 2] },
      plaza:     { pos: [-15, 3.4, 19], look: [5, 2, -3] },
      bar:       { pos: [2, 2.3, 10], look: [P - Bh - 1, 3, -1] },
      metro:     { pos: [-5, 2.2, 29], look: [-P / 2 - 2.5, 1.6, P / 2 + 1] },
      piso:      { pos: [-6, 11.5, -P + Bh + 10], look: [1, 13.8, -P + Bh] },
      azotea:    { pos: [az[0] - 1, az[1] + 1.6, az[2] + 6], look: [0, 4, 6] },
      churreria: { pos: [-9, 2.4, 4], look: [2, 3.2, P - Bh] },
      calle:     { pos: [-P / 2, 2.0, -66], look: [-P / 2, 2.2, -20] },
      metro2:    { pos: [-P / 2 + 10, 2.4, P / 2 + 10], look: [-P / 2 - 2.5, 1.4, P / 2 + 1] },
      vuelo:     { pos: [64, 46, 96], look: [0, 6, 0] }
    }[punto] || { pos: [-9, 2.4, 15], look: [0, 1.6, 0] };
  }

  var ORDER = ['portal', 'plaza', 'bar', 'metro', 'piso', 'azotea', 'churreria', 'calle', 'metro2'];

  L.stages.barrio = function (lesson) {
    if (!window.THREE || !L.hasWebGL()) return L.stages.noche(lesson);

    var root = h('div', { class: 'noche world3d' });
    var host = h('div', { class: 'world-host' });
    root.appendChild(host);
    var loading = h('div', { class: 'world-loading', text: 'Madrid se despierta …' });
    root.appendChild(loading);
    var hint = h('div', { class: 'world-hint', text: 'arrastra para mirar' });
    root.appendChild(hint);

    var W, city, rnd = B.seeded(20260914);
    var timeTween = null;

    function ensureWorld() {
      if (W) return;
      W = L.World(host, {
        fov: 55, fogNear: 110, fogFar: 340, shadows: true, sunPath: { azimuth: -0.55 },
        /* fünf Stufen: Abendrot → Dämmerung → Nacht → tiefe Nacht → erstes Grau um halb sechs */
        palette: {
          top: ['#5b74b8', '#34386a', '#161c3e', '#090b18', '#1c2440'],
          mid: ['#dfa07a', '#8a5a7a', '#2c2856', '#10142a', '#3a4262'],
          low: ['#f6cf95', '#d98a6a', '#4e3a5a', '#1a1e36', '#7a6f80'],
          sun: ['#ffe4bf', '#ffb07a', '#8a7ab0', '#4a5a8a', '#8a9ab8'],
          amb: ['#a9c2ff', '#8a7aa8', '#3d4d80', '#202848', '#4a5a80']
        }
      });
      city = buildCity(W, rnd);
      /* Fenster-Lichter, Laternen, Läden reagieren auf die Zeit */
      var lastF = -1;
      W.onTime = function (t, day) {
        var f = Math.pow(Math.max(0, Math.min(1, (t - 0.04) / 0.5)), 0.9) * 0.88;
        if (t > 0.85) f *= 1 - (t - 0.85) * 3;                        // gegen Morgen gehen Lichter aus
        if (Math.abs(f - lastF) > 0.01) {
          lastF = f;
          var dark = new W.T.Color('#0f1420');
          for (var i = 0; i < city.winCount; i++) city.wins.setColorAt(i, city.thresholds[i] < f ? city.litColors[i] : dark);
          city.wins.instanceColor.needsUpdate = true;
        }
        var lamps = Math.max(0, Math.min(1, (t - 0.25) / 0.2));
        city.lantMat.emissiveIntensity = lamps * 2.2;
        city.lights.forEach(function (pl) { pl.intensity = lamps * 40; });
        city.glow.forEach(function (m) { m.emissiveIntensity = 0.15 + lamps * 1.4; });
      };
      W.setTime(0);
      W.jumpTo(camFor('vuelo', city).pos, camFor('vuelo', city).look);
      W.tick(function (dt) {
        if (timeTween) {
          timeTween.k += dt / timeTween.dur;
          var k = Math.min(1, timeTween.k), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
          W.setTime(timeTween.a + (timeTween.b - timeTween.a) * e);
          if (k >= 1) timeTween = null;
        }
      });
      W.snapTime = snapTime;
      W.start();
      setTimeout(function () { loading.classList.add('weg'); }, 350);
      setTimeout(function () { loading.remove(); }, 1300);
    }

    function tweenTime(t, dur) { timeTween = { a: W.time, b: t, k: 0, dur: dur || 2.6 }; }
    function snapTime() { if (timeTween) { W.setTime(timeTween.b); timeTween = null; } }

    ensureWorld();
    L.ambience.start('madrid');

    L.nocheDialogo(lesson, root, {
      onPortada: function () {
        tweenTime(0, 1);
        W.flyTo([38, 34, 62], [0, 4, 0], 9);
      },
      onScene: function (i, t, e) {
        var punto = e.punto || ORDER[i] || 'plaza';
        var c = camFor(punto, city);
        tweenTime(t * 0.8, 2.8);
        W.flyTo(c.pos, c.look, i === 0 ? 3.2 : 2.6).then(function () {
          if (punto === 'calle') W.flyTo([c.pos[0], c.pos[1], c.pos[2] + 30], [c.look[0], c.look[1], c.look[2] + 30], 90);
        });
        hint.style.opacity = i < 2 ? '1' : '0';
      },
      onFinal: function () {
        tweenTime(1, 6);                                   // amanece
        W.flyTo([-30, 40, 60], [0, 4, 0], 14);
      }
    });
    return root;
  };

})(window.LEKTION);
