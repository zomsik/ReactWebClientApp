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
        navigate("/ReactWebClientApp/")
        window.location.reload()
    }


    return (
        <NavbarContainer extendNavbar={extendNavbar}>
            <NavbarInnerContainer>
                <LeftContainer>
                    <NavbarLinkContainer>
                        <NavbarMenuLink to="/ReactWebClientApp/">Menu</NavbarMenuLink>
                        <NavbarLink to="/ReactWebClientApp/dane">Pobierz dane</NavbarLink>
                        <NavbarLink to="/ReactWebClientApp/zapisane">Zapisane wykresy</NavbarLink>

                        <OpenLinksButton
                            onClick={() => {
                              setExtendNavbar((curr) => !curr);
                         }}>
                            {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
                        </OpenLinksButton>

                    </NavbarLinkContainer>
                </LeftContainer>

                <RightContainer>
                    <NavbarLink to="/ReactWebClientApp/profil">Profil</NavbarLink>
                    <NavbarLink to="/ReactWebClientApp/" onClick={handleLogout} >Wyloguj się</NavbarLink>
                </RightContainer>
            </NavbarInnerContainer>

            {extendNavbar && ( <NavbarExtendedContainer>
                <NavbarMenuLinkExtended to="/ReactWebClientApp/"> Menu</NavbarMenuLinkExtended>
                <NavbarLinkExtended to="/ReactWebClientApp/dane">Pobierz dane</NavbarLinkExtended>
                <NavbarLinkExtended to="/ReactWebClientApp/zapisane">Zapisane wykresy</NavbarLinkExtended>
                <NavbarLinkExtended to="/ReactWebClientApp/profil">Profil</NavbarLinkExtended>
                <NavbarLinkExtended to="/ReactWebClientApp/" onClick={handleLogout} >Wyloguj się</NavbarLinkExtended>
                </NavbarExtendedContainer>
            )}
        </NavbarContainer>
    );
}

export default Navbar;