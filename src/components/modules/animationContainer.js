import { useRef, useEffect } from 'react';
import * as THREE from 'three';

let perlin = {
  rand_vect: function () {
    let theta = Math.random() * 2 * Math.PI;
    return { x: Math.cos(theta), y: Math.sin(theta) };
  },
  dot_prod_grid: function (x, y, vx, vy) {
    let g_vect;
    let d_vect = { x: x - vx, y: y - vy };
    if (this.gradients[[vx, vy]]) {
      g_vect = this.gradients[[vx, vy]];
    } else {
      g_vect = this.rand_vect();
      this.gradients[[vx, vy]] = g_vect;
    }
    return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
  },
  smootherstep: function (x) {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
  },
  interp: function (x, a, b) {
    return a + this.smootherstep(x) * (b - a);
  },
  seed: function () {
    this.gradients = {};
    this.memory = {};
  },
  get: function (x, y) {
    if (this.memory.hasOwnProperty([x, y])) return this.memory[[x, y]];
    let xf = Math.floor(x);
    let yf = Math.floor(y);
    //interpolate
    let tl = this.dot_prod_grid(x, y, xf, yf);
    let tr = this.dot_prod_grid(x, y, xf + 1, yf);
    let bl = this.dot_prod_grid(x, y, xf, yf + 1);
    let br = this.dot_prod_grid(x, y, xf + 1, yf + 1);
    let xt = this.interp(x - xf, tl, tr);
    let xb = this.interp(x - xf, bl, br);
    let v = this.interp(y - yf, xt, xb);
    this.memory[[x, y]] = v;
    return v;
  }
};
perlin.seed();

const animationContainer = () => {
  const canvasContainer = useRef(null);
  const canvasGridRef = useRef(null);
  const canvasGridCtx = useRef(null);

  useEffect(() => {
    let sceneCounter = 0;
    let maxCounter = 100;
    let colorCounter = 0;
    const colors = [
      {
        r: 1.0,
        g: 1.0,
        b: 1.0
      },
      {
        r: 0.8,
        g: 1.0,
        b: 1.0
      },
      {
        r: 1.0,
        g: 1.0,
        b: 0.8
      },
      {
        r: 1.0,
        g: 0.8,
        b: 1.0
      },
      {
        r: 1.0,
        g: 0.8,
        b: 0.8
      },
      {
        r: 0.8,
        g: 1.0,
        b: 0.8
      },
      {
        r: 0.8,
        g: 0.8,
        b: 1.0
      }
    ];
    const lerpColor = (start, stop, t) => {
      return {
        r: start.r * (1 - t) + stop.r * t,
        g: start.g * (1 - t) + stop.g * t,
        b: start.b * (1 - t) + stop.b * t
      };
    };
    // Render function
    const render = () => {
      pointLight.color = lerpColor(
        colors[colorCounter],
        colors[(colorCounter + 1) % colors.length],
        Math.min(1, sceneCounter / maxCounter)
      );
      pointLight.color = { r: 0.25, g: 0.25, b: 0.25 };
      sceneCounter++;
      if (sceneCounter > maxCounter) {
        sceneCounter = 0;
        colorCounter = (colorCounter + 1) % colors.length;
      }
      let time = Date.now() * 0.001;
      let rx = Math.sin(time * 0.7) * 0.05,
        ry = Math.sin(time * 0.3) * 0.05,
        rz = Math.sin(time * 0.2) * 0.05;
      camera.position.x += (mouseX - camera.position.x) * 0.005;
      camera.position.y += (-mouseY - camera.position.y) * 0.005;
      camera.lookAt(scene.position);
      group.rotation.x = rx;
      group.rotation.y = ry;
      group.rotation.z = rz;
      renderer.render(scene, camera);
    };

    // Animation function
    const animate = () => {
      requestRef = requestAnimationFrame(animate);
      render();
      // Draw grid
      // canvasGridCtx.current.clearRect(
      //   0,
      //   0,
      //   canvasGridRef.current.width,
      //   canvasGridRef.current.height
      // );
      // canvasGridCtx.current.strokeStyle = '#eeeeee';
      // canvasGridCtx.current.lineWidth = 1;
      // let numLines = 50;
      // for (let x = 0; x < numLines; x++) {
      //   let noisey = perlin.get(x, Math.sin(Date.now()/1000)) * 10;
      //   canvasGridCtx.current.beginPath(); // Start a new path
      //   canvasGridCtx.current.moveTo(
      //     (canvasGridRef.current.width / numLines) * (x + 1) + noisey,
      //     0
      //   );
      //   canvasGridCtx.current.lineTo(
      //     (canvasGridRef.current.width / numLines) * (x + 1) + noisey,
      //     canvasGridRef.current.height
      //   );
      //   canvasGridCtx.current.stroke();
      // }
      // for (let y = 0; y < numLines; y++) {
      //   let noisey = perlin.get(Math.cos(Date.now()/1000), y) * 10;
      //   canvasGridCtx.current.beginPath(); // Start a new path
      //   canvasGridCtx.current.moveTo(
      //     0,
      //     (canvasGridRef.current.height / numLines) * (y + 1) + noisey
      //   );
      //   canvasGridCtx.current.lineTo(
      //     canvasGridRef.current.width,
      //     (canvasGridRef.current.height / numLines) * (y + 1) + noisey
      //   );
      //   canvasGridCtx.current.stroke();
      // }
    };

    // mouseMove function
    const onDocumentMouseMove = (e) => {
      mouseX = (e.clientX - windowHalfX) * 2;
      mouseY = (e.clientY - windowHalfY) * 2;
    };

    const onWindowResize = () => {
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Setup
    let camera, scene, renderer, stats, group;
    let mouseX = 0,
      mouseY = 0;
    let wX = window.innerWidth * 6;
    let wY = window.innerHeight * 6;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 500;
    scene = new THREE.Scene();
    group = new THREE.Group();
    for (let i = 0; i < 1000; i++) {
      let geometry = new THREE.BoxBufferGeometry(
        Math.random() * 300 + 100,
        Math.random() * 300 + 100,
        Math.random() * 300 + 100
      );
      let material = new THREE.MeshLambertMaterial({
        color: 0xffffff
      });
      const gray = Math.random() * 0.125 + 0.875;
      material.color.setRGB(gray, gray, gray);
      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * wX - wX / 2;
      mesh.position.y = Math.random() * wY - wY / 2;
      mesh.position.z = Math.random() * wX - wX / 2;
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      group.add(mesh);
    }
    scene.add(group);
    const light = new THREE.AmbientLight(0xfefefe, 1);
    scene.add(light);
    let pointLight = new THREE.PointLight(0xfefefe, 1);
    scene.add(pointLight);
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.current.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove);
    canvasGridRef.current.width = window.innerWidth;
    canvasGridRef.current.height = window.innerHeight;
    canvasGridCtx.current = canvasGridRef.current.getContext('2d');

    let requestRef = requestAnimationFrame(animate);
    window.addEventListener('resize', onWindowResize);
    return () => {
      cancelAnimationFrame(requestRef);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);
  return (
    <div className="Three__container" ref={canvasContainer}>
      <canvas className="Three__grid-lines-canvas" ref={canvasGridRef}></canvas>
    </div>
  );
};

export default animationContainer;
