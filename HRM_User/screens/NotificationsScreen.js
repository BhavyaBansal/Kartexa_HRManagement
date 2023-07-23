import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getnotificationsbydate} from '../api';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
function NotificationsScreen({route}) {
  const hrId = route.params.hrId;
  const [notifications, setNotifications] = useState([]);
  function getNotificationsDetails() {
    const currdate = new Date();
    const newdate = new Date(currdate.getTime() + 19800 * 1000);
    // console.log(newdate.toISOString());
    const details = getnotificationsbydate(hrId, newdate.toISOString());
    details.then(response => {
      // console.log(response.data);
      setNotifications(response.data);
    });
  }
  useEffect(() => {
    getNotificationsDetails();
  }, []);
  return (
    <ScrollView
      style={styles.outerContainer}
      contentContainerStyle={{alignItems: 'center'}}>
      {notifications.map(notification => (
        <View key={notification.id} style={styles.notificationContainer}>
          <Text style={styles.messageText}>{notification.message}</Text>
          <View style={styles.inRow}>
            <Text style={styles.notificationDateTime}>
              {notification.date.slice(0, 10)}
            </Text>
            <Text style={styles.notificationDateTime}>
              {notification.date.slice(11, 16)}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
export default NotificationsScreen;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  notificationContainer: {
    width: WIDTH * 0.9,
    margin: 10,
    backgroundColor: Colors.blue200,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    elevation: 10,
  },
  inRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  notificationDateTime: {
    margin: 2,
    padding: 3,
    backgroundColor: Colors.blue100,
    color: 'black',
    elevation: 2,
    borderRadius: 3,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  messageText: {
    color: 'white',
    margin: 2,
    letterSpacing: 1,
  },
});
