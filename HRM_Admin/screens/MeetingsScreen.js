import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useState, useEffect} from 'react';
import Colors from '../constants/colors';
import WeeklyCalendar from 'react-native-weekly-calendar';
import moment from 'moment';
import {getallmeetinformat} from '../api';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
function MeetingsScreen({route, navigation}) {
  const hrId = route.params.hrId;
  const empObj = route.params.empObj;
  const [AllEvents, setAllEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [idd, setId] = useState('');
  function openAddMeetForm() {
    navigation.navigate('ScheduleMeet', {hrId, empObj});
  }
  function showMeetingDetailHandler(id) {
    setModalVisible(!modalVisible);
    setId(id);
    // console.log(id);
  }
  function getAllMeet() {
    const allMeets = getallmeetinformat(hrId);
    allMeets.then(response => {
      console.log(response.data);
      setAllEvents(response.data);
    });
  }
  useEffect(() => {
    getAllMeet();
  }, []);
  //   let sampleData = new Array(AllEvents);
  //   if (AllEvents.length !== 0) {
  //     AllEvents.map(myevent => {
  //       sampleData.push(myevent);
  //     });
  //   }
  console.log(AllEvents);
  const sampleData = [
    {
      duration: '02:00:00',
      id: '64b2f1e12223572cef721f33',
      note: 'Check Status of work',
      start: '2023-07-18 18:30:00',
    },
    {
      duration: '01:00:00',
      id: '64b3bd723b9bf1adb76d0743',
      note: 'Check Work Of Frontend team',
      start: '2023-07-17 08:05:00',
    },
  ];
  console.log(typeof AllEvents);
  console.log(typeof sampleData);
  return (
    <View style={styles.outerContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Entypo name="cross" size={25} />
            </Pressable>
            <Text>{idd}</Text>
          </View>
        </View>
      </Modal>
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
      <View style={styles.container}>
        <WeeklyCalendar
          events={sampleData}
          selected={new Date()}
          style={{
            height: HEIGHT * 0.8,
            width: WIDTH * 0.95,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'black',
          }}
          onDayPress={(weekday, i) => {
            console.log(weekday);
          }}
          themeColor={Colors.blue200}
          titleStyle={{color: Colors.blue200, fontWeight: 'bold'}}
          dayLabelStyle={{color: Colors.blue200, fontWeight: 'bold'}}
          renderDay={(eventViews, weekdayToAdd, i) => (
            <View key={i.toString()} style={styles.day}>
              <View style={styles.dayLabel}>
                <Text style={[styles.monthDateText]}>
                  {weekdayToAdd.format('M/D').toString()}
                </Text>
                <Text style={[styles.dayText]}>
                  {weekdayToAdd.format('ddd').toString()}
                </Text>
              </View>
              <View
                style={[
                  styles.allEvents,
                  eventViews.length === 0 ? styles.Nomeet : {},
                ]}>
                {eventViews.length === 0 ? (
                  <Text style={styles.noMeetText}>No Meetings Scheduled..</Text>
                ) : (
                  eventViews
                )}
              </View>
            </View>
          )}
          renderEvent={(event, j) => {
            let startTime = moment(event.start).format('LT').toString();
            let duration = event.duration.split(':');
            let seconds =
              parseInt(duration[0]) * 3600 +
              parseInt(duration[1]) * 60 +
              parseInt(duration[2]);
            let endTime = moment(event.start)
              .add(seconds, 'seconds')
              .format('LT')
              .toString();
            return (
              <View key={j}>
                <Pressable
                  style={styles.event}
                  android_ripple={{color: '#ccc', foreground: true}}
                  //   onPress={() => showMeetingDetailHandler(event.id)}
                >
                  <View style={styles.eventDuration}>
                    <View style={styles.durationContainer}>
                      <Text style={styles.durationText}>{startTime}</Text>
                    </View>
                    <View style={{paddingTop: 4}} />
                    <Text style={styles.durationText}>to</Text>
                    <View style={{paddingTop: 4}} />
                    <View style={styles.durationContainer}>
                      <Text style={styles.durationText}>{endTime}</Text>
                    </View>
                    {/* <View style={styles.durationDotConnector} /> */}
                  </View>
                  <View style={styles.eventNote}>
                    <Text style={styles.eventText}>{event.note}</Text>
                  </View>
                </Pressable>
                <View style={styles.lineSeparator} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
export default MeetingsScreen;
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
  },
  dayLabel: {
    width: WIDTH * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT * 0.09,
  },
  event: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: WIDTH * 0.8,
    height: HEIGHT * 0.09,
  },
  allEvents: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'black',
  },
  Nomeet: {
    backgroundColor: '#a1bdd6',
    width: WIDTH * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthDateText: {
    color: Colors.blue200,
    fontWeight: 'bold',
  },
  dayText: {
    color: Colors.blue200,
    fontWeight: 'bold',
  },
  eventDuration: {
    width: WIDTH * 0.2,
    backgroundColor: '#b8e8d3',
    height: HEIGHT * 0.09,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
  },
  eventNote: {
    width: WIDTH * 0.6,
    backgroundColor: '#c7c5e6',
    height: HEIGHT * 0.09,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
  },
  durationText: {
    color: Colors.blue200,
    fontWeight: 'bold',
  },
  eventText: {
    color: Colors.blue200,
    fontWeight: 'bold',
  },
  noMeetText: {
    color: 'white',
    letterSpacing: 1,
    fontSize: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: WIDTH * 0.8,
    height: WIDTH,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inRow: {
    flexDirection: 'row',
    width: WIDTH * 0.9,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
