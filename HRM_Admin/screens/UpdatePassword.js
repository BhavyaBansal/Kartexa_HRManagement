import {View, StyleSheet, Text, Alert} from 'react-native';
import Heading from '../components/Heading';
import Input1 from '../components/Input1';
import {updatePassword} from '../api';
import {useState} from 'react';
import CustomButton from '../components/CustomButton';
import Label from '../components/Label';
function UpdatePassword({navigation, route}) {
  const email = route.params.email;
  const [pass, setPass] = useState('');
  const [cpass, setCPass] = useState('');
  function setPassInput(val) {
    setPass(val);
  }
  function setCPassInput(val) {
    setCPass(val);
  }
  function updatePassHandler() {
    if (pass !== '' && cpass !== '') {
      if (pass === cpass) {
        updatePassword(email, pass)
          .then(res => {
            Alert.alert('Success', 'Password Updated Successfully!!');
            navigation.navigate('SignIn');
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        Alert.alert('Error', 'Both the fields should be same');
      }
    } else {
      Alert.alert('Error', 'Fields cannot be empty');
    }
  }
  return (
    <View style={styles.outerContainer}>
      <Heading>Change Your Password</Heading>
      <Label>Password:</Label>
      <Input1
        placeValue={'Updated Password'}
        onChangeProp={setPassInput}
        secure={true}></Input1>
      <Label>Confirm Password:</Label>
      <Input1
        placeValue={'Confirm Password'}
        onChangeProp={setCPassInput}
        secure={true}></Input1>
      <CustomButton onPressProp={updatePassHandler}>Update</CustomButton>
    </View>
  );
}
export default UpdatePassword;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
