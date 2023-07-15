import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useEffect, useLayoutEffect, useState} from 'react';
import Colors from '../constants/colors';
import {clockIn, clockOut, updateSalaryEachDay} from '../api';
import NavigationFooter from '../components/NavigationFooter';
import Octicons from 'react-native-vector-icons/Octicons';
// import Calendar from 'react-native-calendars/src/calendar';
import Heading from '../components/Heading';
import SideBar from '../components/SideBar';
const WIDTH = Dimensions.get('window').width;
function EmployeeHome({route, navigation}) {
  const emp = route.params.employee;
  const empId = emp.empid;
  const [clockin, setClockin] = useState(true);
  const [clockout, setClockout] = useState(false);
  const [inTime, setInTime] = useState('');
  const [clockId, setClockId] = useState('');
  //   console.log(emp);
  const [sidebarIsVisible, setSideBarIsVisible] = useState(false);
  // const [empLeavesData, setEmpLeavesData] = useState([]);
  function endSideBar() {
    setSideBarIsVisible(false);
  }
  function showSidebar() {
    setSideBarIsVisible(true);
  }
  function logoutHandler() {}
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerContainer}>
            <Text style={styles.emailText}>{emp.email} </Text>
            <Text onPress={logoutHandler} style={styles.logout}>
              Logout
            </Text>
            <Pressable
              android_ripple={{color: '#ccc', borderless: true}}
              onPress={showSidebar}>
              <Octicons name="three-bars" size={20} style={styles.icons} />
            </Pressable>
          </View>
        );
      },
    });
  });
  function clockInHandler() {
    setClockin(false);
    setClockout(true);
    clockIn(
      emp.hrid,
      emp.empid,
      emp.name,
      emp.email,
      emp.phonenumber,
      emp.department,
      emp.designation,
    )
      .then(res => {
        Alert.alert('Success', 'Clocked In Successfully');
        let intime = res.data.newDate.toString().slice(11, 16);
        let id = res.data.cid;
        // console.log(intime.slice(3, 5));
        setClockId(id);
        setInTime(intime);
      })
      .catch(error => {
        console.log(error);
      });
  }
  function clockOutHandler() {
    setClockin(true);
    setClockout(false);
    clockOut(clockId, inTime)
      .then(res => {
        let outTime = res.data.outTime;
        let totaltimeout = res.data.totalTimeOut;
        setInTime('');
        setClockId('');
        Alert.alert(
          'Success',
          `ClockOut Time: ${outTime}\nTotal Time Worked: ${totaltimeout}`,
        );
      })
      .catch(error => {
        console.log(error);
      });
  }
  function getLeavesDaily() {
    const employeeLeavesData = updateSalaryEachDay(empId);
    employeeLeavesData.then(response => {
      // console.log(response.data);
      // setEmpLeavesData(response.data);
    });
  }
  useEffect(() => {
    getLeavesDaily();
  }, []);
  return (
    <>
      <ScrollView style={styles.outerContainer}>
        <View style={styles.buttonContainer}>
          {clockin === true ? (
            <CustomButton onPressProp={clockInHandler}>ClockIn</CustomButton>
          ) : (
            <CustomButton onPressProp={clockOutHandler}>ClockOut</CustomButton>
          )}

          {inTime !== '' ? (
            <Text style={styles.inTimeText}>Clock In Time: {inTime}</Text>
          ) : (
            ''
          )}
        </View>
      </ScrollView>
      <SideBar
        onCancel={endSideBar}
        visible={sidebarIsVisible}
        employeeId={empId}
        hrId={emp.hrid}
      />
      <NavigationFooter emp={emp}></NavigationFooter>
    </>
  );
}
export default EmployeeHome;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logout: {
    color: Colors.blue300,
    fontSize: 12,
  },
  emailText: {
    fontSize: 12,
    color: '#000',
    letterSpacing: 0.3,
    fontWeight: 'bold',
    marginRight: 10,
  },
  inTimeText: {
    fontSize: 16,
    color: '#000000',
    letterSpacing: 1,
  },
  icons: {
    color: 'black',
    marginRight: 5,
    marginLeft: 10,
  },
});
