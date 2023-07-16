import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Heading from '../components/Heading';
const WIDTH = Dimensions.get('window').width;
function CompanyPolicy() {
  return (
    <View style={styles.outerContainer}>
      <Image
        source={require('../public/images/Ellipse2.png')}
        style={styles.ellipse2}
      />
      <Image
        source={require('../public/images/Ellipse4.png')}
        style={styles.ellipse4}
      />
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Text style={styles.heading}>COMPANY POLICY</Text>
        <Text style={styles.normalText}>
          This policy will be utilized and applied to all workers and staff
          members of kartexa., regardless of their department and the position
          they hold.
        </Text>
        <Text style={styles.subheading}>EMPLOYEE CONDUCT</Text>
        <Text style={styles.normalText}>
          All employees and staff members are expected to abide by the code of
          conduct which was distributed by the human resources department during
          the employee’s employement date.
        </Text>
        <Text style={styles.subheading}>
          WORKING HOURS,ATTENDENCE,AND TIME-OFF
        </Text>
        <Text style={styles.normalText}>
          The regular working schedule for the most employees is from monday to
          friday between the hours of 8 am to 5 pm.the attendence shall be
          checked every day.employees who incur five(5) consecutive absentees
          without notification shall be terminated.regularized employees are
          eligible for time-off and vacation leave.requests for time-off and
          vacation leaves shall be approved by both the employee’s direct
          supervisor and HR manager.
        </Text>
        <Text style={styles.subheading}>
          CORRECTIVE AND DISCIPLINARY ACTION
        </Text>
        <Text style={styles.normalText}>
          Any worker who is guilty of violating any of the policy’s terms and
          conditions shall be subjected to either suspension or
          termination,depending on the gravity of the violation.
        </Text>
        <Text style={styles.subheading}>CONFIDENTIALITY</Text>
        <Text style={styles.normalText}>
          Any and all information and data created,discovered,and kept by the
          company is considered as confidential information.all the users of
          this confidential information are strictly obliged to maintain it in
          utmost confidence.all employees are not allowed to disseminate this
          information in any way or form to any individual or entity that is not
          part of the company.
        </Text>
        <Text style={styles.subheading}>TERMINATION</Text>
        <Text style={styles.normalText}>
          Any and all company employees who are terminated,whether at the end of
          the contract or prematurely terminated by the company,or have resigned
          will no longer be subject to the terms and conditions of this policy.
        </Text>
      </ScrollView>
    </View>
  );
}
export default CompanyPolicy;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  normalText: {
    margin: 10,
    textAlign: 'justify',
    // padding: 5,
  },
  ellipse2: {
    width: WIDTH * 0.6,
    height: WIDTH * 0.66,
    resizeMode: 'cover',
    position: 'absolute',
    top: WIDTH * 0.05,
    left: 0,
    zIndex: -1,
  },
  ellipse4: {
    width: WIDTH * 0.73,
    height: WIDTH * 0.62,
    resizeMode: 'cover',
    position: 'absolute',
    // top: WIDTH * 0.75,
    bottom: 0,
    zIndex: -1,
  },
});
