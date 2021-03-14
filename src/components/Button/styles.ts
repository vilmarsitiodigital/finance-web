import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  isLoading: number;
}

export const Container = styled.button<ContainerProps>`
  color: #fff;
  background-color: #6e6893;
  text-align: center;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 14px;
  min-width: 100px;

  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background: ${shade(0.2, '#8bc34a')};
  }

  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};
`;
