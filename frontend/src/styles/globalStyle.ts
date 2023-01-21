import { css } from "@emotion/react";

export const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *:focus-visible {
    border-color: transparent;
  }
  html {
    scroll-behavior: smooth;
    font-size: 92%;
  }
  body {
    background: var(--chakra-colors-bgColor);
    font-family: Raleway;
    -webkit-font-feature-settings: "lnum";
    -moz-font-feature-settings: "lnum";
    font-feature-settings: "lnum";
    color: #000000;
  }
  img {
    display: block;
  }
  ::selection {
    color: white;
    background: var(--chakra-colors-primaryHover);
  }
  h1 {
    font-size: 2.25rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.75rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  h5 {
    font-size: 1.125rem;
  }
  h6 {
    font-size: 1rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
  }
  p {
    font-size: 1rem;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px var(--chakra-colors-bgInput) inset !important;
    -webkit-text-fill-color: black !important;
  }
  @media only screen and (max-width: 1196px) {
    html {
      font-size: 87%;
    }
  }
  @media only screen and (max-width: 978px) {
    html {
      font-size: 85%;
    }
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.75rem;
    }
    h3 {
      font-size: 1.5rem;
    }
    h4 {
      font-size: 1.25rem;
    }
    h5 {
      font-size: 1rem;
    }
    h6 {
      font-size: 0.8rem;
    }
  }
`;
