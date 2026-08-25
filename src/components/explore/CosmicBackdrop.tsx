"use client";

import { useEffect, useRef } from "react";
import styles from "./explore.module.css";

const MAX_ROTATE_X = 0.75;
const MAX_ROTATE_Y = 1.05;
const MAX_SHIFT_X = 10;
const MAX_SHIFT_Y = 8;
const EASING = 0.075;

export function CosmicBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;

    if (
      !backdrop ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId = 0;

    const render = () => {
      currentX += (targetX - currentX) * EASING;
      currentY += (targetY - currentY) * EASING;

      backdrop.style.transform = [
        "perspective(1400px)",
        "translate3d(" +
          currentX * MAX_SHIFT_X +
          "px, " +
          currentY * MAX_SHIFT_Y +
          "px, 0)",
        "rotateX(" + -currentY * MAX_ROTATE_X + "deg)",
        "rotateY(" + currentX * MAX_ROTATE_Y + "deg)",
        "scale(1.075)",
      ].join(" ");

      const stillMoving =
        Math.abs(targetX - currentX) > 0.0005 ||
        Math.abs(targetY - currentY) > 0.0005;

      frameId = stillMoving ? window.requestAnimationFrame(render) : 0;
    };

    const requestRender = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = (event.clientY / window.innerHeight) * 2 - 1;
      requestRender();
    };

    const resetPosition = () => {
      targetX = 0;
      targetY = 0;
      requestRender();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", resetPosition);
    document.documentElement.addEventListener("mouseleave", resetPosition);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetPosition);
      document.documentElement.removeEventListener("mouseleave", resetPosition);
    };
  }, []);

  return (
    <div ref={backdropRef} className={styles.cosmicBackdrop} aria-hidden="true">
      <div className={styles.cosmicBackdropImage} />
      <div className={styles.distantStars} />
    </div>
  );
}
