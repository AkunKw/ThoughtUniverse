import type { Metadata } from "next";
import { ExploreBackground } from "@/components/explore/ExploreBackground";

export const metadata: Metadata = {
  title: "Explore | ThoughtUniverse",
};

export default function ExplorePage() {
  return <ExploreBackground />;
}
