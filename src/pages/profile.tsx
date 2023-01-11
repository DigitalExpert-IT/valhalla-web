import { LayoutMain } from "components";
import { Profile, SectionNetworkStatus } from "components/pages/Profile";

export default function profile() {
  return (
    <LayoutMain>
      <Profile />
      <SectionNetworkStatus />
    </LayoutMain>
  );
}
