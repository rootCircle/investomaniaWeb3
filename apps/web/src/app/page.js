"use client";
import {
  NFTContractAddress,
  NFT_ABI,
  addDeal,
  addInvestment,
  connect,
  contract,
  dealStartApproval,
  mintNFT,
  revertInvestment,
  transferAllBackPerDeal,
  transferETH,
  transferNFT,
} from "@/utils/blockchainHelper/blockchain";
import { initWallet, mintAndTransferToSystem, signMessage, systemApprovesDeal, verifySignedMessage } from "@/utils/interfake";
import { useState } from "react";

export default function Home() {
  const [signer, setSigner] = useState(null);
  const [NFTContract, setNFTContact] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const doThis = async () => {
    console.log(signer);
    setSigner(await connect());
  };

  const transfer = async () => {
    await transferETH(
      signer,
      "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA",
      "0.00001"
    );
  };

  const ContractSetter = () => {
    console.log(NFTContract);
    setNFTContact(contract(NFTContractAddress, NFT_ABI, signer));
  };

  const mintNFTKaro = async () => {
    let res = await mintNFT(
      NFTContract,
      "0x947221A97B5D546ad08AD0102a57eefA815B5f46",
      "https://lime-adjacent-gamefowl-120.mypinata.cloud/ipfs/QmZfMjpbkjMPcBj59oAxBPwKmmUv2VBR5N6mWewGi7HPyJ"
    );
    console.log(JSON.stringify(res));
    console.log(
      `https://sepolia.etherscan.io/nft/${res.nftAddress}/${res.tokenID}`
    );
  };

  const NFTTransferKaro = async () => {
    let res = await transferNFT(
      NFTContract,
      "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA",
      false,
      0
    );
    console.log(res);
  };

  const investAdd = async () => {
    let res = await addInvestment(
      NFTContract,
      "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA",
      "0",
      20
    );
    console.log(res);
  };

  const dealAdd = async () => {
    await addDeal(
      NFTContract,
      "0",
      10,
      100,
      parseInt(Date.now()) + 20000,
      parseInt(Date.now()) + 50000,
      0,
      10,
      "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA"
    );
  };

  return (
    <div>
      <div>

        <h1 className="text-[3rem] font-extrabold"> Common Atomic Operations (Hardcoded) </h1>
        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={doThis}
        >
          connect
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={transfer}
        >
          transferETH
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={ContractSetter}  
        >
          create Contract
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={mintNFTKaro}
        >
          mintNFT
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={NFTTransferKaro}
        >
          transfer NFT
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={investAdd}
        >
          add investment
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={dealAdd}
        >
          add deal
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            await transferAllBackPerDeal(NFTContract, "0");
          }}
        >
          transferAllBackPerDeal
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            await revertInvestment(NFTContract, 2);
          }}
        >
          revertInvestment
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            dealStartApproval(NFTContract, "0", true);
          }}
        >
          dealStartApproval
        </button>
      </div>

      <div>
        <h1 className="text-[3rem] font-extrabold">Actions</h1>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            let {signer, walletAddress, contractInstance} = await initWallet();
            setSigner(signer);
            setNFTContact(contractInstance);
            setWalletAddress(walletAddress);
          }}
        >
          Init Wallet
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            console.log(await signMessage(signer, walletAddress))
          }}
        >
          Sign Message
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            console.log(await verifySignedMessage(walletAddress, prompt("Enter"), walletAddress))
          }}
        >
          Verify Message
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            await mintAndTransferToSystem(NFTContract, "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA", "sdfjhsjkd");
          }}
        >
          Company mint NFT and transfer to System
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            await systemApprovesDeal(NFTContract, true, {
              dealID: "0",
              minAmt: 10,
              targetAmt: 100,
              floatingEndTimestamp: parseInt(Date.now()) + 20000,
              expirationTimestamp: parseInt(Date.now()) + 50000,
              tokenID: 3,
              interestRate: 10,
              companyAddress: "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA",
            });
          }}
        >
          System Approves deal (create and 30%)
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            await systemApprovesDeal(NFTContract, false, {
              actorAddress: "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA",
              tokenID: 0,
            });
          }}
        >
          System Reject Deal (NFT return to company)
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            let res = await addInvestment(
              NFTContract,
              "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA",
              "0",
              20
            );
            console.log(res);
          }}
        >
          Make investment
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            dealStartApproval(NFTContract, "0", true);
          }}
        >
          Approve post freezing period! (Yes = Company transfer)
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            dealStartApproval(NFTContract, "0", false);
          }}
        >
          Approve post freezing period! (No = Return back to investors)
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            revertInvestment(NFTContract, 0);
          }}
        >
          Investor Prematurely ask for Money before freezing
        </button>

        <button
          className="bg-white text-black m-4 rounded p-3"
          onClick={async () => {
            transferAllBackPerDeal(NFTContract, "0");
          }}
        >
          Return Money at time of maturity
        </button>
      </div>
    </div>
  );
}
