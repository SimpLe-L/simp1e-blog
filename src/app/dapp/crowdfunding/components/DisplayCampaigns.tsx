import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
// import { loader } from '@/assets';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { campaignRes, campaignResArr } from '@/types';

const DisplayCampaigns = ({ title, isLoading, campaigns }: { title: string, isLoading: boolean, campaigns: campaignResArr }) => {
  // const navigate = useNavigate();
  const router = useRouter();

  const handleNavigate = (campaign: campaignRes) => {
    // navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    const queryString = encodeURIComponent(JSON.stringify(campaign));
    router.push(`crowdfunding/${campaign.title}?data=${queryString}`);
    // return (event: React.MouseEvent<HTMLDivElement>) => {
    //   event.preventDefault(); // 阻止默认行为，如果需要的话
    //   navigate(`/campaign-details/${campaign.title}`, { state: campaign });
    // };
  }

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          // <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
          <Image
            src="/loader.svg"
            width={100}
            height={100}
            className="object-contain"
            alt="loader"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard
          key={uuidv4()}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns