import { useEffect, useState, lazy } from "react";

export const getConfig = async (experimentName: string): Promise<boolean> => {
  try {
    const flagsMapJson = localStorage.getItem("flag") || "{}";
    const flagsMap = JSON.parse(flagsMapJson);
    return !!flagsMap[experimentName];
  } catch (error) {
    return false;
  }
};

export const withExperiment = (
  OldComponent: React.FC,
  experimentPath: string
) => {
  let ComponentA: any = null;
  const WithExperiment = () => {
    const [isLoading, setLoading] = useState(true);
    const [isEnabled, setEnabled] = useState(false);

    useEffect(() => {
      const loadConfig = async () => {
        setLoading(true);
        const experimentName = experimentPath.match(/[^\/]*/)?.[0]!;
        const isExperimentEnabled = await getConfig(experimentName);
        if (isExperimentEnabled) {
          ComponentA = lazy(() => import(`../experiment/${experimentPath}`));
        }
        setEnabled(isExperimentEnabled);
        setLoading(false);
      };

      loadConfig();
    }, []);

    if (isLoading) {
      return null;
    }

    if (isEnabled) {
      return <ComponentA />;
    }

    return <OldComponent />;
  };

  return WithExperiment;
};
