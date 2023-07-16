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
function CompanyFAQ() {
  return (
    <View style={styles.outerContainer}>
      <Image
        source={require('../public/images/Ellipse2.png')}
        style={styles.ellipse2}
      />
      <Image
        source={require('../public/images/Ellipse3.png')}
        style={styles.ellipse3}
      />
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Text style={styles.heading}>COMPANY FAQ's</Text>
        <Text style={styles.normalText}>
          <Text style={styles.subheading}>
            1. What is a typical UX design process?
          </Text>
          {'\n'}
          There are multiple stages in the design process as per the methodology
          you prefer. Our approach is inspired by the “Double Diamond” model
          proposed by the British Design Council. Our process include- Discover,
          Define, Design and Deploy.
        </Text>
        <Text style={styles.normalText}>
          <Text style={styles.subheading}>
            2. What is the timeline for a UX design project?
          </Text>
          {'\n'}
          All the factors influencing the cost (scope, complexity, platforms,
          budget, client feedback) will also affect the delivery timeline of a
          UX design project. A typical UX design project could go anywhere
          between 2-3 months to 6 months for a small-medium sized project.
          Bigger projects could take more than 6 months to 1 year depending on
          the scope and complexity.
        </Text>
        <Text style={styles.normalText}>
          <Text style={styles.subheading}>
            3. Do you provide support to the application after the product
            launch?
          </Text>
          {'\n'}
          We shall extend our support according to the client’s requirements.
          After ‘User Acceptance Testing (UAT), we shall be providing support
          for the next 3 months.
        </Text>
        <Text style={styles.normalText}>
          <Text style={styles.subheading}>
            4. What are the UX design deliverables?
          </Text>
          {'\n'}
          The deliverables could change based on the requirement and nature of
          the project. Typically we deliver:{'\n'}
          User-research report{'\n'}UX audit report (if revamping an existing
          design){'\n'}Red route analysis{'\n'}User persona{'\n'}Customer
          journey maps{'\n'}Sitemap{'\n'}Wireframes{'\n'}UI sketches{'\n'}
          Interactive prototypes{'\n'}Design systems
        </Text>
      </ScrollView>
    </View>
  );
}
export default CompanyFAQ;
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
    textAlign: 'left',
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
    top: WIDTH * 1.05,
    left: 0,
    zIndex: -1,
  },
  ellipse3: {
    resizeMode: 'cover',
    position: 'absolute',
    top: WIDTH * 0.05,
    right: 0,
    zIndex: -1,
  },
});
