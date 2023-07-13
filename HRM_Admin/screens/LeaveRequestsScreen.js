import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {useState, useEffect} from 'react';
import Colors from '../constants/colors';
import Heading from '../components/Heading';
import {
  getcurrentmonthleaves,
  updatestatusbyid,
  getoneemployeedata,
  updateLeavesById,
} from '../api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
function LeaveRequestsScreen({route, navigation}) {
  const hrId = route.params.hrId;
  const [leaveStatus, setLeaveStatus] = useState('Awaiting');
  const [leavesData, setLeavesData] = useState([]);
  const [currmonth, setcurrmonth] = useState(new Date().getMonth());
  function fetchLeavesHandler(status) {
    const currDate = new Date();
    const currmonth = currDate.getMonth() + 1;
    const leavedata = getcurrentmonthleaves(
      hrId,
      currmonth,
      status === null ? leaveStatus : status,
    );
    leavedata.then(response => {
      //   console.log(response.data);
      setLeavesData(response.data);
    });
  }
  useEffect(() => {
    fetchLeavesHandler(null);
  }, []);
  function getStatus(status) {
    setLeaveStatus(status);
    fetchLeavesHandler(status);
  }
  function updateStatusHandler(leaveId, status, empId, type, noofdays) {
    updatestatusbyid(leaveId, status)
      .then(() => {
        if (status === 'Approved') {
          updateLeavesById(empId, type, noofdays)
            .then(response => {
              fetchLeavesHandler(leaveStatus);
              Alert.alert('Success', 'Status Updated Successfully');
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          fetchLeavesHandler(leaveStatus);
          Alert.alert('Success', 'Status Updated Successfully');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  function openDetailsOfLeave(leaveObj) {
    const empData = getoneemployeedata(leaveObj.empId);
    empData.then(employee => {
      //   console.log(employee.data);
      navigation.navigate('EmployeeDetail', {emp: employee.data});
    });
    // console.log(leaveObj);
  }
  return (
    <View style={styles.outerContainer}>
      <Heading>LEAVE REQUESTS PAGE</Heading>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            leaveStatus === 'Awaiting' ? styles.changeBackground : '',
          ]}
          onPress={() => getStatus('Awaiting')}>
          <Text
            style={[
              styles.buttonText,
              leaveStatus === 'Awaiting' ? styles.changeText : '',
            ]}>
            Awaiting
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            leaveStatus === 'Declined' ? styles.changeBackground : '',
          ]}
          onPress={() => getStatus('Declined')}>
          <Text
            style={[
              styles.buttonText,
              leaveStatus === 'Declined' ? styles.changeText : '',
            ]}>
            Declined
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            leaveStatus === 'Approved' ? styles.changeBackground : '',
          ]}
          onPress={() => getStatus('Approved')}>
          <Text
            style={[
              styles.buttonText,
              leaveStatus === 'Approved' ? styles.changeText : '',
            ]}>
            Approved
          </Text>
        </Pressable>
      </View>
      <ScrollView
        style={styles.leaveContainer}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={true}>
        <Text style={styles.monthName}>{months[currmonth]}</Text>
        <Text
          style={[
            styles.note,
            {display: leavesData.length === 0 ? 'flex' : 'none'},
          ]}>
          {leavesData.length === 0
            ? `No ${leaveStatus} leaves for this month.`
            : ''}
        </Text>
        {leavesData.map(leave => (
          <View key={leave.id} style={styles.leave}>
            <Text style={styles.leaveText}>ID:{leave.empId}</Text>
            <Text style={styles.leaveText}>Reason: {leave.reason}</Text>
            <Text style={styles.leaveText}>Type: {leave.type}</Text>
            <View style={styles.inRowNormal}>
              <Text style={styles.leaveText}>
                From: {leave.from.slice(0, 10)}
              </Text>
              <Text style={styles.leaveText}>To: {leave.to.slice(0, 10)}</Text>
              <Text style={styles.leaveText}>Days: {leave.days}</Text>
            </View>
            <View style={[styles.inRowButton, {}]}>
              <Pressable
                android_ripple={{
                  color: '#ccc',
                }}
                style={[
                  styles.statusButtonContainer,
                  {
                    backgroundColor: '#25bc3e',
                    display: leave.status === 'Approved' ? 'none' : 'flex',
                  },
                ]}
                onPress={() =>
                  updateStatusHandler(
                    leave.id,
                    'Approved',
                    leave.empId,
                    leave.type,
                    leave.days,
                  )
                }>
                <Text style={styles.statusButton}>Approve</Text>
              </Pressable>
              <Pressable
                android_ripple={{
                  color: '#ccc',
                }}
                style={[
                  styles.statusButtonContainer,
                  {
                    backgroundColor: '#c62323',
                    display: leave.status === 'Awaiting' ? 'flex' : 'none',
                  },
                ]}
                onPress={() => updateStatusHandler(leave.id, 'Declined')}>
                <Text style={styles.statusButton}>Decline</Text>
              </Pressable>
              <Pressable
                android_ripple={{
                  color: '#ccc',
                  borderless: true,
                }}
                onPress={() => openDetailsOfLeave(leave)}>
                <MaterialCommunityIcons
                  name="arrow-right-circle"
                  size={25}
                  color="white"
                />
              </Pressable>
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
export default LeaveRequestsScreen;
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
    width: WIDTH * 0.295,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    borderColor: Colors.blue100,
  },
  buttonText: {
    color: Colors.blue100,
    fontWeight: 'bold',
    fontSize: 18,
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
    height: WIDTH * 0.4,
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
    color: 'red',
    marginHorizontal: 13,
  },
  inRowButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statusButton: {
    padding: 5,
    color: 'white',
    letterSpacing: 0.2,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  statusButtonContainer: {
    margin: 5,
    width: WIDTH * 0.18,
    alignItems: 'center',
    borderRadius: 2,
    elevation: 4,
  },
  monthName: {
    fontSize: 20,
    margin: 5,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
});
