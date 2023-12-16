import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface BalanceResponse {
  data: {
    items: {
      balance: string;
      contract_name: string;
      contract_ticker_symbol: string;
    }[];
  };
}

const CovalentBalance: React.FC = () => {
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const apiUrl = 'https://api.covalenthq.com/v1/{chain_id}/address/{address}/balances_v2/';
      const chainId = process.env.NEXT_PUBLIC_CHAIN; // Replace with the chain ID for the blockchain you're interested in

      const address = process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS || ''; // Use the environment variable for the Ethereum address

      const apiKey = process.env.NEXT_PUBLIC_COVALENT_API; // Replace with your Covalent API key

      try {
        const response = await axios.get<BalanceResponse>(
          apiUrl.replace('{chain_id}', String(chainId)).replace('{address}', address),
          {
            params: { key: apiKey },
          }
        );

        const balanceData = response.data.data.items[0].balance;
        setBalance( balanceData );
        console.log('balance data ====>>>>>>>>',balanceData)
      } catch (error) {
        console.error('Error fetching balance >>>>>>>>>>>', error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      {balance !== null ? (
        <p>{balance}</p>
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
};

export default CovalentBalance;
