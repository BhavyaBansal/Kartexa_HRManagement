import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
  Linking,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useState, useEffect} from 'react';
import Colors from '../constants/colors';
import {getmeetingsbydate, getoneemployeedata} from '../api';
import CalerdarStrip from 'react-native-calendar-strip';
// import Text from '../components/Text';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
function MeetingsScreenCard({route, navigation}) {
  const hrId = route.params.hrId;
  const empObj = route.params.empObj;
  const [selectedDate, setSelectedDate] = useState('');
  const [meetingsData, setMeetingsData] = useState([]);
  function openAddMeetForm() {
    navigation.navigate('ScheduleMeet', {hrId, empObj});
  }
  function getMeetingsDetails(date) {
    const details = getmeetingsbydate(hrId, date);
    details.then(response => {
      //   console.log(response.data[0].participants);
      //   response.data[0].participants.map(parti)
      setMeetingsData(response.data);
    });
  }
  useEffect(() => {
    getMeetingsDetails(new Date().toISOString());
  }, []);
  function showEmployeeDetails(id) {
    const details = getoneemployeedata(id);
    details.then(response => {
      navigation.navigate('EmployeeDetail', {emp: response.data});
    });
    // console.log(id);
  }
  return (
    <View style={styles.outerContainer}>
      <View style={styles.inRow}>
        <Text style={styles.eventText}>Schedule Meet: </Text>
        <Pressable
          android_ripple={{color: '#ccc', borderless: true, radius: 20}}
          onPress={openAddMeetForm}>
          <MaterialIcons
            name="add-circle"
            size={30}
            style={styles.icons}></MaterialIcons>
        </Pressable>
      </View>
      <CalerdarStrip
        style={styles.Datepicker}
        calendarColor={Colors.blue200}
        selectedDate={new Date()}
        onDateSelected={date => {
          setSelectedDate(date);
          getMeetingsDetails(date);
          console.log(date);
        }}
        highlightDateNumberContainerStyle={{
          backgroundColor: Colors.blue100,
          padding: 5,
          borderRadius: 20,
        }}
        calendarHeaderStyle={{color: 'white'}}
        dateNameStyle={{color: 'white', letterSpacing: 0.5}}
        dateNumberStyle={{color: 'white'}}
        highlightDateNameStyle={{
          color: 'white',
          fontSize: 13,
          fontWeight: 'bold',
        }}
        highlightDateNumberStyle={{
          color: 'white',
          fontSize: 18,
          fontWeight: 'bold',
        }}
        calendarAnimation={{type: 'sequence', duration: 100}}
      />
      <ScrollView>
        {meetingsData.length === 0 ? (
          <Text style={styles.note}>No meetings scheduled for this day.</Text>
        ) : (
          ''
        )}
        {meetingsData.map(meeting => (
          <Pressable key={meeting.id} style={styles.meetingContainer}>
            <View style={styles.inRowNormal}>
              <Text style={styles.meetingLabel}>Topic:</Text>
              <Text style={styles.meetingText}>{meeting.topic}</Text>
            </View>
            <View style={styles.inRowNormal}>
              <Text style={styles.meetingLabel}>Description:</Text>
              <Text style={styles.meetingText}>{meeting.description}</Text>
            </View>
            <View style={styles.inRowNormal}>
              <Text style={styles.meetingLabel}>Goals:</Text>
              <Text style={styles.meetingText}>{meeting.goals}</Text>
            </View>
            <View style={styles.inRowNormal}>
              <Text style={styles.meetingLabel}>Team Name:</Text>
              <Text style={styles.meetingText}>{meeting.teamname}</Text>
            </View>
            <View style={styles.inRowNormal}>
              <Text style={styles.meetingLabel}>Team Size:</Text>
              <Text style={styles.meetingText}>{meeting.teamsize}</Text>
            </View>
            <View style={styles.inRowNormal}>
              <Text style={styles.meetingLabel}>Date:</Text>
              <Text style={styles.meetingText}>
                {meeting.date.slice(0, 10)}
              </Text>
            </View>
            <View style={styles.inRowNormal}>
              <Text style={styles.meetingLabel}>Time:</Text>
              <Text style={styles.meetingText}>{meeting.time}</Text>
            </View>
            <View style={styles.inRowNormal}>
              <Text style={styles.meetingLabel}>Duration:</Text>
              <Text style={styles.meetingText}>{meeting.duration} hours</Text>
            </View>
            <View style={styles.inRowNormal}>
              <Text style={styles.meetingLabel}>Link:</Text>
              <Text
                style={[styles.meetingText, {color: 'blue'}]}
                onPress={() => Linking.openURL('https://' + meeting.link)}>
                {meeting.link}
              </Text>
            </View>
            <Text style={styles.meetingLabel}>Presentees:</Text>
            {meeting.participants.map(parti =>
              parti.status === 'Accepted' ? (
                <Text
                  style={styles.meetingTextEmp}
                  onPress={() => showEmployeeDetails(parti.id)}>
                  {parti.email}
                </Text>
              ) : (
                ''
              ),
            )}
            <Text style={styles.meetingLabel}>Absentees:</Text>
            {meeting.participants.map(parti =>
              parti.status === 'Declined' ? (
                <>
                  <Text
                    style={styles.meetingTextEmp}
                    onPress={() => showEmployeeDetails(parti.id)}>
                    {parti.email}
                  </Text>
                </>
              ) : (
                ''
              ),
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
export default MeetingsScreenCard;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  icons: {
    color: Colors.blue100,
    alignSelf: 'flex-end',
    margin: 8,
  },
  eventText: {
    color: Colors.blue200,
    fontWeight: 'bold',
  },
  inRow: {
    flexDirection: 'row',
    width: WIDTH * 0.9,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  Datepicker: {
    width: WIDTH * 0.95,
    height: WIDTH * 0.25,
    padding: 10,
    borderRadius: 10,
  },
  meetingContainer: {
    margin: 10,
    backgroundColor: Colors.blue100,
    padding: 10,
    borderRadius: 10,
    width: WIDTH * 0.9,
  },
  meetingText: {
    margin: 2,
    color: 'black',
    letterSpacing: 1,
  },
  inRowNormal: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  meetingLabel: {
    color: 'black',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  meetingTextEmp: {
    color: 'white',
    margin: 2,
    backgroundColor: Colors.blue200,
    padding: 8,
    alignSelf: 'flex-start',
    textAlign: 'center',
    borderRadius: 15,
  },
  note: {
    fontSize: 14,
    color: 'red',
    letterSpacing: 1,
    fontWeight: 'bold',
  },
});
