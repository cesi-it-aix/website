import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { FaDiscord, FaEnvelope, FaFacebook, FaGithub } from 'react-icons/fa';

const Wrapper = styled.footer`
  position: relative;
  padding-top: 2rem;
  bottom: 0;
  box-shadow: ${props => props.theme.shadow.footer};
  background: ${props => props.theme.gradient.leftToRight};
  font-family: ${props => props.theme.fontFamily.body};
  font-weight: 500;

  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding-top: 7rem;
  }
`;

const Text = styled.div`
  margin: 0;
  padding: 2rem 0.5rem;
  text-align: center;
  font-weight: 300;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.white.light};
`;

const Column = styled.div`
  color: ${props => props.theme.colors.white.light};
  display: flex;
  flex-direction: column;
  p,
  a {
    margin-bottom: 1rem;
    font-weight: 300;
    span {
      font-weight: 600;
    }
  }
  a {
    color: ${props => props.theme.colors.white.light};
    display: inline-flex;
    align-items: center;
    transition: all ${props => props.theme.transitions.default.duration};
    &:hover {
      color: ${props => props.theme.colors.white.grey};
    }
    svg {
      font-size: 2rem;
      margin-right: 0.8rem;
    }
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Footer = () => (
  <Wrapper>
    <Row>
      <Column>
        <h4>Le Bureau</h4>
        <p>
          Président: <span>Paul Pera</span>
        </p>
        <p>
          Co-Président: <span>Denis Fevre</span>
        </p>
        <p>
          Trésorier: <span>Peter Giromagny</span>
        </p>
        <p>
          Secrétaire: <span>Luc Van De Velde</span>
        </p>
        <p>
          Chargée de communication: <span>Jailys Porcu</span>
        </p>
      </Column>
      <Column>
        <h4>Contact</h4>
        <a href="mailto:bde-aix@viacesi.fr">
          <FaEnvelope /> bde-aix@viacesi.fr
        </a>
        <a href="https://discord.gg/wHcspBT"  target="_blank">
          <FaDiscord /> Discord
        </a>
        <a href="https://www.facebook.com/bdecesiaix"  target="_blank">
          <FaFacebook /> Facebook
        </a>
        <a href="https://github.com/cesi-it-aix/website"  target="_blank">
          <FaGithub /> Github
        </a>
      </Column>
    </Row>
    <Text>
    <Link to="/statut">Nos Statuts</Link>
    </Text>

  </Wrapper>
);
export default Footer;
