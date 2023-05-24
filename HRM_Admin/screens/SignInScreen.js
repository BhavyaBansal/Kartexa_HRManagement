import {ScrollView, Text, StyleSheet, Image, Dimensions,Alert} from 'react-native';
import Heading from '../components/Heading';
import Input2 from '../components/Input2';
import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';
import LoginSignUpFooter from '../components/LoginSignUpFooter';
import {useState} from 'react';
import {signin} from '../api';
const WIDTH = Dimensions.get('window').width;
function SignInScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  function switchSignUpHandler() {
    navigation.navigate('SignUp');
  }
  function getEmailHandler(val) {
    setEmail(val);
  }
  function getPasswordHandler(val) {
    setPass(val);
  }
  function handleSignIn() {
    signin(email, pass)
      .then(response => {
        Alert.alert('Success', 'Logged In Successfully');
        const id = response.data.id;
        const email = response.data.ema;
        // console.log(id, email);
        navigation.navigate('AdminHome', {email, id});
        // const token = response.data.token;
      })
      .catch(error => {
        Alert.alert('Error', error.response.data.error);
      });
  }
  return (
    <>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        style={styles.outerContainer}>
        {/* <Text>Helloo I am Signin</Text> */}
        <Heading>Login</Heading>
        <Image
          source={require('../public/images/Ellipse2.png')}
          style={styles.ellipse2}
        />
        <Image
          source={require('../public/images/Ellipse3.png')}
          style={styles.ellipse3}
        />
        <Input2
          placeholder={'Enter Email'}
          type={'default'}
          onChangeTextProp={getEmailHandler}>
          Email:
        </Input2>
        <Input2
          placeholder={'Enter Password'}
          type={'default'}
          onChangeTextProp={getPasswordHandler}>
          Password:
        </Input2>
        <Text style={styles.forget}>Forget Your Password?</Text>
        <CustomButton onPressProp={handleSignIn}>Login</CustomButton>
        <Text style={styles.Or}>Or</Text>
        <LoginSignUpFooter
          helptext={"Don't you have an account?"}
          link={' Signup?'}
          onPressProp={switchSignUpHandler}></LoginSignUpFooter>
      </ScrollView>
    </>
  );
}
export default SignInScreen;
const styles = StyleSheet.create({
  forget: {
    color: Colors.blue300,
    alignSelf: 'flex-end',
    paddingHorizontal: 58,
    fontWeight: 'bold',
    marginBottom: 45,
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
    top: WIDTH * 0.75,
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
  outerContainer: {
    flex: 1,
  },
});
