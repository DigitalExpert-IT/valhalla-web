import { LayoutMain } from "components";
import {
  SectionHeader,
  SectionFeatures,
  SectionFeaturedPopulation,
} from "components/pages/Home";

export default function Home() {
  return (
    <LayoutMain>
      <SectionHeader />
      <SectionFeatures />
      <SectionFeaturedPopulation />
    </LayoutMain>
  );
}
