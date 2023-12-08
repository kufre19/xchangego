<template>
  <w3m-core-button></w3m-core-button>
</template>

<script>
  import { configureChains, createClient, createStorage } from "@wagmi/core";
  import {
    arbitrum,
    avalanche,
    bsc,
    fantom,
    mainnet,
    optimism,
    polygon,
  } from "@wagmi/chains";
  import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
  } from "@web3modal/ethereum";
  import { Web3Modal } from "@web3modal/html";

  export default {
    name: "MyComponent",
    data() {
      return {
        walletConnectId: walletconnectid,
      };
    },
    created() {
      if (this.walletConnectId !== null) {
        const chains = [
          arbitrum,
          avalanche,
          bsc,
          fantom,
          mainnet,
          optimism,
          polygon,
        ];

        // 2. Configure wagmi client
        const { provider } = configureChains(chains, [
          w3mProvider({ projectId: this.walletConnectId }),
        ]);
        const wagmiClient = createClient({
          autoConnect: true,
          connectors: w3mConnectors({
            chains,
            version: 1,
            projectId: this.walletConnectId,
          }),
          provider,
          storage: createStorage({ storage: window.localStorage }),
        });

        // 3. Create ethereum and modal clients
        const ethereumClient = new EthereumClient(wagmiClient, chains);
        new Web3Modal(
          {
            projectId: this.walletConnectId,
          },
          ethereumClient
        );
      }
    },
  };
</script>
