import {StyleSheet, Text, SafeAreaView,ScrollView} from 'react-native';
import React from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import NewHeader from '../../components/NewHeader';

export default function PrivacyPolicy(props) {
  const goToHome = props?.route?.params?.goToHome || false

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
     
      <NewHeader
      rightImage = {false}
      navigation={props.navigation}
      title = {'Privacy Policy'}
      goToHome={goToHome}
      />

      <Text style={styles.text}>
        1. Types data we collect {'\n \n'}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
        {'\n\n'}
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident.
        {'\n\n'}
        2. Use of your personal data {'\n\n'}
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae.
        {'\n\n'}
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
        fugit.
        {'\n\n'}
        3. Disclosure of your personal data
        {'\n\n'}
        At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati cupiditate non provident,
        similique sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga.
        {'\n\n'}
        Et harum quidem rerum facilis est et expedita distinctio. Nam libero
        tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
        minus
      </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.black,
  },
  text: {
    color: colorConstant.white,
    width: responsiveScreenWidth(95),
    lineHeight: 19,
    fontFamily: fontConstant.regular,
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
  },
});
