// import React, { createContext, useContext, useState, useEffect } from 'react';
// // import { InjectedConnector } from '@web3-react/injected-connector';
// // import { useWeb3React } from '@web3-react/core';

// interface WalletContextType {
//   connected: boolean;
//   connecting: boolean;
//   account: string | null;
//   connectWallet: () => Promise<void>;
//   disconnectWallet: () => void;
// }

// const WalletContext = createContext<WalletContextType>({
//   connected: false,
//   connecting: false,
//   account: null,
//   connectWallet: async () => {},
//   disconnectWallet: () => {},
// });

// export const useWallet = () => useContext(WalletContext);

// // const injected = new InjectedConnector({ 
// //   supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 137]
// // });

// export const WalletProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
//   // const { active, account, activate, deactivate } = useWeb3React();
//   const active = true;
//   const account = '0x1234567890123456789012345678901234567890';
//   const activate = () => {
//     console.log('connect wallet');
//   };
//   const deactivate = () => {
//     console.log('disconnect wallet');
//   };
//   const [connecting, setConnecting] = useState(false);

//   useEffect(() => {
//     const connectOnLoad = async () => {
//       if (window.localStorage.getItem('walletConnected') === 'true') {
//         try {
//           // await activate(injected);
//         } catch (error) {
//           console.error('cannot reconnect wallet:', error);
//         }
//       }
//     };
    
//     connectOnLoad();
//   }, [activate]);
  
//   const connectWallet = async () => {
//     setConnecting(true);
//     try {
//       // await activate(injected);
//       window.localStorage.setItem('walletConnected', 'true');
//     } catch (error) {
//       console.error('connect wallet failed:', error);
//     } finally {
//       setConnecting(false);
//     }
//   };
  
//   const disconnectWallet = () => {
//     deactivate();
//     window.localStorage.removeItem('walletConnected');
//   };
  
//   return (
//     <WalletContext.Provider
//       value={{
//         connected: active,
//         connecting,
//         account,
//         connectWallet,
//         disconnectWallet
//       }}
//     >
//       {children}
//     </WalletContext.Provider>
//   );
// };