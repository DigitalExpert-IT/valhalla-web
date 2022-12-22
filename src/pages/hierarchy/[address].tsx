import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const OrgChart = dynamic(
  () => import("../../components/Chart/ChartOrg").then(data => data.OrgChart),
  {
    ssr: false,
    suspense: false,
  }
);

const Hierarchy = () => {
  const router = useRouter();
  return (
    <OrgChart
      w="100vw"
      h="100vh"
      address={(router.query.address as string) || "0x0"}
    />
  );
};

export default Hierarchy;
