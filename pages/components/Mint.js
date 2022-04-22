import { useState, useEffect } from "react";
import {ethers} from "ethers";
import contract from "../ABI/KoiGuys.json"; 
import Logo from "../assets/img/logo2.png";
import Image from 'next/image'
import styles from '../assets/styles/style.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// require('dotenv').config()
const Mint = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [chainId, setChainId] = useState();
  const [value, setValue] = useState(1);
  const [signer, setSigner] = useState();
  const [walletAddress, setWalletAddress] = useState();

  useEffect(() => {
    if (chainId !== undefined && chainId !== 3) {
      toast.error('Please choose the Ropsten network!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
    }
  }, [chainId])

  const connectWallet = async () => {
    const metamaskProvider = window.ethereum
    
    await metamaskProvider.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(metamaskProvider);
    const signer_metamask = provider.getSigner();
    setSigner(signer_metamask);
    setWalletAddress(await signer_metamask.getAddress());
    const { chainId } = await provider.getNetwork();
    console.log(chainId);
    setChainId(chainId);
    setWalletConnected(true);
  }


  const createNFTs = async () => {
    // console.log(chainId);

    if (!walletConnected) {
      toast.warn('Please connect your wallet!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
      return;
    }
    if (chainId == undefined && chainId !== 3) {
      toast.warn('Please choose the Ropsten network!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
      return;
    }
    // console.log("balance:", await signer.getBalance());
    const balance = await signer.getBalance();
    const amount = 0.08 * value;
    const options = {value: ethers.utils.parseEther(amount.toString())};
    console.log(options);


    // console.log(parseInt(balance._hex, 16));
    // console.log(options,parseInt(options.value._hex, 16));
    // if (parseInt(balance._hex, 16) - parseInt(options.value._hex, 16) < 0){
    //   toast.warn('Insufficient Fund!', {
    //     position: "top-right",
    //     autoClose: 3000,
    //     closeOnClick: true,
    //     hideProgressBar: true,
    //   });
    //   return;
    // }
    // console.log(contract);
    // const nftContract = new ethers.Contract(contract.address, contract.abi, signer);
    // console.log(nftContract);
    // await nftContract.createToken(value, options);
  }

  return (
    <div id='mint' className={styles.mint_background}>
      <div className="bg-background min-h-screen py-4 bg-cover bg-center mint">
        <div className="header flex justify-between   items-center px-4 py-2 md:py-0  max-w-7xl mx-auto">
          <a href="/" className="">
            <Image
              src={Logo}
              className="w-10 md:w-10 py-2"
              alt=""
            />
          </a>
          {
          !walletConnected
          ?
          <button className={styles.connect_btn} onClick={() => connectWallet()}>Connect</button>
          :
          <button className={styles.connect_btn}>connected</button>
          }
          
        </div>
        <div className=" mt-40 md:mt-40 flex-col items-start flex justify-center px-4  max-w-7xl mx-auto bg-black bg-opacity-20 py-4 w-11/12 md:bg-transparent  rounded-md">
          <div className="text-white font-bold mx-auto">
            <h1 className="text-2xl font-bold uppercase text-center mb-6">
              Mint
            </h1>
            <div className="grid gap-6 grid-flow-col">
              <div>
                <p className="text-sm sm:text-base">Total NFTs are 1888</p>
              </div>
              <div>
                <p className="text-sm sm:text-base">0.08ETH per NFT</p>
              </div>
              <div>
                <p className="text-sm sm:text-base">max 5 per TX</p>
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <div className="flex mt-2 items-center ">
              <div className="bg-white bg-opacity-20 shadow-2xl  sm:w-80  py-2 rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-3xl mr-2 flex text-white px-4">
                <input
                  type="tell"
                  className="bg-transparent h-full w-full focus:outline-none text-center font-bold"
                  name=""
                  id=""
                  disabled
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <button className={styles.connect_btn} onClick={() => createNFTs()}>Mint</button>
            </div>
            <div className="mt-3">
              <div className="grid justify-start items-center grid-flow-col gap-8 w-full">
                <button
                  className=" bg-white bg-opacity-20 shadow-2xl  rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-3xl w-14 text-white py-1 font-bold"
                  onClick={() => setValue(1)}
                >
                  1
                </button>
                <button
                  className=" bg-white bg-opacity-20 shadow-2xl  rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-3xl w-14 text-white py-1 font-bold"
                  onClick={() => setValue(2)}
                >
                  2
                </button>
                <button
                  className=" bg-white bg-opacity-20 shadow-2xl  rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-3xl w-14 text-white py-1 font-bold"
                  onClick={() => setValue(3)}
                >
                  3
                </button>
                <button
                  className=" bg-white bg-opacity-20 shadow-2xl  rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-3xl w-14 text-white py-1 font-bold"
                  onClick={() => setValue(4)}
                >
                  4
                </button>
                <button
                  className=" bg-white bg-opacity-20 shadow-2xl  rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-3xl w-14 text-white py-1 font-bold"
                  onClick={() => setValue(5)}
                >
                  5
                </button>
              </div>
            </div>
            {/* <Image src={Logo2} alt="" className="hidden sm:block mx-auto mt-4" /> */}
          </div>
        </div>
      </div>
      <ToastContainer 
          theme="colored"
        />
    </div>
  );
};

export async function getStaticProps() {
  // Connect to Database using DB properties
  return {
     props: { 
        networkID: process.env.REACT_APP_NETWORK_ID
     }
  }
}

export default Mint;
