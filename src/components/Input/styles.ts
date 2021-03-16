import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isField: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  border: 2px solid #dde1e4;
  background: #ffffff;
  padding: 6px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: #6f9c3b;
    `}
  ${props =>
    props.isField &&
    css`
      color: #6e6893;
    `}
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: black;
    &::placeholder {
      color: #cccccc;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin: 0 5px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #f4ede8;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
