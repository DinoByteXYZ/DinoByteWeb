import { ethers } from 'ethers';

import { useEffect, useState } from "react";
import { useMemo } from 'react'
import { useAccount } from 'wagmi';
import { type Config, useConnectorClient } from 'wagmi'
import { clientToSigner } from '../utils/provider';

const EARLY_BIRD_CONTRACT = '0x0fee5a9099e671aeb031a61c1fc9b98979557d3f';
const EARLY_BIRD_ABI = [{"type":"constructor","inputs":[{"name":"_initialFee","type":"uint256","internalType":"uint256"},{"name":"_maxEarlyBirdsCount","type":"uint256","internalType":"uint256"},{"name":"_treasuryAddress","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"receive","stateMutability":"payable"},{"type":"function","name":"earlyBirdsAddresses","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"earlyBirdsStatus","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"getAllEarlyBirdsAddresses","inputs":[],"outputs":[{"name":"","type":"address[]","internalType":"address[]"}],"stateMutability":"view"},{"type":"function","name":"getCurrentEarlyBirdsCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"isEarlyBirds","inputs":[{"name":"user","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"isRegistrationEnabled","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"maxEarlyBirdsCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"registerAsEarlyBird","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"registrationFee","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setMaxEarlyBirdsCount","inputs":[{"name":"newMaxCount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setRegistrationFee","inputs":[{"name":"_newFee","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setRegistrationStatus","inputs":[{"name":"status","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setTreasuryAddress","inputs":[{"name":"_newTreasuryAddress","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"treasuryAddress","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"withdraw","inputs":[{"name":"_to","type":"address","internalType":"address"},{"name":"_token","type":"address","internalType":"address"},{"name":"_value","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"EarlyBirdRegistered","inputs":[{"name":"user","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"MaxEarlyBirdsCountUpdated","inputs":[{"name":"oldCount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"newCount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RegistrationFeeUpdated","inputs":[{"name":"oldFee","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"newFee","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"RegistrationStatusChanged","inputs":[{"name":"status","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"TreasuryAddressUpdated","inputs":[{"name":"oldAddress","type":"address","indexed":false,"internalType":"address"},{"name":"newAddress","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]}];
const REGISTER_EARLY_BIRD_ABI = ['function registerAsEarlyBird(address _address) external payable'];



export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}

export const useEarlyBird = () => {
  const { isConnected, address } = useAccount();
  const signer = useEthersSigner();

  
  const [mintPrice, setMintPrice] = useState<string>('0');
  const [totalSupply, setTotalSupply] = useState<number>(100);
  const [mintedCount, setMintedCount] = useState<number>(0);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchContractData = async () => {
      if (isConnected && address && signer) {
        try {
          // const contract = new ethers.Contract(
          //   EARLY_BIRD_CONTRACT,
          //   EARLY_BIRD_ABI,
          //   signer
          // );
          // const isRegistered = await contract.isEarlyBirds(address);
          // setIsRegistered(isRegistered);
          
          // const registrationFee = await contract.registrationFee();
          // setMintPrice(registrationFee.toString());

          // const maxEarlyBirdsCount = await contract.maxEarlyBirdsCount();
          // setTotalSupply(Number(maxEarlyBirdsCount));

          // const currentEarlyBirdsCount = await contract.getCurrentEarlyBirdsCount();
          // setMintedCount(Number(currentEarlyBirdsCount));

          
        } catch (err) {
          console.error('Error checking registration status:', err);
          setError('Error checking registration status');
        }
      }
    };
    
    fetchContractData();
    
    // const interval = setInterval(fetchContractData, 30000);
    // return () => clearInterval(interval);
  }, [signer]);
  
  const mint = async () => {
    if (isConnected && address && signer) {
      
      setIsMinting(true);
      setError(null);
      
      try {
        const contract = new ethers.Contract(
          EARLY_BIRD_CONTRACT,
          EARLY_BIRD_ABI,
          signer
        );
        const tx = await contract.registerAsEarlyBird({ value: mintPrice });
        await tx.wait(); 

        console.log('Mint success!');
      } catch (err) {
        console.error('Mint failed:', err);
        setError('Mint failed, please try again');
      } finally {
        setIsMinting(false);
      }
    }
  };
  
  return {
    mintPrice,
    totalSupply,
    mintedCount,
    isMinting,
    isRegistered,
    error,
    signer,
    mint
  };
};