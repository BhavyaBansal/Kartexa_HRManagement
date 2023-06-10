import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {getoneemployeedata} from '../api';
import {useState, useEffect} from 'react';
import Colors from '../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import {MoreOrLess} from '@rntext/more-or-less';
import {uploadImage, findImageUrlById} from '../api';
import {deletetheImage} from '../api';
import NavigationFooter from '../components/NavigationFooter';
const WIDTH = Dimensions.get('window').width;
function AccountScreen({route, navigation}) {
  const empId = route.params.empId;
  const [employeeData, setEmployeeData] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  function getEmployeeDetailsHandler() {
    const employeeData = getoneemployeedata(empId);
    employeeData.then(response => {
      setEmployeeData(response.data);
      // console.log(response.data);
    });
    findImageUrlById(empId)
      .then(res => {
        const imgUrl = res.data.url;
        setProfileImage(imgUrl);
      })
      .catch(error => {
        console.log(error);
      });
  }
  function deleteImageHandler() {
    deletetheImage(empId)
      .then(res => {
        Alert.alert('Success', 'Image Deleted Successfully');
        setProfileImage('');
      })
      .catch(error => {
        console.log(error);
      });
  }
  useEffect(() => {
    getEmployeeDetailsHandler();
  }, []);
  function refreshHandler() {
    getEmployeeDetailsHandler();
  }
  const chooseImageHandler = async () => {
    console.log('Choose Image');
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setProfileImage(doc.uri);
      uploadImage(empId, doc.name, doc.uri)
        .then(res => {
          console.log(res.data.Success);
          Alert.alert('Success', res.data.Success);
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Error', 'Some Problem in Uploading Image');
        });
      console.log(doc.uri);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User Cancelled the Upload', error);
      } else {
        console.log(error);
      }
    }
  };
  function openUpdatePageHandler() {
    navigation.navigate('UpdateDetails', {employeeData});
  }
  return (
    <>
      <ScrollView
        style={styles.outerContainer}
        contentContainerStyle={{alignItems: 'center'}}>
        {/* <Text>{empId}</Text> */}
        <View style={styles.detailsContainer}>
          <View style={styles.userImageContainer}>
            {profileImage !== '' ? (
              <Image source={{uri: profileImage}} style={styles.profileImage} />
            ) : (
              <>
                <FontAwesome5 name="user-alt" size={50} style={styles.icons} />
                <View style={styles.camera}></View>
              </>
            )}
            <Pressable
              android_ripple={{
                color: '#ffffff',
                borderless: true,
                radius: 10,
              }}
              style={[
                styles.iconsCamera,
                profileImage !== '' ? {left: 20} : '',
              ]}
              onPress={chooseImageHandler}>
              <FontAwesome5 name="camera" size={20} color="#000000" />
            </Pressable>
            {profileImage !== '' ? (
              <Pressable
                android_ripple={{
                  color: '#c13939',
                  borderless: true,
                  radius: 10,
                }}
                style={styles.iconsDelete}
                onPress={deleteImageHandler}>
                <MaterialIcons name="delete" size={20} color="#e07575" />
              </Pressable>
            ) : (
              ''
            )}
          </View>
          <View>
            <Text style={styles.DetailText}>{employeeData.name}</Text>
            <Text style={styles.DetailText}>{employeeData.email}</Text>
            <Text style={styles.DetailText}>{employeeData.designation}</Text>
          </View>
        </View>

        <MoreOrLess
          numberOfLines={1}
          textButtonStyle={{color: '#ffffff', fontSize: 16}}
          animated
          moreText="More Details"
          lessText="Less Details"
          containerStyle={{
            alignItems: 'center',
            borderRadius: 10,
            width: WIDTH * 0.9,
            backgroundColor: Colors.blue100,
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Phone Number:</Text>
            <Text style={styles.detailData}>{employeeData.phonenumber}</Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Aadhar Number:</Text>
            <Text
              style={
                employeeData.aadharnumber === '0'
                  ? styles.notUpdated
                  : styles.detailData
              }>
              {' '}
              {employeeData.aadharnumber === '0'
                ? 'Not-Updated'
                : employeeData.aadharnumber}
            </Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Pan Number:</Text>
            <Text
              style={
                employeeData.pannumber === ''
                  ? styles.notUpdated
                  : styles.detailData
              }>
              {' '}
              {employeeData.pannumber === ''
                ? 'Not-Updated'
                : employeeData.pannumber}
            </Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Address:</Text>
            <Text
              style={
                employeeData.address === ''
                  ? styles.notUpdated
                  : styles.detailData
              }>
              {' '}
              {employeeData.address === ''
                ? 'Not-Updated'
                : employeeData.address}
            </Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Date of birth:</Text>
            <Text
              style={
                employeeData.dateofbirth === null
                  ? styles.notUpdated
                  : styles.detailData
              }>
              {' '}
              {employeeData.dateofbirth === null
                ? 'Not-Updated'
                : employeeData.dateofbirth === undefined
                ? employeeData.dateofbirth
                : employeeData.dateofbirth.slice(0, 10)}
            </Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Gender:</Text>
            <Text style={styles.detailData}> {employeeData.gender}</Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Marital Status:</Text>
            <Text style={styles.detailData}> {employeeData.maritalstatus}</Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Emergencycontactname:</Text>
            <Text
              style={
                employeeData.emergencycontactname === ''
                  ? styles.notUpdated
                  : styles.detailData
              }>
              {' '}
              {employeeData.emergencycontactname === ''
                ? 'Not-Updated'
                : employeeData.emergencycontactname}
            </Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Emergencycontactnumber:</Text>
            <Text
              style={
                employeeData.emergencycontactnumber === '0'
                  ? styles.notUpdated
                  : styles.detailData
              }>
              {' '}
              {employeeData.emergencycontactnumber === '0'
                ? 'Not-Updated'
                : employeeData.emergencycontactnumber}
            </Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Accountnumber:</Text>
            <Text
              style={
                employeeData.accountnumber === '0'
                  ? styles.notUpdated
                  : styles.detailData
              }>
              {' '}
              {employeeData.accountnumber === '0'
                ? 'Not-Updated'
                : employeeData.accountnumber}
            </Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>IFSC code:</Text>
            <Text
              style={
                employeeData.ifsccode === ''
                  ? styles.notUpdated
                  : styles.detailData
              }>
              {' '}
              {employeeData.ifsccode === ''
                ? 'Not-Updated'
                : employeeData.ifsccode}
            </Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Department:</Text>
            <Text style={styles.detailData}> {employeeData.department}</Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Joining Date:</Text>
            <Text style={styles.detailData}> {employeeData.joiningdate}</Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Employment Status:</Text>
            <Text style={styles.detailData}>
              {' '}
              {employeeData.employmentstatus}
            </Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Probation End Date:</Text>
            <Text style={styles.detailData}>
              {' '}
              {employeeData.probationenddate}
            </Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Confirmation Date:</Text>
            <Text style={styles.detailData}>
              {' '}
              {employeeData.confirmationdate}
            </Text>
          </View>
          {'\n'}
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Manager Name:</Text>
            <Text style={styles.detailData}> {employeeData.managername}</Text>
          </View>
          {'\n'}
        </MoreOrLess>
        <View style={styles.makeInRow}>
          <CustomButton onPressProp={openUpdatePageHandler}>
            Update Details
          </CustomButton>
          <Pressable
            android_ripple={{color: '#ccc', borderless: true}}
            onPress={refreshHandler}>
            <Image
              source={require('../public/icons/refresh.png')}
              style={styles.refresh}
            />
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
export default AccountScreen;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  detailsContainer: {
    width: WIDTH * 0.9,
    height: WIDTH * 0.3,
    elevation: 10,
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  userImageContainer: {
    width: WIDTH * 0.25,
    height: WIDTH * 0.25,
    backgroundColor: Colors.blue100,
    marginHorizontal: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  DetailText: {
    fontSize: 16,
    marginVertical: 3,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  camera: {
    width: WIDTH * 0.25,
    height: WIDTH * 0.125,
    backgroundColor: 'hsla(0, 0%, 0%, 0.422)',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  icons: {
    position: 'relative',
    top: 20,
    color: '#ffffff',
  },
  iconsCamera: {
    position: 'absolute',
    top: 60,
    zIndex: 100,
  },
  iconsDelete: {
    position: 'absolute',
    top: 60,
    zIndex: 100,
    right: 20,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
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
  refresh: {
    width: 30,
    height: 30,
    margin: 5,
  },
  makeInRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: WIDTH * 0.25,
    height: WIDTH * 0.25,
  },
});
