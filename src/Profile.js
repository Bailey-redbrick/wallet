import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
  useSignMessage,
} from "wagmi";

import { SiweMessage } from "siwe";

export function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { chain: activeChain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const fetchNonce = () => {
    //request nonce

    // try {
    //   const nonceRes = await fetch('/api/nonce')
    //   const nonce = await nonceRes.text()
    // } catch (error) {
    //   console.error(error)
    // }
    return "random_nonce_sdfsdfsdfsdfsdf";
  };

  const signIn = async () => {
    const nonce = fetchNonce();
    const chainId = activeChain?.id;

    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in with Ethereum to the app.",
      uri: "redbrick.land", //window.location.origin,
      version: "1",
      chainId,
      nonce: nonce,
    });

    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    });

    const verifyRes = () => {
      // Verify signature

      // const verifyRes = await fetch("/api/verify", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ message, signature }),
      // });
      console.log("/api/verify/ request body", { message, signature });
      console.log("/api/verify/ response", "elkjwo3l283jsdjfslkdfjs");
    };
    verifyRes();
  };

  if (isConnected) {
    return (
      <div>
        <img src={ensAvatar} alt="ENS Avatar" />
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        <div>Connected to {connector?.name}</div>
        <button onClick={disconnect}>Disconnect</button>
        <button onClick={signIn}>sign message</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}
export default Profile;
