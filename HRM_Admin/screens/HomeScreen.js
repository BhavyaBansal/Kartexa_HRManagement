import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import {useEffect, useLayoutEffect, useState, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/colors';
import {getemployeedata, deletedEmployee, checkforpassupdated} from '../api';
import NavigationFooter from '../components/NavigationFooter';
// import { SessionContext } from '../SessionContext';
const WIDTH = Dimensions.get('window').width;
function HomeScreen({navigation, route}) {
  //  const {sessionToken, logout} = useContext(SessionContext);
  const [employeeData, setEmployeeData] = useState([]);
  const email = route.params.email;
  const id = route.params.id;
  // console.log(id);
  function addEmployeeHandler() {
    navigation.navigate('AddEmp', {
      email,
      id,
    });
  }
  function logoutHandler() {
    // logout();
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerContainer}>
            <Text>{email} </Text>
            <Text onPress={logoutHandler} style={styles.logout}>
              Logout
            </Text>
          </View>
        );
      },
    });
  });
  function showEmployee(emp) {
    navigation.navigate('EmployeeDetail', {emp, hrEmail: email, hrId: id});
  }
  function openUpdatePage(emp) {
    checkforpassupdated(emp.id).then(res => {
      const ispassupdated = res.data.ispassupdated;
      navigation.navigate('UpdateEmployee', {
        emp,
        hrEmail: email,
        hrId: id,
        ispassupdated,
      });
    });
  }
  function deleteEmployeeHandler(empId) {
    deletedEmployee(empId)
      .then(res => {
        callForEmployeeData();
        Alert.alert('Success', 'Employee Deleted Successfully');
      })
      .catch(error => {
        Alert.alert('Error', error.res.data.error);
      });
  }
  function callForEmployeeData() {
    // count += 1;
    const empData = getemployeedata(id);
    empData.then(response => {
      setEmployeeData(response.data);
    });
  }
  useEffect(() => {
    callForEmployeeData();
  }, []);
  function refreshHandler() {
    callForEmployeeData();
  }
  function openAddHolidayForm() {
    navigation.navigate('Holiday', {hrId: id});
  }
  return (
    <View style={styles.outerContainer}>
      <View style={styles.buttonContainer}>
        <CustomButton onPressProp={openAddHolidayForm}>
          {/* <Ionicons name={'happy'} size={20} color="white" /> */}
          Add Holiday
        </CustomButton>
        <CustomButton onPressProp={addEmployeeHandler}>
          {/* <AntDesign name={'adduser'} size={20} color="white" /> */}
          Add Employee
        </CustomButton>
        <Pressable
          android_ripple={{color: '#ccc', borderless: true}}
          onPress={refreshHandler}>
          <Image
            source={require('../public/icons/refresh.png')}
            style={styles.refresh}
          />
        </Pressable>
      </View>
      <ScrollView>
        {/* <Text>List Of Employees</Text> */}
        <View>
          {employeeData.map(emp => (
            <Pressable key={emp.id} onPress={() => showEmployee(emp)}>
              <View style={styles.employeeContainer}>
                <View>
                  <Text style={styles.employeeText}>{emp.name}</Text>
                  <Text style={styles.employeeText}>{emp.email}</Text>
                  <Text style={styles.employeeText}>{emp.phonenumber}</Text>
                  <Text style={styles.employeeText}>{emp.designation}</Text>
                </View>
                <View>
                  <Pressable
                    style={styles.employeeButtonDelete}
                    onPress={() => deleteEmployeeHandler(emp.id)}>
                    <Text style={styles.employeeText}>Delete</Text>
                  </Pressable>
                  <Pressable
                    style={styles.employeeButtonUpdate}
                    onPress={() => openUpdatePage(emp)}>
                    <Text style={styles.employeeText}>Update</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Text>Hr ID: {id}</Text>
      <NavigationFooter hrId={id}></NavigationFooter>
    </View>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  },
  logout: {
    color: Colors.blue300,
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  employeeContainer: {
    width: WIDTH * 0.8,
    backgroundColor: Colors.blue100,
    margin: 10,
    padding: 5,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  employeeText: {
    color: 'black',
    fontSize: 14,
    letterSpacing: 0.5,
    padding: 2,
  },
  employeeButtonDelete: {
    padding: 5,
    margin: 5,
    backgroundColor: '#e84343',
    borderRadius: 5,
  },
  employeeButtonUpdate: {
    padding: 5,
    margin: 5,
    backgroundColor: '#5698e8',
    borderRadius: 5,
  },
  refresh: {
    width: 30,
    height: 30,
    margin: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
