import React from 'react';
import LottieView from 'lottie-react-native';
import LoadAnimation from '../../assets/load.json';
import { Container } from './styles';

const Loading: React.FC = () => {
  return (
      <Container>
          <LottieView 
            source={LoadAnimation}
            autoPlay
            loop
            style={{
                backgroundColor: 'transparent',
                width: 200,
                height: 200
            }}
          />
      </Container>
  );
}

export default Loading;