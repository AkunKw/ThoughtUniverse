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
