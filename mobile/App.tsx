import 'react-native-gesture-handler';
import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#312e38"
        translucent
      />
      <View style={{flex: 1, backgroundColor: '#312e38'}}>
        <Routes />
      </View>
    </NavigationContainer>
  );
};

export default App;
