import { useDisclosure } from "@chakra-ui/react";
import { createContext } from "react";

interface IDefaultContext {
  isOpenSidebar: boolean;
  onOpenSidebar: () => void;
  onCloseSidebar: () => void;
}

const defaultContext: IDefaultContext = {
  isOpenSidebar: false,
  onOpenSidebar: () => {},
  onCloseSidebar: () => {},
};

const DashboardContext = createContext(defaultContext);

const DashboardContextProvider = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DashboardContext.Provider
      value={{
        isOpenSidebar: isOpen,
        onOpenSidebar: onOpen,
        onCloseSidebar: onClose,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardContextProvider };
