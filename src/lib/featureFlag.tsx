import { useEffect, useState } from "react";

export const getConfig = async (experimentName: string): Promise<boolean> => {
  try {
    const isEnabled = localStorage.getItem(experimentName);
    return isEnabled === "true";
  } catch (error) {
    return false;
  }
};

export const withExperiment =
  (experinmentName: string) =>
  (NewComponent: React.FC, OldComponent: React.FC) => {
    const WithExperiment = () => {
      const [isLoading, setLoading] = useState(true);
      const [isEnabled, setEnabled] = useState(false);

      useEffect(() => {
        const loadConfig = async () => {
          setLoading(true);
          const config = await getConfig(experinmentName);
          setEnabled(config);
          setLoading(false);
        };

        loadConfig();
      }, []);

      if (isLoading) {
        return null;
      }

      if (isEnabled) {
        return <NewComponent />;
      }

      return <OldComponent />;
    };

    return WithExperiment;
  };

export const withNewDesign = withExperiment("new-design");
