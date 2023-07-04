import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInScreen';
import Colors from './constants/colors';
import UpdatePassword from './screens/UpdatePassword';
import EmployeeHome from './screens/EmployeeHome';
import ForgotPassword from './screens/ForgotPassword';
import VerificationCodeScreen from './screens/VerificationCodeScreen';
import AccountScreen from './screens/AccountScreen';
import UpdateDetailsScreen from './screens/UpdateDetailsScreen';
import CalendarScreen from './screens/CalendarScreen';
import MeetingDetailsScreen from './screens/MeetingDetailsScreen';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: Colors.white100},
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontWeight: 'bold'},
        }}>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="UpdatePassword"
          component={UpdatePassword}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="EmployeeHome"
          component={EmployeeHome}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="VerificationScreen"
          component={VerificationCodeScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{title: 'MY PROFILE'}}
        />
        <Stack.Screen
          name="UpdateDetails"
          component={UpdateDetailsScreen}
          options={{title: 'UPDATE DETAILS'}}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{title: 'CALENDAR'}}
        />
        <Stack.Screen
          name="Meeting"
          component={MeetingDetailsScreen}
          options={{title: 'MEETING DETAILS'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
