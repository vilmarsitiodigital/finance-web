import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    background: #f1f6f9;
    color: #151b26;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
    font-size: 24px;
  }

  small {
    font-size: 15px;
    display: inline-block;
    padding-left: 4px;
    font-weight: 300;
  }

  button {
    cursor: pointer;
  }

  table {
    border-top: 3px solid #6e6893;
  }

  th, td {
    padding: 8px;
    border: 1px solid rgba(224, 224, 224, 1);

    & a {
      text-align: center;
      display: inline-block;

      & span {
        width: 35px;
        height: 35px;
        display: block;
        padding: 5px;
      }

      & svg {
        color: #626f82;
      }
    }

    & a:hover span {
        border-radius: 50%;
        background-color: #d9d9d9;
    }



  }
`;
