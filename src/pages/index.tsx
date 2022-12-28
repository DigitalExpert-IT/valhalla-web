import { LayoutMain, SectionMatchingBonus } from "components";
import { SectionHeader } from "components/pages/Home";

export default function Home() {
  return (
    <LayoutMain>
      <SectionHeader />
      <SectionMatchingBonus />
    </LayoutMain>
  );
}
