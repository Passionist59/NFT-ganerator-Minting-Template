import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useState } from "react";
// import { Link } from "react-router-dom";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
// import NavLink from "@material-tailwind/react/NavLink";
// import image from "assets/img/logo.png";
import Logo from "../assets/img/logo2.png";
// import { Link } from "react-router-dom";

export default function DefaultNavbar() {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
      <>
    <Navbar color="transparent" navbar>
      <NavbarContainer className="header">
        <NavbarWrapper>
          {/* <Link href="/">
            <NavbarBrand>
              <Image
                src={Logo}
                alt=""
                className="w-28 lg:w-auto"
              />
            </NavbarBrand>
          </Link> */}
          <NavbarToggler
            onClick={() => setOpenNavbar(!openNavbar)}
            color="white"
          />
        </NavbarWrapper>
        <NavbarCollapse open={openNavbar}>
          <Nav>
            <div className="flex flex-col z-50 lg:flex-row lg:items-center">
              <a href="#mint" className="py-2 px-4 text-white">
                Mint
              </a>
              <a href="#about" className="py-2 px-4 text-white">
                About us
              </a>
              <a
                href="#discord"
                className="py-2 px-4 text-white"
              >
                Discord
              </a>
            </div>
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
      
    </Navbar>
    </>
  );
}
