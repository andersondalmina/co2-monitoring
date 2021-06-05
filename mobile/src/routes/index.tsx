import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Filter from '../pages/Filter';
import SelectSensor from '../pages/SelectSensor';
import CreateSensor from '../pages/CreateSensor';

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
      <routesStack.Screen name="CreateSensor" component={CreateSensor} />
    </routesStack.Navigator>
  );
};

export default Routes;
