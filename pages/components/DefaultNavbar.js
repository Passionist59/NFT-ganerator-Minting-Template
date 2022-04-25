import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useState } from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";

export default function DefaultNavbar() {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
      <>
    <Navbar color="transparent" navbar>
      <NavbarContainer className="header mt-6 bg-neutral-500">
        <NavbarWrapper>
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
                href="#key"
                className="py-2 px-4 text-white"
              >
                Key
              </a>
            </div>
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
      
    </Navbar>
    </>
  );
}
