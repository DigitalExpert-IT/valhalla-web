import {
  Container,
  Stack,
  HStack,
  Heading,
  Text,
  Switch,
  Box,
} from "@chakra-ui/react";
import flags from "experiment/experimentList.json";
import { useState, useEffect } from "react";

const Flags = () => {
  const [flagsMap, setFlagsMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const flagsMap = localStorage.getItem("flag");
      if (flagsMap) {
        setFlagsMap(JSON.parse(flagsMap));
      }
    } catch (error) {}
  }, []);

  const flipFlag = (flag: string) => () => {
    setFlagsMap(prev => {
      const newFlag = !prev[flag];
      const newFlags = {
        ...prev,
        [flag]: newFlag,
      };

      localStorage.setItem("flag", JSON.stringify(newFlags));

      return newFlags;
    });
  };

  return (
    <Container maxW="2xl" pt="32">
      <Heading mb="12">Feature Flags</Heading>
      <Stack spacing={4}>
        {flags.map(flag => (
          <Box key={flag}>
            <HStack justify="space-between" align="center">
              <Text fontWeight="bold">{flag}</Text>
              <Box cursor="pointer" onClick={flipFlag(flag)}>
                <Switch isChecked={!!flagsMap[flag]} pointerEvents="none" />
              </Box>
            </HStack>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default Flags;
