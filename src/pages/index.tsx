import { LayoutMain } from "components";
import { SectionPromotion, SectionHeader } from "components/pages/Home";

export default function Home() {
  return (
    <LayoutMain>
      <SectionHeader />
      <SectionPromotion />
    </LayoutMain>
  );
}
