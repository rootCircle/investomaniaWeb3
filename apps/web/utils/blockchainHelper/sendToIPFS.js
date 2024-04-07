// https://lime-adjacent-gamefowl-120.mypinata.cloud/ipfs/

import axios from "axios";
import FormData from "form-data";
const fs = require("fs");

const PINNATA_BASE_URL = process.env.PINNATA_BASE_URL;

const pinFileToIPFS = async (fileLocation) => {
  const formData = new FormData();
  // const fileLocation = "./dummy.pdf";

  const file = fs.createReadStream(fileLocation);
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "Dummy PDF",
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${process.env.PINNATA_JWT_TOKEN}`,
        },
      }
    );
    console.log("File uploaded to IPFS:", res.data);

    const metadataObj = {
      sellerAddress: "0xaudhskdahskdi",
      createdAt: Date().toString(),
      systemAddress: "0xaksjhjdhasjkd",
      billAddress: `${PINNATA_BASE_URL}/ipfs/${res.data.IpfsHash}`,
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
            Authorization: `Bearer ${process.env.PINNATA_JWT_TOKEN}`,
          },
        }
      );
      console.log("Metadata pinned to IPFS:", metadataRes.data);
    } catch (error) {
      console.error("Error pinning metadata to IPFS:", error.message, JSON.stringify(error));
    }
  } catch (error) {
    console.error("Error uploading file to IPFS:", error.message);
  }
};

pinFileToIPFS();
