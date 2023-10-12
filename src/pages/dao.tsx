import { VStack, Image } from "@chakra-ui/react";
import { LayoutMainV2, ModalAnnouncement } from "components";
import ComingSoon from "components/ComingSoon";

const Dao = () => {
  return (
    <LayoutMainV2>
      <ModalAnnouncement isComingSoon={true}/>
      <VStack height={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Image
          position={"absolute"}
          src="/images/property_DAO.jpg"
          alt="img-header"
          loading="lazy"
          sizes="100vw"
          style={{ objectFit: "cover" }}
          z-index="0"
          height={"100vh"}
        />
      </VStack>
    </LayoutMainV2>
  );
};

export default Dao;
