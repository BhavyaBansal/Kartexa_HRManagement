import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  Pressable,
} from 'react-native';
import Heading from '../components/Heading';
import Input2 from '../components/Input2';
import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';
import LoginSignUpFooter from '../components/LoginSignUpFooter';
import {useState, useContext} from 'react';
import {signinemp} from '../api';
// import {SessionContext} from '../SessionContext';
const WIDTH = Dimensions.get('window').width;
function SignInScreen({navigation}) {
  // const {login} = useContext(SessionContext);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  function getEmailHandler(val) {
    setEmail(val);
  }
  function getPasswordHandler(val) {
    setPass(val);
  }
  function handleSignIn() {
    signinemp(email, pass)
      .then(response => {
        Alert.alert('Success', 'Logged In Successfully');
        const ispassupdated = response.data.ispupdated;
        const employee = {
          hrid: response.data.hrid,
          empid: response.data.id,
          email: response.data.empemail,
          name: response.data.name,
          phonenumber: response.data.phonenumber,
          department: response.data.department,
          designation: response.data.designation,
        };
        if (ispassupdated === false) {
          navigation.navigate('UpdatePassword', {id: employee.empid});
        } else {
          navigation.navigate('EmployeeHome', {employee});
        }
        // const sessionToken = response.data.token;
        // login(sessionToken);
      })
      .catch(error => {
        Alert.alert('Error', error.response.data.error);
      });
  }
  function forgotPasswordHandler() {
    navigation.navigate('ForgotPassword');
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
          onChangeTextProp={getPasswordHandler}
          secure={true}>
          Password:
        </Input2>
        <Pressable style={styles.forget} onPress={forgotPasswordHandler}>
          <Text style={styles.forgettext}>Forget Your Password?</Text>
        </Pressable>
        <CustomButton onPressProp={handleSignIn}>Login</CustomButton>
        <Text style={styles.Or}>Or</Text>
        <LoginSignUpFooter helptext={'More Signin Options'}></LoginSignUpFooter>
      </ScrollView>
    </>
  );
}
export default SignInScreen;
const styles = StyleSheet.create({
  forget: {
    alignSelf: 'flex-end',
    paddingHorizontal: 58,
    fontWeight: 'bold',
    marginBottom: 45,
  },
  forgettext: {
    color: Colors.blue300,
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
