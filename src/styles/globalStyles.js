import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
  }

  h1, h2, h3 {
    margin: 0;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
  }

  .ant-layout {
    background: ${({ theme }) => theme.body};
  }

  .ant-menu {
    background: ${({ theme }) => theme.sidebar};
  }

  .ant-menu-item {
    margin: 0;
    padding: 0 24px;
  }
`;
