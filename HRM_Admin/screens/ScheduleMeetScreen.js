import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Dimensions, Alert} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/colors';
import Input1 from '../components/Input1';
import CustomButton from '../components/CustomButton';
import {schedulemeet, sendEmail} from '../api';
const WIDTH = Dimensions.get('window').width;
function ScheduleMeetScreen({route}) {
  const hrId = route.params.hrId;
  const empObj = route.params.empObj;
  // console.log(empObj);end
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('');
  const onChangeDate = (event, sdate) => {
    const currDate = sdate || selectedDate;
    setShow(Platform.OS === 'ios');
    setSelectedDate(currDate);
    let tempDate = new Date(currDate);
    let newDate = new Date(currDate);
    newDate.setTime(tempDate.getTime() + 19800 * 1000);
    setMeetDate(newDate.toISOString());
  };
  const onChangeTime = (event, sdate) => {
    const currDate = sdate || selectedTime;
    setShow(Platform.OS === 'ios');
    setSelectedTime(currDate);
    let tempDate = new Date(currDate);
    setMeetTime(tempDate.getHours() + ' ' + tempDate.getMinutes());
  };
  const showMode = val => {
    setMode(val);
    setShow(val);
  };
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [goals, setGoals] = useState('');
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [meetDate, setMeetDate] = useState('');
  const [meetTime, setMeetTime] = useState('');
  const [duration, setDuration] = useState('');
  const [link, setLink] = useState('');
  const [selectedPersons, setSelectedPersons] = useState([]);
  function setVariousFieldValues(event, type) {
    switch (type) {
      case 'topic':
        setTopic(event);
        break;
      case 'description':
        setDescription(event);
        break;
      case 'goals':
        setGoals(event);
        break;
      case 'name':
        setName(event);
        break;
      case 'size':
        setSize(event);
        break;
      case 'duration':
        setDuration(event);
        break;
      case 'link':
        setLink(event);
        break;
    }
  }
  const data = empObj;
  function scheduleThisMeet() {
    let finalData = [];
    for (let i = 0; i < empObj.length; i++) {
      if (selectedPersons.includes(empObj[i].key)) {
        finalData.push({
          id: empObj[i].key,
          status: empObj[i].values.status,
          email: empObj[i].values.email,
        });
      }
    }
    // console.log(finalData);
    schedulemeet(
      hrId,
      topic,
      description,
      goals,
      name,
      parseInt(size),
      meetDate,
      meetTime,
      parseInt(duration),
      link,
      finalData,
    )
      .then(() => {
        Alert.alert('Success', 'Meeting Scheduled Successfully');
        for (let i = 0; i < finalData.length; i++) {
          const email = finalData[i].email;
          // console.log(email);
          let mailOptions = {
            from: 'kanhabansal0916@gmail.com',
            to: `${email}`,
            subject: 'Meeting Scheduled',
            html: `
                <h3>Topic: ${topic}</h3><br>
                <h3>Date: ${meetDate.slice(0, 10)}</h3>
                <h3>Time: ${meetTime}</h3>
                <h3>Team Name: ${name}</h3>
                <h3>Duration: ${duration} hrs</h3>
                <h3>Meeting Link: ${link}</h3>
                <p>All Participants are needed to join 10 minutes prior to the meeting.<p>
                <p>ThankYou!!</p>`,
          };
          sendEmail(mailOptions).then(() => {
            console.log('Email Sent Successfully');
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <ScrollView
      style={styles.outerContainer}
      contentContainerStyle={{alignItems: 'center'}}>
      <Input1
        placeValue={'Enter Topic of Meeting'}
        onChangeProp={event => setVariousFieldValues(event, 'topic')}></Input1>
      <Input1
        placeValue={'Enter Description about Meeting'}
        multi={true}
        spellcheck={true}
        onChangeProp={event =>
          setVariousFieldValues(event, 'description')
        }></Input1>
      <Input1
        placeValue={'Enter Goals for Meeting'}
        multi={true}
        spellcheck={true}
        onChangeProp={event => setVariousFieldValues(event, 'goals')}></Input1>
      <Input1
        placeValue={'Enter Team Name'}
        onChangeProp={event => setVariousFieldValues(event, 'name')}></Input1>
      <Input1
        placeValue={'Enter Team Size'}
        onChangeProp={event => setVariousFieldValues(event, 'size')}></Input1>
      <Input1
        placeValue={'Enter Meeting Date'}
        onPressInProp={() => showMode('date')}
        inputValue={meetDate === '' ? '' : meetDate.slice(0, 10)}></Input1>
      {show === 'date' && (
        <DateTimePicker
          value={selectedDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Input1
        placeValue={'Enter Meeting Time'}
        onPressInProp={() => showMode('time')}
        inputValue={meetTime === '' ? '' : meetTime}></Input1>
      {show === 'time' && (
        <DateTimePicker
          value={selectedTime}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
        />
      )}
      <Input1
        placeValue={'Enter Meet Duration'}
        onChangeProp={event =>
          setVariousFieldValues(event, 'duration')
        }></Input1>
      <Input1
        placeValue={'Enter Meet Link'}
        onChangeProp={event => setVariousFieldValues(event, 'link')}></Input1>
      <View style={styles.dropdownContainer}>
        <MultipleSelectList
          setSelected={val => setSelectedPersons(val)}
          data={data}
          label="Participants"
          notFoundText="No such employee"
          onSelect={() => console.log(selectedPersons)}
          inputStyles={{width: WIDTH * 0.64}}
          labelStyles={{fontWeight: 'bold', fontSize: 18}}
          badgeStyles={{backgroundColor: Colors.blue200}}
          dropdownTextStyles={{
            color: 'black',
          }}
          placeholder="Select Participants"
        />
      </View>
      <CustomButton onPressProp={scheduleThisMeet}>Schedule</CustomButton>
    </ScrollView>
  );
}
export default ScheduleMeetScreen;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  dropdownContainer: {
    marginHorizontal: 30,
    marginTop: 10,
  },
});
