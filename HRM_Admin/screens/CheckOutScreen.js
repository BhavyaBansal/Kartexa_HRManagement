import {View, StyleSheet, Dimensions, ScrollView, Text} from 'react-native';
import Heading from '../components/Heading';
import Calendar from 'react-native-calendars/src/calendar';
import {useState} from 'react';
import {getclockoutdetails} from '../api';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
function CheckOutScreen({route}) {
  const hrId = route.params.hrId;
  // console.log(hrId);
  const [selectedDate, setSelectedDate] = useState('');
  const [clockoutData, setClockOutData] = useState([]);
  function clockoutDetailsHandler(date) {
    // console.log(date);
    const cinData = getclockoutdetails(date, hrId);
    cinData.then(response => {
      //   console.log(response.data);
      setClockOutData(response.data);
    });
  }
  return (
    <View style={styles.outerContainer}>
      {/* <Heading>Check In Details</Heading> */}
      <View style={styles.calendar}>
        <Calendar
          onDayPress={date => {
            setSelectedDate(date.dateString);
            clockoutDetailsHandler(date.dateString);
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
        {clockoutData.map(coutd => (
          <View key={coutd.id} style={styles.detailContainer}>
            <View></View>
            <View>
              <View style={styles.sameLine}>
                <Text style={styles.detailsText}>{coutd.name}</Text>
                <Text style={styles.detailsText}>{coutd.email}</Text>
              </View>
              <View style={styles.sameLine}>
                <Text style={styles.detailsText}>{coutd.designation}</Text>
                <Text style={styles.detailsText}>{coutd.department}</Text>
              </View>
              <View style={styles.sameLine}>
                <Text style={styles.intimeText}>
                  {coutd.clockouttime.slice(11, 16)}
                </Text>
                <Text style={styles.intimeText}>{coutd.totaltimeworked}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export default CheckOutScreen;
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
