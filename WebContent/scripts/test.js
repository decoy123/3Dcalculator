  (function() {
    'use strict';

    var scene;
    var light;
    var ambient;
    var camera;
    var renderer;
    var width = 500;
    var height = 250;
    var controls;

    var count = 200;
    var i;
    var size;
    var box;

    var mouse = new THREE.Vector2(-2, -2);

    // scene ステージ
    scene = new THREE.Scene();

    // light
    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 100, 30);
    scene.add(light);
    ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    // camera
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(200, 100, 300);
    camera.lookAt(scene.position);

    // controls
    controls = new THREE.OrbitControls(camera);
    controls.autoRotate = true;

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xefefef);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('stage').appendChild(renderer.domElement);

    // picking
    for (i = 0; i < count; i++) {
      size = Math.random() * 20 + 10;
      box = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
      );
      box.position.set(
        Math.random() * 200 - 100,
        Math.random() * 200 - 100,
        Math.random() * 200 - 100
      );
      scene.add(box);
    }

    // 1. マウス座標の取得
    document.addEventListener('mousemove', function(e) {
      var rect = e.target.getBoundingClientRect();
      // 2. WebGLの座標系に変換
      mouse.x = (e.clientX - rect.left) / width * 2 - 1;
      mouse.y = (e.clientY - rect.top) / height * -1 * 2 + 1;
    });

    function render() {
      var raycaster = new THREE.Raycaster();
      var objs;

      requestAnimationFrame(render);

      // 3. マウスから3D空間に光線を射出
      raycaster.setFromCamera(mouse, camera);

      // 4. 光線にあたった物体を取得、操作
      objs = raycaster.intersectObjects(scene.children);
      if (objs.length > 0) {
        objs[0].object.material.emissive = new THREE.Color(0x999999);
      }

      controls.update();
      renderer.render(scene, camera);
    }
    render();

  })();