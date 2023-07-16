import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import {updateoneemployee} from '../api';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton';
import Input1 from '../components/Input1';
import Colors from '../constants/colors';
import Label from '../components/Label';
const WIDTH = Dimensions.get('window').width;
function UpdateDetailsScreen({route, navigation}) {
  const empData = route.params.employeeData;
  const empId = empData.id;
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
    console.log(newDate.toISOString());
    if (type === 'DOB') {
      setDOB(newDate.toISOString());
    }
  };
  const showMode = val => {
    setType(val);
    setShow(true);
  };
  // console.log(hrId);
  const [name, setName] = useState(empData.name);
  const [email, setEmail] = useState(empData.email);
  const [number, setNumber] = useState(empData.phonenumber);
  const [selectedDepartment, setSelectedDepartment] = useState(
    empData.department,
  );
  const [designation, setDesignation] = useState(empData.designation);
  const [aadhar, setAadhar] = useState(empData.aadharnumber);
  const [pannumber, setPannumber] = useState(empData.pannumber);
  const [address, setAddress] = useState(empData.address);
  const [dob, setDOB] = useState(empData.dateofbirth);
  const [gender, setGender] = useState(empData.gender);
  const [maritalStatus, setMaritalStatus] = useState(empData.maritalstatus);
  const [emergencycontactname, setEmergencycontactname] = useState(
    empData.emergencycontactname,
  );
  const [emergencycontactnumber, setEmergencycontactnumber] = useState(
    empData.emergencycontactnumber,
  );
  const [accountnumber, setAccountnumber] = useState(empData.accountnumber);
  const [ifsccode, setIfsccode] = useState(empData.ifsccode);

  const [employementStatus, setEmployementStatus] = useState(
    empData.employmentstatus,
  );
  const [joiningText, setJoiningText] = useState(
    empData.joiningdate.slice(0, 10),
  );
  const [probationText, setProbationText] = useState(
    empData.probationenddate.slice(0, 10),
  );
  const [confirmationText, setConfirmationText] = useState(
    empData.confirmationdate.slice(0, 10),
  );
  const [manager, setManager] = useState(empData.managername);
  function setVariousFieldValues(event, type) {
    switch (type) {
      case 'name':
        setName(event);
        break;
      case 'number':
        setNumber(event);
        break;
      case 'aadhar':
        setAadhar(event);
        break;
      case 'pan':
        setPannumber(event);
        break;
      case 'address':
        setAddress(event);
        break;
      case 'ename':
        setEmergencycontactname(event);
        break;
      case 'enumber':
        setEmergencycontactnumber(event);
        break;
      case 'account':
        setAccountnumber(event);
        break;
      case 'ifsc':
        setIfsccode(event);
        break;
    }
  }
  function handleUpdateEmployee() {
    updateoneemployee(
      empId,
      name,
      number,
      aadhar,
      pannumber,
      address,
      dob,
      gender,
      maritalStatus,
      emergencycontactname,
      emergencycontactnumber,
      accountnumber,
      ifsccode,
    )
      .then(() => {
        Alert.alert('Success', 'Employee Updated Successfully');
        navigation.navigate('Account', {empId});
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <Label>Name:</Label>
      <Input1
        placeValue={'Enter Name'}
        onChangeProp={event => setVariousFieldValues(event, 'name')}
        inputValue={name}></Input1>
      <Label>Email:</Label>
      <Input1 inputValue={email} editable={false}></Input1>
      <Label>Phone Number:</Label>
      <Input1
        placeValue={'Enter PhoneNumber'}
        onChangeProp={event => setVariousFieldValues(event, 'number')}
        inputValue={number}></Input1>
      <Label>Department:</Label>
      <Input1 inputValue={selectedDepartment} editable={false}></Input1>
      <Label>Designation</Label>
      <Input1 inputValue={designation} editable={false}></Input1>
      <Label>Aadhar Number:</Label>
      <Input1
        placeValue={'Enter Aadhar Number'}
        onChangeProp={event => setVariousFieldValues(event, 'aadhar')}
        inputValue={aadhar === '0' ? '' : aadhar}></Input1>
      <Label>Pan Number:</Label>
      <Input1
        placeValue={'Enter Pan Number'}
        onChangeProp={event => setVariousFieldValues(event, 'pan')}
        inputValue={pannumber}></Input1>
      <Label>Address:</Label>
      <Input1
        placeValue={'Enter Address'}
        onChangeProp={event => setVariousFieldValues(event, 'address')}
        inputValue={address}></Input1>
      <Label>Date Of Birth:</Label>
      <Input1
        placeValue={'Enter Date of Birth'}
        onPressInProp={() => showMode('DOB')}
        inputValue={
          dob === '' || dob === null ? '' : dob.slice(0, 10)
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
      <Label>Gender:</Label>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={[
            styles.buttonContainer,
            gender === 'male' ? styles.changeButtonContainer : '',
          ]}
          onPress={() => {
            setGender('male');
          }}>
          <FontAwesome
            name="male"
            size={25}
            style={[styles.icons, gender === 'male' ? styles.changeIcons : '']}
          />
          <Text
            style={[
              styles.buttontext,
              gender === 'male' ? styles.changeButtonText : '',
            ]}>
            Male
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.buttonContainer,
            gender === 'female' ? styles.changeButtonContainer : '',
          ]}
          onPress={() => {
            setGender('female');
          }}>
          <FontAwesome
            name="female"
            size={25}
            style={[
              styles.icons,
              gender === 'female' ? styles.changeIcons : '',
            ]}
          />
          <Text
            style={[
              styles.buttontext,
              gender === 'female' ? styles.changeButtonText : '',
            ]}>
            Female
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.buttonContainer,
            gender === 'others' ? styles.changeButtonContainer : '',
          ]}
          onPress={() => {
            setGender('others');
          }}>
          <FontAwesome
            name="transgender"
            size={25}
            style={[
              styles.icons,
              gender === 'others' ? styles.changeIcons : '',
            ]}
          />
          <Text
            style={[
              styles.buttontext,
              gender === 'others' ? styles.changeButtonText : '',
            ]}>
            Others
          </Text>
        </Pressable>
      </View>
      <Label>Status:</Label>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={[
            styles.buttonContainer,
            maritalStatus === 'married' ? styles.changeButtonContainer : '',
          ]}
          onPress={() => {
            setMaritalStatus('married');
          }}>
          <Text
            style={[
              styles.buttontext,
              maritalStatus === 'married' ? styles.changeButtonText : '',
            ]}>
            Married
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.buttonContainer,
            maritalStatus === 'single' ? styles.changeButtonContainer : '',
          ]}
          onPress={() => {
            setMaritalStatus('single');
          }}>
          <Text
            style={[
              styles.buttontext,
              maritalStatus === 'single' ? styles.changeButtonText : '',
            ]}>
            Single
          </Text>
        </Pressable>
      </View>
      <Label>Emergency Contact Name:</Label>
      <Input1
        placeValue={'Enter Emergency Contact Name'}
        onChangeProp={event => setVariousFieldValues(event, 'ename')}
        inputValue={emergencycontactname}></Input1>
      <Label>Emergency Contact Number:</Label>
      <Input1
        placeValue={'Enter Emergency Contact Number'}
        onChangeProp={event => setVariousFieldValues(event, 'enumber')}
        inputValue={
          emergencycontactnumber === '0' ? '' : emergencycontactnumber
        }></Input1>
      <Label>Account Number:</Label>
      <Input1
        placeValue={'Enter Account Number'}
        onChangeProp={event => setVariousFieldValues(event, 'account')}
        inputValue={accountnumber === '0' ? '' : accountnumber}></Input1>
      <Label>IFSC Code:</Label>
      <Input1
        placeValue={'Enter IFSC Code'}
        onChangeProp={event => setVariousFieldValues(event, 'ifsc')}
        inputValue={ifsccode}></Input1>
      <Label>Employment Status:</Label>
      <Input1 inputValue={employementStatus} editable={false}></Input1>
      <Label>Joining Date:</Label>
      <Input1 inputValue={joiningText} editable={false}></Input1>
      <Label>Probation Date:</Label>
      <Input1 inputValue={probationText} editable={false}></Input1>
      <Label>Confirmation Date:</Label>
      <Input1 inputValue={confirmationText} editable={false}></Input1>
      <Label>Manager Name:</Label>
      <Input1 inputValue={manager} editable={false}></Input1>
      <CustomButton onPressProp={handleUpdateEmployee}>Update</CustomButton>
      <Text style={{marginBottom: 20}}></Text>
    </ScrollView>
  );
}
export default UpdateDetailsScreen;
const styles = StyleSheet.create({
  icons: {
    color: Colors.blue100,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
    borderColor: Colors.blue100,
    borderWidth: 2,
    marginHorizontal: 10,
    width: WIDTH * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  buttontext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.blue100,
    letterSpacing: 0.5,
  },
  changeButtonContainer: {
    backgroundColor: Colors.blue100,
  },
  changeIcons: {
    color: '#000000',
  },
  changeButtonText: {
    color: '#000000',
  },
});
