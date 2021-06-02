import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Filter from '../pages/Filter';
import SelectSensor from '../pages/SelectSensor';

const routesStack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <routesStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#312e38'},
      }}>
      <routesStack.Screen name="Home" component={Home} />
      <routesStack.Screen name="Dashboard" component={Dashboard} />
      <routesStack.Screen name="Filter" component={Filter} />
      <routesStack.Screen name="SelectSensor" component={SelectSensor} />
    </routesStack.Navigator>
  );
};

export default Routes;
