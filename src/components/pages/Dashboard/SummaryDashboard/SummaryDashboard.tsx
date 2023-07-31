import {
  Box,
  Flex,
  HStack,
  Heading,
  Input,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { useMemo } from "react";
import { IconType } from "react-icons";

interface IDataItem {
  key: string;
  text: string;
  value: string | number;
  icon: IconType;
}

interface IDateRangeValue {
  start: Date;
  end: Date;
}

interface ISummaryProps {
  data: IDataItem[];
  isShowFilterDate?: boolean;
  dateValue?: IDateRangeValue;
  isLoading?: boolean;
  error?: any | unknown;
  onDateChange?: (key: string, val: string) => void;
}

/**
 * @deprecated since version 2.0
 */

export const SummaryDashboard = (props: ISummaryProps) => {
  const { data, isShowFilterDate, dateValue, isLoading, error, onDateChange } =
    props;
  const { t } = useTranslation();
  const flexBasisValue = data.length === 8 ? "23%" : "31%";
  const renderData = useMemo(() => {
    return data?.map(item => (
      <HStack
        flex={{ base: "100%", md: flexBasisValue }}
        key={item.key}
        pos="relative"
        bg="purple.400"
        color="white"
        p="3"
        justifyContent="space-between"
        rounded="md"
      >
        <HStack justifyContent="space-between" gap="4">
          <item.icon />
          <Text fontSize="sm" fontWeight="400" color="inherit">
            {item.text}
          </Text>
        </HStack>

        <Skeleton isLoaded={!isLoading}>
          <Box
            p="1"
            py="0"
            fontSize="sm"
            color="purple.400"
            bg="white"
            borderRadius="md"
          >
            {item.value}
          </Box>
        </Skeleton>
      </HStack>
    ));
  }, [data, isLoading]);

  return (
    <Stack
      alignItems="center"
      bgColor="#370065"
      backgroundPosition={{ base: "center", md: "initial" }}
      backgroundRepeat={"no-repeat"}
      backgroundSize={{ base: "cover", md: "100% auto" }}
      backgroundImage={"/assets/dashboard/bg-billboard-2.png"}
      w="full"
      p={{ base: "4", sm: "8" }}
      rounded="lg"
    >
      <Heading
        w={"full"}
        textAlign={{ base: "center", md: "initial" }}
        as="h2"
        fontSize="3xl"
        mb="4"
        color={"dashboard.gray"}
      >
        {t("pages.dashboard.title.summary")}
      </Heading>{" "}
      {isShowFilterDate && onDateChange && dateValue ? (
        <HStack pb="3">
          <Input
            css={{
              "&::-webkit-calendar-picker-indicator": {
                filter: "invert(1)",
              },
            }}
            p="2"
            type="date"
            variant="dashboard"
            value={format(dateValue?.start, "yyyy-MM-dd")}
            onChange={e => onDateChange("start-date", e.target?.value)}
          />
          <Text>-</Text>
          <Input
            css={{
              "&::-webkit-calendar-picker-indicator": {
                filter: "invert(1)",
              },
            }}
            p="2"
            type="date"
            variant="dashboard"
            value={format(dateValue?.end, "yyyy-MM-dd")}
            onChange={e => onDateChange("end-date", e.target?.value)}
          />
        </HStack>
      ) : null}
      <Text variant="error" display={error?.message ? "block" : "none"}>
        {error?.message}
      </Text>
      <Flex w={"full"} flexWrap={"wrap"} gap={3}>
        {renderData}
      </Flex>
    </Stack>
  );
};
