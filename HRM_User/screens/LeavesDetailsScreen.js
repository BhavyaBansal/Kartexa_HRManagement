import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
function LeavesDetailsScreen({route}) {
  const leavesdetailsdata = route.params.empleavesdata;
  //   console.log(leavesdetailsdata);
  return (
    <View style={styles.outerContainer}>
      <Text style={styles.nameheading}>
        {leavesdetailsdata.empLeavesData.name} Leave Details
      </Text>
      <View style={[styles.inRow, styles.headings]}>
        <Text style={styles.leaveTextHead}>Leave Type</Text>
        <Text style={styles.leaveTextHead}>Leaves Left</Text>
        <Text style={styles.leaveTextHead}>Leaves Taken</Text>
      </View>
      <View style={styles.inRow}>
        <Text style={styles.leaveTextHead}>Casual Leaves</Text>
        <Text style={styles.leaveText}>
          {leavesdetailsdata.empLeavesData.casualleaves}
        </Text>
        <Text style={styles.leaveText}>
          {leavesdetailsdata.empLeavesData.totalcasualleaves}
        </Text>
      </View>
      <View style={styles.inRow}>
        <Text style={styles.leaveTextHead}>Sick Leaves</Text>
        <Text style={styles.leaveText}>
          {leavesdetailsdata.empLeavesData.sickleaves}
        </Text>
        <Text style={styles.leaveText}>
          {leavesdetailsdata.empLeavesData.totalsickleaves}
        </Text>
      </View>
      <View style={styles.inRow}>
        <Text style={styles.leaveTextHead}>Earned Leaves</Text>
        <Text style={styles.leaveText}>
          {leavesdetailsdata.empLeavesData.earnedleaves}
        </Text>
        <Text style={styles.leaveText}>
          {leavesdetailsdata.empLeavesData.totalearnedleaves}
        </Text>
      </View>
      <View style={styles.inRow}>
        <Text style={styles.leaveTextHead}>Maternity Leaves</Text>
        <Text style={styles.leaveText}>
          {leavesdetailsdata.empLeavesData.maternityleaves}
        </Text>
        <Text style={styles.leaveText}>
          {leavesdetailsdata.empLeavesData.totalmaternityleaves}
        </Text>
      </View>
      <View style={styles.totalleavesContainer}>
        <Text style={styles.leaveTextNormal}>
          Total leaves made till now:{' '}
          {leavesdetailsdata.empLeavesData.totalleaves}
        </Text>
      </View>
      <View style={[styles.inRowSalary, styles.salaryContainer]}>
        <Text style={styles.leaveTextNormal}>
          This month salary: {leavesdetailsdata.empLeavesData.salarytillnow}
        </Text>
        <Text style={styles.leaveTextNormal}>
          Previous month salary:{' '}
          {leavesdetailsdata.empLeavesData.previousmonthsalary}
        </Text>
      </View>
    </View>
  );
}
export default LeavesDetailsScreen;
const styles = StyleSheet.create({
  inRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  leaveText: {
    width: WIDTH * 0.3,
    height: WIDTH * 0.15,
    color: 'black',
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: Colors.grey100,
  },
  leaveTextHead: {
    width: WIDTH * 0.3,
    height: WIDTH * 0.15,
    color: 'black',
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    borderColor: Colors.grey100,
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  nameheading: {
    color: 'black',
    margin: 20,
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  headings: {
    backgroundColor: '#b1acac',
  },
  totalleavesContainer: {
    width: WIDTH * 0.9,
    height: WIDTH * 0.05,
    marginVertical: 15,
  },
  salaryContainer: {
    width: WIDTH * 0.9,
    height: WIDTH * 0.1,
  },
  inRowSalary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leaveTextNormal: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
