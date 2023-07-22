import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import CalerdarStrip from 'react-native-calendar-strip';
import {useState, useEffect} from 'react';
import Colors from '../constants/colors';
import {employeesweeklyreport, getoneemployeedata} from '../api';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const WIDTH = Dimensions.get('window').width;

function EmployeeReports({route, navigation}) {
  const hrId = route.params.hrId;
  const [weeklyReport, setWeeklyReport] = useState([]);
  //   const [weekStartDate, setWeekStartDate] = useState(new Date().toISOString());
  function getEmplouyeesWeeklyReport(weekStartDate) {
    // let time = new Date().getTime();
    // console.log(weekStartDate);
    let curr = new Date(weekStartDate);
    let week = [];
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }
    // console.log(week);
    const details = employeesweeklyreport(hrId, week);
    details.then(response => {
      //   for (let i = 0; i < response.data.length; i++) {
      //     const Obj = response.data[i];
      //     const key = Object.keys(Obj);
      //     console.log(key[0]);
      //     console.log(Obj[key[0]].totalWeeklyMinutes);
      //   }
      // console.log(response.data);
      setWeeklyReport(response.data);
    });
  }
  useEffect(() => {
    getEmplouyeesWeeklyReport(new Date().toISOString());
  }, []);
  const findEmployeeWithMaxWork = () => {
    let maxWorkEmployee = null;
    let maxWorkMinutes = 0;

    for (const empData of weeklyReport) {
      for (const employeeId in empData) {
        const totalMinutes = empData[employeeId].totalWeeklyMinutes;
        if (totalMinutes > maxWorkMinutes) {
          maxWorkMinutes = totalMinutes;
          maxWorkEmployee = employeeId;
        }
      }
    }

    return maxWorkEmployee;
  };
  if (weeklyReport.length !== 0) {
    weeklyReport.sort((a, b) => {
      const totalMinutesA = Object.values(a)[0].totalWeeklyMinutes;
      const totalMinutesB = Object.values(b)[0].totalWeeklyMinutes;
      return totalMinutesB - totalMinutesA;
    });
  }
  function showEmployeeDetails(id) {
    const details = getoneemployeedata(id);
    details.then(response => {
      //   console.log(response.data);
      navigation.navigate('EmployeeDetail', {emp: response.data});
    });
  }
  return (
    <View style={styles.outerContainer}>
      <View style={styles.DatePickerContainer}>
        {/* <Text style={styles.dotLeft}></Text>
        <Text style={styles.dotRight}></Text> */}
        <CalerdarStrip
          style={styles.Datepicker}
          calendarColor={Colors.blue200}
          onDateSelected={date => {
            console.log(date);
          }}
          dayContainerStyle={{
            backgroundColor: Colors.blue100,
            padding: 5,
            borderRadius: 20,
          }}
          calendarHeaderStyle={{color: 'white'}}
          dateNameStyle={{color: 'white', letterSpacing: 0.5}}
          dateNumberStyle={{color: 'white'}}
          calendarAnimation={{type: 'sequence', duration: 100}}
          //   onWeekScrollStart={() => {
          //     setWeekTime(weekTime - 604800000);
          //     getEmplouyeesWeeklyReport();
          //   }}
          onWeekChanged={(start, end) => {
            // setWeekStartDate(start);
            getEmplouyeesWeeklyReport(start);
          }}
        />
      </View>
      <View style={{marginTop: 10}}></View>
      <Text style={styles.note}>*Press the card for employee details.</Text>
      <ScrollView>
        {weeklyReport.map(employeeData => {
          for (const employeeId in employeeData) {
            const employeeDetails = employeeData[employeeId];
            return (
              <Pressable
                key={employeeId}
                onPress={() => showEmployeeDetails(employeeId)}>
                <View style={styles.employeeWeeklyContainer}>
                  {employeeId === findEmployeeWithMaxWork() ? (
                    <View style={styles.firstinWeek}>
                      <FontAwesome
                        name="trophy"
                        size={20}
                        style={styles.icon}
                      />
                      <Text style={styles.icon}>First</Text>
                    </View>
                  ) : (
                    ''
                  )}
                  <Text style={styles.employeeWeeklyText}>
                    Employee ID: {employeeId}
                  </Text>
                  {Object.keys(employeeDetails).map(date =>
                    date !== 'totalWeeklyMinutes' ? (
                      <Text key={date} style={styles.employeeWeeklyText}>
                        Date: {date}
                        {'          '} Work Minutes:{' '}
                        {employeeDetails[date].toFixed(2)}
                      </Text>
                    ) : (
                      ''
                    ),
                  )}
                  <Text style={styles.employeeWeeklyMinutes}>
                    Total Weekly Minutes: {employeeDetails.totalWeeklyMinutes}
                  </Text>
                </View>
              </Pressable>
            );
          }
          return null;
        })}
      </ScrollView>
    </View>
  );
}
export default EmployeeReports;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  DatePickerContainer: {
    width: WIDTH * 0.95,
    height: WIDTH * 0.25,
  },
  Datepicker: {
    width: WIDTH * 0.95,
    height: WIDTH * 0.25,
    padding: 10,
    borderRadius: 10,
  },
  employeeWeeklyContainer: {
    margin: 5,
    backgroundColor: Colors.blue200,
    padding: 10,
    borderRadius: 10,
    width: WIDTH * 0.9,
  },
  employeeWeeklyText: {
    color: 'white',
    margin: 2,
  },
  employeeWeeklyMinutes: {
    color: 'white',
    backgroundColor: Colors.blue500,
    padding: 5,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  note: {
    color: '#beb8b8',
    fontWeight: 'bold',
  },
  firstinWeek: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#f6dc30',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  icon: {
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.5,
    margin: 1,
  },
});
