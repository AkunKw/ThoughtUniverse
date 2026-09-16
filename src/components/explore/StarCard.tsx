import type { CSSProperties } from "react";
import type { ConstellationStar } from "./constellationData";
import styles from "./explore.module.css";

type StarCardProps = ConstellationStar & {
  placement: StarCardPlacement;
  isActive: boolean;
  isExpanded: boolean;
  onActivate: (id: string, anchor: { x: number; y: number }) => void;
  onDeactivate: (id: string) => void;
  onToggleDescription: (id: string) => void;
};

export type StarCardPlacement =
  | "RightUp"
  | "RightDown"
  | "LeftUp"
  | "LeftDown";

export function StarCard({
  id,
  x,
  y,
  size,
  title,
  description,
  placement,
  isActive,
  isExpanded,
  onActivate,
  onDeactivate,
  onToggleDescription,
}: StarCardProps) {
  const [constellationIndex, starIndex] = id.split("-").map(Number);
  const motionSeed = constellationIndex * 11 + starIndex * 7;
  const placementClass =
    styles["starCard" + placement as keyof typeof styles];

  return (
    <div
      className={`${styles.constellationStar} ${
        isActive ? styles.constellationStarActive : ""
      }`}
      data-star={id}
      onPointerEnter={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();

        onActivate(id, {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
        });
      }}
      onPointerLeave={() => onDeactivate(id)}
      style={
        {
          left: x + "%",
          top: y + "%",
          "--star-size": size + "px",
          "--star-delay": -(motionSeed % 7) * 0.47 + "s",
          "--star-duration": 4.2 + (motionSeed % 5) * 0.38 + "s",
        } as CSSProperties
      }
    >
      <span className={styles.constellationStarVisual} />

      <article
        className={`${styles.starCard} ${placementClass} ${
          isActive ? styles.starCardActive : ""
        } ${isExpanded ? styles.starCardExpanded : ""}`}
        aria-hidden={!isActive}
        aria-labelledby={id + "-title"}
      >
        <h3 id={id + "-title"} className={styles.starCardTitle}>
          {title}
        </h3>

        <div className={styles.starCardDescriptionRegion}>
          <div>
            <p className={styles.starCardDescription}>{description}</p>
          </div>
        </div>

        <button
          type="button"
          className={styles.starCardToggle}
          aria-expanded={isExpanded}
          aria-label={title}
          tabIndex={isActive ? 0 : -1}
          onClick={() => onToggleDescription(id)}
        >
          •••
        </button>
      </article>
    </div>
  );
}