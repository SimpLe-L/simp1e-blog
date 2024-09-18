"use client"

import { useEffect, useState } from 'react';
import DisplayCampaigns from '../../components/DisplayCampaigns';
import { StateContextProvider, useStateContext } from '@/contexts/CrowdFundingContext';
import { campaignResArr } from '@/types';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'next/navigation'
import { useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors'
const crowdfunding = () => {
  const router = useRouter();
  const { connect } = useConnect();
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<campaignResArr>([]);

  const { address, getCampaigns } = useStateContext();
  // console.log("address", address);
  const fetchCampaigns = async () => {
    // console.log("enter");
    setIsLoading(true);
    const data: campaignResArr = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCampaigns();
  }, [address]);

  return (
    // <StateContextProvider>
    <div className='flex flex-col gap-[10px]'>
      <div className='flex w-full justify-center'>
        <CustomButton
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if (address) {
              router.push('/dapp/crowdfunding/create');
            }
            else connect({ connector: injected() })
          }}
        />
      </div>
      <DisplayCampaigns
        title="所有项目"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
    // </StateContextProvider>
  );
};

export default crowdfunding;
