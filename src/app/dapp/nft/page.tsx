"use client"

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useReadContract, useSimulateContract } from 'wagmi';
import { NftAbi } from "~/nft";
import { contractAddress } from './configs';
import { useEffect, useState } from 'react';

import { NFTCard } from './NFT';
import { Button } from "@/components/ui/button"
import { INftProperties } from '@/types';


const NftPage = () => {
  const { address } = useAccount();
  const { writeContract, status } = useWriteContract()
  const [horses, setHorses] = useState<readonly INftProperties[]>([]);

  // 读取已拥有的nft列表
  const getAllHorses = useReadContract({
    // 合约地址
    address: contractAddress,
    abi: NftAbi,
    functionName: 'getHorses',
    args: [address!]
  })

  useEffect(() => {
    if (getAllHorses.data) {
      console.log(getAllHorses.data);
      setHorses(getAllHorses.data);
    }
  }, [getAllHorses.data]);

  useEffect(() => {
    if (status == "success") {
      getAllHorses.refetch();
    }
  }, [status]);
  // mint nft
  const MintNFT = () => {
    writeContract({
      abi: NftAbi,
      address: contractAddress,
      functionName: 'safeMint',
      args: [address!]
    })
  }
  // 合成NFT
  const CombineNFTs = () => {
    writeContract({
      abi: NftAbi,
      address: contractAddress,
      functionName: 'combine',
      args: [address!]
    })
  }

  return (
    <div className="p-5 h-full flex flex-col gap-4">
      <div className='w-full flex justify-center'>
        <ConnectButton />
      </div>
      <div className="w-full flex justify-center gap-2">
        <Button variant="outline" onClick={MintNFT}>MINT</Button>
        <Button variant="outline" onClick={CombineNFTs}>合成</Button>
      </div>
      <div className='overflow-y-auto flex flex-wrap gap-5'>
        {horses.map(item => {
          return <NFTCard key={item.tokenId} data={item} />
        })}
      </div>
    </div>
  );
};

export default NftPage;
