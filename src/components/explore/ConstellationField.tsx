"use client";

import { useEffect, useRef, useState } from "react";
import { constellations } from "./constellationData";
import styles from "./explore.module.css";
import { StarCard, type StarCardPlacement } from "./StarCard";

type StarAnchor = {
  x: number;
  y: number;
};

type PointerDirection = {
  x: number;
  y: number;
};

function getCardPlacement(
  id: string,
  anchor: StarAnchor,
  pointerDirection: PointerDirection,
): StarCardPlacement {
  const safeMargin = 12;
  const cardWidth = 300;
  const cardHeight = 220;
  const canOpenRight = anchor.x + cardWidth <= window.innerWidth - safeMargin;
  const canOpenLeft = anchor.x - cardWidth >= safeMargin;
  const canOpenDown = anchor.y + cardHeight <= window.innerHeight - safeMargin;
  const canOpenUp = anchor.y - cardHeight >= safeMargin;
  const [constellationIndex, starIndex] = id.split("-").map(Number);
  const placementSeed = constellationIndex * 17 + starIndex * 31;
  const horizontalMotion = Math.abs(pointerDirection.x);
  const verticalMotion = Math.abs(pointerDirection.y);
  const followsHorizontalMotion =
    horizontalMotion >= Math.max(0.35, verticalMotion * 0.35);
  const followsVerticalMotion =
    verticalMotion >= Math.max(0.35, horizontalMotion * 0.35);
  let horizontal: "Left" | "Right" = followsHorizontalMotion
    ? pointerDirection.x > 0
      ? "Right"
      : "Left"
    : placementSeed % 2 === 0
      ? "Right"
      : "Left";
  let vertical: "Up" | "Down" = followsVerticalMotion
    ? pointerDirection.y > 0
      ? "Down"
      : "Up"
    : Math.floor(placementSeed / 2) % 2 === 0
      ? "Up"
      : "Down";

  if (horizontal === "Right" && !canOpenRight && canOpenLeft) {
    horizontal = "Left";
  } else if (horizontal === "Left" && !canOpenLeft && canOpenRight) {
    horizontal = "Right";
  } else if (!canOpenLeft && !canOpenRight) {
    horizontal = anchor.x < window.innerWidth / 2 ? "Right" : "Left";
  }

  if (vertical === "Down" && !canOpenDown && canOpenUp) {
    vertical = "Up";
  } else if (vertical === "Up" && !canOpenUp && canOpenDown) {
    vertical = "Down";
  } else if (!canOpenUp && !canOpenDown) {
    vertical = anchor.y < window.innerHeight / 2 ? "Down" : "Up";
  }

  return (horizontal + vertical) as StarCardPlacement;
}
export function ConstellationField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const pointerMotionRef = useRef<{
    lastX: number | null;
    lastY: number | null;
    deltaX: number;
    deltaY: number;
  }>({ lastX: null, lastY: null, deltaX: 1, deltaY: 0 });
  const [activeStarId, setActiveStarId] = useState<string | null>(null);
  const [expandedStarId, setExpandedStarId] = useState<string | null>(null);
  const [cardPlacement, setCardPlacement] =
    useState<StarCardPlacement>("RightDown");

  const handleActivateStar = (id: string, anchor: StarAnchor) => {
    setCardPlacement(
      getCardPlacement(id, anchor, {
        x: pointerMotionRef.current.deltaX,
        y: pointerMotionRef.current.deltaY,
      }),
    );
    setActiveStarId(id);
    setExpandedStarId((currentId) => (currentId === id ? currentId : null));
  };

  const handleDeactivateStar = (id: string) => {
    setActiveStarId((currentId) => (currentId === id ? null : currentId));
    setExpandedStarId((currentId) => (currentId === id ? null : currentId));
  };

  const handleToggleDescription = (id: string) => {
    setExpandedStarId((currentId) => (currentId === id ? null : id));
  };

  useEffect(() => {
    const trackPointerDirection = (event: PointerEvent) => {
      const pointerMotion = pointerMotionRef.current;

      if (pointerMotion.lastX !== null && pointerMotion.lastY !== null) {
        const deltaX = event.clientX - pointerMotion.lastX;
        const deltaY = event.clientY - pointerMotion.lastY;

        if (Math.hypot(deltaX, deltaY) >= 0.35) {
          pointerMotion.deltaX = deltaX;
          pointerMotion.deltaY = deltaY;
        }
      }

      pointerMotion.lastX = event.clientX;
      pointerMotion.lastY = event.clientY;
    };

    window.addEventListener("pointermove", trackPointerDirection, {
      capture: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", trackPointerDirection, true);
    };
  }, []);

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
      className={[
        styles.constellationField,
        activeStarId ? styles.constellationFieldCardActive : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {constellations.map((constellation) => {
        const starsById = new Map(
          constellation.stars.map((star) => [star.id, star]),
        );

        return (
          <div
            key={constellation.id}
            className={[
              styles.constellation,
              activeStarId?.startsWith(
                constellation.id.replace("constellation-", "") + "-",
              )
                ? styles.constellationActive
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            data-constellation={constellation.id}
          >
            <svg
              className={styles.constellationLines}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
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
              <StarCard
                key={star.id}
                {...star}
                placement={cardPlacement}
                isActive={activeStarId === star.id}
                isExpanded={expandedStarId === star.id}
                onActivate={handleActivateStar}
                onDeactivate={handleDeactivateStar}
                onToggleDescription={handleToggleDescription}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

