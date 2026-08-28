import { ConstellationField } from "./ConstellationField";
import { CosmicBackdrop } from "./CosmicBackdrop";
import { ExploreTitle } from "./ExploreTitle";
import { PlanetCanvas } from "./PlanetCanvas";
import { Sidebar } from "./Sidebar";
import styles from "./explore.module.css";

export function ExploreBackground() {
  return (
    <main className={styles.exploreScreen}>
      <CosmicBackdrop />
      <ConstellationField />
      <ExploreTitle />
      <PlanetCanvas />
      <Sidebar />
    </main>
  );
}
