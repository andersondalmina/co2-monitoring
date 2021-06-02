import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #2b2831;
  width: 100%;
  margin: 5px;
  padding: 10px;
  max-height: 300px;
  border-radius: 20px;
`;

export const Title = styled.Text`
  color: #967df9;
  font-weight: bold;
  font-style: italic;
  font-size: 20px;
`;

export const Description = styled.Text`
  color: #00c4ec;
  font-weight: bold;
  font-size: 36px;
`;

export const Label = styled.Text`
  color: #967df9;
  font-weight: bold;
  font-style: italic;
  font-size: 20px;
`;
