import Head from 'next/head'
import Image from 'next/image'

import Image1 from "../assets/img/019.png";
import Image2 from "../assets/img/Untitled-1.png";
import Image3 from "../assets/img/eth.png";
import styles from '../assets/styles/style.module.css';

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
          <div className="">
            <div
              className=" w-full mx-auto key-image"
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
          <div className="">
            <div
              className=" w-full mx-auto key-image"
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
          <div className="">
            <div
              className=" w-full mx-auto py-5 key-image"
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
        <div className="flex flex-wrap mt-12 lg:mt-0 pb-8 justify-center">
          <p className="text-white">Copyright KoiGuys 2022</p>
        </div>
      </div>
    </section>
  );
}
