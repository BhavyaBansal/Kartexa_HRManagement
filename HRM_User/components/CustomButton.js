import {StyleSheet, Dimensions, Pressable, Text} from 'react-native';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
function CustomButton({onPressProp, children}) {
  return (
    <Pressable
      style={styles.buttonStyle}
      onPress={onPressProp}
      android_ripple={{color: '#ccc', foreground: true}}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}
export default CustomButton;
const styles = StyleSheet.create({
  buttonStyle: {
    width: WIDTH * 0.35,
    height: WIDTH * 0.12,
    backgroundColor: Colors.blue400,
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  text: {
    color: Colors.white100,
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
