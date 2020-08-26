import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const animationContainer = () => {
  const canvasContainer = useRef(null);

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
    }
    // Render function
    const render = () => {
      pointLight.color = lerpColor(colors[colorCounter], colors[(colorCounter  +1) % colors.length], Math.min(1, sceneCounter/maxCounter));
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
      camera.position.y += (- mouseY - camera.position.y) * 0.005;
      camera.lookAt(scene.position);
      group.rotation.x = rx;
      group.rotation.y = ry;
      group.rotation.z = rz;
      renderer.render(scene, camera);
    }

    // Animation function
    const animate = () => {
      requestRef = requestAnimationFrame(animate);
      render();
    }

    // mouseMove function
    const onDocumentMouseMove = (e) => {
      mouseX = (e.clientX - windowHalfX) * 2;
      mouseY = (e.clientY - windowHalfY) * 2;
    }

    // Setup
    let camera, scene, renderer, stats, group;
    let mouseX = 0, mouseY = 0;
    let wX = window.innerWidth * 6;
    let wY = window.innerHeight * 6;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;
    scene = new THREE.Scene();
    group = new THREE.Group();
    for ( let i = 0; i < 1000; i ++ ) {
      let geometry = new THREE.BoxBufferGeometry(Math.random() * 300 + 100, Math.random() * 300 + 100, Math.random() * 300 + 100);
      let material = new THREE.MeshLambertMaterial({
        color: 0xff5566
      });
      const gray = Math.random()/12;
      const r = (Math.random() + 1)/2;
      const g = (Math.random() + 1)/2;
      const b = (Math.random() + 1)/2;
      material.color.setRGB(gray, gray, gray);
      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * wX - (wX/2);
      mesh.position.y = Math.random() * wY - (wY/2);
      mesh.position.z = Math.random() * wX - (wX/2);
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      group.add(mesh);
    }
    scene.add(group);
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
    let pointLight = new THREE.PointLight(colors[0], 1);
    scene.add(pointLight);
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.current.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove);

    let requestRef = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef);
      document.removeEventListener('mousemove', onDocumentMouseMove);
    }
  }, []);
  return (
    <div className="Three__container" ref={canvasContainer}>
    </div>
  )
}

export default animationContainer;
