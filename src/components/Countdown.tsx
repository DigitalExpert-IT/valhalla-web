import { Box, Flex, Wrap, Heading, Text } from "@chakra-ui/react";
import { useCountdown } from "hooks";

interface ICountdown {
  targetDate: string | number | Date;
  showExpired: JSX.Element;
}

const Countdown: React.FC<ICountdown> = props => {
  const { targetDate, showExpired } = props;
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return showExpired;
  } else {
    return (
      <Box zIndex={3} mb="5rem">
        <Wrap spacing={"1rem"}>
          <Box
            mx={"1rem"}
            backgroundColor={"#34177B"}
            boxShadow={"0px 0px 7px rgb(145 83 246 / 60%)"}
            borderRadius={"lg"}
            maxH={"6rem"}
          >
            <Box
              display={"flex"}
              mt={1}
              justifyContent={"center"}
              w={"8rem"}
              fontWeight={"bold"}
              fontSize={"4xl"}
            >
              {leadingZero(days)}
            </Box>
            <Box textAlign={"center"}>DAYS</Box>
          </Box>
          <Text fontSize={"2xl"} fontWeight={"bold"} pt={"1.5rem"}>
            :
          </Text>
          <Box
            mx={"1rem"}
            backgroundColor={"#34177B"}
            boxShadow={"0px 0px 7px rgb(145 83 246 / 60%)"}
            borderRadius={"lg"}
            maxH={"6rem"}
          >
            <Box
              display={"flex"}
              mt={1}
              justifyContent={"center"}
              w={"8rem"}
              fontWeight={"bold"}
              fontSize={"4xl"}
            >
              {leadingZero(hours)}
            </Box>
            <Box textAlign={"center"}>HOURS</Box>
          </Box>
          <Text fontSize={"2xl"} fontWeight={"bold"} pt={"1.5rem"}>
            :
          </Text>
          <Box
            mx={"1rem"}
            backgroundColor={"#34177B"}
            boxShadow={"0px 0px 7px rgb(145 83 246 / 60%)"}
            borderRadius={"lg"}
            maxH={"6rem"}
          >
            <Box
              display={"flex"}
              mt={1}
              justifyContent={"center"}
              w={"8rem"}
              fontWeight={"bold"}
              fontSize={"4xl"}
            >
              {leadingZero(minutes)}
            </Box>
            <Box textAlign={"center"}>MINUTES</Box>
          </Box>
          <Text fontSize={"2xl"} fontWeight={"bold"} pt={"1.5rem"}>
            :
          </Text>
          <Box
            mx={"1rem"}
            backgroundColor={"#34177B"}
            boxShadow={"0px 0px 7px rgb(145 83 246 / 60%)"}
            borderRadius={"lg"}
            maxH={"6rem"}
          >
            <Box
              display={"flex"}
              mt={1}
              justifyContent={"center"}
              w={"8rem"}
              fontWeight={"bold"}
              fontSize={"4xl"}
            >
              {leadingZero(seconds)}
            </Box>
            <Box textAlign={"center"} mb={"1rem"}>
              SECONDS
            </Box>
          </Box>
        </Wrap>
      </Box>
    );
  }
};

const leadingZero = (number: number) => {
  return ("0" + number).slice(-2);
};

export default Countdown;
