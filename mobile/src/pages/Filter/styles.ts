import styled from 'styled-components/native';
import {StatusBar} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
const statusBarHight = StatusBar.currentHeight;
const marginTop = 10 + (statusBarHight || 0);

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${marginTop + 'px'};
`;

export const Content = styled.ScrollView`
`;

export const Calendar = styled.View`
  margin-top: ${marginTop + 'px'};
`;

export const  CalendarTitle = styled.Text`
    color: #f4ede8;
    font-size: 24px;
    margin: 0 24px 24px;
`;


export const OpenDatePickerButton = styled(RectButton)`
    height: 46px;
    background: #00c4ec;
    border-radius: 10px;
    align-items:center;
    justify-content:center;
    margin: 0 24px;
    padding: 12px;
`;

export const  OpenDatePickerButtonText  = styled.Text`
    color: #232129;
    font-size: 16px;
`;

export const DateSelectedTitle = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  margin: 32px;
`;