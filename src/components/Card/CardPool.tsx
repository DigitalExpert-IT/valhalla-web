import { Card, CardBody, Text } from "@chakra-ui/react";
import { useValhalla } from "hooks";
import { prettyBn } from "utils";

export const CardPool = () => {
  const valhalla = useValhalla();
  return (
    <Card>
      <CardBody>
        <Text>Global Pool: {prettyBn(valhalla.globalPool.claimable)}</Text>
        <Text>IPO Pool: {prettyBn(valhalla.ipoPool.claimable)}</Text>
        <Text>Reserved Pool: {prettyBn(valhalla.reservedPool.claimable)}</Text>
        <Text>Personal Reward: {prettyBn(valhalla.personalReward)}</Text>
      </CardBody>
    </Card>
  );
};
