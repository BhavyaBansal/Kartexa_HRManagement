import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
function LoginSignUpFooter({helptext, link, onPressProp}) {
  return (
    <View style={styles.outerContainer}>
      <Text style={styles.text}>Or Login With</Text>
      <View style={styles.otherWays}>
        <Image source={require('../public/images/google.png')} />
        <Image source={require('../public/images/facebook.png')} />
      </View>
      <Text>
        {helptext}
        {/* <Pressable onPress={onPressProp} style={styles.linkDiv}> */}
        <Text style={styles.link} onPress={onPressProp}>
          {link}
        </Text>
        {/* </Pressable> */}
      </Text>
    </View>
  );
}
export default LoginSignUpFooter;
const styles = StyleSheet.create({
  outerContainer: {
    bottom:0,
    width: WIDTH,
    height: WIDTH * 0.4,
    backgroundColor: Colors.blue100,
    padding: 10,
    // marginTop: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },
  otherWays: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  text: {
    fontWeight: 'bold',
    color: Colors.black200,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  link: {
    color: Colors.blue300,
    marginLeft: 5,
  },
});
