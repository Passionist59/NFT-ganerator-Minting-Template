import styles from '../assets/styles/style.module.css';

function TeamSection() {
  return (
    <section
      id="about"
      className="pt-20 pb-20"
      style={{ backgroundColor: "#370d4c" }}
    >
      <div className="container px-4">
        <div className="flex justify-center -mt-4 relative z-50">
          <button className={styles.btn_custom}>About us</button>
        </div>
        <p className="text-white font-medium text-center max-w-6xl mx-auto mt-6">
        KoiGuys are Collection of 1888 Beautiful Koi swimming on the Eth blockchain,
         randomly generated using more than 150+ characteristics! They are stored safely and 
         securely on the Ethereum blockchain and hosted on OpenSea. KoiGuys will be sold for 
         .08 ETH each! Stake your Koi for utility token $KOIFISH, for future drops, 
         breeding and much more!
        </p>
      </div>
    </section>
  );
}
export default TeamSection;
