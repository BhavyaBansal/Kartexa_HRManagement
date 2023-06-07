import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function NavigationFooter(props) {
  const navigation = useNavigation();
  const hrId = props.hrId;
  // console.log(hrId + 'helo');
  function CheckInPage() {
    navigation.navigate('CheckIn', {hrId});
  }
  function CheckOutPage() {
    navigation.navigate('CheckOut', {hrId});
  }
  return (
    <View style={styles.outerContainer}>
      <View style={styles.iconsContainer}>
        <Pressable
          android_ripple={{color: '#ccc', borderless: true}}
          onPress={CheckInPage}>
          <MaterialCommunityIcons name="login" size={30} style={styles.icons} />
        </Pressable>
        <Pressable
          android_ripple={{color: '#ccc', borderless: true}}
          onPress={CheckOutPage}>
          <MaterialCommunityIcons
            name="logout"
            size={30}
            style={styles.icons}
          />
        </Pressable>
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
    height: WIDTH * 0.13,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icons: {
    color: '#ffffff',
  },
});
