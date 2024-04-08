"use client";

import { pinFileToIPFS } from "@/utils/blockchainHelper/sendToIPFS";
import { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const resData = await pinFileToIPFS(formData);
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FileInput selectedFile={selectedFile?.name} changeHandler={changeHandler} handleSubmission={handleSubmission}/>  
    </>
  );
}

const FileInput = ({selectedFile, changeHandler, handleSubmission}) => {

  return (
    <form className="border p-2 rounded-md border-red-200 inline-block">
      <span className="ml-3 flex flex-row items-center">
        <input
          type="file"
          id="custom-input"
          onChange={changeHandler}
          hidden
        />
        <label
          htmlFor="custom-input"
          className="text-slate-500 mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-pink-50
           hover:bg-pink-100 cursor-pointer"
        >
          Choose file
        </label>
        <label className="text-sm text-slate-500">{selectedFile || "No file selected!"}</label>

        <button className="mx-4 text-black bg-white rounded-lg p-2" onClick={handleSubmission}>
        Upload to IPFS
      </button>
      </span>
    </form>
  );
};


export default App;
