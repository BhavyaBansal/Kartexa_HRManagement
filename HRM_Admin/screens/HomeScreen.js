import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useLayoutEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/colors';
function HomeScreen({navigation, route}) {
  const email = route.params.email;
  const id = route.params.id;
  function logoutHandler() {}
  function addEmployeeHandler() {
    navigation.navigate('AddEmp', {
      email,
      id,
    });
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerContainer}>
            <Text>{email}</Text>
            {/* <MaterialIcons name="" size={16} />
             */}
            <Text onPress={logoutHandler} style={styles.logout}>
              {' '}
              Logout
            </Text>
          </View>
        );
      },
    });
  });

  return (
    <View style={styles.outerContainer}>
      <CustomButton onPressProp={addEmployeeHandler}>Add Employee</CustomButton>
      <ScrollView>
        <Text>List Of Employees</Text>
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  },
  logout: {
    color: Colors.blue300,
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
