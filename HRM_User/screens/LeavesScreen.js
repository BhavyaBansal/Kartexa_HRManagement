import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/colors';
import {getcurrentmonthleaves, updateSalaryEachDay} from '../api';
import Heading from '../components/Heading';
const WIDTH = Dimensions.get('window').width;
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
function LeavesScreen({route, navigation}) {
  const empId = route.params.empId;
  const hrId = route.params.hrId;
  const [leaveType, setLeaveType] = useState('All');
  const [leavesData, setLeavesData] = useState([]);
  const [currmonth, setcurrmonth] = useState(new Date().getMonth());
  function openLeaveForm() {
    navigation.navigate('LeaveForm', {empId, hrId});
  }
  function fetchLeavesHandler(type) {
    const currDate = new Date();
    const currmonth = currDate.getMonth() + 1;
    const leavedata = getcurrentmonthleaves(
      empId,
      currmonth,
      type === null ? leaveType : type,
    );
    leavedata.then(response => {
      // console.log(response.data);
      setLeavesData(response.data);
    });
  }
  useEffect(() => {
    fetchLeavesHandler(null);
  }, []);
  function getLeaves(type) {
    setLeaveType(type);
    fetchLeavesHandler(type);
  }
  function getLeavesDataHandler() {
    const employeeLeavesData = updateSalaryEachDay(empId);
    employeeLeavesData.then(response => {
      // console.log(response.data);
      navigation.navigate('LeavesDetails', {empleavesdata: response.data});
    });
  }
  return (
    <View style={styles.outerContainer}>
      {/* <Text>{hrId}</Text> */}
      <View style={styles.inRow}>
        <Pressable
          android_ripple={{color: '#ccc', borderless: true, radius: 25}}
          onPress={getLeavesDataHandler}>
          <MaterialCommunityIcons
            name="card-account-details"
            size={30}
            style={styles.icons}></MaterialCommunityIcons>
        </Pressable>
        <Pressable
          android_ripple={{color: '#ccc', borderless: true, radius: 20}}
          onPress={openLeaveForm}>
          <MaterialIcons
            name="add-circle"
            size={30}
            style={styles.icons}></MaterialIcons>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            leaveType === 'All' ? styles.changeBackground : '',
          ]}
          onPress={() => getLeaves('All')}>
          <Text
            style={[
              styles.buttonText,
              leaveType === 'All' ? styles.changeText : '',
            ]}>
            All
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            leaveType === 'Sick' ? styles.changeBackground : '',
          ]}
          onPress={() => getLeaves('Sick')}>
          <Text
            style={[
              styles.buttonText,
              leaveType === 'Sick' ? styles.changeText : '',
            ]}>
            Sick
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            leaveType === 'Casual' ? styles.changeBackground : '',
          ]}
          onPress={() => getLeaves('Casual')}>
          <Text
            style={[
              styles.buttonText,
              leaveType === 'Casual' ? styles.changeText : '',
            ]}>
            Casual
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            leaveType === 'Maternal' ? styles.changeBackground : '',
          ]}
          onPress={() => getLeaves('Maternal')}>
          <Text
            style={[
              styles.buttonText,
              leaveType === 'Maternal' ? styles.changeText : '',
            ]}>
            Maternal
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            leaveType === 'Earned' ? styles.changeBackground : '',
          ]}
          onPress={() => getLeaves('Earned')}>
          <Text
            style={[
              styles.buttonText,
              leaveType === 'Earned' ? styles.changeText : '',
            ]}>
            Earned
          </Text>
        </Pressable>
      </View>
      {/* <Text>{empId}</Text> */}
      <ScrollView
        style={styles.leaveContainer}
        contentContainerStyle={{alignItems: 'center'}}>
        <Heading>{months[currmonth]}</Heading>
        <Text style={styles.note}>
          {leavesData.length === 0
            ? 'No Leaves made till now for this month'
            : ''}
        </Text>
        {leavesData.map(leave => (
          <View key={leave.id} style={styles.leave}>
            <Text style={styles.leaveText}>Reason: {leave.reason}</Text>
            <Text style={styles.leaveText}>Type: {leave.type}</Text>
            <View style={styles.inRowNormal}>
              <Text style={styles.leaveText}>
                From: {leave.from.slice(0, 10)}
              </Text>
              <Text style={styles.leaveText}>To: {leave.to.slice(0, 10)}</Text>
              <Text style={styles.leaveText}>Days: {leave.days}</Text>
            </View>
            <Text
              style={[
                styles.leaveStatus,
                {
                  backgroundColor:
                    leave.status === 'Awaiting'
                      ? '#f2ef2d'
                      : leave.status === 'Declined'
                      ? '#c62323'
                      : '#25bc3e',
                },
              ]}>
              {leave.status}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export default LeavesScreen;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: WIDTH * 0.9,
  },
  button: {
    height: 40,
    width: WIDTH * 0.175,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    borderColor: Colors.blue100,
  },
  buttonText: {
    color: Colors.blue100,
    fontWeight: 'bold',
    fontSize: 14,
  },
  icons: {
    color: Colors.blue100,
    alignSelf: 'flex-end',
    margin: 8,
  },
  inRow: {
    flexDirection: 'row',
    width: WIDTH * 0.9,
    justifyContent: 'flex-end',
  },
  changeBackground: {
    backgroundColor: Colors.blue100,
  },
  changeText: {
    color: 'white',
  },
  leaveContainer: {
    width: WIDTH * 0.9,
  },
  leave: {
    width: WIDTH * 0.85,
    height: WIDTH * 0.25,
    backgroundColor: Colors.blue200,
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 4,
  },
  inRowNormal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leaveText: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 0.5,
    marginVertical: 3,
  },
  leaveStatus: {
    position: 'absolute',
    right: 20,
    top: 0,
    padding: 5,
    color: 'black',
    letterSpacing: 0.5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  note: {
    color: '#25bc3e',
    marginVertical: 0,
    marginHorizontal: 13,
  },
});
