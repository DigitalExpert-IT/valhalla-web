import { LayoutMain } from "components";
import { SectionProfile } from "components/pages/Profile";
import { withConnection } from "hoc";

const Profile = () => {
  return (
    <LayoutMain>
      <SectionProfile />
    </LayoutMain>
  );
};

export default withConnection(Profile);
