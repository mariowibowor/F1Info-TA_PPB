import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './pages/Home';
import News from './pages/News';
import StandingsStack from './pages/StandingsStack';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile'; // Import halaman Profile

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'News') {
            iconName = 'newspaper';
          } else if (route.name === 'Standings') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontFamily: 'F1Font', // Font custom untuk label footer
          fontSize: 9,          // Ukuran font label
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#616161',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="News" 
        component={News} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Standings" 
        component={StandingsStack} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Calendar" 
        component={Calendar} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    F1Font: require('./assets/fonts/F1fonts.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Anda bisa mengganti ini dengan screen loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={BottomTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{
            title: 'Profile',
            headerStyle: {
              backgroundColor: '#e10600', // Warna latar belakang merah
            },
            headerTintColor: '#fff', // Warna teks putih
            headerTitleStyle: {
              fontFamily: 'F1Font', // Menambahkan font kustom pada judul header
              fontSize: 20,         // Atur ukuran font sesuai kebutuhan
            },
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
