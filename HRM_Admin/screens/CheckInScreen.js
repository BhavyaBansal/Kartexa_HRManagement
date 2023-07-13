import {View, StyleSheet, Dimensions, ScrollView, Text} from 'react-native';
import Heading from '../components/Heading';
import Calendar from 'react-native-calendars/src/calendar';
import {useState} from 'react';
import {getclockindetails} from '../api';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
function CheckInScreen({route}) {
  const hrId = route.params.hrId;
    // console.log(hrId);
  const [selectedDate, setSelectedDate] = useState('');
  const [clockinData, setClockInData] = useState([]);
  function clockinDetailsHandler(date) {
    // console.log(hrId);
    const cinData = getclockindetails(date, hrId);
    cinData.then(response => {
      //   console.log(response.data);
      setClockInData(response.data);
    });
  }
  return (
    <View style={styles.outerContainer}>
      {/* <Heading>Clock In Details</Heading> */}
      <View style={styles.calendar}>
        <Calendar
          onDayPress={date => {
            setSelectedDate(date.dateString);
            clockinDetailsHandler(date.dateString);
          }}
          hideExtraDays={true}
          markedDates={{
            [selectedDate]: {selected: true, selectedColor: 'pink'},
          }}
        />
      </View>
      <ScrollView>
        <Text style={styles.selectDate}>
          {selectedDate === '' ? 'No Date Selected!!' : ''}
        </Text>
        {clockinData.map(cind => (
          <View key={cind.id} style={styles.detailContainer}>
            <View></View>
            <View>
              <View style={styles.sameLine}>
                <Text style={styles.detailsText}>{cind.name}</Text>
                <Text style={styles.detailsText}>{cind.email}</Text>
              </View>
              <View style={styles.sameLine}>
                <Text style={styles.detailsText}>{cind.designation}</Text>
                <Text style={styles.detailsText}>{cind.department}</Text>
              </View>
              <Text style={styles.intimeText}>
                {cind.clockintime.slice(11, 16)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export default CheckInScreen;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    width: WIDTH * 0.9,
  },
  detailContainer: {
    margin: 10,
    backgroundColor: Colors.blue100,
    padding: 10,
    width: WIDTH * 0.9,
    borderRadius: 10,
    elevation: 4,
  },
  sameLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  intimeText: {
    color: Colors.blue500,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  selectDate: {
    color: '#e44f4f',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 10,
  },
});
