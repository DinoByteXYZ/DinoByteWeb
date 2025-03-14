import { useState, useEffect } from 'react';
import { useMemo } from 'react'
import { useAccount } from 'wagmi';
import { type Config, useConnectorClient } from 'wagmi'
import { clientToSigner } from '../utils/provider';
import { ethers } from 'ethers';

const DINOBYETE_CONTRACT = '0x4f77c84c2dfB8B1d985571e3E3BC2129a54C4E10';
const DINOBYETE_ABI = [{"type":"constructor","inputs":[{"name":"name","type":"string","internalType":"string"},{"name":"symbol","type":"string","internalType":"string"},{"name":"baseURI","type":"string","internalType":"string"},{"name":"_mintPrice","type":"uint256","internalType":"uint256"},{"name":"_foundationAddress","type":"address","internalType":"address"},{"name":"_maxSupply","type":"uint256","internalType":"uint256"},{"name":"_earlyBirdsChecker","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"receive","stateMutability":"payable"},{"type":"function","name":"approve","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"balanceOf","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"earlyBirdsCanMint","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"earlyBirdsChecker","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IEarlyBirdsChecker"}],"stateMutability":"view"},{"type":"function","name":"foundationAddress","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"freezeToken","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"frozenTokens","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"getApproved","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"isApprovedForAll","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"operator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"isEarlyBirdsMintingEnabled","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"isMintingEnabled","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"maxSupply","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"mint","inputs":[{"name":"quantity","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"mintPrice","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"ownerOf","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"rescueERC721","inputs":[{"name":"_nftContract","type":"address","internalType":"address"},{"name":"_to","type":"address","internalType":"address"},{"name":"_tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"_data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"setApprovalForAll","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"approved","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setBaseURI","inputs":[{"name":"baseURI","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setEarlyBirdsChecker","inputs":[{"name":"_earlyBirdsChecker","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setEarlyBirdsMintingStatus","inputs":[{"name":"status","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setMintPrice","inputs":[{"name":"_mintPrice","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setMintingStatus","inputs":[{"name":"status","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"supportsInterface","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"tokenURI","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"tokensOfOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256[]","internalType":"uint256[]"}],"stateMutability":"view"},{"type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"result","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"transferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"unfreezeToken","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"usedEarlyBirdsMint","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"withdraw","inputs":[{"name":"_to","type":"address","internalType":"address"},{"name":"_token","type":"address","internalType":"address"},{"name":"_value","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"ConsecutiveTransfer","inputs":[{"name":"fromTokenId","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"toTokenId","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"EarlyBirdsMintingStatusChanged","inputs":[{"name":"status","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"MintingStatusChanged","inputs":[{"name":"status","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"TokenFrozen","inputs":[{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"TokenUnfrozen","inputs":[{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ApprovalCallerNotOwnerNorApproved","inputs":[]},{"type":"error","name":"ApprovalQueryForNonexistentToken","inputs":[]},{"type":"error","name":"BalanceQueryForZeroAddress","inputs":[]},{"type":"error","name":"MintERC2309QuantityExceedsLimit","inputs":[]},{"type":"error","name":"MintToZeroAddress","inputs":[]},{"type":"error","name":"MintZeroQuantity","inputs":[]},{"type":"error","name":"NotCompatibleWithSpotMints","inputs":[]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]},{"type":"error","name":"OwnerQueryForNonexistentToken","inputs":[]},{"type":"error","name":"OwnershipNotInitializedForExtraData","inputs":[]},{"type":"error","name":"ReentrancyGuardReentrantCall","inputs":[]},{"type":"error","name":"SequentialMintExceedsLimit","inputs":[]},{"type":"error","name":"SequentialUpToTooSmall","inputs":[]},{"type":"error","name":"SpotMintTokenIdTooSmall","inputs":[]},{"type":"error","name":"TokenAlreadyExists","inputs":[]},{"type":"error","name":"TransferCallerNotOwnerNorApproved","inputs":[]},{"type":"error","name":"TransferFromIncorrectOwner","inputs":[]},{"type":"error","name":"TransferToNonERC721ReceiverImplementer","inputs":[]},{"type":"error","name":"TransferToZeroAddress","inputs":[]},{"type":"error","name":"URIQueryForNonexistentToken","inputs":[]}];



export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}
export interface NFT {
  id: number;
  name: string;
  imageUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

  export const useNFTs = () => {
    const { isConnected, address } = useAccount();
    const signer = useEthersSigner();
    const [ownedNFTs, setOwnedNFTs] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const mintNFTContract = new ethers.Contract(
      DINOBYETE_CONTRACT,
      DINOBYETE_ABI,
      signer
    );
  
    const fetchOwnedNFTs = async () => {
      if (!isConnected || !address || !signer) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const nfts = await mintNFTContract.tokensOfOwner(address);
        // const nfts = [1,100,3];

        setOwnedNFTs(nfts.map((id: any) => Number(id))); 
      } catch (err) {
        console.error('Error fetching NFTs:', err);
        setError('Failed to fetch owned NFTs');
      } finally {
        setIsLoading(false);
      }
    };
  useEffect(() => {
    fetchOwnedNFTs();
  }, [address, signer]);

  
  return {
    ownedNFTs,
    isLoading,
    error,
    refetch: fetchOwnedNFTs
  };
}; 