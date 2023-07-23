import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import Label from '../components/Label';
import Input1 from '../components/Input1';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../components/CustomButton';
import {addholiday, addnotification} from '../api';
import Heading from '../components/Heading';
import Textarea from 'react-native-textarea';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
function AddHolidayForm({route}) {
  const hrId = route.params.hrId;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [announcement, setAnnouncement] = useState('');
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
  function setTextAreaValue(val) {
    // console.log(val);
    setAnnouncement(val);
  }
  function addNotificationHandler() {
    const currDate = new Date();
    const newDate = new Date();
    newDate.setTime(currDate.getTime() + 19800 * 1000);
    addnotification(hrId, newDate, announcement)
      .then(() => {
        Alert.alert('Success', 'Announcement has been made successfully!!');
        // setAnnouncement('');
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <ScrollView
      style={styles.outerContainer}
      contentContainerStyle={{alignItems: 'center'}}>
      {/* <Text>{hrId}</Text> */}
      <Image
        source={require('../public/images/Ellipse2.png')}
        style={styles.ellipse2}
      />
      <Image
        source={require('../public/images/Ellipse3.png')}
        style={styles.ellipse3}
      />
      <Heading>Holiday Form</Heading>
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
      <Heading>Announcement Form</Heading>
      <View style={styles.container}>
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          onChangeText={setTextAreaValue}
          maxLength={120}
          placeholder={'Enter your announcement here...'}
          placeholderTextColor={'#4f4c4c'}
          underlineColorAndroid={'transparent'}
        />
      </View>
      <CustomButton onPressProp={addNotificationHandler}>Submit</CustomButton>
      <View style={{marginBottom: 20}}></View>
    </ScrollView>
  );
}
export default AddHolidayForm;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
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
  textareaContainer: {
    width: WIDTH * 0.85,
    height: 180,
    padding: 5,
    backgroundColor: Colors.blue100,
    borderRadius: 10,
    margin: 10,
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 14,
    color: 'black',
  },
});
