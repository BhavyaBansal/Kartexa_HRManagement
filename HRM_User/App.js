import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
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
import LeavesScreen from './screens/LeavesScreen';
import LeaveForm from './screens/LeaveForm';
import LeavesDetailsScreen from './screens/LeavesDetailsScreen';
import CompanyPolicy from './screens/CompanyPolicy';
import CompanyFAQ from './screens/CompanyFAQ';
import TaskSubmission from './screens/TaskSubmission';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import NotificationsScreen from './screens/NotificationsScreen';
const Stack = createNativeStackNavigator();
function App() {
  // const [isLogged, setIsLogged] = useState(false);
  // const [employeeData, setEmployeeData] = useState('');
  // async function retrieveData() {
  //   try {
  //     const data = await AsyncStorage.getItem('keepLoggedIn');
  //     const employee = await AsyncStorage.getItem('employee');
  //     // const dataa = JSON.parse(data);
  //     const employeee = JSON.parse(employee);
  //     setIsLogged(data);
  //     setEmployeeData(employeee.empid);
  //     console.log(typeof data);
  //     console.log(employeee.empid);
  //   } catch (error) {}
  // }
  // useEffect(() => {
  //   retrieveData();
  // }, []);
  return (
    <>
      <NavigationContainer>
        {/* {isLogged === 'true' ? ( */}
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
            name="EmployeeHome"
            component={EmployeeHome}
            options={{
              title: '',
            }}
            // initialParams={{employeeData}}
            // {console.log()}
          />
          <Stack.Screen
            name="UpdatePassword"
            component={UpdatePassword}
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
          <Stack.Screen
            name="Leave"
            component={LeavesScreen}
            options={{title: 'LEAVES'}}
          />
          <Stack.Screen
            name="LeaveForm"
            component={LeaveForm}
            options={{title: 'LEAVE FORM'}}
          />
          <Stack.Screen
            name="LeavesDetails"
            component={LeavesDetailsScreen}
            options={{title: 'MONTHLY DETAILS'}}
          />
          <Stack.Screen
            name="Policy"
            component={CompanyPolicy}
            options={{title: ''}}
          />
          <Stack.Screen
            name="FAQ"
            component={CompanyFAQ}
            options={{title: ''}}
          />
          <Stack.Screen
            name="TaskSubmission"
            component={TaskSubmission}
            options={{title: 'Timesheet Submission'}}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{title: 'Announcements'}}
          />
          {/* </Stack.Navigator>
        ) : (
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
          </Stack.Navigator>
        )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
export default App;

const styles = StyleSheet.create({
  icons: {
    color: 'black',
    alignSelf: 'flex-end',
  },
});
