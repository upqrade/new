import React from 'react';
import styled from 'styled-components';

// Styled components for footer elements
const FooterContainer = styled.div`
  height: 100px;
  position: bottom;
  overflow: hidden;
  padding: 10px;
  background-color: #000;
  color: white;
  display: flex;
  align-items: center;

  @media screen and (max-width: 730px) {
    height: 74px;
  }

  @media screen and (max-width: 470px) {
    height: 64px;
  }

  @media screen and (max-width: 330px) {
    height: 54px;
  }
`;

const EmailContainer = styled.div`
  text-align: left;
  margin-left: 5%;
  margin-right: auto;
  font-size: 20px;
  font-family: 'Segoe UI';
  font-weight: 500;

  @media screen and (max-width: 730px) {
    font-size: 12px;
    margin-left: 5px;
  }

  @media screen and (max-width: 470px) {
    font-size: 10px;
  }

  @media screen and (max-width: 330px) {
    font-size: 8px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoImage = styled.img`
  max-width: ${(props) => (props.small ? '30px' : props.medium ? '80px' : '125px')};
  max-height: ${(props) => (props.small ? '30px' : props.medium ? '40px' : '125px')};
  height: auto;
  width: 100%;
  margin-inline: ${(props) => (props.small ? '1em' : '2.5em')};

  @media screen and (max-width: 730px) {
    max-width: ${(props) => (props.small ? '30px' : props.medium ? '50px' : '100px')};
    max-height: ${(props) => (props.small ? '30px' : props.medium ? '50px' : '50px')};
    margin-inline: ${(props) => (props.small ? '1em' : '1.5em')};
  }

  @media screen and (max-width: 470px) {
    max-width: ${(props) => (props.small ? '30px' : props.medium ? '40px' : '80px')};
    max-height: ${(props) => (props.small ? '30px' : props.medium ? '40px' : '40px')};
    margin-inline: ${(props) => (props.small ? '1em' : '1em')};
  }

  @media screen and (max-width: 330px) {
    max-width: ${(props) => (props.small ? '30px' : props.medium ? '30px' : '60px')};
    max-height: ${(props) => (props.small ? '30px' : props.medium ? '30px' : '30px')};
    margin-inline: ${(props) => (props.small ? '1em' : '0.5em')};
  }
`;

const Footer = () => {
  return (
    <FooterContainer id="footer">
      <EmailContainer id="footEmail">
        For Support | Assistance | Feedback - Reach out to us - <br />
        WhatsApp-
        <a href="https://api.whatsapp.com/send?phone=%2b919529875561" target="_blank">
          +91 95298 75561
        </a>{' '}
        <br />
        Email- <a href="mailto:upqrade@perceptionyst.com">upqrade@perceptionyst.com</a>
      </EmailContainer>
      <ImageContainer id="footImgs">
        <a href="https://upqrade.xyz/" target="_blank">
          <LogoImage id="upqradeLogo" src="https://upqrade.xyz/assets/w_upqrade_logo.png" alt="upQRade Logo" />
        </a>
        <a href="https://perceptionyst.com/" target="_blank">
          <LogoImage id="perLogo" src="https://upqrade.xyz/assets/w_perceptionyst_logo.png" alt="Perceptionyst Solutions Logo" medium />
        </a>
      </ImageContainer>
    </FooterContainer>
  );
};

export default Footer;
