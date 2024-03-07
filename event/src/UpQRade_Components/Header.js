import React from 'react';
import styled from 'styled-components';
// import { useTranslation } from 'react-i18next';


// Styled components for header elements
const HeaderContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 15px;
  padding-inline: 20px;
  border-radius: 18px;
  margin: 10px;
  background-color: #6b0b0b3a;
  overflow-x: hidden;
`;

const Logo = styled.div`
  img {
    max-height: 60px;
  }
`;

const UpgradeText = styled.div`
  font-size: 30px;
  font-weight: 800;
  margin-inline: 0.6em;
  letter-spacing: 1.5px;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  color: white;
`;
// const SwitchLang = styled.div`
// align-items: center;
// justify-content: left;
// margin-left: auto; // Move the dropdown to the right
// `;
// const Dropdown = styled.select`
//   background-color: #fff;
//   color: #000;
//   border: none;
//   padding: 8px;
//   border-radius: 4px;
//   cursor: pointer;
// `;

const Header = () => {
  // const [t, i18n] = useTranslation('global');
  // // const selectedLang = i18n.getDataByLanguage(lng);
  // console.log(props.selectedLang);
  // const handleChangeLanguage = (lang) => {
  //   i18n.changeLanguage(lang);
  //   props.onLanguageChange(lang); // Notify App.js about the language change
  // };


  return (
    <HeaderContainer>
      <Logo>
        <img src="https://upqrade.xyz/assets/b_upqrade_logo.png" alt="upQRade Logo" />
      </Logo>
      <UpgradeText>upQRade</UpgradeText>
      {/* <SwitchLang>
      <Dropdown
        className="btn btn-dark"
        onChange={(e) => handleChangeLanguage(e.target.value)}
        value={props.selectedLang} // Set the value based on the currentLanguage prop
      >
        <option value="en">
          EN
       </option>
        <option value="es">
          ES
        </option>
        <option value="fr">
          FR
        </option>
      </Dropdown>

      </SwitchLang> */}
    </HeaderContainer>
  );
};

export default Header;
