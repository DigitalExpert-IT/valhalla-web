import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { NFTGenesis } from "@warmbyte/valhalla/typechain-types/contracts/NFTGenesis";
import { useGenesisContract } from "./useGenesisContract";
import { useUSDTContract } from "./useUSDTContract";
import { useEffect, useState } from "react";
import { prettyBn } from "utils";
import { useGNETContract } from "./useGNETContract";

type BaseCardType = Awaited<ReturnType<NFTGenesis["cardMap"]>>;
type GenesisType = BaseCardType & {
  totalSupply: number;
};

export const useGenesis = () => {
  const genesis = useGenesisContract();
  const address = useAddress();
  const usdt = useUSDTContract();
  const gnet = useGNETContract();
  const approveUsdt = useContractWrite(usdt.contract, "approve");
  const approveGnet = useContractWrite(gnet.contract, "approve");
  const buyNft = useContractWrite(genesis.contract, "buyMultipleNFT");
  const [data, setData] = useState<GenesisType>();

  const init = async () => {
    if (!genesis.contract) return;
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
    init();
  }, [genesis.contract, data]);

  const buyGenesis = async (cardId: number, amount: number) => {
    if (!usdt.contract || !genesis.contract || !address) return;
    const card = await genesis.contract!.call("cardMap", [cardId]);
    const cardPrice = card.price;
    const usdtBalance = await gnet.contract!.call("balanceOf", [address]);
    const allowance = await gnet.contract!.call("allowance", [
      address,
      genesis.contract.getAddress(),
    ]);

    if (cardPrice.gt(usdtBalance)) {
      throw {
        code: "NotEnoughUsdtBalance",
      };
    }

    if (cardPrice.gt(allowance)) {
      await approveGnet.mutateAsync({
        args: [genesis.contract.getAddress(), cardPrice.mul(10)],
      });
    }

    const receipt = await buyNft.mutateAsync({ args: [cardId, amount] });
    return receipt;
  };

  return { data, buyGenesis };
};
