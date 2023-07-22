import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import Colors from './constants/colors';
import HomeScreen from './screens/HomeScreen';
import AddEmployeeForm from './screens/AddEmployeeForm';
import EmployeeDetailScreen from './screens/EmployeeDetailScreen';
import UpdateEmployeeForm from './screens/UpdateEmployeeForm';
import ForgotPassword from './screens/ForgotPassword';
import VerificationCodeScreen from './screens/VerificationCodeScreen';
import UpdatePassword from './screens/UpdatePassword';
import CheckInScreen from './screens/CheckInScreen';
import CheckOutScreen from './screens/CheckOutScreen';
import ScheduleMeetScreen from './screens/ScheduleMeetScreen';
import LeaveRequestsScreen from './screens/LeaveRequestsScreen';
import MeetingsScreen from './screens/MeetingsScreen';
import TimesheetRecords from './screens/TimesheetRecords';
import AddHolidayForm from './screens/AddHolidayForm';
import EmployeeReports from './screens/EmployeeReports';
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
          name="SignIn"
          component={SignInScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
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
        <Stack.Screen
          name="EmployeeDetail"
          component={EmployeeDetailScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="UpdateEmployee"
          component={UpdateEmployeeForm}
          options={{title: ''}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{title: ''}}
        />
        <Stack.Screen
          name="VerificationScreen"
          component={VerificationCodeScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="UpdatePassword"
          component={UpdatePassword}
          options={{title: ''}}
        />
        <Stack.Screen
          name="CheckIn"
          component={CheckInScreen}
          options={{title: 'Clock In Details'}}
        />
        <Stack.Screen
          name="CheckOut"
          component={CheckOutScreen}
          options={{title: 'Clock Out Details'}}
        />
        <Stack.Screen
          name="ScheduleMeet"
          component={ScheduleMeetScreen}
          options={{title: 'SCHEDULE MEET'}}
        />
        <Stack.Screen
          name="Meetings"
          component={MeetingsScreen}
          options={{title: 'Meetings'}}
        />
        <Stack.Screen
          name="LeaveRequest"
          component={LeaveRequestsScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="Timesheet"
          component={TimesheetRecords}
          options={{title: 'Timesheet Records'}}
        />
        <Stack.Screen
          name="Holiday"
          component={AddHolidayForm}
          options={{title: 'Announcements Forms'}}
        />
        <Stack.Screen
          name="Reports"
          component={EmployeeReports}
          options={{title: 'Employees Report'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
