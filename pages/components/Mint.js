import { useState, useEffect } from "react";
import Countdown from 'react-countdown';
import { ToastContainer, toast, Flip } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ethers} from "ethers";
import contract from "../ABI/coolnft.json";
import styles from '../assets/styles/style.module.css';

const { MerkleTree } = require("merkletreejs");
const keccak256 = require('keccak256');

// require('dotenv').config()
const Mint = () => {
  const [mintAddress, setMintaddress] = useState();
  const [hexProof, sethexProof] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [chainId, setChainId] = useState();
  const [value, setValue] = useState(1);
  const [signer, setSigner] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [url, setURL] = useState("");

  useEffect(() => {
    if (chainId !== undefined && chainId !== 4) {
      toast.warn('Please choose the Rinkeby network!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
    }
  }, [chainId])

  const connectWallet = async () => {

    const metamaskProvider = window.ethereum;
    
    await metamaskProvider.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(metamaskProvider);
    const signer_metamask = provider.getSigner();
    
    setSigner(signer_metamask);
    const currentAccount = await signer_metamask.getAddress()
    setWalletAddress(currentAccount);
    const { chainId } = await provider.getNetwork();
    
    setChainId(chainId);
    setWalletConnected(true);

    const whitelistAddresses = contract.whitelist;
    const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    whitelistAddresses.map((addr,index) => {
      if (addr == currentAccount ){
        setMintaddress(leafNodes[index]);
        sethexProof(merkleTree.getHexProof(leafNodes[index]));
        console.log("Gethexproof", merkleTree.getHexProof(leafNodes[index]));
      }
    });
    setURL("https://testnets.opensea.io/assets/"+contract.address)
  }

  const renderer = ({ days, hours, minutes,seconds, completed }) => {
    if (completed) {
      return '';
    } else {
      // Render a countdown
      
      return (<div className="counterdown">
        <div className="countdown-days countdown-round">
            <div className="days">
              {days}
            </div>
            <div className="counterdown-text">
              days
            </div>
        </div>
        <div className="timer-space">:</div>
        <div className="countdown-days countdown-round">
            <div className="days">
              {hours}
            </div>
            <div className="counterdown-text">
              hours
            </div>
        </div>
        <div className="timer-space">:</div>
        <div className="countdown-days countdown-round">
            <div className="days">
              {minutes}
            </div>
            <div className="counterdown-text">
              minutes
            </div>
        </div>
        <div className="timer-space">:</div>
        <div className="countdown-days countdown-round">
            <div className="days">
              {seconds}
            </div>
            <div className="counterdown-text">
              seconds
            </div>
        </div>
      </div>
      )
    }
  };

  const createNFTs = async () => {

    if (!walletConnected) {
      toast.warn('Please connect your wallet!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
      return;
    }
    if (chainId == undefined || chainId !== 4) {
      toast.warn('Please choose the Rinkeby network!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
      return;
    }
    const balance = await signer.getBalance();
    console.log(balance);
    let amount;
    let options;

    console.log(contract);
    const nftContract = new ethers.Contract(contract.address, contract.abi, signer);
    console.log(nftContract);
    if (await nftContract.merkletreeVerify(hexProof) && hexProof) {
      amount = 0.01 * value;
      options = {value: ethers.utils.parseEther(amount.toString())};
      if (parseInt(balance._hex, 16) - parseInt(options.value._hex, 16) < 0){
        toast.warn('Insufficient Fund!', {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          hideProgressBar: true,
        });
        return;
      }
      try{
        await nftContract.whitelistMint(walletAddress, value, hexProof, options);
        const m = await nftContract.totalSupply();
        console.log("sdfgsdfg",m.toNumber());
        setURL("https://testnets.opensea.io/assets/"+contract.address+"/"+m.toNumber());
        // nftContract.on("mint", (address, event) => {
        //   toast.success('Success Full mint!', {
        //     position: "top-right",
        //     autoClose: 3000,
        //     closeOnClick: true,
        //     hideProgressBar: true,
        //   });
        // });
      } catch(error){
        if (error["code"] === 4001) {
          toast.error(error["message"].split(":")[1], {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "dark",
            transition: Flip,
          });
        } else {
          console.log("Error",error["message"].split(":"));
          toast.error(error["message"].split(":")[11].split('"')[0], {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "dark",
            transition: Flip,
          });
        }
      }
    } else {
      amount = 0.08 * value;
      options = {value: ethers.utils.parseEther(amount.toString())};
      if (parseInt(balance._hex, 16) - parseInt(options.value._hex, 16) < 0){
        toast.warn('Insufficient Fund!', {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          hideProgressBar: true,
        });
        return;
      }
      try{
        const m = await nftContract.publicSaleMint(walletAddress, value, options);
        setURL("https://testnets.opensea.io/assets/"+contract.address+"/"+m.toNumber());
        // nftContract.on("mint", (address, event) => {
        //   toast.success('Success Full mint!', {
        //     position: "top-right",
        //     autoClose: 3000,
        //     closeOnClick: true,
        //     hideProgressBar: true,
        //   });
        // });
      } catch(error){
        if (error["code"] === 4001) {
          toast.error(error["message"].split(":")[1], {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "dark",
            transition: Flip,
          });
        } else {
          toast.error(error["message"].split(":")[11].split('"')[0], {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "dark",
            transition: Flip,
          });
        }
      }
    }
  }

  return (
    <div id='mint' className={styles.mint_background}>
      <div className="bg-background min-h-screen py-4 bg-cover bg-center mint">
        <div className="header flex justify-between justify-end items-center px-4 py-2 md:py-0  max-w-7xl mx-auto">
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
        <div className={styles.opensea_btn_container}>
          <a href={url} target="_blank" rel="noreferrer" className={styles.opensea_btn}>View Opensea</a>
        </div>
        <Countdown 
            date={Date.now() + 1.728e+8}
            renderer={renderer}
          />

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
