import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import backgroundImg from '../../assets/finance_bg.jpeg';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Content = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 750px;
`;

export const HeaderContent = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    width: 100%;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.3s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
  border-right: 5px solid #6e6893;
`;

export const ContainerSelect = styled.div<ContainerProps>`
  border: 2px solid #dde1e4;
  background: #ffffff;
  padding: 0;
  width: 100%;
  align-items: center;
  margin-bottom: 30px;
`;
