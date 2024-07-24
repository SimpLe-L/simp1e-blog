在Solana链上实现余额查询和代币发送功能，可以使用`@solana/web3.js`库。下面是如何在Solana链上实现这些功能的示例代码。

### 安装依赖

首先，确保你已经安装了`@solana/web3.js`库：

```bash
npm install @solana/web3.js
```

### 1. 余额查询

  ```javascript
import { Connection, PublicKey } from '@solana/web3.js';

const getSolBalance = async (publicKey) => {
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const balance = await connection.getBalance(new PublicKey(publicKey));
  return balance / 1e9; // Convert lamports to SOL
};

// Example usage:
// const balance = await getSolBalance('YourPublicKeyHere');
// console.log(`Balance: ${ balance } SOL`);
```

### 2. 代币发送

  ```javascript
import { Connection, PublicKey, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';

const sendSolTransaction = async (fromSecretKey, toPublicKey, amount) => {
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const fromKeypair = Keypair.fromSecretKey(new Uint8Array(fromSecretKey));
  const toPubkey = new PublicKey(toPublicKey);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toPubkey,
      lamports: amount * 1e9, // Convert SOL to lamports
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
  return signature;
};

// Example usage:
// const fromSecretKey = [/* Your secret key array here */];
// const toPublicKey = 'RecipientPublicKeyHere';
// const amount = 0.1; // Amount in SOL
// const txSignature = await sendSolTransaction(fromSecretKey, toPublicKey, amount);
// console.log(`Transaction Signature: ${ txSignature } `);
```

### 3. 封装到组件中

你可以将上述功能封装到一个React组件中。

#### components / SolWallet.js

  ```jsx
import { useState } from 'react';
import { getSolBalance, sendSolTransaction } from '../utils/solUtils';

const SolWallet = () => {
  const [balance, setBalance] = useState('0');
  const [publicKey, setPublicKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleGetBalance = async () => {
    const balance = await getSolBalance(publicKey);
    setBalance(balance);
  };

  const handleSendTransaction = async () => {
    const secretKeyArray = secretKey.split(',').map(Number);
    const txSignature = await sendSolTransaction(secretKeyArray, recipient, parseFloat(amount));
    alert(`Transaction sent! Signature: ${ txSignature } `);
  };

  return (
    <div>
      <h2>Solana Wallet</h2>
      <div>
        <input
          type="text"
          placeholder="Public Key"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
        />
        <button onClick={handleGetBalance}>Get Balance</button>
        <p>Balance: {balance} SOL</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Secret Key (comma-separated)"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Recipient Public Key"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleSendTransaction}>Send Transaction</button>
      </div>
    </div>
  );
};

export default SolWallet;
```

#### utils / solUtils.js

  ```javascript
import { Connection, PublicKey, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';

export const getSolBalance = async (publicKey) => {
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const balance = await connection.getBalance(new PublicKey(publicKey));
  return balance / 1e9; // Convert lamports to SOL
};

export const sendSolTransaction = async (fromSecretKey, toPublicKey, amount) => {
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const fromKeypair = Keypair.fromSecretKey(new Uint8Array(fromSecretKey));
  const toPubkey = new PublicKey(toPublicKey);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toPubkey,
      lamports: amount * 1e9, // Convert SOL to lamports
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
  return signature;
};
```

这样，你就可以在Solana链上实现余额查询和代币发送功能，并将其封装到你的React组件中。


为了封装一个兼容常见公链的组件，可以遵循以下步骤：

1. ** 项目结构 **：确保项目结构清晰，便于维护和扩展。
2. ** 依赖库 **：使用`wagmi`, `viem`, `ethers`等库来处理不同区块链的交互。
3. ** 组件设计 **：创建一个主组件用于包含Tab标签和各链的功能组件。
4. ** 状态管理 **：使用React的状态管理来处理不同链的切换和数据管理。

以下是一个简化的示例代码：

### 1. 安装依赖

  ```bash
npm install wagmi ethers @solana/web3.js
```

### 2. 创建主组件

  ```jsx
// components/BlockchainTabs.js
import React, { useState } from 'react';
import { WagmiConfig, createClient } from 'wagmi';
import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';
import EthereumComponent from './EthereumComponent';
import SolanaComponent from './SolanaComponent';
import BitcoinComponent from './BitcoinComponent';

const client = createClient();

const BlockchainTabs = () => {
  const [activeTab, setActiveTab] = useState('ETH');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'ETH':
        return <EthereumComponent />;
      case 'SOL':
        return <SolanaComponent />;
      case 'BTC':
        return <BitcoinComponent />;
      default:
        return null;
    }
  };

  return (
    <WagmiConfig client={client}>
      <div>
        <div className="tabs">
          <button onClick={() => setActiveTab('ETH')}>Ethereum</button>
          <button onClick={() => setActiveTab('SOL')}>Solana</button>
          <button onClick={() => setActiveTab('BTC')}>Bitcoin</button>
        </div>
        <div className="tab-content">
          {renderActiveTab()}
        </div>
      </div>
    </WagmiConfig>
  );
};

export default BlockchainTabs;
```

### 3. 创建各链的功能组件

#### Ethereum 组件

  ```jsx
// components/EthereumComponent.js
import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useSignMessage } from 'wagmi';

const EthereumComponent = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { signMessage } = useSignMessage();
  const [message, setMessage] = useState('');

  const handleSignMessage = async () => {
    const signedMessage = await signMessage({ message });
    console.log(signedMessage);
  };

  return (
    <div>
      <h2>Ethereum</h2>
      <p>Address: {address}</p>
      <p>Balance: {balance?.formatted} ETH</p>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message to sign"
      />
      <button onClick={handleSignMessage}>Sign Message</button>
    </div>
  );
};

export default EthereumComponent;
```

#### Solana 组件

  ```jsx
// components/SolanaComponent.js
import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const SolanaComponent = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');
  const connection = new Connection('https://api.mainnet-beta.solana.com');

  const fetchBalance = async (publicKey) => {
    const balance = await connection.getBalance(new PublicKey(publicKey));
    setBalance(balance / 1e9); // Convert lamports to SOL
  };

  useEffect(() => {
    const publicKey = 'YOUR_SOLANA_PUBLIC_KEY';
    setAddress(publicKey);
    fetchBalance(publicKey);
  }, []);

  return (
    <div>
      <h2>Solana</h2>
      <p>Address: {address}</p>
      <p>Balance: {balance} SOL</p>
    </div>
  );
};

export default SolanaComponent;
```

#### Bitcoin 组件

  ```jsx
// components/BitcoinComponent.js
import React, { useState, useEffect } from 'react';
// You can use a library like bitcoinjs-lib for Bitcoin interactions

const BitcoinComponent = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchBalance = async (address) => {
      // Fetch balance from a Bitcoin API
      const balance = await fetchBitcoinBalance(address);
      setBalance(balance);
    };

    const address = 'YOUR_BITCOIN_ADDRESS';
    setAddress(address);
    fetchBalance(address);
  }, []);

  return (
    <div>
      <h2>Bitcoin</h2>
      <p>Address: {address}</p>
      <p>Balance: {balance} BTC</p>
    </div>
  );
};

export default BitcoinComponent;
```

### 4. 主页面引入组件

  ```jsx
// pages/index.js
import React from 'react';
import BlockchainTabs from '../components/BlockchainTabs';

const Home = () => {
  return (
    <div>
      <h1>Blockchain Dashboard</h1>
      <BlockchainTabs />
    </div>
  );
};

export default Home;
```

### 总结
上述代码展示了如何创建一个包含多个区块链功能的组件，并使用Tab标签进行切换。您可以根据需要继续扩展每个区块链组件的功能，例如添加交易功能、签名功能等。