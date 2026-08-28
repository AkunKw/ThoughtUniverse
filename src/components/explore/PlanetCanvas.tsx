"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./explore.module.css";

const COLOR_MAP_PATH = "/explore/textures/moon-lro-surface-4k.webp";
const HEIGHT_MAP_PATH = "/explore/textures/moon-lola-height.png";
const RESTING_ROTATION = { x: -0.07, y: -0.35 };
const PLANET_HIT_RADIUS = 0.96;
const EDGE_BLEND_WIDTH = 0.14;
const EDGE_CONTACT_PRESSURE = 0.16;
const MOON_RADIUS_METERS = 1_737_400;
const HEIGHT_ZERO_LEVEL = 20_000;
const HEIGHT_UNITS_PER_METER = 2;
const HEIGHT_BYTE_RANGE = 257;
const RELIEF_EXAGGERATION = 1.35;

function configureTexture(
  texture: THREE.Texture,
  maxAnisotropy: number,
  colorSpace: THREE.ColorSpace,
) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = maxAnisotropy;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = colorSpace;
}

function createMoonGeometry(heightMap: THREE.Texture) {
  const geometry = new THREE.SphereGeometry(1, 320, 160);
  const image = heightMap.image as HTMLImageElement;
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;

  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return geometry;
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const positions = geometry.attributes.position;
  const uvs = geometry.attributes.uv;
  const direction = new THREE.Vector3();

  for (let index = 0; index < positions.count; index += 1) {
    const pixelX = Math.min(
      canvas.width - 1,
      Math.max(0, Math.round(uvs.getX(index) * (canvas.width - 1))),
    );
    const pixelY = Math.min(
      canvas.height - 1,
      Math.max(0, Math.round((1 - uvs.getY(index)) * (canvas.height - 1))),
    );
    const heightValue = pixels[(pixelY * canvas.width + pixelX) * 4];
    const elevationMeters =
      (heightValue * HEIGHT_BYTE_RANGE - HEIGHT_ZERO_LEVEL) /
      HEIGHT_UNITS_PER_METER;
    const radius =
      1 +
      (elevationMeters / MOON_RADIUS_METERS) * RELIEF_EXAGGERATION;

    direction
      .set(positions.getX(index), positions.getY(index), positions.getZ(index))
      .normalize()
      .multiplyScalar(radius);
    positions.setXYZ(index, direction.x, direction.y, direction.z);
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

export function PlanetCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 3.6);

    const ambientLight = new THREE.HemisphereLight(0xcbd0d7, 0x08090c, 0.62);
    const keyLight = new THREE.DirectionalLight(0xfaf9f5, 2.3);
    keyLight.position.set(3.4, 3.2, 4.8);
    const fillLight = new THREE.DirectionalLight(0xd2d6dd, 0.46);
    fillLight.position.set(-3, -1.4, 3);
    const rimLight = new THREE.DirectionalLight(0xb5bfcc, 0.13);
    rimLight.position.set(2.6, 2.2, -3.2);
    scene.add(ambientLight, keyLight, fillLight, rimLight);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      Math.min(Math.max(window.devicePixelRatio, 1.5), 2),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.domElement.className = styles.canvas;
    container.appendChild(renderer.domElement);

    const maxAnisotropy = Math.min(
      renderer.capabilities.getMaxAnisotropy(),
      16,
    );
    const textureLoader = new THREE.TextureLoader();
    const planetRoot = new THREE.Group();
    planetRoot.rotation.set(RESTING_ROTATION.x, RESTING_ROTATION.y, 0);
    scene.add(planetRoot);

    let moonMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> | null =
      null;
    let colorMap: THREE.Texture | null = null;
    let heightMap: THREE.Texture | null = null;
    let frameId = 0;
    let disposed = false;
    let targetRotationX = RESTING_ROTATION.x;
    let targetRotationY = RESTING_ROTATION.y;
    let targetScale = 1;

    const resetInteraction = () => {
      targetRotationX = RESTING_ROTATION.x;
      targetRotationY = RESTING_ROTATION.y;
      targetScale = 1;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion) {
        return;
      }

      const bounds = container.getBoundingClientRect();
      const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      const distanceFromCenter = Math.hypot(normalizedX, normalizedY);

      if (distanceFromCenter > PLANET_HIT_RADIUS) {
        resetInteraction();
        return;
      }

      const contactDepth = PLANET_HIT_RADIUS - distanceFromCenter;
      const pressure =
        EDGE_CONTACT_PRESSURE +
        (1 - EDGE_CONTACT_PRESSURE) *
          THREE.MathUtils.smoothstep(contactDepth, 0, EDGE_BLEND_WIDTH);

      targetRotationX =
        RESTING_ROTATION.x + normalizedY * 0.04 * pressure;
      targetRotationY =
        RESTING_ROTATION.y + normalizedX * 0.06 * pressure;
      targetScale = 1 + pressure * 0.009;
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();

      if (width === 0 || height === 0) {
        return;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    Promise.all([
      textureLoader.loadAsync(COLOR_MAP_PATH),
      textureLoader.loadAsync(HEIGHT_MAP_PATH),
    ])
      .then(([loadedColorMap, loadedHeightMap]) => {
        if (disposed) {
          loadedColorMap.dispose();
          loadedHeightMap.dispose();
          return;
        }

        colorMap = loadedColorMap;
        heightMap = loadedHeightMap;
        configureTexture(colorMap, maxAnisotropy, THREE.SRGBColorSpace);
        configureTexture(heightMap, maxAnisotropy, THREE.NoColorSpace);

        const geometry = createMoonGeometry(heightMap);
        const material = new THREE.MeshStandardMaterial({
          color: 0xb8b8b5,
          map: colorMap,
          bumpMap: heightMap,
          bumpScale: 0.027,
          roughness: 1,
          metalness: 0,
          dithering: true,
        });

        moonMesh = new THREE.Mesh(geometry, material);
        moonMesh.scale.setScalar(1.075);
        planetRoot.add(moonMesh);
      })
      .catch((error: unknown) => {
        console.error("Unable to load the Moon surface", error);
      });

    let previousTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      const rotationEase = 1 - Math.exp(-11 * delta);
      const scaleEase = 1 - Math.exp(-12 * delta);

      planetRoot.rotation.x = THREE.MathUtils.lerp(
        planetRoot.rotation.x,
        targetRotationX,
        rotationEase,
      );
      planetRoot.rotation.y = THREE.MathUtils.lerp(
        planetRoot.rotation.y,
        targetRotationY,
        rotationEase,
      );

      const nextScale = THREE.MathUtils.lerp(
        planetRoot.scale.x,
        targetScale,
        scaleEase,
      );
      planetRoot.scale.setScalar(nextScale);

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", resetInteraction);
    window.addEventListener("blur", resetInteraction);
    resize();
    frameId = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", resetInteraction);
      window.removeEventListener("blur", resetInteraction);

      if (moonMesh) {
        moonMesh.geometry.dispose();
        moonMesh.material.dispose();
      }

      colorMap?.dispose();
      heightMap?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.planetCanvas}
      role="img"
      aria-label="Interactive photorealistic Moon"
    />
  );
}
