import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import {useEffect, useLayoutEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/colors';
import {getemployeedata, deletedEmployee} from '../api';
const WIDTH = Dimensions.get('window').width;
function HomeScreen({navigation, route}) {
  const [employeeData, setEmployeeData] = useState([]);
  const email = route.params.email;
  const id = route.params.id;
  // console.log(id);
  function logoutHandler() {}
  function addEmployeeHandler() {
    navigation.navigate('AddEmp', {
      email,
      id,
    });
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
    const empData = getemployeedata(id);
    empData.then(response => {
      setEmployeeData(response.data);
    });
  }
  useEffect(() => {
    callForEmployeeData();
  }, []);

  return (
    <View style={styles.outerContainer}>
      <CustomButton onPressProp={addEmployeeHandler}>Add Employee</CustomButton>
      <ScrollView>
        {/* <Text>List Of Employees</Text> */}
        <View>
          {employeeData.map(emp => (
            <View key={emp.id} style={styles.employeeContainer}>
              <View>
                <Text style={styles.employeeText}>{emp.name}</Text>
                <Text style={styles.employeeText}>{emp.email}</Text>
                <Text style={styles.employeeText}>{emp.phonenumber}</Text>
                <Text style={styles.employeeText}>{emp.designation}</Text>
              </View>
              <View>
                <Pressable
                  style={styles.employeeButton}
                  onPress={() => deleteEmployeeHandler(emp.id)}>
                  <Text style={styles.employeeText}>Delete</Text>
                </Pressable>
                <Pressable style={styles.employeeButton}>
                  <Text style={styles.employeeText}>Update</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    backgroundColor: Colors.grey200,
    margin: 10,
    padding: 5,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  employeeText: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 0.5,
    padding: 2,
  },
  employeeButton: {
    padding: 5,
    margin: 5,
    backgroundColor: '#e84343',
    borderRadius: 5,
  },
});
