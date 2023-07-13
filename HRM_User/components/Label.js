import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
function Label({children}) {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>{children}</Text>
    </View>
  );
}
export default Label;
const styles = StyleSheet.create({
  labelContainer: {
    width: WIDTH * 0.9,
  },
  labelText: {
    fontSize: 14,
    letterSpacing: 1,
    color: Colors.black200,
    marginLeft: 12,
    fontWeight: 'bold',
  },
});
