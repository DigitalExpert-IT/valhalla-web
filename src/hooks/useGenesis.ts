import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { NFTGenesis } from "valhalla-erc20/typechain-types/contracts/NFTGenesis";
import { useGenesisContract } from "./useGenesisContract";
import { useUSDTContract } from "./useUSDTContract";
import { useEffect, useState } from "react";
import { prettyBn } from "utils";
import ee from "ee";

type BaseCardType = Awaited<ReturnType<NFTGenesis["cardMap"]>>;
type GenesisType = BaseCardType & {
  totalSupply: number;
};

export const useGenesis = () => {
  const genesis = useGenesisContract();
  const address = useAddress();
  const usdt = useUSDTContract();
  const approveUsdt = useContractWrite(usdt.contract, "approve");
  const buyNft = useContractWrite(genesis.contract, "buyMultipleNFT");
  const [data, setData] = useState<GenesisType | undefined>();
  const [isInitialize, setIsInitialize] = useState(false);

  const init = async () => {
    setIsInitialize(true);
    await getDataGenesis();
    setIsInitialize(false);
  };

  const getDataGenesis = async () => {
    const genesisCard = await genesis.contract!.call("cardMap", [0]);
    const genesisPrice = prettyBn(genesisCard.price, 6);
    const totalSupply =
      genesisCard.maxMinted.toNumber() - genesisCard.totalMinted.toNumber();
    setData({
      ...genesisCard,
      price: genesisPrice,
      totalSupply: totalSupply,
    });
  };

  useEffect(() => {
    if (!genesis.contract) return;
    init();
    ee.addListener("genesis-BuyMultipleNFT", getDataGenesis);

    return () => {
      ee.removeListener("genesis-BuyMultipleNFT", getDataGenesis);
    };
  }, [genesis.contract]);

  const buyGenesis = async (cardId: number, amount: number) => {
    if (!usdt.contract || !genesis.contract || !address) return;
    const card = await genesis.contract!.call("cardMap", [cardId]);
    const cardPrice = card.price * amount;
    const usdtBalance = await usdt.contract!.call("balanceOf", [address]);
    const allowance = await usdt.contract!.call("allowance", [
      address,
      genesis.contract.getAddress(),
    ]);

    if (cardPrice > usdtBalance) {
      throw {
        code: "NotEnoughUsdtBalance",
      };
    }

    if (cardPrice > allowance) {
      await approveUsdt.mutateAsync({
        args: [genesis.contract.getAddress(), cardPrice * 10],
      });
    }

    const receipt = await buyNft.mutateAsync({ args: [cardId, amount] });
    return receipt;
  };

  return { data, buyGenesis, isInitialize };
};
