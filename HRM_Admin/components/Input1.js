import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import Colors from '../constants/colors';
const Width = Dimensions.get('window').width;
function Input1({
  placeValue,
  onChangeProp,
  onPressInProp,
  inputValue,
  secure,
  editable,
  multi,
  spellcheck,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeProp}
        style={styles.text}
        placeholder={placeValue}
        onPressIn={onPressInProp}
        value={inputValue}
        secureTextEntry={secure}
        editable={editable}
        multiline={multi}
        spellCheck={spellcheck}></TextInput>
    </View>
  );
}
export default Input1;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue100,
    width: Width * 0.85,
    borderRadius: 10,
    margin: 10,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14,
    letterSpacing: 0.5,
    color: Colors.grey200,
  },
});
