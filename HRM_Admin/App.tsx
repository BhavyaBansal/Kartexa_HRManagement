import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import Colors from './constants/colors';
import HomeScreen from './screens/HomeScreen';
import AddEmployeeForm from './screens/AddEmployeeForm';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: Colors.white100},
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="AdminHome"
          component={HomeScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="AddEmp"
          component={AddEmployeeForm}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
