import React, { useState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  NavbarMenuLink,
  OpenLinksButton,
  NavbarLinkExtended,
  NavbarMenuLinkExtended,
} from "./NavbarElements";

import { useNavigate } from "react-router-dom"

function Navbar() {
    const [extendNavbar, setExtendNavbar] = useState(false);


    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
        window.location.reload()
    }


    return (
        <NavbarContainer extendNavbar={extendNavbar}>
            <NavbarInnerContainer>
                <LeftContainer>
                    <NavbarLinkContainer>
                        <NavbarMenuLink to="/">Menu</NavbarMenuLink>
                        <NavbarLink to="/dane">Pobierz dane</NavbarLink>
                        <NavbarLink to="/zapisane">Zapisane wykresy</NavbarLink>

                        <OpenLinksButton
                            onClick={() => {
                              setExtendNavbar((curr) => !curr);
                         }}>
                            {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
                        </OpenLinksButton>

                    </NavbarLinkContainer>
                </LeftContainer>

                <RightContainer>
                    <NavbarLink to="/profil">Profil</NavbarLink>
                    <NavbarLink to="/" onClick={handleLogout} >Wyloguj się</NavbarLink>
                </RightContainer>
            </NavbarInnerContainer>

            {extendNavbar && ( <NavbarExtendedContainer>
                <NavbarMenuLinkExtended to="/"> Menu</NavbarMenuLinkExtended>
                <NavbarLinkExtended to="/dane">Pobierz dane</NavbarLinkExtended>
                <NavbarLinkExtended to="/zapisane">Zapisane wykresy</NavbarLinkExtended>
                <NavbarLinkExtended to="/profil">Profil</NavbarLinkExtended>
                <NavbarLinkExtended to="/" onClick={handleLogout} >Wyloguj się</NavbarLinkExtended>
                </NavbarExtendedContainer>
            )}
        </NavbarContainer>
    );
}

export default Navbar;