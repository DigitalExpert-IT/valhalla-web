import { LayoutMain } from "components";
import {
  SectionHeader,
  SectionFeaturedPopulation,
} from "components/pages/Home";

export default function Home() {
  return (
    <LayoutMain>
      <SectionHeader />
      <SectionFeaturedPopulation />
    </LayoutMain>
  );
}
