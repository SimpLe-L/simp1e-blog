"use client"

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useReadContract, useSimulateContract } from 'wagmi';
import { NftAbi } from "~/nft";
import { contractAddress } from '@/configs';
import { useEffect, useState } from 'react';

import { NFTCard } from './NFT';
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import { INftProperties } from '@/types';

const toTuple = (arr: bigint[]): readonly [bigint, bigint] => {
  if (arr.length !== 2) {
    throw new Error("Array must have exactly 2 elements.");
  }
  return [arr[0], arr[1]] as readonly [bigint, bigint];
}

const NftPage = () => {
  const { toast } = useToast()
  const { address } = useAccount();
  const { writeContract, status } = useWriteContract()
  const [horses, setHorses] = useState<readonly INftProperties[]>([]);
  const [checkedNfts, setCheckedNft] = useState<bigint[]>([]);

  const testArr: INftProperties[] = [
    {
      owner: "0x0000000000000000000000000000000000000000",
      tokenId: 5n,
      level: 0,
      faId: 0n,
      moId: 0n,
      uri: "https://ipfs.io/ipfs/QmYqGzTtT8B7vL4YvD8HkVfXG8JYqXe7gKjvCJbLs6pE9"
    },
    {
      owner: "0x0000000000000000000000000000000000000000",
      tokenId: 44n,
      level: 0,
      faId: 0n,
      moId: 0n,
      uri: "https://ipfs.io/ipfs/QmYqGzTtT8B7vL4YvD8HkVfXG8JYqXe7gKjvCJbLs6pE9"
    },
    {
      owner: "0x0000000000000000000000000000000000000000",
      tokenId: 666n,
      level: 0,
      faId: 0n,
      moId: 0n,
      uri: "https://ipfs.io/ipfs/QmYqGzTtT8B7vL4YvD8HkVfXG8JYqXe7gKjvCJbLs6pE9"
    },
  ]

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
      args: toTuple(checkedNfts)
    })
  }

  // 处理勾选的nft
  const handleNftCheck = (tokenId: bigint, value: boolean) => {

    if (value) {
      if (checkedNfts.length >= 2) {
        toast({
          description: "合成条件：两张同等级且不超过3级的NFT",
        })
        return;
      }
      setCheckedNft([...checkedNfts, tokenId]);
    } else {
      // 取消勾选
      setCheckedNft(checkedNfts.filter(item => item !== tokenId));
    }
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
      <div className='overflow-y-auto flex flex-wrap gap-5 h-full'>
        {horses.map(item => {
          return <NFTCard key={item.tokenId} data={item} handleNftCheck={handleNftCheck} />
        })}
      </div>
    </div>
  );
};

export default NftPage;
