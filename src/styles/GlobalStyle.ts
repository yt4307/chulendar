import localFont from "next/font/local";
import { createGlobalStyle } from "styled-components";

const gumiRomance = localFont({
  src: "./../app/fonts/GumiRomance.otf",
  variable: "--font-gumi-romance",
  display: "swap",
  weight: "45 920",
  preload: true,
});

const GlobalStyle = createGlobalStyle`
  :root {
    --font-gumi-romance: ${gumiRomance.style.fontFamily};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100vh;
  }

  body {
    height: 100%;
    line-height: 1;
    font-size: 100%;
    font-family: var(--font-gumi-romance) sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 12px; 
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  img, video {
    max-width: 100%;
    height: auto;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
