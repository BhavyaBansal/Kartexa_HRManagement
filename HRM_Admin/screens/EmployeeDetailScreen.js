import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Heading from '../components/Heading';
import CustomButton from '../components/CustomButton';
import {checkforpassupdated} from '../api';
const WIDTH = Dimensions.get('window').width;
function EmployeeDetailScreen({route, navigation}) {
  const empData = route.params.emp;
  const hrEmail = route.params.hrEmail;
  const hrId = route.params.hrId;
  function openUpdatePage() {
    checkforpassupdated(empData.id).then(res => {
      const ispassupdated = res.data.ispassupdated;
      navigation.navigate('UpdateEmployee', {
        emp: empData,
        hrEmail,
        hrId,
        ispassupdated,
      });
    });
  }
  return (
    <View style={styles.outerContainer}>
      <Heading>{empData.name} Details</Heading>
      <ScrollView style={styles.detailsContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailData}>{empData.name}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Email: </Text>
          <Text style={styles.detailData}>{empData.email}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Phone Number:</Text>
          <Text style={styles.detailData}>{empData.phonenumber}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Aadhar Number:</Text>
          <Text
            style={
              empData.aadharnumber === '0'
                ? styles.notUpdated
                : styles.detailData
            }>
            {' '}
            {empData.aadharnumber === '0'
              ? 'Not-Updated'
              : empData.aadharnumber}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Pan Number:</Text>
          <Text
            style={
              empData.pannumber === '' ? styles.notUpdated : styles.detailData
            }>
            {' '}
            {empData.pannumber === '' ? 'Not-Updated' : empData.pannumber}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text
            style={
              empData.address === '' ? styles.notUpdated : styles.detailData
            }>
            {' '}
            {empData.address === '' ? 'Not-Updated' : empData.address}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Date of birth:</Text>
          <Text
            style={
              empData.dateofbirth === null
                ? styles.notUpdated
                : styles.detailData
            }>
            {' '}
            {empData.dateofbirth === null ? 'Not-Updated' : empData.dateofbirth}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text style={styles.detailData}> {empData.gender}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Marital Status:</Text>
          <Text style={styles.detailData}> {empData.maritalstatus}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Emergencycontactname:</Text>
          <Text
            style={
              empData.emergencycontactname === ''
                ? styles.notUpdated
                : styles.detailData
            }>
            {' '}
            {empData.emergencycontactname === ''
              ? 'Not-Updated'
              : empData.emergencycontactname}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Emergencycontactnumber:</Text>
          <Text
            style={
              empData.emergencycontactnumber === '0'
                ? styles.notUpdated
                : styles.detailData
            }>
            {' '}
            {empData.emergencycontactnumber === '0'
              ? 'Not-Updated'
              : empData.emergencycontactnumber}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Accountnumber:</Text>
          <Text
            style={
              empData.accountnumber === '0'
                ? styles.notUpdated
                : styles.detailData
            }>
            {' '}
            {empData.accountnumber === '0'
              ? 'Not-Updated'
              : empData.accountnumber}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>IFSC code:</Text>
          <Text
            style={
              empData.ifsccode === '' ? styles.notUpdated : styles.detailData
            }>
            {' '}
            {empData.ifsccode === '' ? 'Not-Updated' : empData.ifsccode}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Department:</Text>
          <Text style={styles.detailData}> {empData.department}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Designation:</Text>
          <Text style={styles.detailData}> {empData.designation}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Joining Date:</Text>
          <Text style={styles.detailData}>
            {' '}
            {empData.joiningdate.slice(0, 10)}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Employment Status:</Text>
          <Text style={styles.detailData}> {empData.employmentstatus}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Probation End Date:</Text>
          <Text style={styles.detailData}>
            {' '}
            {empData.probationenddate !== null
              ? empData.probationenddate.slice(0, 10)
              : ''}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Confirmation Date:</Text>
          <Text style={styles.detailData}>
            {' '}
            {empData.confirmationdate !== null
              ? empData.confirmationdate.slice(0, 10)
              : ''}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Salary:</Text>
          <Text style={styles.detailData}> {empData.salary}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Manager Name:</Text>
          <Text style={styles.detailData}>
            {' '}
            {empData.managername !== null ? empData.managername : ''}
          </Text>
        </View>
        {/* <View style={styles.detail}>
          <Text style={styles.detailLabel}>Leave Balance:</Text>
          <Text style={styles.detailData}> {empData.leavebalance}</Text>
        </View> */}
      </ScrollView>
      <CustomButton onPressProp={openUpdatePage}>Update Details</CustomButton>
    </View>
  );
}
export default EmployeeDetailScreen;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
    marginRight: 5,
  },
  detailData: {
    fontWeight: 'bold',
    color: '#4e7e17',
    letterSpacing: 0.5,
  },
  notUpdated: {
    fontWeight: 'bold',
    color: '#9b0606',
    letterSpacing: 0.5,
  },
  detailsContainer: {
    width: WIDTH * 0.9,
    flexGrow: 0.9,
  },
});
