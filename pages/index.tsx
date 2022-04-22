import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from './components/Header'
import TeamSection from './components/TeamSection'
import Mint from './components/Mint'
import ContactSection from './components/ContactSection'

const Home: NextPage = () => {
  return (
    <div className="absolute w-full z-20">
      <Head>
        <title>NFT-Minting-Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <TeamSection />
      <Mint />
      <ContactSection />

    </div>
  )
}

export default Home
