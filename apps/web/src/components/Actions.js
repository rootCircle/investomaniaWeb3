import React from "react";
import {
  addInvestment,
  dealStartApproval,
  revertInvestment,
  transferAllBackPerDeal,
} from "@/utils/blockchainHelper/blockchain";
import {
  initWallet,
  mintAndTransferToSystem,
  signMessage,
  systemApprovesDeal,
  verifySignedMessage,
} from "@/utils/blockchainInterface";

export default function Actions({
  signer,
  setSigner,
  NFTContract,
  setNFTContract,
  walletAddress,
  setWalletAddress,
}) {
  const initWalletHandler = async () => {
    let { signer, walletAddress, contractInstance } = await initWallet();
    setSigner(signer);
    setNFTContract(contractInstance);
    setWalletAddress(walletAddress);
  };

  const signMessageHandler = async () => {
    console.log(await signMessage(signer, walletAddress));
  };

  const verifyMessageHandler = async () => {
    console.log(
      await verifySignedMessage(walletAddress, prompt("Enter"), walletAddress)
    );
  };

  const mintAndTransferToSystemHandler = async () => {
    await mintAndTransferToSystem(
      NFTContract,
      "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA",
      "sdfjhsjkd"
    );
  };

  const approveDealHandler = async () => {
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
  };

  const rejectDealHandler = async () => {
    await systemApprovesDeal(NFTContract, false, {
      actorAddress: "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA",
      tokenID: 0,
    });
  };

  const makeInvestmentHandler = async () => {
    let res = await addInvestment(
      NFTContract,
      "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA",
      "0",
      20
    );
    console.log(res);
  };

  const approvePostFreezingHandler = async () => {
    dealStartApproval(NFTContract, "0", true);
  };

  const rejectPostFreezingHandler = async () => {
    dealStartApproval(NFTContract, "0", false);
  };

  const prematureWithdrawalHandler = async () => {
    revertInvestment(NFTContract, 0);
  };

  const returnMoneyAtMaturityHandler = async () => {
    transferAllBackPerDeal(NFTContract, "0");
  };

  const actions = [
    { label: "Init Wallet", onClick: initWalletHandler },
    { label: "Sign Message", onClick: signMessageHandler },
    { label: "Verify Message", onClick: verifyMessageHandler },
    {
      label: "Company mint NFT and transfer to System",
      onClick: mintAndTransferToSystemHandler,
    },
    {
      label: "System Approves deal (create and 30%)",
      onClick: approveDealHandler,
    },
    {
      label: "System Reject Deal (NFT return to company)",
      onClick: rejectDealHandler,
    },
    { label: "Make investment", onClick: makeInvestmentHandler },
    {
      label: "Approve post freezing period! (Yes = Company transfer)",
      onClick: approvePostFreezingHandler,
    },
    {
      label: "Approve post freezing period! (No = Return back to investors)",
      onClick: rejectPostFreezingHandler,
    },
    {
      label: "Investor Prematurely ask for Money before freezing",
      onClick: prematureWithdrawalHandler,
    },
    {
      label: "Return Money at time of maturity",
      onClick: returnMoneyAtMaturityHandler,
    },
  ];

  return (
    <div>
      <h1 className="text-[2rem] text-white font-semibold">Actions</h1>
      {actions.map(({ label, onClick }) => (
        <button
          key={label}
          className="bg-white text-black m-4 rounded p-3"
          onClick={onClick}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
