import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
const SideBar = props => {
  const empId = props.employeeId;
  const hrId = props.hrId;
  const navigation = useNavigation();
  function openLeavesPage() {
    navigation.navigate('Leave', {empId, hrId});
  }
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <View style={styles.imageView}>
          <Pressable
            onPress={props.onCancel}
            android_ripple={{color: '#ccc', borderless: true}}>
            <Entypo name="cross" size={30} />
          </Pressable>
        </View>
        <View style={styles.links}>
          <Pressable
            android_ripple={{color: '#ccc', borderless: true}}
            style={styles.inRow}
            onPress={props.onCancel}>
            <AntDesign name="calendar" size={30} color={Colors.blue100} />
            <Text style={styles.link}>Meetings</Text>
          </Pressable>
          <Pressable
            android_ripple={{color: '#ccc', borderless: true}}
            style={styles.inRow}
            onPressIn={openLeavesPage}
            onPress={props.onCancel}>
            <MaterialIcons
              name="time-to-leave"
              size={30}
              color={Colors.blue100}
            />
            <Text style={styles.link}>Leaves</Text>
          </Pressable>
          <Pressable
            android_ripple={{color: '#ccc', borderless: true}}
            style={styles.inRow}
            onPress={props.onCancel}>
            <MaterialIcons name="policy" size={30} color={Colors.blue100} />
            <Text style={styles.link}>Company Policy</Text>
          </Pressable>
          <Pressable
            android_ripple={{color: '#ccc', borderless: true}}
            style={styles.inRow}
            onPress={props.onCancel}>
            <AntDesign name="questioncircle" size={30} color={Colors.blue100} />
            <Text style={styles.link}>Company FAQ's</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SideBar;
const styles = StyleSheet.create({
  modal: {
    zIndex: -1,
  },
  inputContainer: {
    backgroundColor: Colors.pink100,
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    // backgroundColor: "#311b6b",
  },
  image: {
    width: 30,
    height: 30,
    padding: 15,
  },
  imageView: {
    alignItems: 'flex-end',
  },
  links: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  link: {
    fontSize: 16,
    letterSpacing: 1,
    padding: 5,
    textTransform: 'uppercase',
    marginLeft: 5,
  },
  inRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
