import { useState, useEffect } from 'react';
// import { useWeb3React } from '@web3-react/core';


export interface NFT {
  id: number;
  name: string;
  imageUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const useNFTs = () => {
  // const { active, account } = useWeb3React();
  const active = true;
  const account = '0x1234567890123456789012345678901234567890';
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchNFTs = async () => {
      if (!active || !account) {
        setNfts([]);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockNFTs: NFT[] = [
          // {
          //   id: 42,
          //   name: 'DinoByte',
          //   imageUrl: '/images/common.png',
          //   rarity: 'common'
          // },
          // {
          //   id: 187,
          //   name: 'DinoByte',
          //   imageUrl: '/images/rare.png',
          //   rarity: 'rare'
          // },
          // {
          //   id: 356,
          //   name: 'DinoByte',
          //   imageUrl: '/images/epic.png',
          //   rarity: 'epic'
          // }
        ];
        
        setNfts(mockNFTs);
      } catch (err) {
        console.error('Failed to get NFTs:', err);
        setError('Failed to get your NFTs, please try again');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNFTs();
  }, [active, account]);
  
  return {
    nfts,
    loading,
    error
  };
}; 