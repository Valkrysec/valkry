(function(global) {
    // Polyfill for module.exports (simulates UMD)
    const exports = {};

    // WalletConnect Universal Provider (simplified)
    const WalletConnectProvider = window.WalletConnectProvider || {};
    WalletConnectProvider.UniversalProvider = function(options) {
        this.projectId = options.projectId;
        this.relayUrl = options.relayUrl || 'wss://relay.walletconnect.com';
        this.enable = async function() {
            const provider = new global.Web3Modal.EthereumProvider({
                projectId: this.projectId,
                chains: [{ chainId: 1, rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_ID' }]
            });
            await provider.connect();
            return provider;
        };
    };

    // Web3Modal Core (simplified)
    const Web3Modal = {
        default: function(options) {
            this.providerOptions = options.providerOptions;
            this.theme = options.theme;
            this.connect = async function() {
                const provider = new this.providerOptions.walletconnect.package({
                    projectId: this.providerOptions.walletconnect.options.projectId
                });
                const connectedProvider = await provider.enable();
                return connectedProvider;
            };
        }
    };

    // Expose to global scope
    global.Web3Modal = Web3Modal;
    global.WalletConnectProvider = WalletConnectProvider;

})(window);
