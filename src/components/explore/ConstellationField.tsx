import type { CSSProperties } from "react";
import styles from "./explore.module.css";

type ConstellationStar = {
  id: string;
  x: number;
  y: number;
  size: number;
};
type StarProps = ConstellationStar;

function Star({ id, x, y, size }: StarProps) {
  return (
    <span
      className={styles.constellationStar}
      data-star={id}
      style={
        {
          left: x + "%",
          top: y + "%",
          "--star-size": size + "px",
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
      { id: "1-1", x: 20.7, y: 21.7, size: 32 },
      { id: "1-2", x: 26, y: 29.3, size: 24 },
      { id: "1-3", x: 25.9, y: 39.9, size: 26 },
      { id: "1-4", x: 19.1, y: 39.4, size: 34 },
      { id: "1-5", x: 23.4, y: 50.8, size: 32 },
      { id: "1-6", x: 31.7, y: 43.9, size: 28 },
      { id: "1-7", x: 34.6, y: 55.7, size: 36 },
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
      { id: "4-1", x: 28.5, y: 67, size: 32 },
      { id: "4-2", x: 36.5, y: 69.5, size: 28 },
      { id: "4-3", x: 20.4, y: 71.8, size: 30 },
      { id: "4-4", x: 25.8, y: 79.7, size: 26 },
      { id: "4-5", x: 33.8, y: 77.7, size: 32 },
      { id: "4-6", x: 39, y: 92.9, size: 28 },
      { id: "4-7", x: 31.1, y: 87.8, size: 30 },
      { id: "4-8", x: 21.9, y: 93.5, size: 28 },
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
  return (
    <div className={styles.constellationField} aria-hidden="true">
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
