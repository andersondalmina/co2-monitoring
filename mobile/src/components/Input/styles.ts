import styled, { css } from 'styled-components/native';

interface IInput{
    isFocused?: boolean;
    isFilled?: boolean;
}

export const InputStyled = styled.TextInput<IInput>`
  font-size: 18px;
  margin-top: 50px;
  padding: 10px;
  text-align: center;
  border-bottom-width: 1px;
  border-bottom-color: #00c4ec;
  color: #f4ede8;
  width: 100%;
  ${props => props.isFocused && css`
    color: #00c4ec;
  `}
  ${props => props.isFilled && css`
    border-bottom-width: 1px;
    border-bottom-color: #967df9;
    color: #00c4ec;
  `}
`;