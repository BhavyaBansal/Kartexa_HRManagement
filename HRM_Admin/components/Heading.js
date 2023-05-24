import { View,Text,StyleSheet } from "react-native";
import Colors from "../constants/colors";

function Heading({children}){
    return <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
    </View>
}
export default Heading;
const styles = StyleSheet.create({
    container:{
        margin:10,
        padding:10,   
    },
    text:{
        fontSize:24,
        fontWeight:'bold',
        color:'black',
        textTransform:'uppercase',
        letterSpacing:1,

    }
})