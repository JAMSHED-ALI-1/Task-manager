// App.tsx
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';
import Deshboard from '../screens/deshboard/Deshboard';
import { RootStackParamList } from '../screens/auth/types'; // Adjust import path as needed
import TaskList from '../screens/deshboard/TaskListScreen';

// type StackNavigator = createNativeStackNavigator<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Register"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Deshboard" component={Deshboard} />
        <Stack.Screen name="TaskList" component={TaskList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
