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
  
  export default function CommonOperations({ signer, setSigner, NFTContract, setNFTContract }) {
      
      const connectWallet = async () => {
          console.log(signer);
          setSigner(await connect());
        };
        
        const transfer = async () => {
            await transferETH(signer, "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA", "0.00001");
    };
  
    const ContractSetter = () => {
        console.log(NFTContract);
        setNFTContract(contract(NFTContractAddress, NFT_ABI, signer));
    };
    
    const mintNFTTask = async () => {
        let res = await mintNFT(NFTContract, "0x947221A97B5D546ad08AD0102a57eefA815B5f46", "https://lime-adjacent-gamefowl-120.mypinata.cloud/ipfs/QmZfMjpbkjMPcBj59oAxBPwKmmUv2VBR5N6mWewGi7HPyJ");
        console.log(JSON.stringify(res));
        res && console.log(`https://sepolia.etherscan.io/nft/${res.nftAddress}/${res.tokenID}`);
    };
    
    const NFTTransferTask = async () => {
        let res = await transferNFT(NFTContract, "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA", false, 0);
        console.log(res);
    };
    
    const investAdd = async () => {
        let res = await addInvestment(NFTContract, "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA", "0", 20);
        console.log(res);
    };
    
    const dealAdd = async () => {
        await addDeal(NFTContract, "0", 10, 100, parseInt(Date.now()) + 20000, parseInt(Date.now()) + 50000, 0, 10, "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA");
    };
    
    const operations = [
      { label: "connect", onClick: connectWallet },
      { label: "transferETH", onClick: transfer },
      { label: "create Contract", onClick: ContractSetter },
      { label: "mintNFT", onClick: mintNFTTask },
      { label: "transfer NFT", onClick: NFTTransferTask },
      { label: "add investment", onClick: investAdd },
      { label: "add deal", onClick: dealAdd },
      { label: "transferAllBackPerDeal", onClick: () => transferAllBackPerDeal(NFTContract, "0") },
      { label: "revertInvestment", onClick: () => revertInvestment(NFTContract, 2) },
      { label: "dealStartApproval", onClick: () => dealStartApproval(NFTContract, "0", true) },
    ];
    
    return (
        <div>
        <h1 className="text-[2rem] text-white font-semibold"> Common Atomic Operations (Hardcoded) </h1>
        {operations.map(({ label, onClick }) => (
          <button key={label} className="bg-white text-black m-4 rounded p-3" onClick={onClick}>
            {label}
          </button>
        ))}
      </div>
    );
  }
  
