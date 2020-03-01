import styled from 'styled-components';

export const Input = styled.input`
  background: rgba(0, 0, 0, 0.1);
  border: 0;
  border-radius: 4px;
  height: 44px;
  padding: 0 15px;
  color: #fff;
  margin: 0 0 10px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;
export const Error = styled.span`
  text-align: start;
  padding-left: 6px;
  margin-bottom: 10px;
  color: #fb6f91;
  font-weight: bold;
`;
