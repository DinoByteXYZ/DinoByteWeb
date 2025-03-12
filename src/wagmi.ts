import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  optimism,
  // bsc,
  sonic
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Dinobyte',
  projectId: '8ee6ddecd909d130dce1b556c74a09c0',
  chains: [
    // mainnet,
    // optimism,
    // bsc,
    sonic,
  ],
  ssr: true,
});
