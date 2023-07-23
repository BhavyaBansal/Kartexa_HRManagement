import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Heading from '../components/Heading';
import Input1 from '../components/Input1';
import React, {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../components/CustomButton';
import {addemployee, sendEmail} from '../api';
import Label from '../components/Label';
import Email from '../constants/email';
const WIDTH = Dimensions.get('window').width;
const departments = ['Sales', 'Marketing', 'Operations', 'Finance', 'HR', 'IT'];
const employementstatus = ['Full-Time', 'Part-Time', 'Intern', 'Mentor'];
function AddEmployeeForm({route, navigation}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const onChange = (event, sdate) => {
    const currDate = sdate || selectedDate;
    setShow(Platform.OS === 'ios');
    setSelectedDate(currDate);
    let tempDate = new Date(currDate);
    let newDate = new Date(currDate);
    newDate.setTime(tempDate.getTime() + 19800 * 1000);
    if (type === 'Joining') {
      setJoiningText(newDate.toISOString());
    }
    if (type === 'Probation') {
      setProbationText(newDate.toISOString());
    }
    if (type === 'Confirmation') {
      setConfirmationText(newDate.toISOString());
    }
  };
  const showMode = val => {
    setType(val);
    setShow(true);
  };

  const hrEmail = route.params.email;
  const hrId = route.params.id;
  // console.log(hrId);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [number, setNumber] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  function setDepartmentHandler(val) {
    console.log(val);
  }
  const [designation, setDesignation] = useState('');
  const [joiningText, setJoiningText] = useState('');
  const [employementStatus, setEmployementStatus] = useState('');
  function setEmployementStatusHandler(val) {
    console.log(val);
  }
  const [probationText, setProbationText] = useState('');
  const [confirmationText, setConfirmationText] = useState('');
  const [salary, setSalary] = useState(0);
  const [manager, setManager] = useState("");
  // const [leaveBal, setLeaveBal] = useState(0);

  function setVariousFieldValues(event, type) {
    switch (type) {
      case 'name':
        setName(event);
        break;
      case 'email':
        setEmail(event);
        break;
      case 'password':
        setPass(event);
        break;
      case 'number':
        setNumber(event);
        break;
      case 'designation':
        setDesignation(event);
        break;
      case 'salary':
        setSalary(event);
        break;
      case 'manager':
        setManager(event);
        break;
      // case 'leavebal':
      //   setLeaveBal(event);
      //   break;
    }
  }

  let aadharnumber = 0;
  let pannumber = '';
  let address = '';
  let dateofbirth = null;
  let gender = 'male';
  let maritalstatus = 'single';
  let emergencycontactname = '';
  let emergencycontactnumber = 0;
  let accountnumber = 0;
  let ifsccode = '';

  const handleAddEmployee = () => {
    if (
      name === '' ||
      pass === '' ||
      email === '' ||
      number === 0 ||
      selectedDepartment === '' ||
      designation === '' ||
      employementStatus === '' ||
      joiningText === '' ||
      salary === 0
    ) {
      Alert.alert('Error', 'Kindly fill all the mandatory fields.');
    } else {
      addemployee(
        hrId,
        name,
        email,
        pass,
        number,
        aadharnumber,
        pannumber,
        address,
        dateofbirth,
        gender,
        maritalstatus,
        emergencycontactname,
        emergencycontactnumber,
        accountnumber,
        ifsccode,
        selectedDepartment,
        designation,
        joiningText,
        employementStatus,
        probationText,
        confirmationText,
        salary,
        manager,
        // leaveBal,
      )
        .then(() => {
          Alert.alert('Success', 'Employee Added Successfully');
          navigation.navigate('AdminHome', {email: hrEmail, id: hrId});

          let mailOptions = {
            from: Email.EMAIL,
            to: `${email}`,
            subject: 'Account Created',
            html: `<h2>Dear ${name} your account is created these are the details as follows:</h2><br>
                <b>Email:</b>${email}<br>
                <b>One Time Password:</b>${pass}<br>
                Do not share this password with anyone.<br>
                In case of any doubt contact to ${hrEmail}.<br>
                Do check and update further details till next week.<br>
                ThankYou!!`,
          };
          sendEmail(mailOptions)
            .then(response => {
              Alert.alert('Success', 'Account Creation Mail Sent Successfully');
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          // Alert.alert('Error', 'Some Error occured');
          console.log(error);
        });
    }
  };
  return (
    <ScrollView
      style={styles.outerContainer}
      contentContainerStyle={{alignItems: 'center'}}>
      <Heading>Employee Form</Heading>
      <Label>Name:</Label>
      <Input1
        placeValue={'Enter Name'}
        onChangeProp={event => setVariousFieldValues(event, 'name')}></Input1>
      <Label>Email:</Label>
      <Input1
        placeValue={'Enter Email'}
        onChangeProp={event => setVariousFieldValues(event, 'email')}></Input1>
      <Label>Password:</Label>
      <Input1
        placeValue={'Enter Password'}
        onChangeProp={event =>
          setVariousFieldValues(event, 'password')
        }></Input1>
      <Label>Phone Number:</Label>
      <Input1
        placeValue={'Enter Number'}
        onChangeProp={event => setVariousFieldValues(event, 'number')}></Input1>
      <Label>Select Department:</Label>
      <View style={styles.selectView}>
        {/* <Text style={{alignSelf: 'flex-start'}}>Select Department:</Text> */}
        <SelectDropdown
          data={departments}
          onSelect={(selectedItem, index) => {
            setSelectedDepartment(selectedItem);
            setDepartmentHandler(selectedItem);
          }}
          buttonStyle={{
            width: WIDTH * 0.85,
            borderRadius: 10,
            // backgroundColor: Colors.blue100,
          }}
          style={styles.dropdown}
        />
      </View>
      <Label>Designation:</Label>
      <Input1
        placeValue={'Enter Designation'}
        onChangeProp={event =>
          setVariousFieldValues(event, 'designation')
        }></Input1>
      <Label>Joining Date:</Label>
      <Input1
        placeValue={'Enter Joining Date'}
        onPressInProp={() => showMode('Joining')}
        inputValue={
          joiningText === '' ? '' : joiningText.slice(0, 10)
        }></Input1>
      {show && (
        <DateTimePicker
          // testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Label>Select Employement Status:</Label>
      <View style={styles.selectView}>
        {/* <Text style={{alignSelf: 'flex-start'}}>
          Select Employement Status:
        </Text> */}
        <SelectDropdown
          data={employementstatus}
          onSelect={(selectedItem, index) => {
            setEmployementStatus(selectedItem);
            setEmployementStatusHandler(selectedItem);
          }}
          buttonStyle={{
            width: WIDTH * 0.85,
            borderRadius: 10,
            // backgroundColor: Colors.blue100,
          }}
          style={styles.dropdown}
        />
      </View>
      <Label>Probation Date:</Label>
      <Input1
        placeValue={'Enter Probation Date'}
        onPressInProp={() => showMode('Probation')}
        inputValue={
          probationText === '' ? '' : probationText.slice(0, 10)
        }></Input1>
      <Label>Confirmation Date:</Label>
      <Input1
        placeValue={'Enter Confirmation Date'}
        onPressInProp={() => showMode('Confirmation')}
        inputValue={
          confirmationText === '' ? '' : confirmationText.slice(0, 10)
        }></Input1>
      <Label>Salary:</Label>
      <Input1
        placeValue={'Enter Salary'}
        onChangeProp={event => setVariousFieldValues(event, 'salary')}></Input1>
      <Label>Manager Name:</Label>
      <Input1
        placeValue={'Enter Manager Name'}
        onChangeProp={event =>
          setVariousFieldValues(event, 'manager')
        }></Input1>
      {/* <Input1
        placeValue={'Enter Leave Balance'}
        onChangeProp={event =>
          setVariousFieldValues(event, 'leavebal')
        }></Input1> */}
      <CustomButton onPressProp={handleAddEmployee}>Submit</CustomButton>
    </ScrollView>
  );
}
export default AddEmployeeForm;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  selectView: {
    // width: WIDTH * 0.7,
    // marginLeft: 10,
  },
});
