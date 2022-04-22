import styles from '../assets/styles/style.module.css';
import DefaultNavbar from './DefaultNavbar'

export default function Header() {
  return (
    <div className={styles.bg_background}>
      <DefaultNavbar />
      <div className="relative pt-16 pb-16 md:pb-32 flex content-center items-center justify-center ">
        <div className="bg-cover mint bg-center absolute top-0 w-full h-full" />
        <div className="container relative mx-auto h-full pt-36 ">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="text-gray-200">
                <p className="font-medium max-w-md text-lg mx-auto mb-8 mt-4 md:mt-0">
                KoiGuys are a collection of 1888 beautiful Koi swimming on the Ethereum blockchain.
                </p>
              </div>
              <div className="grid grid-flow-col justify-center text-center items-center gap-4 text-white">
                <a href="https://discord.gg/MtudMRc4zd" target="_blank" rel="noreferrer" ></a>
                <a href="/" target="_blank" rel="noreferrer" className="text-center" ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
