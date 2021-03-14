import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  border: 2px solid #dde1e4;
  background: #ffffff;
  padding: 0;
  width: 100%;
  align-items: center;
  margin-bottom: 30px;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
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
