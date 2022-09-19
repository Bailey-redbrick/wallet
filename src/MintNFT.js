import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export function MintNFT() {
  const { config } = usePrepareContractWrite({
    addressOrName: "0xE4320bDf266A7e0E1D5b652Bf17F56f41ddE3b23", //mine
    // addressOrName:"0xaf0326d92b97df1221759476b072abfd8084f9be" //ex
    contractInterface: ["function mint()"],
    functionName: "mint",
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
      <button disabled={!write || isLoading} onClick={() => write()}>
        {isLoading ? "Minting..." : "Mint"}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </div>
  );
}
