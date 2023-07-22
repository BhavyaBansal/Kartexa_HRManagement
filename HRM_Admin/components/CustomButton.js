import {StyleSheet, Dimensions, Pressable, Text} from 'react-native';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
function CustomButton({onPressProp, children}) {
  return (
    <Pressable style={styles.buttonStyle} onPress={onPressProp}>
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
    borderRadius: 5,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    // flexDirection: 'row',
  },
  text: {
    color: Colors.white100,
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
