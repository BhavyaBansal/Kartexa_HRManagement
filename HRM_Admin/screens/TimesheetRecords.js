import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  Modal,
  Alert,
  Image,
} from 'react-native';
import CalerdarStrip from 'react-native-calendar-strip';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../constants/colors';
import {useState} from 'react';
import {getalltimesheetsbydate} from '../api';
const WIDTH = Dimensions.get('window').width;
function TimesheetRecords({route}) {
  const hrId = route.params.hrId;
  const [selectedDate, setSelectedDate] = useState('');
  const [timesheetsData, setTimesheetsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  function getalltimesheets(date) {
    const timesheets = getalltimesheetsbydate(hrId, date);
    timesheets.then(response => {
      // console.log(response.data);
      setTimesheetsData(response.data);
    });
  }
  function openModalForDetails(timesheet) {
    setModalVisible(!modalVisible);
    setModalData(timesheet);
  }
  return (
    <View style={styles.outerContainer}>
      <CalerdarStrip
        style={styles.Datepicker}
        calendarColor={Colors.blue200}
        // selectedDate={new Date().getTime() + 19800 * 1000}
        onDateSelected={date => {
          setSelectedDate(date);
          getalltimesheets(date);
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
      <View style={{marginTop: 10}}></View>
      {selectedDate === '' ? (
        <Text style={styles.note}>No Date Selected.</Text>
      ) : timesheetsData.length === 0 ? (
        <Text style={styles.note}>
          Till now no timesheets are submitted for this date.
        </Text>
      ) : (
        ''
      )}
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
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.cross}>
              <Entypo name="cross" size={25} />
            </Pressable>
            <Text style={styles.modalText}>
              <Text style={styles.modalLabelText}>Name: </Text>
              {modalData.name}
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.modalLabelText}>Email: </Text>
              {modalData.email}
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.modalLabelText}>Phone Number: </Text>
              {modalData.phonenumber}
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.modalLabelText}>Employment Type: </Text>
              {modalData.employmenttype}
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.modalLabelText}>Time Taken: </Text>
              {modalData.duration} hours
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.modalLabelText}>Date: </Text>
              {modalData.date}
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.modalLabelText}>Task Done: </Text>
              {modalData.taskdone}
            </Text>
            {modalData.image === 'empty' ? (
              <Text style={styles.noImage}>No Image Submitted</Text>
            ) : (
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: `data:image/png;base64,${modalData.image}`}}
                  style={styles.imageStyle}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
      <ScrollView>
        {timesheetsData.map(timesheet => (
          <Pressable
            android_ripple={{color: '#ccc'}}
            key={timesheet.id}
            style={styles.oneTimesheet}
            onPress={() => openModalForDetails(timesheet)}>
            <View style={styles.inRow}>
              <Text style={styles.timesheetText}>{timesheet.name}</Text>
              <Text style={styles.timesheetText}>{timesheet.email}</Text>
            </View>
            <Text style={styles.timesheetText}>
              {timesheet.taskdone.length > 30
                ? timesheet.taskdone.slice(0, 30) + '...'
                : timesheet.taskdone}
            </Text>
            <Text style={styles.dateStyle}>{timesheet.date}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
export default TimesheetRecords;
const styles = StyleSheet.create({
  Datepicker: {
    width: WIDTH * 0.95,
    height: WIDTH * 0.25,
    padding: 10,
    borderRadius: 10,
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  oneTimesheet: {
    marginVertical: 10,
    width: WIDTH * 0.95,
    height: WIDTH * 0.18,
    backgroundColor: Colors.blue100,
    borderRadius: 10,
    elevation: 2,
    padding: 10,
  },
  inRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    width: WIDTH * 0.95,
    height: WIDTH * 1.5,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cross: {
    alignSelf: 'flex-end',
  },
  timesheetText: {
    margin: 5,
    color: 'black',
    letterSpacing: 0.5,
  },
  dateStyle: {
    position: 'absolute',
    letterSpacing: 0.5,
    right: 10,
    bottom: 0,
    fontSize: 11,
    color: 'white',
    backgroundColor: Colors.blue200,
    padding: 5,
    borderRadius: 4,
    elevation: 4,
  },
  imageStyle: {
    width: WIDTH * 0.54,
    height: WIDTH * 0.64,
  },
  imageContainer: {
    width: WIDTH * 0.55,
    height: WIDTH * 0.65,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  modalText: {
    margin: 5,
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  modalLabelText: {
    color: 'black',
    fontWeight: 'bold',
  },
  noImage: {
    margin: 5,
    color: 'red',
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  note: {
    color: 'red',
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
});
