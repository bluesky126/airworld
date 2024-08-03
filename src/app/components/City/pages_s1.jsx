'use client'
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer } from 'three';

const City = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Load GLTF Models
    const loader = new GLTFLoader();
    const buildingFiles = [
      '/models/Sirine_Building.glb',
      '/models/Nike_Building.glb',
      '/models/BMW_Building.glb',
      '/models/Uniqlo_Building.glb',
      '/models/Bag_store_Building.glb',
      '/models/Bank_Building.glb',
      '/models/Clocksmith_Building.glb',
      '/models/General_Building.glb',
      '/models/Tape_Building.glb',
    ];

    // Add Buildings with Different Textures and Positions
    const buildingPositions = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ];

    buildingFiles.forEach((file, index) => {
      loader.load(file, (gltf) => {
        const building = gltf.scene;
        building.position.set(buildingPositions[index].x, buildingPositions[index].y, buildingPositions[index].z);
        // building.scale.set(1, 1, 1);
        // building.rotation.y = Math.PI / 4; // Example rotation
        scene.add(building);
      });
    });

    const airbaloonFiles = [
      '/models/Ballon_A.glb',
      '/models/Ballon_B.glb',
      '/models/Ballon_C.glb',
    ];

    // Add Buildings with Different Textures and Positions
    const airbaloonPositions = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ];

    airbaloonFiles.forEach((file, index) => {
      loader.load(file, (gltf) => {
        const airbaloon = gltf.scene;
        airbaloon.position.set(airbaloonPositions[index].x, airbaloonPositions[index].y, airbaloonPositions[index].z);
        // building.scale.set(1, 1, 1);
        // building.rotation.y = Math.PI / 4; // Example rotation
        scene.add(airbaloon);
      });
    });

    // Add road
    loader.load('/models/jalan.glb', (gltf) => {
      const road = gltf.scene;
      road.position.set(0, 0, 0); // Adjust position as needed
      scene.add(road);
    });

    // const mascotGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    // const mascotMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    // const mascot = new THREE.Mesh(mascotGeometry, mascotMaterial);
    // scene.add(mascot);

    // Add mascot
    let mascot;
    loader.load('/models/Air_Citizen_Flying.glb', (gltf) => {
      mascot = gltf.scene;
      scene.add(mascot);
    });

    camera.position.set(0, 5, 10); // Initial camera position

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional: Adds a slight delay to the controls
    controls.dampingFactor = 0.25; // Optional: Sets the damping factor
    controls.enableZoom = true; // Optional: Enables zooming
    controls.minPolarAngle = Math.PI / 4; // Minimum angle to look down
    controls.maxPolarAngle = Math.PI / 2; // Maximum angle to look up (down to the horizon)
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate mascot around the city
      if (mascot) {
        const time = Date.now() * 0.001;
        mascot.position.x = Math.sin(time) * 3;
        mascot.position.y = 4;
        mascot.position.z = Math.cos(time) * 3;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();


    // return () => {
    //   mountRef.current.removeChild(renderer.domElement);
    // };
    return () => {
      // Ensure the DOM element exists before attempting to remove it
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      // Clean up resources
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default City;