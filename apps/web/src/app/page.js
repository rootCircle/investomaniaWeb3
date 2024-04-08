"use client";
import Actions from "@/components/Actions";
import CommonOperations from "@/components/CommonOperations";
import PinToIPFSUpload from "@/components/PinToIPFSUpload";
import { useState } from "react";

export default function Home() {
  const [signer, setSigner] = useState(null);
  const [NFTContract, setNFTContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  return (
    <div className="bg-black h-min-[100vh]">
      <div className="mt-auto p-10">
        <h1 className="text-[3rem] text-transparent bg-gradient-to-r from-blue-400 to-lime-600 bg-clip-text font-bold">pip install blockchain</h1>
        <div className="border border-white rounded-xl p-4 mt-12 mx-12">
          <CommonOperations
            signer={signer}
            setSigner={setSigner}
            NFTContract={NFTContract}
            setNFTContract={setNFTContract}
          />

          <PinToIPFSUpload />
        </div>

        <div className="border border-white rounded-xl p-4 mt-8 mx-12">
          <Actions
            signer={signer}
            setSigner={setSigner}
            NFTContract={NFTContract}
            setNFTContract={setNFTContract}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
          />
        </div>

        <div className="mt-[5rem] text-[5rem] mx-12"><span className="text-[5rem] text-transparent bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text font-bold">
          delete that screenshot</span> 😉
        </div>
      </div>
    </div>
  );
}
