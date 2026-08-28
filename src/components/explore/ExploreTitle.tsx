"use client";

import { Fjalla_One } from "next/font/google";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./explore.module.css";

const fjallaOne = Fjalla_One({
  variable: "--font-fjalla-one",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type LetterMotion = {
  scale: number;
  scaleVelocity: number;
  x: number;
  xVelocity: number;
  y: number;
  yVelocity: number;
  targetScale: number;
  targetX: number;
  targetY: number;
};

export function ExploreTitle() {
  const lettersRef = useRef<Array<HTMLSpanElement | null>>([]);
  const motionsRef = useRef<LetterMotion[]>([]);
  const frameRef = useRef<number | null>(null);
  const previousTimeRef = useRef(0);

  const animateLetters = (time: number) => {
    const delta = Math.min((time - previousTimeRef.current) / 1000, 0.05);
    previousTimeRef.current = time;
    const springStrength = 100;
    const springDamping = Math.exp(-20 * delta);
    let moving = false;

    motionsRef.current.forEach((motion, index) => {
      motion.scaleVelocity +=
        (motion.targetScale - motion.scale) * springStrength * delta;
      motion.xVelocity +=
        (motion.targetX - motion.x) * springStrength * delta;
      motion.yVelocity +=
        (motion.targetY - motion.y) * springStrength * delta;

      motion.scaleVelocity *= springDamping;
      motion.xVelocity *= springDamping;
      motion.yVelocity *= springDamping;

      motion.scale += motion.scaleVelocity * delta;
      motion.x += motion.xVelocity * delta;
      motion.y += motion.yVelocity * delta;

      const letter = lettersRef.current[index];
      if (letter) {
        letter.style.setProperty(
          "--title-letter-scale",
          motion.scale.toFixed(4),
        );
        letter.style.setProperty(
          "--title-letter-x",
          `${motion.x.toFixed(2)}px`,
        );
        letter.style.setProperty(
          "--title-letter-y",
          `${motion.y.toFixed(2)}px`,
        );
      }

      moving ||=
        Math.abs(motion.targetScale - motion.scale) > 0.0002 ||
        Math.abs(motion.targetX - motion.x) > 0.015 ||
        Math.abs(motion.targetY - motion.y) > 0.015 ||
        Math.abs(motion.scaleVelocity) > 0.001 ||
        Math.abs(motion.xVelocity) > 0.015 ||
        Math.abs(motion.yVelocity) > 0.015;
    });

    if (moving) {
      frameRef.current = window.requestAnimationFrame(animateLetters);
    } else {
      frameRef.current = null;
    }
  };

  const startAnimation = () => {
    if (frameRef.current !== null) return;

    previousTimeRef.current = performance.now();
    frameRef.current = window.requestAnimationFrame(animateLetters);
  };

  useEffect(() => {
    const motions = motionsRef.current;
    lettersRef.current.forEach((_, index) => {
      motions[index] = {
        scale: 1,
        scaleVelocity: 0,
        x: 0,
        xVelocity: 0,
        y: 0,
        yVelocity: 0,
        targetScale: 1,
        targetX: 0,
        targetY: 0,
      };
    });

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const updateLetters = (
    event: ReactPointerEvent<HTMLHeadingElement>,
  ) => {
    const title = event.currentTarget;
    const bounds = title.getBoundingClientRect();
    const localX =
      ((event.clientX - bounds.left) / bounds.width) * title.offsetWidth;
    const localY =
      ((event.clientY - bounds.top) / bounds.height) * title.offsetHeight;

    lettersRef.current.forEach((letter, index) => {
      if (!letter) return;

      const motion = motionsRef.current[index];
      if (!motion) return;

      const deltaX = letter.offsetLeft + letter.offsetWidth / 2 - localX;
      const deltaY = letter.offsetTop + letter.offsetHeight / 2 - localY;
      const distance = Math.hypot(deltaX, deltaY);
      const influence = Math.exp(-(distance * distance) / (2 * 150 * 150));
      const directionX = distance > 0 ? deltaX / distance : 0;
      const directionY = distance > 0 ? deltaY / distance : 0;

      motion.targetScale = 1 + influence * 0.052;
      motion.targetX = directionX * influence * 0.7;
      motion.targetY = directionY * influence * 0.3;
    });

    startAnimation();
  };

  const resetLetters = () => {
    motionsRef.current.forEach((motion) => {
      motion.targetScale = 1;
      motion.targetX = 0;
      motion.targetY = 0;
    });
    startAnimation();
  };

  return (
    <h1
      className={`${styles.exploreTitle} ${fjallaOne.variable}`}
      aria-label="ThoughtUniverse"
      onPointerEnter={updateLetters}
      onPointerMove={updateLetters}
      onPointerLeave={resetLetters}
    >
      <span className={styles.exploreTitleLetters} aria-hidden="true">
        {Array.from("ThoughtUniverse").map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            ref={(element) => {
              lettersRef.current[index] = element;
            }}
            className={styles.exploreTitleLetter}
            data-letter={letter}
            style={
              {
                "--title-letter-scale": 1,
                "--title-letter-x": "0px",
                "--title-letter-y": "0px",
              } as CSSProperties
            }
          >
            {letter}
          </span>
        ))}
      </span>
    </h1>
  );
}
