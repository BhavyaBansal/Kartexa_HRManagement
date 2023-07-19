import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useEffect, useLayoutEffect, useState} from 'react';
import Colors from '../constants/colors';
import {clockIn, clockOut, updateSalaryEachDay, getallholidays} from '../api';
import NavigationFooter from '../components/NavigationFooter';
import Octicons from 'react-native-vector-icons/Octicons';
import Calendar from 'react-native-calendars/src/calendar';
import Heading from '../components/Heading';
import SideBar from '../components/SideBar';
import Label from '../components/Label';
const WIDTH = Dimensions.get('window').width;
function EmployeeHome({route, navigation}) {
  const emp = route.params.employee;
  // console.log(emp);
  const empId = emp.empid;
  const [clockin, setClockin] = useState(true);
  const [clockout, setClockout] = useState(false);
  const [inTime, setInTime] = useState('');
  const [clockId, setClockId] = useState('');
  //   console.log(emp);
  const [sidebarIsVisible, setSideBarIsVisible] = useState(false);
  // const [empLeavesData, setEmpLeavesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [allHolidays, setAllHolidays] = useState([]);
  const [singleHoliday, setSingleHoliday] = useState([]);
  function endSideBar() {
    setSideBarIsVisible(false);
  }
  function showSidebar() {
    setSideBarIsVisible(true);
  }
  function logoutHandler() {}
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerContainer}>
            <Text style={styles.emailText}>{emp.email} </Text>
            <Text onPress={logoutHandler} style={styles.logout}>
              Logout
            </Text>
            <Pressable
              android_ripple={{color: '#ccc', borderless: true}}
              onPress={showSidebar}>
              <Octicons name="three-bars" size={20} style={styles.icons} />
            </Pressable>
          </View>
        );
      },
    });
  });
  function clockInHandler() {
    setClockin(false);
    setClockout(true);
    clockIn(
      emp.hrid,
      emp.empid,
      emp.name,
      emp.email,
      emp.phonenumber,
      emp.department,
      emp.designation,
    )
      .then(res => {
        Alert.alert('Success', 'Clocked In Successfully');
        let intime = res.data.newDate.toString().slice(11, 16);
        let id = res.data.cid;
        // console.log(intime.slice(3, 5));
        setClockId(id);
        setInTime(intime);
      })
      .catch(error => {
        console.log(error);
      });
  }
  function clockOutHandler() {
    setClockin(true);
    setClockout(false);
    clockOut(clockId, inTime)
      .then(res => {
        let outTime = res.data.outTime;
        let totaltimeout = res.data.totalTimeOut;
        setInTime('');
        setClockId('');
        Alert.alert(
          'Success',
          `ClockOut Time: ${outTime}\nTotal Time Worked: ${totaltimeout}`,
        );
      })
      .catch(error => {
        console.log(error);
      });
  }
  function getLeavesDaily() {
    const employeeLeavesData = updateSalaryEachDay(empId);
    employeeLeavesData.then(response => {
      // console.log(response.data);
      // setEmpLeavesData(response.data);
    });
  }
  function getAllHolidaysDaily() {
    const holidays = getallholidays(emp.hrid);
    holidays.then(response => {
      // console.log(response.data);
      setAllHolidays(response.data);
    });
  }
  useEffect(() => {
    getLeavesDaily();
    getAllHolidaysDaily();
  }, []);
  const markedHolidays = {
    [selectedDate]: {selected: true, selectedColor: 'pink'},
  };
  if (allHolidays.length !== 0) {
    allHolidays.map(holiday => {
      markedHolidays[holiday.date] = {
        selected: true,
        selectedColor: '#1ce10b',
      };
    });
  }
  function closeHolidayNow() {
    setSingleHoliday([]);
  }
  // console.log(markedHolidays);
  let holidayy = [];
  return (
    <>
      <View style={styles.outerContainer}>
        <View style={styles.buttonContainer}>
          {clockin === true ? (
            <CustomButton onPressProp={clockInHandler}>ClockIn</CustomButton>
          ) : (
            <CustomButton onPressProp={clockOutHandler}>ClockOut</CustomButton>
          )}

          {inTime !== '' ? (
            <Text style={styles.inTimeText}>Clock In Time: {inTime}</Text>
          ) : (
            ''
          )}
        </View>

        <View style={styles.calendar}>
          <Calendar
            onDayPress={date => {
              setSelectedDate(date.dateString);
              holidayy = allHolidays.filter(function (el) {
                return el.date === date.dateString;
              });
              if (holidayy.length !== 0) {
                setSingleHoliday(holidayy);
              } else {
                setSingleHoliday([]);
              }
              // console.log(holidayy);
            }}
            hideExtraDays={true}
            markedDates={markedHolidays}
            // minDate={new Date().getDate()}
            minDate={new Date().toISOString()}
          />
        </View>
        {singleHoliday.length !== 0 ? (
          <>
            <View style={styles.holidayContainer}>
              <Label>Reason:</Label>
              <Text style={styles.holidayText}>{singleHoliday[0].reason}</Text>
              <Label>Description:</Label>
              <Text style={styles.holidayText}>
                {singleHoliday[0].description}
              </Text>
              <Text style={styles.okButton} onPress={closeHolidayNow}>
                OK
              </Text>
            </View>
            <Text style={styles.holidayNote}>It's a Holiday🥳</Text>
          </>
        ) : (
          ''
        )}
        <SideBar
          onCancel={endSideBar}
          visible={sidebarIsVisible}
          employeeId={empId}
          hrId={emp.hrid}
        />
      </View>
      <NavigationFooter emp={emp}></NavigationFooter>
    </>
  );
}
export default EmployeeHome;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logout: {
    color: Colors.blue300,
    fontSize: 12,
  },
  emailText: {
    fontSize: 12,
    color: '#000',
    letterSpacing: 0.3,
    fontWeight: 'bold',
    marginRight: 10,
  },
  inTimeText: {
    fontSize: 16,
    color: '#000000',
    letterSpacing: 1,
  },
  icons: {
    color: 'black',
    marginRight: 5,
    marginLeft: 10,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    width: WIDTH * 0.95,
    alignSelf: 'center',
  },
  holidayContainer: {
    margin: 5,
    width: WIDTH * 0.95,
    height: WIDTH * 0.4,
    elevation: 4,
    backgroundColor: 'white',
    padding: 5,
    alignSelf: 'center',
  },
  holidayText: {
    marginLeft: 10,
    marginVertical: 5,
    letterSpacing:0.5,
    fontSize:12,
    // color:'black'  
  },
  okButton: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    padding: 5,
    backgroundColor: Colors.blue400,
    color: 'white',
    borderRadius: 2,
    fontWeight: 'bold',
  },
  holidayNote: {
    alignSelf: 'center',
    fontWeight:'bold',
    color:'black',
  },
});
