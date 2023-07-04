import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  Alert,
  RefreshControl,
} from 'react-native';
import Calendar from 'react-native-calendars/src/calendar';
import Heading from '../components/Heading';
import Colors from '../constants/colors';
import {useState, useCallback} from 'react';
import {getmeetingsbyId, changemeetstatus} from '../api';
const WIDTH = Dimensions.get('window').width;
function CalendarScreen({route, navigation}) {
  const empId = route.params.empId;
  const [selectedDate, setSelectedDate] = useState('');
  const [meetingsData, setMeetingsData] = useState([]);
  //   const [refreshing, setRefreshing] = useState(false);
  // const [meetStatus, setMeetStatus] = useState('');
  //   const onRefresh = useCallback(() => {
  //     setRefreshing(true);
  //     setTimeout(() => {
  //       setRefreshing(false);
  //     }, 2000);
  //   }, []);
  function getMeetingsDataHandler(date) {
    const meetData = getmeetingsbyId(empId, date);
    meetData.then(response => {
      setMeetingsData(response.data);
    });
  }
  function changeMeetStatus(meetId, empId, status) {
    // setMeetStatus(status);
    // <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;
    // console.log(selectedDate);
    changemeetstatus(meetId, empId, status)
      .then(res => {
        Alert.alert('Success', 'Status Updated Successfully');
        getMeetingsDataHandler(selectedDate);
      })
      .catch(error => {
        console.log(error);
      });
  }
  function openMeetingDetailsPage(meetingDetails) {
    navigation.navigate('Meeting', {meetingDetails});
  }
  //   console.log(meetingsData);
  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={styles.outerContainer}
      contentContainerStyle={{alignItems: 'center'}}>
      {/* <Text>{empId}</Text> */}
      <View style={styles.calendar}>
        <Calendar
          onDayPress={date => {
            setSelectedDate(date.dateString);
            getMeetingsDataHandler(date.dateString);
          }}
          hideExtraDays={true}
          markedDates={{
            [selectedDate]: {selected: true, selectedColor: 'pink'},
          }}
        />
      </View>
      <Heading>Meetings</Heading>
      <ScrollView
        alwaysBounceVertical={true}
        style={styles.meetingsContainer}
        nestedScrollEnabled={true}>
        {meetingsData.map(meeting => (
          <View
            style={[styles.inRow, styles.meetingContainer]}
            key={meeting.meetId}>
            <Pressable onPress={() => openMeetingDetailsPage(meeting)}>
              <Text style={styles.meetText}>{meeting.topic}</Text>
              <View style={styles.inRow}>
                <Text style={styles.meetText}>{meeting.date.slice(0, 10)}</Text>
                <Text style={styles.meetText}>
                  {parseInt(meeting.time.slice(0, 2)) > 11 ||
                  parseInt(meeting.time.slice(0, 2)) !== 24
                    ? meeting.time + ' pm'
                    : meeting.time + ' am'}
                </Text>
              </View>
              <Text style={styles.meetText}>{meeting.link}</Text>
            </Pressable>
            {/* {([meetStatus, setMeetStatus] = useState(''))} */}
            {(meetStatus = '')}
            {meeting.participants.map(parti => {
              if (parti.id === empId) {
                meetStatus = parti.status;
                // setMeetStatus(parti.status);
              }
            })}
            <View>
              <Pressable
                disabled={meetStatus === 'Accepted' ? true : false}
                android_ripple={{color: '#ccc', foreground: true}}
                onPress={() =>
                  changeMeetStatus(meeting.meetId, empId, 'Accepted')
                }
                style={[
                  styles.buttonContainer,
                  {
                    backgroundColor: '#38d235',
                    opacity: meetStatus === 'Accepted' ? 0.5 : 1,
                  },
                ]}>
                <Text style={{color: 'white'}}>Going</Text>
              </Pressable>
              <Pressable
                disabled={meetStatus === 'Declined' ? true : false}
                android_ripple={{color: '#ccc', foreground: true}}
                onPress={() =>
                  changeMeetStatus(meeting.meetId, empId, 'Declined')
                }
                style={[
                  styles.buttonContainer,
                  {
                    backgroundColor: '#ea3c3c',
                    opacity: meetStatus === 'Declined' ? 0.5 : 1,
                  },
                ]}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
      <Heading>Leaves</Heading>
    </ScrollView>
  );
}
export default CalendarScreen;
const styles = StyleSheet.create({
  calendar: {
    borderRadius: 10,
    elevation: 4,
    width: WIDTH * 0.95,
    alignSelf: 'center',
  },
  outerContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  meetingsContainer: {
    width: WIDTH * 0.95,
    height: WIDTH * 0.5,
  },
  meetingContainer: {
    backgroundColor: Colors.blue100,
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  inRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meetText: {
    padding: 5,
    color: 'black',
  },
  buttonContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginVertical: 4,
    elevation: 4,
  },
});
