import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function NavigationFooter() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.iconsContainer}>
        <FontAwesome5 name="home" size={25} style={styles.icons} />
        <Ionicons name="mail" size={27} style={styles.icons} />
        <MaterialCommunityIcons
          name="calendar-month"
          size={30}
          style={styles.icons}
        />
        <Ionicons name="settings" size={27} style={styles.icons} />
        <FontAwesome5 name="user-alt" size={25} style={styles.icons} />
      </View>
    </View>
  );
}
export default NavigationFooter;
const styles = StyleSheet.create({
  outerContainer: {
    width: WIDTH,
    height: WIDTH * 0.15,
    bottom: 0,
    backgroundColor: Colors.blue400,
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  iconsContainer: {
    height:WIDTH*0.13,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
  },
  icons: {
    color: '#ffffff',
  },
});
