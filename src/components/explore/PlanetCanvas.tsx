"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styles from "./explore.module.css";

const MODEL_PATH = "/explore/models/dark-planet.glb";

function createMoonMaterial(sourceMaterial: THREE.Material) {
  const sourceMap = "map" in sourceMaterial
    ? (sourceMaterial.map as THREE.Texture | null)
    : null;
  const material = new THREE.MeshBasicMaterial({
    color: sourceMap ? 0xffffff : 0xc8c9cd,
    map: sourceMap,
  });

  material.toneMapped = false;

  if (sourceMap) {
    material.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <map_fragment>",
        `#include <map_fragment>
        float sourceLuminance = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
        float moonLuminance = clamp(0.38 + sourceLuminance * 0.72, 0.38, 0.72);
        diffuseColor.rgb = vec3(moonLuminance);`,
      );
    };
    material.customProgramCacheKey = () => "thoughtuniverse-moon-material-v2";
  }

  return material;
}

export function PlanetCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 3.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.domElement.className = styles.canvas;
    container.appendChild(renderer.domElement);

    const planetRoot = new THREE.Group();
    planetRoot.rotation.set(-0.07, -0.35, 0);
    scene.add(planetRoot);

    let loadedModel: THREE.Object3D | null = null;
    let frameId = 0;
    let disposed = false;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();

      if (width === 0 || height === 0) {
        return;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const loader = new GLTFLoader();
    loader.load(
      MODEL_PATH,
      (gltf) => {
        if (disposed) {
          return;
        }

      loadedModel = gltf.scene;

      loadedModel.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) {
          return;
        }

        const hasMaterialArray = Array.isArray(child.material);
        const sourceMaterials = hasMaterialArray ? child.material : [child.material];
        const moonMaterials = sourceMaterials.map(createMoonMaterial);
        child.material = hasMaterialArray ? moonMaterials : moonMaterials[0];
      });

      const initialBounds = new THREE.Box3().setFromObject(loadedModel);
      const initialSize = initialBounds.getSize(new THREE.Vector3());
      const largestDimension = Math.max(initialSize.x, initialSize.y, initialSize.z);
      const normalizedScale = largestDimension > 0 ? 2.15 / largestDimension : 1;

      loadedModel.scale.setScalar(normalizedScale);

      const normalizedBounds = new THREE.Box3().setFromObject(loadedModel);
      const center = normalizedBounds.getCenter(new THREE.Vector3());
      loadedModel.position.sub(center);
        planetRoot.add(loadedModel);
      },
      undefined,
      (error) => {
        console.error("Unable to load the planet model", error);
      },
    );

    const render = () => {
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();

      loadedModel?.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) {
          return;
        }

        child.geometry.dispose();
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => material.dispose());
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.planetCanvas}
      role="img"
      aria-label="Moon-colored planet"
    />
  );
}
