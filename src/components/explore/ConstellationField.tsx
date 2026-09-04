"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./explore.module.css";

type ConstellationStar = {
  id: string;
  x: number;
  y: number;
  size: number;
};
type StarProps = ConstellationStar;

function Star({ id, x, y, size }: StarProps) {
  const [constellationIndex, starIndex] = id.split("-").map(Number);
  const motionSeed = constellationIndex * 11 + starIndex * 7;

  return (
    <span
      className={styles.constellationStar}
      data-star={id}
      style={
        {
          left: x + "%",
          top: y + "%",
          "--star-size": size + "px",
          "--star-delay": -(motionSeed % 7) * 0.47 + "s",
          "--star-duration": 4.2 + (motionSeed % 5) * 0.38 + "s",
        } as CSSProperties
      }
    />
  );
}


type ConstellationConnection = {
  from: string;
  to: string;
};

type Constellation = {
  id: string;
  stars: ConstellationStar[];
  connections: ConstellationConnection[];
};

const constellations: Constellation[] = [
  {
    id: "constellation-1",
    stars: [
      { id: "1-1", x: 16.872, y: 21.7, size: 32 },
      { id: "1-2", x: 23.338, y: 29.3, size: 24 },
      { id: "1-3", x: 23.216, y: 39.9, size: 26 },
      { id: "1-4", x: 14.92, y: 39.4, size: 34 },
      { id: "1-5", x: 20.166, y: 50.8, size: 32 },
      { id: "1-6", x: 30.292, y: 43.9, size: 28 },
      { id: "1-7", x: 33.83, y: 55.7, size: 36 },
      { id: "1-8", x: 38.1, y: 42.6, size: 28 },
    ],
    connections: [
      { from: "1-1", to: "1-2" },
      { from: "1-2", to: "1-3" },
      { from: "1-3", to: "1-4" },
      { from: "1-4", to: "1-5" },
      { from: "1-5", to: "1-6" },
      { from: "1-6", to: "1-7" },
      { from: "1-7", to: "1-8" },
    ],
  },
  {
    id: "constellation-2",
    stars: [
      { id: "2-1", x: 85.9, y: 18.6, size: 36 },
      { id: "2-2", x: 79.1, y: 31, size: 30 },
      { id: "2-3", x: 90.2, y: 38.9, size: 34 },
      { id: "2-4", x: 83.5, y: 51, size: 24 },
      { id: "2-5", x: 80.6, y: 40.7, size: 34 },
      { id: "2-6", x: 76.9, y: 49.4, size: 28 },
      { id: "2-7", x: 70, y: 41.4, size: 32 },
      { id: "2-8", x: 63.8, y: 50.9, size: 28 },
    ],
    connections: [
      { from: "2-1", to: "2-2" },
      { from: "2-2", to: "2-3" },
      { from: "2-3", to: "2-4" },
      { from: "2-4", to: "2-5" },
      { from: "2-5", to: "2-6" },
      { from: "2-6", to: "2-7" },
      { from: "2-7", to: "2-8" },
    ],
  },
  {
    id: "constellation-3",
    stars: [
      { id: "3-1", x: 46.9, y: 74.6, size: 34 },
      { id: "3-2", x: 43.9, y: 84.3, size: 28 },
      { id: "3-3", x: 56.7, y: 82.4, size: 32 },
      { id: "3-4", x: 64, y: 94.6, size: 28 },
      { id: "3-5", x: 53.7, y: 92.9, size: 30 },
      { id: "3-6", x: 48.2, y: 99.8, size: 32 },
    ],
    connections: [
      { from: "3-1", to: "3-2" },
      { from: "3-2", to: "3-3" },
      { from: "3-3", to: "3-4" },
      { from: "3-4", to: "3-5" },
      { from: "3-5", to: "3-6" },
    ],
  },
  {
    id: "constellation-4",
    stars: [
      { id: "4-1", x: 26.19, y: 67, size: 32 },
      { id: "4-2", x: 35.95, y: 69.5, size: 28 },
      { id: "4-3", x: 16.308, y: 71.8, size: 30 },
      { id: "4-4", x: 22.896, y: 79.7, size: 26 },
      { id: "4-5", x: 32.656, y: 77.7, size: 32 },
      { id: "4-6", x: 39, y: 92.9, size: 28 },
      { id: "4-7", x: 29.362, y: 87.8, size: 30 },
      { id: "4-8", x: 18.138, y: 93.5, size: 28 },
    ],
    connections: [
      { from: "4-1", to: "4-2" },
      { from: "4-1", to: "4-3" },
      { from: "4-3", to: "4-4" },
      { from: "4-4", to: "4-5" },
      { from: "4-5", to: "4-6" },
      { from: "4-6", to: "4-7" },
      { from: "4-7", to: "4-8" },
    ],
  },
  {
    id: "constellation-5",
    stars: [
      { id: "5-1", x: 64, y: 68.9, size: 28 },
      { id: "5-2", x: 74, y: 64.3, size: 32 },
      { id: "5-3", x: 69, y: 81.3, size: 28 },
      { id: "5-4", x: 74.8, y: 90, size: 32 },
      { id: "5-5", x: 79.2, y: 77.4, size: 34 },
      { id: "5-6", x: 89.7, y: 72.1, size: 30 },
      { id: "5-7", x: 93.1, y: 89.2, size: 32 },
    ],
    connections: [
      { from: "5-1", to: "5-2" },
      { from: "5-2", to: "5-3" },
      { from: "5-3", to: "5-4" },
      { from: "5-4", to: "5-5" },
      { from: "5-5", to: "5-6" },
      { from: "5-6", to: "5-7" },
    ],
  },

];

export function ConstellationField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;

    if (
      !field ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const constellationMotion = [
      { shiftX: 8.5, shiftY: 6.5, crossX: 0.8, crossY: -0.4, rotateX: 0.28, rotateY: -0.36, scale: 0.006 },
      { shiftX: 10, shiftY: 7.5, crossX: -0.5, crossY: 0.6, rotateX: 0.22, rotateY: -0.31, scale: 0.008 },
      { shiftX: 7.5, shiftY: 6, crossX: 0.6, crossY: 0.5, rotateX: 0.19, rotateY: -0.27, scale: 0.004 },
      { shiftX: 11, shiftY: 8, crossX: -0.8, crossY: -0.4, rotateX: 0.25, rotateY: -0.34, scale: 0.007 },
      { shiftX: 9, shiftY: 7, crossX: 0.4, crossY: -0.7, rotateX: 0.21, rotateY: -0.29, scale: 0.005 },
    ];
    const constellationElements = new Map(
      Array.from(
        field.querySelectorAll<HTMLElement>("[data-constellation]"),
      ).map((element) => [element.dataset.constellation ?? "", element] as const),
    );
    const starElements = new Map(
      Array.from(field.querySelectorAll<HTMLElement>("[data-star]")).map(
        (element) => [element.dataset.star ?? "", element] as const,
      ),
    );
    const lineElements = Array.from(
      field.querySelectorAll<SVGLineElement>("[data-from][data-to]"),
    );
    const starDataById = new Map(
      constellations.flatMap((constellation) =>
        constellation.stars.map((star) => [star.id, star] as const),
      ),
    );
    const constellationCenters = new Map(
      constellations.map((constellation) => [
        constellation.id,
        {
          x:
            constellation.stars.reduce((sum, star) => sum + star.x, 0) /
            constellation.stars.length,
          y:
            constellation.stars.reduce((sum, star) => sum + star.y, 0) /
            constellation.stars.length,
        },
      ]),
    );
    const starMotionById = new Map(
      Array.from(starDataById.keys()).map((id) => {
        const [constellationIndex, starIndex] = id.split("-").map(Number);
        const seed = constellationIndex * 47 + starIndex * 71;
        return [
          id,
          {
            x: (((seed * 17) % 19) - 9) / 9,
            y: (((seed * 29) % 23) - 11) / 11,
            cross: (((seed * 13) % 17) - 8) / 16,
            depth: 0.82 + ((seed * 7) % 9) / 20,
            response: 0.075 + ((seed * 11) % 7) / 100,
          },
        ] as const;
      }),
    );
    const currentStarOffsets = new Map<string, { x: number; y: number }>();

    let frameId = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentOriginX = 50;
    let currentOriginY = 50;
    let targetOriginX = 50;
    let targetOriginY = 50;
    let pointerActive = false;

    const resetParallax = () => {
      targetX = 0;
      targetY = 0;
      targetOriginX = 50;
      targetOriginY = 50;
      pointerActive = false;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerActive = true;
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (event.clientY / window.innerHeight) * 2 - 1;
      targetX = Math.sign(normalizedX) * Math.pow(Math.abs(normalizedX), 0.55);
      targetY = Math.sign(normalizedY) * Math.pow(Math.abs(normalizedY), 0.55);
      targetOriginX = (event.clientX / window.innerWidth) * 100;
      targetOriginY = (event.clientY / window.innerHeight) * 100;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      currentOriginX += (targetOriginX - currentOriginX) * 0.07;
      currentOriginY += (targetOriginY - currentOriginY) * 0.07;
      const motionAmount = Math.min(1, Math.hypot(currentX, currentY));
      const fieldWidth = field.clientWidth || window.innerWidth;
      const fieldHeight = field.clientHeight || window.innerHeight;
      const fieldRect = field.getBoundingClientRect();
      const fieldDiagonal = Math.hypot(window.innerWidth, window.innerHeight);
      const pointerX = (currentOriginX / 100) * window.innerWidth;
      const pointerY = (currentOriginY / 100) * window.innerHeight;
      const hoverPointerX = (targetOriginX / 100) * window.innerWidth;
      const hoverPointerY = (targetOriginY / 100) * window.innerHeight;
      const starOffsets = new Map<string, { x: number; y: number }>();
      const constellationOffsets = new Map<
        string,
        { x: number; y: number }
      >();
      const remoteStars = new Map(
        Array.from(starDataById.entries())
          .map(([id, star]) => ({
            id,
            distance: Math.hypot(
              fieldRect.left + (star.x / 100) * fieldRect.width - pointerX,
              fieldRect.top + (star.y / 100) * fieldRect.height - pointerY,
            ),
          }))
          .sort((a, b) => b.distance - a.distance)
          .slice(0, 3)
          .map(({ id }, index) => [id, [0.94, 0.86, 0.76][index]] as const),
      );
      const constellationHover = new Map(
        constellations.map((constellation) => {
          const closestStarDistance = Math.min(
            ...constellation.stars.map((star) =>
              Math.hypot(
                fieldRect.left +
                  (star.x / 100) * fieldRect.width -
                  hoverPointerX,
                fieldRect.top +
                  (star.y / 100) * fieldRect.height -
                  hoverPointerY,
              ),
            ),
          );
          const influence = pointerActive
            ? Math.exp(
                -(closestStarDistance * closestStarDistance) /
                  (2 * 118 * 118),
              )
            : 0;

          return [constellation.id, influence] as const;
        }),
      );

      constellationElements.forEach((element, id) => {
        const index = Number(id.split("-").at(-1)) - 1;
        const motion = constellationMotion[index] ?? constellationMotion[0];
        const center = constellationCenters.get(id) ?? { x: 50, y: 50 };
        const distanceFromPointer = Math.hypot(
          fieldRect.left + (center.x / 100) * fieldRect.width - pointerX,
          fieldRect.top + (center.y / 100) * fieldRect.height - pointerY,
        );
        const proximity =
          1 - Math.min(1, distanceFromPointer / (fieldDiagonal * 0.58));
        const follow = 0.18 + proximity * 0.82;
        const offsetX =
          (currentX * motion.shiftX + currentY * motion.crossX) * follow;
        const offsetY =
          (currentY * motion.shiftY + currentX * motion.crossY) * follow;
        const rotateX = currentY * motion.rotateX * follow;
        const rotateY = currentX * motion.rotateY * follow;
        const scale = 1 + motionAmount * motion.scale * follow;
        constellationOffsets.set(id, { x: offsetX, y: offsetY });

        element.style.transform = [
          "perspective(1400px)",
          "translate3d(" + offsetX.toFixed(3) + "px, " + offsetY.toFixed(3) + "px, 0)",
          "rotateX(" + rotateX.toFixed(3) + "deg)",
          "rotateY(" + rotateY.toFixed(3) + "deg)",
          "scale(" + scale.toFixed(4) + ")",
        ].join(" ");
        element.style.transformOrigin =
          currentOriginX.toFixed(3) + "% " + currentOriginY.toFixed(3) + "%";
      });

      starElements.forEach((element, id) => {
        const motion = starMotionById.get(id);
        const star = starDataById.get(id);

        if (!motion || !star) {
          return;
        }

        const deltaFromPointerX =
          fieldRect.left + (star.x / 100) * fieldRect.width - pointerX;
        const deltaFromPointerY =
          fieldRect.top + (star.y / 100) * fieldRect.height - pointerY;
        const distanceFromPointer = Math.hypot(
          deltaFromPointerX,
          deltaFromPointerY,
        );
        const proximity =
          1 - Math.min(1, distanceFromPointer / (fieldDiagonal * 0.62));
        const follow = 0.14 + proximity * 0.86;
        const chaos = 0.38 + follow * 0.62;
        let targetOffsetX =
          currentX * follow * motion.depth * 1.5 +
          (currentX * motion.x + currentY * motion.cross) * chaos * 0.72;
        let targetOffsetY =
          currentY * follow * motion.depth * 1.3 +
          (currentY * motion.y + currentX * motion.cross) * chaos * 0.64;
        const remoteStrength = remoteStars.get(id) ?? 0;

        if (remoteStrength > 0) {
          const constellationId = "constellation-" + id.split("-")[0];
          const parentOffset = constellationOffsets.get(constellationId) ?? {
            x: 0,
            y: 0,
          };
          const awayX =
            distanceFromPointer > 0
              ? deltaFromPointerX / distanceFromPointer
              : 0;
          const awayY =
            distanceFromPointer > 0
              ? deltaFromPointerY / distanceFromPointer
              : 0;
          const isolatedOffsetX =
            -parentOffset.x +
            awayX * motionAmount * 0.8 +
            (currentX * motion.x + currentY * motion.cross) * 0.12;
          const isolatedOffsetY =
            -parentOffset.y +
            awayY * motionAmount * 0.7 +
            (currentY * motion.y + currentX * motion.cross) * 0.1;

          targetOffsetX +=
            (isolatedOffsetX - targetOffsetX) * remoteStrength;
          targetOffsetY +=
            (isolatedOffsetY - targetOffsetY) * remoteStrength;
        }
        const constellationId = "constellation-" + id.split("-")[0];
        const center = constellationCenters.get(constellationId) ?? {
          x: star.x,
          y: star.y,
        };
        const radialX = ((star.x - center.x) / 100) * fieldWidth;
        const radialY = ((star.y - center.y) / 100) * fieldHeight;
        const radialLength = Math.hypot(radialX, radialY) || 1;
        const normalizedRadialX = radialX / radialLength;
        const normalizedRadialY = radialY / radialLength;
        const starIndex = Number(id.split("-")[1]);
        const geometryInfluence = constellationHover.get(constellationId) ?? 0;
        const geometryExpansion = 0.38 + (starIndex % 3) * 0.08;
        const geometryTwist = (starIndex % 2 === 0 ? 1 : -1) * 0.12;

        targetOffsetX +=
          geometryInfluence *
          (normalizedRadialX * geometryExpansion -
            normalizedRadialY * geometryTwist);
        targetOffsetY +=
          geometryInfluence *
          (normalizedRadialY * geometryExpansion +
            normalizedRadialX * geometryTwist);

        const currentOffset = currentStarOffsets.get(id) ?? { x: 0, y: 0 };
        currentOffset.x +=
          (targetOffsetX - currentOffset.x) * motion.response;
        currentOffset.y +=
          (targetOffsetY - currentOffset.y) * motion.response;
        currentStarOffsets.set(id, currentOffset);
        starOffsets.set(id, currentOffset);
        element.style.setProperty(
          "--star-local-x",
          currentOffset.x.toFixed(3) + "px",
        );
        element.style.setProperty(
          "--star-local-y",
          currentOffset.y.toFixed(3) + "px",
        );
      });

      lineElements.forEach((line) => {
        const fromId = line.dataset.from ?? "";
        const toId = line.dataset.to ?? "";
        const from = starDataById.get(fromId);
        const to = starDataById.get(toId);
        const fromOffset = starOffsets.get(fromId) ?? { x: 0, y: 0 };
        const toOffset = starOffsets.get(toId) ?? { x: 0, y: 0 };

        if (!from || !to) {
          return;
        }

        line.setAttribute(
          "x1",
          (from.x + (fromOffset.x / fieldWidth) * 100).toFixed(3),
        );
        line.setAttribute(
          "y1",
          (from.y + (fromOffset.y / fieldHeight) * 100).toFixed(3),
        );
        line.setAttribute(
          "x2",
          (to.x + (toOffset.x / fieldWidth) * 100).toFixed(3),
        );
        line.setAttribute(
          "y2",
          (to.y + (toOffset.y / fieldHeight) * 100).toFixed(3),
        );
      });

      frameId = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", resetParallax);
    document.documentElement.addEventListener("pointerleave", resetParallax);
    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetParallax);
      document.documentElement.removeEventListener("pointerleave", resetParallax);

      constellationElements.forEach((element) => {
        element.style.removeProperty("transform");
        element.style.removeProperty("transform-origin");
      });
      starElements.forEach((element) => {
        element.style.removeProperty("--star-local-x");
        element.style.removeProperty("--star-local-y");
      });
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      className={styles.constellationField}
      aria-hidden="true"
    >
      {constellations.map((constellation) => {
        const starsById = new Map(
          constellation.stars.map((star) => [star.id, star]),
        );

        return (
          <div
            key={constellation.id}
            className={styles.constellation}
            data-constellation={constellation.id}
          >
            <svg
              className={styles.constellationLines}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {constellation.connections.map((connection) => {
                const from = starsById.get(connection.from);
                const to = starsById.get(connection.to);

                if (!from || !to) {
                  return null;
                }

                return (
                  <line
                    key={connection.from + "-" + connection.to}
                    className={styles.constellationLine}
                    data-from={connection.from}
                    data-to={connection.to}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                  />
                );
              })}
            </svg>

            {constellation.stars.map((star) => (
              <Star
                key={star.id}
                id={star.id}
                x={star.x}
                y={star.y}
                size={star.size}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
