"use client"

import { useContext, createContext } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { formatEther } from 'ethers';
import { parseEther } from 'viem'
import { readContract, writeContract } from '@wagmi/core';
import { wagmiConfig } from '@/utils/configs';
import { crowdFundingAbi } from "~/crowdFunding";
import { contractAddress } from '@/configs';
import { DonationsArr, campaignResArr } from '@/types';

interface ICampaignContextParams {
  getCampaigns: () => Promise<campaignResArr>;
  publishCampaign: (form: any) => Promise<void>;
  getUserCampaigns: () => void;
  donate: (pid: any, amount: any) => void;
  getDonations: (pId: bigint) => Promise<DonationsArr>;
  // createCampaign: () => Promise<void>;
  // connect: any;
  address: `0x${string}` | undefined;
}

const StateContext = createContext<ICampaignContextParams>({
  getCampaigns: () => Promise.resolve([]),
  publishCampaign: async () => { },
  getUserCampaigns: () => { },
  donate: async () => { },
  getDonations: async () => [],
  // connect: null,
  address: undefined
});

// const contractAddress = "cccc";

export const StateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const publishCampaign = async (form: any) => {
    try {
      const data = await writeContract(wagmiConfig, {
        abi: crowdFundingAbi,
        address: contractAddress,
        functionName: 'createCampaign',
        args: [
          address!, // owner
          form.title, // title
          form.description, // description
          form.target,
          BigInt(new Date(form.deadline).getTime()), // deadline,
          form.image,
        ],
      })
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await readContract(wagmiConfig, {
      abi: crowdFundingAbi,
      address: contractAddress,
      functionName: 'getCampaigns',
    });
    const parsedCampaigns = campaigns?.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: formatEther(campaign.target.toString()),
      deadline: Number(campaign.deadline),
      amountCollected: formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns?.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  };

  const donate = async (pId: bigint, amount: string) => {
    const data = await writeContract(wagmiConfig, {
      abi: crowdFundingAbi,
      address: contractAddress,
      functionName: 'donateToCampaign',
      args: [pId],
      value: parseEther(amount)
    });
    return data;
  };

  const getDonations = async (pId: bigint) => {
    const donations = await readContract(wagmiConfig, {
      abi: crowdFundingAbi,
      address: contractAddress,
      functionName: 'getDonators',
      args: [pId]
    })
    const numberOfDonations = donations?.[0]?.length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }
      }
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);