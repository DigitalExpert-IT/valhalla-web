import {
  Box,
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

export interface IDataItem {
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
  isLoading: boolean;
  onDateChange?: (key: string, val: string) => void;
}

const SummaryDashboard = (props: ISummaryProps) => {
  const { data, isShowFilterDate, dateValue, isLoading, onDateChange } = props;
  const { t } = useTranslation();

  const renderData = useMemo(() => {
    return data?.map(item => (
      <HStack
        key={item.key}
        w="full"
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
    <Stack alignItems="center" bg="dashboard.gray" w="full" p="8" rounded="lg">
      <Heading as="h2" fontSize="2xl" mb="4">
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
      {renderData}
    </Stack>
  );
};

export default SummaryDashboard;
