import { LayoutMain } from "components";
import { SectionProfile } from "components/pages/Profile";
import { withConnection, withRegistration } from "hoc";
import { composeHoc } from "utils";

const Profile = () => {
  return (
    <LayoutMain>
      <SectionProfile />
    </LayoutMain>
  );
};

export default composeHoc(withRegistration, withConnection)(Profile);
