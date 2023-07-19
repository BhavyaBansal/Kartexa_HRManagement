import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Input1 from '../components/Input1';
import Label from '../components/Label';
import SelectDropdown from 'react-native-select-dropdown';
import Textarea from 'react-native-textarea';
import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useState} from 'react';
import {addtimesheet} from '../api';
const WIDTH = Dimensions.get('window').width;
const HOURS = [
  '1 hour',
  '2 hours',
  '3 hours',
  '4 hours',
  '5 hours',
  '6 hours',
  '7 hours',
  '8 hours',
];
function TaskSubmission({route, navigation}) {
  const empDetails = route.params.details;
  const empId = empDetails.empId;
  const hrId = empDetails.hrId;
  const name = empDetails.name;
  const email = empDetails.email;
  const phoneno = empDetails.phoneno;
  const employmenttype = empDetails.employmenttype;
  const [duration, setDuration] = useState(0);
  const [task, setTask] = useState('');
  const [imageBase64, setImageBase64] = useState('empty');
  const chooseImageHandler = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then(image => {
        // console.log(typeof image.data);
        setImageBase64(image.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  function setTextAreaValue(val) {
    // console.log(val);
    setTask(val);
  }
  function addTaskHandler() {
    let tempDate = new Date();
    let newDate = new Date();
    newDate.setTime(tempDate.getTime() + 19800 * 1000);
    const date = newDate.toISOString();
    addtimesheet(
      empId,
      hrId,
      name,
      email,
      phoneno,
      employmenttype,
      duration,
      task,
      imageBase64,
      date,
    )
      .then(() => {
        Alert.alert('Success', 'Timesheet Submitted Successfully!!');
        setTextAreaValue('');
        setDuration(0);
        setImageBase64('empty');
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <ScrollView style={styles.outerContainer}>
      <Label>Name:</Label>
      <Input1 inputValue={name} editable={false}></Input1>
      <Label>Email:</Label>
      <Input1 inputValue={email} editable={false}></Input1>
      <Label>Phone Number:</Label>
      <Input1 inputValue={phoneno} editable={false}></Input1>
      <Label>Employment Type:</Label>
      <Input1 inputValue={employmenttype} editable={false}></Input1>
      <Label>Time Spent:</Label>
      <View style={styles.selectContainer}>
        <SelectDropdown
          data={HOURS}
          onSelect={(selectedItem, index) => {
            const item = selectedItem.slice(0, 1);
            // console.log(item);
            setDuration(parseInt(item));
          }}
          buttonStyle={{
            width: WIDTH * 0.9,
            borderRadius: 10,
            // backgroundColor: Colors.blue100,
          }}
          buttonTextStyle={{
            fontSize: 20,
            color: 'black',
            letterSpacing: 1,
            fontWeight: 'bold',
          }}
        />
      </View>
      <Label>Task Done:</Label>
      <View style={styles.container}>
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          onChangeText={setTextAreaValue}
          maxLength={120}
          placeholder={'Enter your task details here...'}
          placeholderTextColor={'#4f4c4c'}
          underlineColorAndroid={'transparent'}
        />
      </View>
      <Label>Output file (if any):</Label>
      <Text style={styles.chooseImageBtn} onPress={chooseImageHandler}>
        Choose Image
      </Text>
      {imageBase64 === 'empty' ? (
        ''
      ) : (
        <>
          <Label>Preview</Label>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: `data:image/png;base64,${imageBase64}`}}
              style={styles.imageStyle}
            />
          </View>
        </>
      )}
      <CustomButton onPressProp={addTaskHandler}>Submit</CustomButton>
    </ScrollView>
  );
}
export default TaskSubmission;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  selectContainer: {
    margin: 10,
  },
  container: {
    padding: 10,
  },
  textareaContainer: {
    width: WIDTH * 0.9,
    height: 180,
    padding: 5,
    backgroundColor: Colors.blue100,
    borderRadius: 10,
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 14,
    color: 'black',
  },
  chooseImageBtn: {
    margin: 10,
    width: 120,
    height: 50,
    backgroundColor: '#ccc',
    textAlign: 'center',
    verticalAlign: 'middle',
    borderRadius: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    elevation: 2,
  },
  imageStyle: {
    height: WIDTH * 0.38,
    width: WIDTH * 0.33,
  },
  imageContainer: {
    width: WIDTH * 0.35,
    height: WIDTH * 0.4,
    backgroundColor: Colors.grey100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
