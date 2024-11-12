import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DriverStandings from './Standings';
import DriverDetail from './DriverDetail';
import ConstructorStandings from './ConstructorStandings';
import ConstructorDetail from './ConstructorDetail';

const Stack = createStackNavigator();

function StandingsStack() {
  return (
    <Stack.Navigator initialRouteName="DriverStandings">
      {/* Driver Standings */}
      <Stack.Screen 
        name="DriverStandings" 
        component={DriverStandings} 
        options={{ title: 'Driver Standings', headerShown: false }} 
      />
      <Stack.Screen 
        name="DriverDetail" 
        component={DriverDetail} 
        options={{ title: 'Driver Detail', headerShown: false }} 
      />

      {/* Constructor Standings */}
      <Stack.Screen 
        name="ConstructorStandings" 
        component={ConstructorStandings} 
        options={{ title: 'Constructor Standings', headerShown: false }} 
      />
      <Stack.Screen 
        name="ConstructorDetail" 
        component={ConstructorDetail} 
        options={{ title: 'Constructor Detail', headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

export default StandingsStack;
