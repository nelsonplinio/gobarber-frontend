import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    button {
      margin: 4px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;

      transition: background 0.2s ease;

      &:hover {
        background: ${darken(0.08, '#3b9eff')};
      }
    }
  }

  > button {
    width: 100%;
    margin: 16px auto 0;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    align-self: center;
    transition: background 0.2s ease;

    &:hover {
      background: ${darken(0.08, '#f64c75')};
    }
  }
`;
