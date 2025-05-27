// three-bg.js - Y-techs 3D Interactive Background (Three.js)
// Minimal, performant 3D scene for hero section

// Only run if canvas exists
const canvas = document.getElementById('bg3d');
if (canvas) {
  // Load Three.js dynamically if not present
  function loadThreeJs(cb) {
    if (window.THREE) return cb();
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.min.js';
    script.onload = cb;
    document.head.appendChild(script);
  }

  loadThreeJs(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Responsive resize
    function onResize() {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    window.addEventListener('resize', onResize);
    onResize();

    // Add animated 3D objects (e.g., floating tech spheres)
    const objects = [];
    const colors = [0x00c9a7, 0xffffff, 0x23233a, 0x1e1e2f];
    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.25 + 0.15, 32, 32);
      const material = new THREE.MeshStandardMaterial({ color: colors[i % colors.length], metalness: 0.5, roughness: 0.4 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2
      );
      scene.add(mesh);
      objects.push(mesh);
    }
    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 0.7);
    dir.position.set(2, 4, 5);
    scene.add(dir);

    // Mouse/touch interactivity
    let mouseX = 0, mouseY = 0;
    function onPointerMove(e) {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      mouseX = (x / window.innerWidth - 0.5) * 2;
      mouseY = (y / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      // Animate objects
      objects.forEach((obj, i) => {
        obj.rotation.x += 0.005 + i * 0.0005;
        obj.rotation.y += 0.007 + i * 0.0007;
        obj.position.x += Math.sin(Date.now() * 0.0005 + i) * 0.0005;
        obj.position.y += Math.cos(Date.now() * 0.0007 + i) * 0.0005;
      });
      // Camera parallax
      camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.7 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    animate();
  });
}
