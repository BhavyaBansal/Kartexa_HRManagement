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
import {updateemployee, sendEmail} from '../api';
import Email from '../constants/email';
import Label from '../components/Label';
const WIDTH = Dimensions.get('window').width;
const departments = ['Sales', 'Marketing', 'Operations', 'Finance', 'HR', 'IT'];
const employementstatus = ['Full-Time', 'Part-Time', 'Intern', 'Mentor'];
function UpdateEmployeeForm({route, navigation}) {
  const empData = route.params.emp;
  const ispassupdated = route.params.ispassupdated;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [updateEmail, setUpdateEmail] = useState(ispassupdated);
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
  const hrEmail = route.params.hrEmail;
  const hrId = route.params.hrId;
  const empId = empData.id;
  // console.log(hrId);
  const [name, setName] = useState(empData.name);
  const [email, setEmail] = useState(empData.email);
  const [pass, setPass] = useState(empData.temppassword);
  const [number, setNumber] = useState(empData.phonenumber);
  const [selectedDepartment, setSelectedDepartment] = useState(
    empData.department,
  );
  function setDepartmentHandler(val) {
    console.log(val);
  }
  const [designation, setDesignation] = useState(empData.designation);
  const [joiningText, setJoiningText] = useState(
    empData.joiningdate.slice(0, 10),
  );
  const [employementStatus, setEmployementStatus] = useState(
    empData.employmentstatus,
  );
  function setEmployementStatusHandler(val) {
    console.log(val);
  }
  const [probationText, setProbationText] = useState(
    empData.probationenddate!==null?empData.probationenddate.slice(0, 10):"",
  );
  const [confirmationText, setConfirmationText] = useState(
    empData.confirmationdate!==null?empData.confirmationdate.slice(0, 10):"",
  );
  const [salary, setSalary] = useState(empData.salary);
  const [manager, setManager] = useState(empData.managername!==null?empData.managername:"");
  // const [leaveBal, setLeaveBal] = useState(empData.leavebalance);
  function changeUpdateEmailStatus() {
    setUpdateEmail(false);
  }
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
  function handleUpdateEmployee() {
    updateemployee(
      empId,
      name,
      email,
      pass,
      number,
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
        Alert.alert('Success', 'Employee Updated Successfully');
        navigation.navigate('AdminHome', {email: hrEmail, id: hrId});
        // makeRefreshTrue(true);
        if (ispassupdated === false) {
          let mailOptions = {
            from: Email.EMAIL,
            to: `${email}`,
            subject: 'Account Details Updated',
            html: `<h2>Dear ${name} your account details are updated these are the details as follows:</h2><br>
                <b>Email:</b>${email}<br>
                <b>One Time Password:</b>${pass}<br>
                <b>Phone Number:</b>${number}<br>
                <b>Department:</b>${selectedDepartment}<br>
                <b>Joining Date:</b>${joiningText}<br>
                Do not share this password with anyone.<br>
                In case of any doubt contact to ${hrEmail}.<br>
                You can check more details on your account page.<br>
                ThankYou!!`,
          };
          sendEmail(mailOptions)
            .then(response => {
              Alert.alert('Success', 'Details Updation Mail Sent Successfully');
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          let mailOptions = {
            from: Email.EMAIL,
            to: `${email}`,
            subject: 'Account Details Updated',
            html: `<h2>Dear ${name} your account details are updated these are the details as follows:</h2><br>
                <b>Email:</b>${email}<br>
                <b>Phone Number:</b>${number}<br>
                <b>Department:</b>${selectedDepartment}<br>
                <b>Joining Date:</b>${joiningText}<br>
                In case of any doubt contact to ${hrEmail}.<br>
                You can check more details on your account page.<br>
                ThankYou!!`,
          };
          sendEmail(mailOptions)
            .then(response => {
              Alert.alert('Success', 'Details Updation Mail Sent Successfully');
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        // Alert.alert('Error', 'Some Error occured');
        console.log(error);
      });
  }
  return (
    <ScrollView
      style={styles.outerContainer}
      contentContainerStyle={{alignItems: 'center'}}>
      <Heading>Update Details Form</Heading>
      <Label>Name:</Label>
      <Input1
        placeValue={'Enter Name'}
        onChangeProp={event => setVariousFieldValues(event, 'name')}
        inputValue={name}></Input1>
      <Label>Email:</Label>
      <Input1
        placeValue={'Enter Email'}
        onChangeProp={event => setVariousFieldValues(event, 'email')}
        inputValue={email}
        editable={updateEmail === false ? true : false}></Input1>
      <Text
        style={styles.userUpdateEmailButton}
        onPress={changeUpdateEmailStatus}>
        Update Email?
      </Text>
      {ispassupdated === false ? (
        <>
          <Label>Password:</Label>
          <Input1
            placeValue={'Enter Password'}
            onChangeProp={event => setVariousFieldValues(event, 'password')}
            inputValue={pass}></Input1>
        </>
      ) : null}
      <Label>Phone Number:</Label>
      <Input1
        placeValue={'Enter Number'}
        onChangeProp={event => setVariousFieldValues(event, 'number')}
        inputValue={number}></Input1>
      <Label>Select Department:</Label>
      <View style={styles.selectView}>
        {/* <Text style={{alignSelf: 'flex-start'}}>Select Department:</Text> */}
        <SelectDropdown
          defaultValue={selectedDepartment}
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
        onChangeProp={event => setVariousFieldValues(event, 'designation')}
        inputValue={designation}></Input1>
      <Label>Joining Date:</Label>
      <Input1
        placeValue={'Enter Joining Date'}
        onPressInProp={() => showMode('Joining')}
        inputValue={joiningText.slice(0, 10)}></Input1>
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
          defaultValue={employementStatus}
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
        inputValue={probationText.slice(0, 10)}></Input1>
      <Label>Confirmation Date:</Label>
      <Input1
        placeValue={'Enter Confirmation Date'}
        onPressInProp={() => showMode('Confirmation')}
        inputValue={confirmationText.slice(0, 10)}></Input1>
      <Label>Salary:</Label>
      <Input1
        placeValue={'Enter Salary'}
        onChangeProp={event => setVariousFieldValues(event, 'salary')}
        inputValue={salary.toString()}></Input1>
      <Label>Manager Name:</Label>
      <Input1
        placeValue={'Enter Manager Name'}
        onChangeProp={event => setVariousFieldValues(event, 'manager')}
        inputValue={manager}></Input1>
      {/* <Input1
        placeValue={'Enter Leave Balance'}
        onChangeProp={event => setVariousFieldValues(event, 'leavebal')}
        inputValue={leaveBal.toString()}></Input1> */}
      <CustomButton onPressProp={handleUpdateEmployee}>Update</CustomButton>
    </ScrollView>
  );
}
export default UpdateEmployeeForm;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  userUpdateEmailButton: {
    alignSelf: 'flex-start',
    marginLeft: WIDTH * 0.08,
    padding: 5,
    backgroundColor: '#e42c2c',
    color: 'white',
    borderRadius: 5,
  },
});
