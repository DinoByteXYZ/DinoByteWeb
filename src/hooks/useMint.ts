// import { useWeb3React } from '@web3-react/core';
// import { ethers } from 'ethers';

import { useEffect, useState } from "react";

const CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890';

export const useMint = () => {
  // const { active, account, provider } = useWeb3React(); 
  const active = true;
  const account = '0x1234567890123456789012345678901234567890';
  const provider = '0x1234567890123456789012345678901234567890';
  
  const [mintPrice, setMintPrice] = useState<string>('0.08');
  const [totalSupply, setTotalSupply] = useState<number>(1000);
  const [mintedCount, setMintedCount] = useState<number>(348);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchContractData = async () => {
      if (active && provider) {
        try {

          setTimeout(() => {
            setMintedCount(348);
          }, 1000);
          

          // const contract = new ethers.Contract(CONTRACT_ADDRESS, PixelDragonABI, provider);
          // const price = await contract.mintPrice();
          // const maxSupply = await contract.maxSupply();
          // const currentSupply = await contract.totalSupply();
          // 
          // setMintPrice(ethers.formatEther(price)); // 
          // setTotalSupply(Number(maxSupply)); // 
          // setMintedCount(Number(currentSupply));
        } catch (err) {
          console.error('load contract data failed:', err);
          setError('load contract data failed');
        }
      }
    };
    
    fetchContractData();
    
    const interval = setInterval(fetchContractData, 30000);
    return () => clearInterval(interval);
  }, [active, provider]);
  
  // 铸造NFT函数
  const mint = async () => {
    if (!active || !account || !provider) {
      setError('please connect wallet');
      return;
    }
    
    setIsMinting(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // const signer = await provider.getSigner(); //
      // const contract = new ethers.Contract(CONTRACT_ADDRESS, PixelDragonABI, signer);
      // const tx = await contract.mint({ value: ethers.parseEther(mintPrice) }); // 
      // await tx.wait();
      

      setMintedCount(prev => prev + 1);
      console.log('mint success!');
    } catch (err) {
      console.error('mint failed:', err);
      setError('mint failed, please try again');
    } finally {
      setIsMinting(false);
    }
  };
  
  return {
    mintPrice,
    totalSupply,
    mintedCount,
    isMinting,
    error,
    mint
  };
};