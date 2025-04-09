import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/CLTVisualization.css';

const CLTVisualization = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    console.log("CLT Visualization mounting"); // Debug log
    
    // --- Configuration ---
    const numSamples = 700;
    const sampleSize = 30;
    const underlyingMin = 0;
    const underlyingMax = 10;
    const ballRadius = 0.40;
    const startHeight = 20;
    const viewportBottom = -14.3;
    const horizontalSpreadFactor = 18.5;
    const binWidthMultiplier = 2.05;

    // Physics
    const gravity = 0.03;
    const bounceFactor = 0.25;
    const frictionFactor = 0.96;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    // Using a darker, more professional blue-gray background
    scene.background = new THREE.Color(0x111827);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 25);
    camera.lookAt(0, 0, 0);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Reduced intensity for less shininess
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5); // Softer light
    directionalLight1.position.set(1, 2, 1.5);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0x94a3b8, 0.3); // More muted color
    directionalLight2.position.set(-1.5, -1, 1);
    scene.add(directionalLight2);

    // --- CLT Simulation ---
    const sampleMeans = [];
    const expectedMean = (underlyingMin + underlyingMax) / 2;
    
    function getRandomFromUnderlying() {
      return Math.random() * (underlyingMax - underlyingMin) + underlyingMin;
    }
    
    for (let i = 0; i < numSamples; i++) {
      let currentSampleSum = 0;
      for (let j = 0; j < sampleSize; j++) {
        currentSampleSum += getRandomFromUnderlying();
      }
      sampleMeans.push(currentSampleSum / sampleSize);
    }

    // --- Stacking Logic & Ball Creation ---
    const balls = [];
    const ballMeshes = []; // Separate array for raycasting targets
    const ballGeometry = new THREE.SphereGeometry(ballRadius, 16, 16);
    
    // Stores { binX: { count: number, x: number, maxY: number } }
    const stacks = {};
    const stackCurrentHeight = {};
    const binWidth = ballRadius * binWidthMultiplier;

    // Determine target positions and stack info
    sampleMeans.forEach((mean, index) => {
      const targetXRaw = (mean - expectedMean) * horizontalSpreadFactor;
      const targetXBin = Math.round(targetXRaw / binWidth) * binWidth;

      if (!stacks[targetXBin]) {
        stacks[targetXBin] = { count: 0, x: targetXBin, maxY: viewportBottom }; // Initialize maxY
        stackCurrentHeight[targetXBin] = 0;
      }

      const stackHeightIndex = stackCurrentHeight[targetXBin];
      stackCurrentHeight[targetXBin]++;

      const targetY = viewportBottom + ballRadius + (stackHeightIndex * ballRadius * 2.02);

      // Update maxY for this bin if current ball is higher
      stacks[targetXBin].maxY = Math.max(stacks[targetXBin].maxY, targetY + ballRadius); // Use top of the ball

      // Use MeshStandardMaterial instead of MeshLambertMaterial for more realistic, less shiny look
      const ballMaterial = new THREE.MeshStandardMaterial({
        roughness: 0.8, // Higher roughness = less shiny
        metalness: 0.1, // Lower metalness = less reflective
      });
      
      const ball = new THREE.Mesh(ballGeometry, ballMaterial);

      ball.position.x = targetXBin + (Math.random() - 0.5) * binWidth * 0.1;
      ball.position.y = startHeight + (index * 0.02);
      ball.position.z = (Math.random() - 0.5) * ballRadius;

      // --- Enhanced COLOR LOGIC with more professional palette ---
      // Use a blue-to-purple gradient for a more professional look
      const maxDist = Object.keys(stacks).reduce((max, key) => Math.max(max, Math.abs(stacks[key].x)), 0);
      const distFromCenter = maxDist > 0 ? Math.min(1, Math.abs(targetXBin) / (maxDist + binWidth)) : 0;
      
      // Shift from blue (center) to purple (edges)
      const hue = 0.6 - distFromCenter * 0.1; // 0.6 is blue, slightly shifting toward purple
      const saturation = 0.5 - distFromCenter * 0.3; // Less saturated at edges
      const lightness = 0.5 + (1 - distFromCenter) * 0.2; // Brighter in center
      
      ball.material.color.setHSL(hue, saturation, lightness);
      
      // Minimal emissive for subtle glow
      ball.material.emissive = new THREE.Color().setHSL(hue, saturation * 0.3, lightness * 0.1);
      ball.material.emissiveIntensity = 0.2;

      scene.add(ball);
      const ballData = {
        mesh: ball,
        velocity: -0.05 - Math.random() * 0.1,
        targetX: targetXBin,
        targetY: targetY,
        radius: ballRadius,
        settled: false,
        isHovered: false // Track hover state
      };
      balls.push(ballData);
      ballMeshes.push(ball); // Add mesh to array for raycasting
      ball.userData = ballData; // Link mesh back to its data object
    });

    // --- Add Stack Visualizers (Planes) ---
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x64748b, // More muted slate color
      transparent: true,
      opacity: 0.08, // Even more subtle
      side: THREE.DoubleSide
    });
    
    const planeGroup = new THREE.Group();
    const sortedBins = Object.keys(stacks).map(Number).sort((a, b) => a - b);
    const planeWidth = 0.05; // Keep planes thin

    sortedBins.forEach(binX => {
      const stackInfo = stacks[binX];
      const stackHeight = stackInfo.maxY - (viewportBottom - ballRadius); // Height from base bottom to highest ball top
      if (stackHeight <= 0) return; // Don't draw plane for empty stacks

      const planeHeight = Math.max(planeWidth, stackHeight); // Ensure minimum height
      const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
      const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

      // Position plane at the left edge of the bin, centered vertically within the stack height
      const planeX = binX - (binWidth / 2);
      const planeY = (viewportBottom - ballRadius) + planeHeight / 2; // Center Y position

      planeMesh.position.set(planeX, planeY, -ballRadius); // Position slightly behind balls
      planeGroup.add(planeMesh);
    });

    // Add plane for the right edge of the last bin
    if (sortedBins.length > 0) {
      const lastBinX = sortedBins[sortedBins.length - 1];
      const stackInfo = stacks[lastBinX];
      const stackHeight = stackInfo.maxY - (viewportBottom - ballRadius);

      if (stackHeight > 0) {
        const planeHeight = Math.max(planeWidth, stackHeight);
        const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        const planeX = lastBinX + (binWidth / 2);
        const planeY = (viewportBottom - ballRadius) + planeHeight / 2;

        planeMesh.position.set(planeX, planeY, -ballRadius);
        planeGroup.add(planeMesh);
      }
    }
    scene.add(planeGroup);

    // --- Mouse Interaction ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredBallData = null;

    function onMouseMove(event) {
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('mousemove', onMouseMove, false);

    // --- Animation Loop ---
    const clock = new THREE.Clock(); // For hover animation timing
    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Raycasting for hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(ballMeshes);

      // Clear previous hover state
      if (hoveredBallData) {
        hoveredBallData.isHovered = false;
      }
      hoveredBallData = null;

      if (intersects.length > 0) {
        // Check only the first intersected object (closest)
        const intersectedMesh = intersects[0].object;
        if (intersectedMesh.userData && intersectedMesh.userData.settled) { // Only hover settled balls
          hoveredBallData = intersectedMesh.userData;
          hoveredBallData.isHovered = true;
        }
      }

      balls.forEach(ball => {
        // --- Physics Simulation (Only if not settled) ---
        if (!ball.settled) {
          ball.velocity -= gravity;
          ball.mesh.position.y += ball.velocity;

          if (ball.mesh.position.y <= ball.targetY) {
            ball.mesh.position.y = ball.targetY;
            if (Math.abs(ball.velocity) > gravity * 1.5) {
              ball.velocity = -ball.velocity * bounceFactor * frictionFactor;
            } else {
              ball.velocity = 0;
              ball.settled = true;
              ball.mesh.position.x = ball.targetX; // Final snap
              ball.mesh.position.z = 0; // Ensure Z is zeroed when settled
            }
          }

          if (!ball.settled) {
            const dy = Math.max(0.01, ball.mesh.position.y - ball.targetY);
            const dx = ball.targetX - ball.mesh.position.x;
            const correctionFactor = Math.min(0.1, Math.abs(dx) / (dy * 5 + 1));
            ball.mesh.position.x += dx * correctionFactor;
          }
        }
        // --- Hover Animation & Reset (Only if settled) ---
        else { // Ball is settled
          const hoverAmplitude = ball.radius * 0.15; // How much it moves
          const hoverSpeed = 5;

          if (ball.isHovered) {
            // Apply oscillating offset for jiggle effect
            const hoverOffsetX = Math.sin(elapsedTime * hoverSpeed) * hoverAmplitude;
            const hoverOffsetY = Math.cos(elapsedTime * hoverSpeed * 0.5) * hoverAmplitude;

            ball.mesh.position.x = ball.targetX + hoverOffsetX;
            ball.mesh.position.y = ball.targetY + hoverOffsetY;
          } else {
            // Smoothly return to target position if not hovered
            const returnSpeed = 8 * deltaTime;
            ball.mesh.position.x += (ball.targetX - ball.mesh.position.x) * returnSpeed;
            ball.mesh.position.y += (ball.targetY - ball.mesh.position.y) * returnSpeed;
            ball.mesh.position.z += (0 - ball.mesh.position.z) * returnSpeed;

            // Snap to target if very close to avoid tiny oscillations
            if (Math.abs(ball.mesh.position.x - ball.targetX) < 0.001 &&
                Math.abs(ball.mesh.position.y - ball.targetY) < 0.001) {
              ball.mesh.position.x = ball.targetX;
              ball.mesh.position.y = ball.targetY;
              ball.mesh.position.z = 0;
            }
          }
        }
      });

      renderer.render(scene, camera);
    }

    // --- Handle Window Resize ---
    function handleResize() {
      if (!mountRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', handleResize);

    // --- Start Animation ---
    animate();

    // Clean up function
    return () => {
      console.log("CLT Visualization unmounting"); // Debug log
      
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      
      // Cancel animation frame
      cancelAnimationFrame(animationFrameId);
      
      // Clean up scene
      scene.clear();
      
      // Clean up renderer
      renderer.dispose();
      
      // Remove canvas from DOM
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="clt-visualization" />;
};

export default CLTVisualization;