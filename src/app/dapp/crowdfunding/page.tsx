
import { useEffect, useState } from 'react';
import { StateContextProvider, useStateContext } from './context';
const crowdfunding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <StateContextProvider>
      <DisplayCampaigns
        title="所有项目"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </StateContextProvider>
  );
};

export default crowdfunding;
