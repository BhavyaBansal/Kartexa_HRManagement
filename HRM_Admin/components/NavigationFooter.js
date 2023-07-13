import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getemployeesobject} from '../api';
function NavigationFooter(props) {
  const navigation = useNavigation();
  const hrId = props.hrId;
  // console.log(hrId + 'helo');
  function CheckInPage() {
    navigation.navigate('CheckIn', {hrId});
  }
  function CheckOutPage() {
    navigation.navigate('CheckOut', {hrId});
  }
  function scheduleMeetingPage() {
    // console.log('Schedule Meeting');
    getemployeesobject(hrId)
      .then(emp => {
        empObj = emp.data;
        navigation.navigate('ScheduleMeet', {hrId, empObj});
      })
      .catch(error => {
        console.log(error);
      });
  }
  function openLeaveRequestPage() {
    navigation.navigate('LeaveRequest', {hrId});
  }
  return (
    <View style={styles.outerContainer}>
      <View style={styles.iconsContainer}>
        <Pressable
          android_ripple={{color: '#ccc', borderless: true}}
          onPress={CheckInPage}>
          <MaterialCommunityIcons name="login" size={30} style={styles.icons} />
        </Pressable>
        <Pressable
          android_ripple={{color: '#ccc', borderless: true}}
          onPress={scheduleMeetingPage}>
          <MaterialIcons name="schedule" size={30} style={styles.icons} />
        </Pressable>
        <Pressable
          android_ripple={{color: '#ccc', borderless: true}}
          onPress={openLeaveRequestPage}>
          <MaterialCommunityIcons
            name="note-check"
            size={30}
            style={styles.icons}
          />
        </Pressable>
        <Pressable
          android_ripple={{color: '#ccc', borderless: true}}
          onPress={CheckOutPage}>
          <MaterialCommunityIcons
            name="logout"
            size={30}
            style={styles.icons}
          />
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
});
