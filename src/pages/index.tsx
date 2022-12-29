import { LayoutMain } from "components";
import {
  SectionHeader,
  SectionPromotion,
  SectionFeaturedPopulation,
} from "components/pages/Home";

export default function Home() {
  return (
    <LayoutMain>
      <SectionHeader />
      <SectionPromotion />
      <SectionFeaturedPopulation />
    </LayoutMain>
  );
}
