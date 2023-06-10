import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import Heading from '../components/Heading';
import Input1 from '../components/Input1';
import CustomButton from '../components/CustomButton';
import {useState} from 'react';
import LoginSignUpFooter from '../components/LoginSignUpFooter';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
import {signup} from '../api';
function SignUpScreen({navigation}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  function switchLoginHandler() {
    navigation.navigate('SignIn');
  }
  function getNameHandler(val) {
    setName(val);
  }
  function getPhoneHandler(val) {
    setPhone(val);
  }
  function getEmailHandler(val) {
    setEmail(val);
  }
  function getPasswordhandler(val) {
    setPass(val);
  }
  const handleSignUp = () => {
    // console.log(name, phone, email, pass);
    signup(name, phone, email, pass)
      .then(() => {
        Alert.alert('Success', 'User Created Successfully');
        navigation.navigate('SignIn');
      })
      .catch(error => {
        // console.log('Heyy');
        // console.log(error);
        const errorMessage = error.response
          ? error.response.data.error
          : 'An error occurred';
        // : error.response.data.error;
        Alert.alert('Error', errorMessage);
      });
  };
  return (
    <>
      <ScrollView
        style={styles.outerContainer}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Heading>Create Account</Heading>
        <Input1 placeValue="Full Name" onChangeProp={getNameHandler}></Input1>
        <Input1
          placeValue="Phone Number"
          onChangeProp={getPhoneHandler}></Input1>
        <Input1 placeValue="Email" onChangeProp={getEmailHandler}></Input1>
        <Input1
          placeValue="Password"
          onChangeProp={getPasswordhandler}
          secure={true}></Input1>
        <CustomButton onPressProp={handleSignUp}>Sign up</CustomButton>
        <Text style={styles.Or}>or</Text>
        {/* <Text style={styles.Or}>or</Text>
        <Text style={styles.Or}>or</Text> */}
        <Image
          style={styles.image}
          source={require('../public/images/Ellipse1.png')}
        />
        <LoginSignUpFooter
          helptext={'have an account?'}
          link={' Login?'}
          onPressProp={switchLoginHandler}></LoginSignUpFooter>
      </ScrollView>
    </>
  );
}
export default SignUpScreen;
const styles = StyleSheet.create({
  outerContainer: {
    // flex: 1,
    width: WIDTH,
  },
  image: {
    width: WIDTH * 0.55,
    height: WIDTH * 0.82,
    resizeMode: 'cover',
    position: 'absolute',
    top: WIDTH * 0.55,
    right: 0,
    zIndex: -1,
  },
  Or: {
    marginBottom: 50,
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.black200,
  },
});
