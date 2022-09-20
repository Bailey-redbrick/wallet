import "./App.css";

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";
import { ConnectKitProvider, ConnectKitButton } from "connectkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Profile } from "./Profile";
import { MintNFT } from "./MintNFT";
const alchemyId = "bAKW3eTb1ePbyuImtPaIFrVPSJgXDC1P";
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: alchemyId }),
  publicProvider(),
]);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

function App() {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Profile />
        <MintNFT />
        <ConnectKitButton />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
export default App;
