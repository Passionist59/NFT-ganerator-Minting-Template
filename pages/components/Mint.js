import { useState, useEffect } from "react";
import {ethers} from "ethers";
import contract from "../components/ABI/KoiGuys.json";
import WalletModal from "../components/mint/WalletModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
const Mint = () => {
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [chainId, setChainId] = useState();
  const [availableWallet, setAvailableWallet] = useState('');
  const [value, setValue] = useState(1);
  const [signer, setSigner] = useState();
  //const [walletAddress, setWalletAddress] = useState();
  const minus = () => {
    if (value > 1) {
      setValue((prev) => prev - 1);
    }
  };
  const plus = () => {
    if (Number(value) < 5) {
      setValue((prev) => Number(prev) + 1);
    }
  };
  useEffect(() => {
    if (chainId !== undefined && chainId !== parseInt(process.env.REACT_APP_NETWORK_ID)) {
      toast.error('Please choose the Ethereum network!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
    }
  }, [chainId])
  useEffect(() => {
    const {ethereum} = window;
    if (!ethereum) {
      toast.error('Please make sure you have wallet extention!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
    } else {
      if(window.ethereum.isCoinbaseWallet){
        setAvailableWallet('coinbase');
      }else if(window.ethereum.isMetaMask){
        setAvailableWallet('metamask');
      }
      if(window.ethereum.providers){
        setAvailableWallet('both');
      } 
    }
    console.log(window.ethereum)
  },[])

  const connectCoinbaseWalletHandler = async () => {
    setShowConnectWallet(false);
    var coinbaseProvider;
    if(availableWallet === 'both'){
      coinbaseProvider = window.ethereum.providers.find((provider) => provider.isCoinbaseWallet);
    }
    else if(availableWallet === 'coinbase'){
      coinbaseProvider = window.ethereum
    }
    else{
      toast.error('Please make sure you have CoinBase!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
      return;
    }
    await coinbaseProvider.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(coinbaseProvider);
    const signer_coinbase = provider.getSigner();
    setWalletConnected(true);
    setSigner(signer_coinbase);
    //setWalletAddress(await signer_coinbase.getAddress())
    const { chainId } = await provider.getNetwork();
    setChainId(chainId); 
    toast.success('Your wallet has been successfully connected!', {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: true,
    });
  }

  const connectMetaMaskHandler = async () => {
    setShowConnectWallet(false);
    var metamaskProvider;
    if(availableWallet === 'both'){
      metamaskProvider = window.ethereum.providers.find((provider) => provider.isMetaMask);
    }
    else if(availableWallet === 'metamask'){
      metamaskProvider = window.ethereum
    }
    else{
      toast.error('Please make sure you have MetaMask!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
      return;
    }
    await metamaskProvider.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(metamaskProvider);
    const signer_metamask = provider.getSigner();
    setSigner(signer_metamask);
    //setWalletAddress(await signer_metamask.getAddress());
    const { chainId } = await provider.getNetwork();
    setWalletConnected(true);
    setChainId(chainId); 
    toast.success('Your wallet has been successfully connected!', {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: true,
    });
  }


  const createNFTs = async () => {
    if (!walletConnected) {
      toast.error('Please connect your wallet!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
      return;
    }
    console.log(process.env.REACT_APP_NETWORK_ID)
    if (chainId !== parseInt(process.env.REACT_APP_NETWORK_ID)) {
      toast.error('Please choose the Ethereum network!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
      return;
    }
    console.log("balance:", await signer.getBalance());
    const balance = await signer.getBalance();
    const amount = 0.08 * value;
    const options = {value: ethers.utils.parseEther(amount.toString())};
    console.log(parseInt(balance._hex, 16));
    console.log(options,parseInt(options.value._hex, 16));
    if (parseInt(balance._hex, 16) - parseInt(options.value._hex, 16) < 0){
      toast.error('Insufficient Fund!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
      });
      return;
    }
    console.log(contract);
    const nftContract = new ethers.Contract(contract.address, contract.abi, signer);
    console.log(nftContract);
    await nftContract.createToken(value, options);
  }

  return (
    <>
      <div className="bg-background min-h-screen py-4 bg-cover bg-center mint">
        <div className="header flex justify-between   items-center px-4 py-2 md:py-0  max-w-7xl mx-auto">
          <Link to="/" className="">
            <img
              src={Logo}
              className="w-40 md:w-60 hidden md:block py-2"
              alt=""
            />
            <img src={Logo2} className="w-40 md:w-60 md:hidden" alt="" />
          </Link>
          {
          !walletConnected 
          ?
          <button className="btn-custom h-auto small" onClick={() => setShowConnectWallet(true)}>Connect</button>
          :
          <></>
          // <button className="bg-white bg-opacity-20 shadow-2xl  rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-3xl text-white py-1 font-bold">Wallet: {walletAddress}</button>
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
                <button onClick={minus}>
                  <i className="fas fa-minus"></i>
                </button>
                <input
                  type="tell"
                  className="bg-transparent h-full w-full focus:outline-none text-center font-bold"
                  name=""
                  id=""
                  disabled
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={plus}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <button className="btn-custom h-auto small" onClick={createNFTs}>Mint</button>
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
                  onClick={() => setValue(5)}
                >
                  5
                </button>
              </div>
            </div>
            <img src={Logo2} alt="" className="hidden sm:block mx-auto mt-4" />
          </div>
        </div>
      </div>
      <footer
        className="border-t-2 border-white py-6 text-center"
        style={{ backgroundColor: "#13241E" }}
      >
        <p className="text-white font-medium">Copyright KoiGuys 2022</p>
      </footer>

      <WalletModal show = {showConnectWallet} setShow = {setShowConnectWallet} connectCoinbaseWalletHandler = {connectCoinbaseWalletHandler} connectMetaMaskHandler = {connectMetaMaskHandler} />
      <ToastContainer 
          theme="colored"
        />
    </>
  );
};

export default Mint;
