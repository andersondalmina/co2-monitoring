import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

export const KeyboardAvoidingViewStyled = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    min-width: 300px;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
`;

export const Title = styled.Text`
  color: #00c4ec;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  text-align: center;
`;

export const Button = styled(RectButton)`
    margin-top: 40px;
    background-color: #00c4ec;
    color: #f4ede8;
    height: 50px;
    align-items: center;
    justify-content: center;
    padding: 10px 50px;
    border-radius: 20px;
`;