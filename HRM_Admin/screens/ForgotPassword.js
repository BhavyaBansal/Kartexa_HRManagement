import {Text, View, StyleSheet, Image, Dimensions, Alert} from 'react-native';
import Heading from '../components/Heading';
import Input1 from '../components/Input1';
import CustomButton from '../components/CustomButton';
import {useState} from 'react';
import {sendEmail} from '../api';
import Email from '../constants/email';
const WIDTH = Dimensions.get('window').width;
function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  function setEmailHandler(val) {
    setEmail(val);
  }
  function sendVerificationEmail() {
    const code = Math.floor(1000 + Math.random() * 9000);
    let mailOptions = {
      from: Email.EMAIL,
      to: `${email}`,
      subject: 'Verification Code',
      html: `<h1>Your Verification Code for reset password is ${code}</h1>`,
    };
    sendEmail(mailOptions)
      .then(response => {
        // console.log('Hello');
        Alert.alert('Success', 'Verifcation Email Sent Successfully');
        navigation.navigate('VerificationScreen', {email, code});
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <View style={styles.outerContainer}>
      <Heading>Forgot Password</Heading>
      <Image
        source={require('../public/images/Ellipse2.png')}
        style={styles.ellipse2}
      />
      <Image
        source={require('../public/images/Ellipse3.png')}
        style={styles.ellipse3}
      />
      <Text style={styles.inputlabel}>Enter Email:</Text>
      <Input1
        placeValue={'Enter Email'}
        onChangeProp={setEmailHandler}></Input1>
      <CustomButton onPressProp={sendVerificationEmail}>Send</CustomButton>
    </View>
  );
}
export default ForgotPassword;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  ellipse2: {
    width: WIDTH * 0.6,
    height: WIDTH * 0.66,
    resizeMode: 'cover',
    position: 'absolute',
    top: WIDTH * 0.85,
    left: 0,
    zIndex: -1,
  },
  ellipse3: {
    width: WIDTH * 0.43,
    height: WIDTH * 0.75,
    resizeMode: 'cover',
    position: 'absolute',
    top: WIDTH * 0.05,
    right: 0,
    zIndex: -1,
  },
  inputlabel: {
    alignSelf: 'flex-start',
    marginLeft: 60,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
