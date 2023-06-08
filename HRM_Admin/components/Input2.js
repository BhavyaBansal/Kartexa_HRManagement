import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import Colors from '../constants/colors';
const WIDTH = Dimensions.get('window').width;
function Input2({
  children,
  placeholder,
  type,
  content,
  onChangeTextProp,
  secure,
  editable,
}) {
  return (
    <View style={styles.outerContainer}>
      <Text style={styles.text}>{children}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        keyboardType={type}
        textContentType={content}
        onChangeText={onChangeTextProp}
        secureTextEntry={secure}
        editable={editable}></TextInput>
    </View>
  );
}
export default Input2;
const styles = StyleSheet.create({
  input: {
    width: WIDTH * 0.7,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    fontSize: 18,
  },
  text: {
    color: 'black',
    fontSize: 20,
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  outerContainer: {
    marginBottom: 30,
  },
});
