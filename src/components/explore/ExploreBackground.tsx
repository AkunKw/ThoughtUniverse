import { ConstellationField } from "./ConstellationField";
import { PlanetCanvas } from "./PlanetCanvas";
import styles from "./explore.module.css";

export function ExploreBackground() {
  return (
    <main className={styles.exploreScreen}>
      <ConstellationField />
      <PlanetCanvas />
    </main>
  );
}
