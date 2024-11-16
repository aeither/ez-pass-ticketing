## Deploy

```bash
source .env && rm -rf cache out && forge build && forge script --chain 480 script/Counter.s.sol:CounterScript --rpc-url https://worldchain-mainnet.g.alchemy.com/public --broadcast --verify --verifier blockscout  --verifier-url "https://worldscan.org/" -vvvv --private-key ${PRIVATE_KEY} --legacy
```

Testnet

```bash
source .env && rm -rf cache out && forge build && forge script --chain 4801 script/Counter.s.sol:CounterScript --rpc-url https://worldchain-sepolia.g.alchemy.com/public --broadcast --verify --verifier blockscout  --verifier-url "https://sepolia.worldscan.org/" -vvvv --private-key ${PRIVATE_KEY} --legacy
```

## infos

Currency symbol
ETH
Network URL
https://worldchain-mainnet.g.alchemy.com/public
Chain ID
480
Network name
World Chain
Block explorer URL
https://worldscan.org


4801
https://worldchain-sepolia.g.alchemy.com/public
https://sepolia.worldscan.org

