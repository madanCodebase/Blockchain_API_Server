import { Alchemy, Network, Wallet, Utils } from "alchemy-sdk";
import dotenv from "dotenv"

dotenv.config();
const { ALCHEMY_API_KEY, PRIVATE_KEY } = process.env;


async function main() {

    const config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: Network.MATIC_MUMBAI,
      };

    const alchemy = new Alchemy(config);

    let wallet = new Wallet(PRIVATE_KEY);

    const nonce = await alchemy.core.getTransactionCount(
        wallet.address,
        "latest"
      );
    

    const accountAddr = "0x43eDA7715b3bC880F886F335b016a33771CA5d01";

    const tokenContractAddresses = ["0x6e6B2a630Fd98E4C674f32206eaF164a1Ec9a93D"];


    const data = await alchemy.core.getTokenBalances(
        accountAddr,
        tokenContractAddresses
        );

    const tokenBalance = data["tokenBalances"][0]["tokenBalance"]/Math.pow(10.0, 18.0)


    console.log("Token balance for Address");
    console.log(tokenBalance);

    const metadata = await alchemy.core.getTokenMetadata(
      "0x6e6B2a630Fd98E4C674f32206eaF164a1Ec9a93D"
    );
    
    console.log("TOKEN METADATA");
    console.log(metadata);

}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });