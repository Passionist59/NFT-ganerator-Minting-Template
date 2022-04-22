import Head from 'next/head'
import Image from 'next/image'

import Image1 from "../assets/img/019.png";
import Image2 from "../assets/img/Untitled-1.png";
import Image3 from "../assets/img/eth.png";
import styles from '../assets/styles/style.module.css';
import { SiDiscord } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { FaEthereum } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section
      id="key"
      className="relative block bg-gray-100"
      style={{ backgroundColor: "#370d4c" }}
    >
      <div className="container max-w-7xl mx-auto px-4 mb-14 pt-10">
        <div className="flex justify-center">
          <button className={styles.btn_custom}>Key Information</button>
        </div>

        <div
          className="grid  md:grid-cols-3
          md:justify-between mt-12 gap-20  lg:gap-x-40"
        >
          <div>
            <div
              className=" w-full mx-auto key-image rounded-lg"
              style={{
                border: "solid 1px #ffffff40",
                background: "linear-gradient(45deg, #793b992b, #ffffff40",
              }}
            >
              <Image src={Image1} alt="" className="mx-auto" />
            </div>
            <p className="text-white  max-w-xs mx-auto w-full mt-6 text-center font-medium ">
              1888 KoiGuys with more than 8 million Combinations!
            </p>
          </div>
          <div>
            <div
              className=" w-full mx-auto key-image rounded-lg"
              style={{
                border: "solid 1px #ffffff40",
                background: "linear-gradient(45deg, #793b992b, #ffffff40",
              }}
            >
              <Image src={Image2} alt="" className="mx-auto" />
            </div>
            <p className="text-white  max-w-xs mx-auto w-full mt-6 text-center font-medium ">
              Pricing: 0.08 ETH Flat price to give everyone a fair chance to
              join the club!
            </p>
          </div>
          <div>
            <div
              className="w-full mx-auto key-image rounded-lg"
              style={{
                border: "solid 1px #ffffff40",
                background: "linear-gradient(45deg, #793b992b, #ffffff40",
              }}
            >
              <Image src={Image3} alt="" className="mx-auto" />
            </div>
            <p className="text-white  max-w-xs mx-auto w-full mt-6 text-center font-medium ">
              Our ERC-721-KoiGuys come with full ownership & commercial usage
              rights.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="container mt-8 pb-8">
        <div className="grid grid-flow-col justify-center text-center items-center gap-4 text-white mb-4">
          <a href="https://discord.gg/MtudMRc4zd" target="_blank" rel="noreferrer" >
            <span className="text-indigo-500 hover:text-indigo-400 text-4xl  duration-300 transition-all ">
              <SiDiscord />
            </span>
          </a>

          <a href="https://twitter.com/KoiGuysNFT" target="_blank" rel="noreferrer" className="text-center">
            <span className="text-indigo-500 hover:text-indigo-400 text-4xl  duration-300 transition-all">
              <FaTwitter />
            </span>
          </a>

          <a href="https://ropsten.etherscan.io/address/0x5Ab29A9B994B5Dc65296559071Fe7D06d0527C73" target="_blank" rel="noreferrer" className="text-center">
            <span className="text-indigo-500 hover:text-indigo-400 text-4xl  duration-300 transition-all">
              <FaEthereum />
            </span>
          </a>
        </div>
        <div className="flex flex-wrap mt-12 lg:mt-0 pb-8 justify-center">
          <p className="text-white">Copyright KoiGuys 2022</p>
        </div>
      </div>
    </section>
  );
}
