import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
import React, {useState, useEffect} from 'react';
import {getnotificationsbydate} from '../api';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
function NavigationFooter(props) {
  const empData = props.emp;
  // console.log(empData);
  const navigation = useNavigation();
  const [notilength, setNotiLength] = useState(0);
  function openAccountPageHandler() {
    navigation.navigate('Account', {empId: empData.empid});
  }
  function openHomeScreenHandler() {
    navigation.navigate('EmployeeHome', {employee: empData});
  }
  function openCalendarScreen() {
    navigation.navigate('Calendar', {empId: empData.empid});
  }
  function tasksubmissionpageopen() {
    const details = {
      empId: empData.empid,
      hrId: empData.hrid,
      name: empData.name,
      email: empData.email,
      phoneno: empData.phonenumber,
      employmenttype: empData.employmenttype,
    };
    navigation.navigate('TaskSubmission', {details: details});
  }
  function openNotificationsScreenHandler() {
    navigation.navigate('Notifications', {hrId: empData.hrid});
  }
  function getNotificationsCount() {
    const currdate = new Date();
    const newdate = new Date(currdate.getTime() + 19800 * 1000);
    // console.log(newdate.toISOString());
    const details = getnotificationsbydate(empData.hrid, newdate.toISOString());
    details.then(response => {
      // console.log(response.data);
      setNotiLength(response.data.length);
    });
  }
  useEffect(() => {
    getNotificationsCount();
  }, []);
  return (
    <View style={styles.outerContainer}>
      <View style={styles.iconsContainer}>
        <Pressable
          onPress={openHomeScreenHandler}
          android_ripple={{color: '#ccc', borderless: true, radius: 25}}>
          <FontAwesome5 name="home" size={25} style={styles.icons} />
        </Pressable>
        <Pressable
          android_ripple={{color: '#ccc', borderless: true, radius: 25}}
          onPress={openNotificationsScreenHandler}>
          <Text style={styles.notifications}>{notilength}</Text>
          <Ionicons name="mail" size={27} style={styles.icons} />
        </Pressable>
        <Pressable
          android_ripple={{color: '#ccc', borderless: true, radius: 25}}
          onPress={openCalendarScreen}>
          <MaterialCommunityIcons
            name="calendar-month"
            size={30}
            style={styles.icons}
          />
        </Pressable>
        {/* <Ionicons name="settings" size={27} style={styles.icons} /> */}
        <Pressable
          android_ripple={{color: '#ccc', borderless: true, radius: 25}}
          onPress={tasksubmissionpageopen}>
          <FontAwesome5 name="tasks" size={25} style={styles.icons} />
        </Pressable>
        <Pressable
          onPress={openAccountPageHandler}
          android_ripple={{color: '#ccc', borderless: true, radius: 25}}>
          <FontAwesome5 name="user-alt" size={25} style={styles.icons} />
        </Pressable>
      </View>
    </View>
  );
}
export default NavigationFooter;
const styles = StyleSheet.create({
  outerContainer: {
    width: WIDTH,
    height: WIDTH * 0.15,
    bottom: 0,
    backgroundColor: Colors.blue400,
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  iconsContainer: {
    height: WIDTH * 0.13,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icons: {
    color: '#ffffff',
  },
  notifications: {
    position: 'absolute',
    width: WIDTH * 0.05,
    height: WIDTH * 0.05,
    right: -8,
    backgroundColor: 'red',
    top: -8,
    zIndex: 100,
    borderRadius: 10,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
