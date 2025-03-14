import { ethers } from 'ethers';

import { useEffect, useRef, useState } from "react";
import { useMemo } from 'react'
import { useAccount } from 'wagmi';
import { type Config, useConnectorClient } from 'wagmi'
import { clientToSigner } from '../utils/provider';

const EARLY_BIRD_CONTRACT = '0xacb5b62F983E7e6850A9B21F3d947Bd0c53523ea';
const EARLY_BIRD_ABI = [{"type":"constructor","inputs":[{"name":"_initialFee","type":"uint256","internalType":"uint256"},{"name":"_maxEarlyBirdsCount","type":"uint256","internalType":"uint256"},{"name":"_treasuryAddress","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"receive","stateMutability":"payable"},{"type":"function","name":"earlyBirdsAddresses","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"earlyBirdsStatus","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"getAllEarlyBirdsAddresses","inputs":[],"outputs":[{"name":"","type":"address[]","internalType":"address[]"}],"stateMutability":"view"},{"type":"function","name":"getCurrentEarlyBirdsCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"isEarlyBirds","inputs":[{"name":"user","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"isRegistrationEnabled","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"maxEarlyBirdsCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"registerAsEarlyBird","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"registrationFee","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setMaxEarlyBirdsCount","inputs":[{"name":"newMaxCount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setRegistrationFee","inputs":[{"name":"_newFee","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setRegistrationStatus","inputs":[{"name":"status","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setTreasuryAddress","inputs":[{"name":"_newTreasuryAddress","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"treasuryAddress","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"withdraw","inputs":[{"name":"_to","type":"address","internalType":"address"},{"name":"_token","type":"address","internalType":"address"},{"name":"_value","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"EarlyBirdRegistered","inputs":[{"name":"user","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"MaxEarlyBirdsCountUpdated","inputs":[{"name":"oldCount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"newCount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RegistrationFeeUpdated","inputs":[{"name":"oldFee","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"newFee","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"RegistrationStatusChanged","inputs":[{"name":"status","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"TreasuryAddressUpdated","inputs":[{"name":"oldAddress","type":"address","indexed":false,"internalType":"address"},{"name":"newAddress","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]}];
const DINOBYETE_CONTRACT = '0x4f77c84c2dfB8B1d985571e3E3BC2129a54C4E10';
const DINOBYETE_ABI = [{"type":"constructor","inputs":[{"name":"name","type":"string","internalType":"string"},{"name":"symbol","type":"string","internalType":"string"},{"name":"baseURI","type":"string","internalType":"string"},{"name":"_mintPrice","type":"uint256","internalType":"uint256"},{"name":"_foundationAddress","type":"address","internalType":"address"},{"name":"_maxSupply","type":"uint256","internalType":"uint256"},{"name":"_earlyBirdsChecker","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"receive","stateMutability":"payable"},{"type":"function","name":"approve","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"balanceOf","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"earlyBirdsCanMint","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"earlyBirdsChecker","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IEarlyBirdsChecker"}],"stateMutability":"view"},{"type":"function","name":"foundationAddress","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"freezeToken","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"frozenTokens","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"getApproved","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"isApprovedForAll","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"operator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"isEarlyBirdsMintingEnabled","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"isMintingEnabled","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"maxSupply","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"mint","inputs":[{"name":"quantity","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"mintPrice","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"ownerOf","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"rescueERC721","inputs":[{"name":"_nftContract","type":"address","internalType":"address"},{"name":"_to","type":"address","internalType":"address"},{"name":"_tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"_data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"setApprovalForAll","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"approved","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setBaseURI","inputs":[{"name":"baseURI","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setEarlyBirdsChecker","inputs":[{"name":"_earlyBirdsChecker","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setEarlyBirdsMintingStatus","inputs":[{"name":"status","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setMintPrice","inputs":[{"name":"_mintPrice","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setMintingStatus","inputs":[{"name":"status","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"supportsInterface","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"tokenURI","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"tokensOfOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256[]","internalType":"uint256[]"}],"stateMutability":"view"},{"type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"result","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"transferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"unfreezeToken","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"usedEarlyBirdsMint","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"withdraw","inputs":[{"name":"_to","type":"address","internalType":"address"},{"name":"_token","type":"address","internalType":"address"},{"name":"_value","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"ConsecutiveTransfer","inputs":[{"name":"fromTokenId","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"toTokenId","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"EarlyBirdsMintingStatusChanged","inputs":[{"name":"status","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"MintingStatusChanged","inputs":[{"name":"status","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"TokenFrozen","inputs":[{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"TokenUnfrozen","inputs":[{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ApprovalCallerNotOwnerNorApproved","inputs":[]},{"type":"error","name":"ApprovalQueryForNonexistentToken","inputs":[]},{"type":"error","name":"BalanceQueryForZeroAddress","inputs":[]},{"type":"error","name":"MintERC2309QuantityExceedsLimit","inputs":[]},{"type":"error","name":"MintToZeroAddress","inputs":[]},{"type":"error","name":"MintZeroQuantity","inputs":[]},{"type":"error","name":"NotCompatibleWithSpotMints","inputs":[]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]},{"type":"error","name":"OwnerQueryForNonexistentToken","inputs":[]},{"type":"error","name":"OwnershipNotInitializedForExtraData","inputs":[]},{"type":"error","name":"ReentrancyGuardReentrantCall","inputs":[]},{"type":"error","name":"SequentialMintExceedsLimit","inputs":[]},{"type":"error","name":"SequentialUpToTooSmall","inputs":[]},{"type":"error","name":"SpotMintTokenIdTooSmall","inputs":[]},{"type":"error","name":"TokenAlreadyExists","inputs":[]},{"type":"error","name":"TransferCallerNotOwnerNorApproved","inputs":[]},{"type":"error","name":"TransferFromIncorrectOwner","inputs":[]},{"type":"error","name":"TransferToNonERC721ReceiverImplementer","inputs":[]},{"type":"error","name":"TransferToZeroAddress","inputs":[]},{"type":"error","name":"URIQueryForNonexistentToken","inputs":[]}];



export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}

export const useMintNFT = () => {
  const { isConnected, address } = useAccount();
  const signer = useEthersSigner();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [mintPrice, setMintPrice] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<number>(2000);
  const [mintedCount, setMintedCount] = useState<number>(0);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isEarlyMinted, setIsEarlyMinted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const earlyBirdsContract = new ethers.Contract(
    EARLY_BIRD_CONTRACT,
    EARLY_BIRD_ABI,
    signer
  );
  const mintNFTContract = new ethers.Contract(
    DINOBYETE_CONTRACT,
    DINOBYETE_ABI,
    signer
  );
  const fetchContractData = async () => {
      if (isConnected && address && signer) {
        try {      
        const currentMintCount = await mintNFTContract.totalSupply();
        setMintedCount(Number(currentMintCount));
        console.log('currentMintCount',currentMintCount);
        if (Number(currentMintCount) === totalSupply) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
        const isRegistered = await earlyBirdsContract.isEarlyBirds(address);
        setIsRegistered(isRegistered);
        } catch (err) {
          console.error('Error checking registration status:', err);
          setError('Error checking registration status');
        }
      }
    };
    const checkEarlyMintStatus = async () => {
      if (isConnected && address && signer) {
        try {
          const earlyMinted = await mintNFTContract.usedEarlyBirdsMint(address);
          setIsEarlyMinted(earlyMinted);

          console.log('earlyMinted',earlyMinted);
          
        } catch (err) {
          console.error('Error checking earlyMinted status:', err);
          setError('Error checking earlyMinted status');
        }
      }
    };
  useEffect(() => {
    const initData = async () => {
      if (isConnected && address && signer) {
        try {

          
          const mintNFTPrice = await mintNFTContract.mintPrice();
          console.log('registrationFee',mintNFTPrice);
          setMintPrice(mintNFTPrice);

          const currentMintCount = await mintNFTContract.totalSupply();
          setMintedCount(Number(currentMintCount));
          console.log('currentMintCount',currentMintCount);

          
        } catch (err) {
          console.error('Error checking registration status:', err);
          setError('Error checking registration status');
        }
      }
    };
    initData();
    checkEarlyMintStatus();
    fetchContractData();
    if (mintedCount !== totalSupply) {
      intervalRef.current = setInterval(() => {
        fetchContractData();
      }, 10000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    

  }, [signer]);
  const mint = async (quantity: number = 1) => {
    if (isConnected && address && signer) {
      setIsMinting(true);
      
      try {
        const userAddress = await signer?.getAddress();
        const provider = signer?.provider;
        const balance = await provider?.getBalance(userAddress??"");
        const balanceInEther = Number(ethers.formatEther(balance??"0"));
        const totalPrice = ethers.toBigInt(mintPrice) * ethers.toBigInt(quantity);
        
        if (balanceInEther < Number(ethers.formatEther(totalPrice))) {
          alert("Insufficient balance"); 
          return;
        }

        const tx = await mintNFTContract.mint(quantity, { value: totalPrice });
        await tx.wait(); 

        console.log(`Mint ${quantity} NFT(s) success!`);
        fetchContractData();

        alert("Mint Success");
      } catch (err) {
        console.error('Mint failed:', err);
        alert("Mint failed, please try again");
        setError('Mint failed, please try again');
      } finally {
        setIsMinting(false);
      }
    }
  };
  const earlyMint = async () => {
    if (isConnected && address && signer) {
      
      setIsMinting(true);
      
      try {

        const tx = await mintNFTContract.earlyBirdsCanMint();
        await tx.wait(); 

        fetchContractData();
        setIsEarlyMinted(true);

        alert("Reserve WhiteList Success");
      } catch (err) {
        console.error('Mint failed:', err);
        alert("Mint failed, please try again");
        setError('Mint failed, please try again');
        setIsMinting(false);
      } finally {
        setIsMinting(false);
      }
    }
  };
  
  return {
    isConnected,
    mintPrice,
    totalSupply,
    mintedCount,
    isMinting,
    isRegistered,
    error,
    signer,
    isEarlyMinted,
    mint,
    earlyMint
  };
};