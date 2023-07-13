import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input1 from '../components/Input1';
import Label from '../components/Label';
import {useState} from 'react';
import CustomButton from '../components/CustomButton';
import SelectDropdown from 'react-native-select-dropdown';
import Colors from '../constants/colors';
import {insertleave} from '../api';
const leaveTypes = ['Maternal', 'Sick', 'Casual', 'Earned'];
const WIDTH = Dimensions.get('window').width;
function LeaveForm({route, navigation}) {
  const empId = route.params.empId;
  const hrId = route.params.hrId;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [type, setType] = useState('');
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromCalcTime, setFromCalcTime] = useState(0);
  const [toCalcTime, setToCalcTime] = useState(0);
  const [noOfDays, setNoOfDays] = useState(0);
  const [leavetype, setLeaveType] = useState('');
  const onChange = (event, sdate) => {
    const currDate = sdate || selectedDate;
    setShow(Platform.OS === 'ios');
    setSelectedDate(currDate);
    let tempDate = new Date(currDate);
    let newDate = new Date(currDate);
    newDate.setTime(tempDate.getTime() + 19800 * 1000);
    // console.log(newDate.toISOString().slice(6, 7));
    if (type === 'from') {
      setFromDate(newDate.toISOString());
      setFromCalcTime(newDate.getTime());
    }
    if (type === 'to') {
      setToDate(newDate.toISOString());
      setToCalcTime(newDate.getTime());
    }
  };
  const showMode = val => {
    setType(val);
    setShow(true);
  };
  function addLeaveHandler() {
    // console.log(noOfDays);
    insertleave(hrId, empId, reason, fromDate, toDate, noOfDays, leavetype)
      .then(() => {
        Alert.alert('Success', 'Leave request made successfully');
        navigation.navigate('Leave', {empId, hrId});
      })
      .catch(error => {
        console.log(error);
      });
  }
  // console.log(new Date());
  return (
    <View>
      <Text style={styles.note}>Note: *From date will also gets counted.</Text>
      <Text style={styles.evdays}>
        Evaluated Days :{'  '}
        {toCalcTime !== 0 && fromCalcTime !== 0
          ? parseInt((toCalcTime - fromCalcTime) / 84600000 + 1).toString()
          : '0'}
      </Text>
      <Label>Enter Reason:</Label>
      <Input1
        placeValue="Enter Reason For Leave"
        multi={true}
        spellcheck={true}
        onChangeProp={event => setReason(event)}></Input1>
      <Label>Enter From Date:</Label>
      <Input1
        placeValue={'Enter From Date'}
        onPressInProp={() => showMode('from')}
        inputValue={fromDate === '' ? '' : fromDate.slice(0, 10)}></Input1>
      {show && type === 'from' && (
        <DateTimePicker
          // testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
      <Label>Enter To Date:</Label>
      <Input1
        placeValue={'Enter To Date'}
        onPressInProp={() => showMode('to')}
        inputValue={toDate === '' ? '' : toDate.slice(0, 10)}></Input1>
      {show && type === 'to' && (
        <DateTimePicker
          // testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
      <Label>Number Of Days :</Label>
      <Input1
        placeValue={'Enter Number Of Days'}
        onChangeProp={event => setNoOfDays(event)}></Input1>
      <Label>Choose Type Of Leave:</Label>
      <View style={styles.selectContainer}>
        <SelectDropdown
          data={leaveTypes}
          onSelect={(selectedItem, index) => {
            setLeaveType(selectedItem);
          }}
          buttonStyle={{
            width: WIDTH * 0.9,
            borderRadius: 10,
            // backgroundColor: Colors.blue100,
          }}
          buttonTextStyle={{
            fontSize: 20,
            color: 'black',
            letterSpacing: 1,
            fontWeight: 'bold',
          }}
        />
      </View>
      <CustomButton onPressProp={addLeaveHandler}>Submit</CustomButton>
    </View>
  );
}
export default LeaveForm;
const styles = StyleSheet.create({
  selectContainer: {
    margin: 10,
  },
  note: {
    color: '#ea3838',
    marginVertical: 10,
    marginHorizontal: 13,
  },
  evdays: {
    backgroundColor: Colors.grey100,
    color: 'white',
    padding: 5,
    width: WIDTH * 0.35,
    marginLeft: 10,
    marginVertical: 5,
  },
});
