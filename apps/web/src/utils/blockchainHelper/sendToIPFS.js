// https://lime-adjacent-gamefowl-120.mypinata.cloud/ipfs/

import axios from "axios";
// const fs = require("fs");

const PINATA_BASE_URL = process.env.PINATA_BASE_URL;

export const pinFileToIPFS = async (fileData) => {

  const pinataMetadata = JSON.stringify({
    name: "Dummy File",
  });
  fileData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  fileData.append("pinataOptions", pinataOptions);


  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      fileData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${fileData._boundary}`,
          Authorization: `Bearer ${process.env.PINATA_JWT_TOKEN}`,
        },
      }
    );
    console.log("File uploaded to IPFS:", res.data);
    console.log(`https://ipfs.io/ipfs/${res.data.IpfsHash}`)

    const metadataObj = {
      sellerAddress: "0xaudhskdahskdi",
      createdAt: Date().toString(),
      systemAddress: "0xaksjhjdhasjkd",
      billIpfsHash: `${res.data.IpfsHash}`,
    };

    const metadata = JSON.stringify(metadataObj);

    try {
      const metadataRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PINATA_JWT_TOKEN}`,
          },
        }
      );

      
      console.log("Metadata pinned to IPFS:", metadataRes.data);
      console.log(`https://ipfs.io/ipfs/${metadataRes.data.IpfsHash}`)
      return metadata;
    } catch (error) {
      console.error("Error pinning metadata to IPFS:", error.message, JSON.stringify(error));
    }
  } catch (error) {
    console.error("Error uploading file to IPFS:", error.message);
  }
};

// pinFileToIPFS();
