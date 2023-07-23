import {Text, View, StyleSheet, Dimensions, Image, Linking} from 'react-native';
import Heading from '../components/Heading';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
function MeetingDetailsScreen({route}) {
  const meetingdetails = route.params.meetingDetails;
  return (
    <View style={styles.outerContainer}>
      <Heading>{meetingdetails.teamname}</Heading>
      <Image source={require('../public/images/meeting.png')} />
      <View style={styles.meetingCard}>
        <Text style={styles.meetingText}>Topic: {meetingdetails.topic}</Text>
        <Text style={styles.meetingText}>
          Time:{' '}
          {parseInt(meetingdetails.time.slice(0, 2)) > 11 ||
          parseInt(meetingdetails.time.slice(0, 2)) !== 24
            ? meetingdetails.time + ' PM'
            : meetingdetails.time + ' AM'}
        </Text>
        <Text style={styles.meetingText}>
          Duration: {meetingdetails.duration} Hours
        </Text>
        <Text style={styles.meetingText}>
          Team Size: {meetingdetails.teamsize} Members
        </Text>
        <Text style={[styles.meetingText]}>
          Team Size:{' '}
          <Text
            style={{color: 'blue'}}
            onPress={() => Linking.openURL('https://' + meetingdetails.link)}>
            {meetingdetails.link}
          </Text>
        </Text>
        <Text style={styles.meetingText}>Next Meeting: Coming Soon</Text>
      </View>
    </View>
  );
}
export default MeetingDetailsScreen;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  meetingText: {
    color: 'white',
    letterSpacing: 1,
    fontSize: 18,
    margin: 10,
    fontWeight: 'bold',
  },
  meetingCard: {
    backgroundColor: Colors.blue400,
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    width: WIDTH * 0.95,
    marginVertical: 10,
  },
});
