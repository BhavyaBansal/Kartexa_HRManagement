import {View, Text, StyleSheet, Image, Dimensions, Alert} from 'react-native';
import Label from '../components/Label';
import Input1 from '../components/Input1';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../components/CustomButton';
import {addholiday} from '../api';
const WIDTH = Dimensions.get('window').width;
function AddHolidayForm({route}) {
  const hrId = route.params.hrId;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const onChange = (event, sdate) => {
    const currDate = sdate || selectedDate;
    setShow(Platform.OS === 'ios');
    setSelectedDate(currDate);
    let tempDate = new Date(currDate);
    let newDate = new Date(currDate);
    newDate.setTime(tempDate.getTime() + 19800 * 1000);
    if (type === 'Holiday') {
      setHolidayDate(newDate.toISOString());
    }
  };
  const showMode = val => {
    setType(val);
    setShow(true);
  };
  function setreasonvalue(val) {
    setReason(val);
  }
  function setdescriptionvalue(val) {
    setDescription(val);
  }
  function setEvenrthingNull() {
    setReason('');
    setDescription('');
    setHolidayDate('');
  }
  function addHolidayHandler() {
    addholiday(hrId, reason, description, holidayDate)
      .then(() => {
        Alert.alert('Success', 'Successfully Add Holiday');
        setEvenrthingNull();
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <View style={styles.outerContainer}>
      {/* <Text>{hrId}</Text> */}
      <Image
        source={require('../public/images/Ellipse2.png')}
        style={styles.ellipse2}
      />
      <Image
        source={require('../public/images/Ellipse3.png')}
        style={styles.ellipse3}
      />
      <Label>Holiday Reason:</Label>
      <Input1
        placeValue={'Enter reason for holiday'}
        onChangeProp={setreasonvalue}></Input1>
      <Label>Holiday Description:</Label>
      <Input1
        placeValue={'Enter description of holiday'}
        multi={true}
        onChangeProp={setdescriptionvalue}></Input1>
      <Label>Enter Date:</Label>
      <Input1
        placeValue={'Enter Holiday Date'}
        onPressInProp={() => showMode('Holiday')}
        inputValue={
          holidayDate === '' ? '' : holidayDate.slice(0, 10)
        }></Input1>
      {show && (
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
      <CustomButton onPressProp={addHolidayHandler}>Submit</CustomButton>
    </View>
  );
}
export default AddHolidayForm;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipse2: {
    width: WIDTH * 0.6,
    height: WIDTH * 0.66,
    resizeMode: 'cover',
    position: 'absolute',
    top: WIDTH * 0.05,
    left: 0,
    zIndex: -1,
  },
  ellipse3: {
    width: WIDTH * 0.43,
    height: WIDTH * 0.75,
    resizeMode: 'cover',
    position: 'absolute',
    top: WIDTH * 0.9,
    right: 0,
    zIndex: -1,
  },
});
