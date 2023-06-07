import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import Heading from '../components/Heading';
import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';
import {useState} from 'react';
import {sendEmail, getidbyemail} from '../api';
function VerificationCodeScreen({route, navigation}) {
  let code = route.params.code;
  const email = route.params.email;
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  function resendEmailVerificationCode() {
    const code = Math.floor(1000 + Math.random() * 9000);
    let mailOptions = {
      from: 'kanhabansal0916@gmail.com',
      to: `${email}`,
      subject: 'Verification Code',
      html: `<h1>Your Verification Code for reset password is ${code}</h1>`,
    };
    sendEmail(mailOptions)
      .then(response => {
        // console.log('Hello');
        // code = tcode;
        Alert.alert('Success', 'Verifcation Email Sent Successfully');
        navigation.navigate('VerificationScreen', {email, code});
      })
      .catch(error => {
        console.log(error);
      });
  }
  function setInputValues(event, input) {
    if (input === 'input1') {
      setInput1(event);
    } else if (input === 'input2') {
      setInput2(event);
    } else if (input === 'input3') {
      setInput3(event);
    } else {
      setInput4(event);
    }
  }
  function verifyCode() {
    const vcode = input1 + input2 + input3 + input4;
    if (code === parseInt(vcode)) {
      console.log(true);
      getidbyemail(email).then(res => {
        const id = res.data.id;
        console.log(id);
        navigation.navigate('UpdatePassword', {id});
      });
    } else {
      Alert.alert('Wrong', 'Wrong Verification Code Try Again!!');
      console.log(false, code, vcode);
    }
  }
  return (
    <View style={styles.outerContainer}>
      <Heading>Verification</Heading>
      <Text style={styles.textlabel}>Enter Verification Code</Text>
      <View style={styles.inputContainer}>
        <TextInput
          maxLength={1}
          style={styles.textinput}
          keyboardType="number-pad"
          onChangeText={event => setInputValues(event, 'input1')}></TextInput>
        <TextInput
          maxLength={1}
          style={styles.textinput}
          keyboardType="number-pad"
          onChangeText={event => setInputValues(event, 'input2')}></TextInput>
        <TextInput
          maxLength={1}
          style={styles.textinput}
          keyboardType="number-pad"
          onChangeText={event => setInputValues(event, 'input3')}></TextInput>
        <TextInput
          maxLength={1}
          style={styles.textinput}
          keyboardType="number-pad"
          onChangeText={event => setInputValues(event, 'input4')}></TextInput>
      </View>
      <CustomButton onPressProp={verifyCode}>Verify</CustomButton>
      <Text style={styles.resend} onPress={resendEmailVerificationCode}>
        Resend It
      </Text>
    </View>
  );
}
export default VerificationCodeScreen;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textinput: {
    width: 60,
    height: 60,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 30,
    backgroundColor: Colors.blue100,
    fontSize: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textlabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  resend: {
    color: Colors.blue300,
    fontSize: 18,
    marginVertical: 20,
  },
});
