import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useEffect, useLayoutEffect, useState} from 'react';
import Colors from '../constants/colors';
import {clockIn, clockOut} from '../api';
import NavigationFooter from '../components/NavigationFooter';
function EmployeeHome({route, navigation}) {
  const emp = route.params.employee;
  const [clockin, setClockin] = useState(true);
  const [clockout, setClockout] = useState(false);
  const [inTime, setInTime] = useState('');
  const [clockId, setClockId] = useState('');
  //   console.log(emp);
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
});
