import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const TextDecorated = styled.Text`
  color: #00c4ec;
  font-weight: bold;
  font-size: 24px;
`;

export const PinkText = styled.Text`
  color: #967df9;
`;

export const Description = styled.Text`
  color: #f4ede8;
  font-weight: 400;
  font-size: 20px;
  font-style: italic;
  margin: 40px 0;
`;

export const ButtonsContainer = styled.View`
    flex-direction: row;
    margin-top: 40px;
    justify-content: space-between;
`;

export const DashboardButton = styled(RectButton)`
  height: 150px;
  width: 48%;
  background: #00c4ec;
  justify-content: space-between;
  border-radius: 10px;
  margin: 12px;
  padding: 12px 24px;
`;

export const DashboardButtonText = styled.Text`
  font-size: 20px;
  color: #312e38;
  font-weight: bold;
`;

export const FilterButton = styled(RectButton)`
  height: 150px;
  width: 48%;
  background: #967df9;
  justify-content: space-between;
  border-radius: 10px;
  margin: 12px;
  padding: 12px 24px;
`;

export const FilterButtonText = styled.Text`
  font-size: 20px;
  color: #312e38;
  font-weight: bold;
`;
