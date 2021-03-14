import styled from 'styled-components';
import backgroundImg from '../../assets/finance_bg.jpeg';

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

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
  border-right: 5px solid #6e6893;
`;

export const Actions = styled.div`
  width: auto;
  min-width: 70px;
`;
