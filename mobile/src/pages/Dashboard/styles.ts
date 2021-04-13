import styled from 'styled-components/native';
import {StatusBar} from 'react-native';
const statusBarHight = StatusBar.currentHeight;
const marginTop = 10 + (statusBarHight || 0);

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  margin-top: ${marginTop + 'px'};
`;

export const Content = styled.ScrollView`
`;
