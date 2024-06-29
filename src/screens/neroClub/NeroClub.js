import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import NewHeader from '../../components/NewHeader';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export default function NeroClub(props) {
  const [circle, setCircle] = useState(false);
  const [alliance, setAlliance] = useState(false);
  const [collector, setCollector] = useState(false);
  const goToHome = props?.route?.params?.goToHome || false;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NewHeader
        goToHome={goToHome}
        navigation={props.navigation}
        title={'Nero Club'}
        rightImage={false}
      />

      <ScrollView>
        <Text style={styles.headerText}>Well, hello there...</Text>

        <Text style={styles.subText}>
          To reward our favourite contributors and enthusiast we have created
          three special clubs. Unlock special privileges by sharing your work,
          making purchases and bringing in more NERO heads from your circle.
          Well the more you level up the more you will get, from free shipping,
          special offers to exclusive access to certain products.
        </Text>

     
        {circle == false ? (
          <TouchableOpacity style={styles.box} onPress={() => setCircle(true)}>
            <Image source={imageConstant.nerocircle} style={styles.leftImg} />
            <Text style={styles.boxText}>NERO Inner Circle</Text>
            <Image source={imageConstant.plus} style={styles.rightImg} />
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.box}
              onPress={() => setCircle(false)}>
              <Image source={imageConstant.nerocircle} style={styles.leftImg} />
              <Text style={styles.boxText}>NERO Inner Circle</Text>
              <Image source={imageConstant.minus} style={styles.rightImg} />
            </TouchableOpacity>

            <Text style={styles.headerText}>A true blue blood!</Text>

            <Text style={styles.subText}>
              NERO Inner Circle members have the most exciting of powers at
              their disposal. It is for select contributors and is strictly by
              invitation only.
            </Text>

            <Text style={styles.headerText}>Benefits</Text>

            <Text style={styles.subText}>
              Special prices on all products. {'\n'}
              Power to curate the content of fellow NERO members{'\n'}
              Special discount on your birthday{'\n'}
              Four 50% off discount vouchers every year{'\n'}
              Publish a blog or one opinion piece every year.{'\n'}A one-time
              paid campaign to promote your work.{'\n'}
              Including features of NERO Alliance and NERO Collectors
            </Text>

            <Text style={styles.headerText}>
              How you become a NERO Inner Circle Member
            </Text>

            <Text style={styles.subText}>
              Increasing your minimum asset volume to 555 {'\n'}
              By receiving a special invitation from one of the NERO Inner
              Circle members.
            </Text>
          </View>
        )}

        {alliance == false ? (
          <TouchableOpacity
            style={styles.box}
            onPress={() => setAlliance(true)}>
            <Image source={imageConstant.neroalliance} style={styles.leftImg} />
            <Text style={styles.boxText}>NERO Inner Circle</Text>
            <Image source={imageConstant.plus} style={styles.rightImg} />
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.box}
              onPress={() => setAlliance(false)}>
              <Image
                source={imageConstant.neroalliance}
                style={styles.leftImg}
              />
              <Text style={styles.boxText}>NERO Inner Circle</Text>
              <Image source={imageConstant.minus} style={styles.rightImg} />
            </TouchableOpacity>

            <Text style={styles.subText}>
              NERO Alliance is for artists and contributors only. You can become
              a NERO Alliance member by uploading a minimum of 10 assets. It is
              the perfect place for budding artists and professionals to share
              and get feedback from the NERO Inner Circle members. As a NERO
              Alliance member you will have access to {'\n'} {'\n'}
              Special discount on your birthday 10% off on all products.{'\n'}
              Access to loyalty programme basis art contribution.{'\n'}
              An annual discount of 40% on 3 purchases upon contributing 120
              pieces of work annually{'\n'}
              Including features of NERO Collectors
            </Text>
          </View>
        )}

        {collector == false ? (
          <TouchableOpacity
            style={styles.box}
            onPress={() => setCollector(true)}>
            <Image
              source={imageConstant.nerocollector}
              style={styles.leftImg}
            />
            <Text style={styles.boxText}>NERO Inner Circle</Text>
            <Image source={imageConstant.plus} style={styles.rightImg} />
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.box}
              onPress={() => setCollector(false)}>
              <Image
                source={imageConstant.nerocollector}
                style={styles.leftImg}
              />
              <Text style={styles.boxText}>NERO Inner Circle</Text>
              <Image source={imageConstant.minus} style={styles.rightImg} />
            </TouchableOpacity>

            <Text style={styles.subText}>
              NERO Collectors is a club for all the NERO heads out there. Once
              you sign up you will automatically become a member of NERO
              Collectors club. Your privileges will increase with the increase
              in your purchases. Having said that you still get to reap the
              following benefits:{'\n'}
              {'\n'}A flat 30% off on your first purchase at our NERO STORE
              {'\n'}A personalised gallery-mi-nero gallery{'\n'}
              Buy and trade art{'\n'}
              Eligible for the loyalty program by billing $100{'\n'}
              every month or $1200 annually{'\n'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.black,
  },
  headerText: {
    color: colorConstant.white,
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2.1),
    marginVertical: responsiveScreenWidth(3),
    marginHorizontal: responsiveScreenWidth(4),
  },
  subText: {
    color: colorConstant.lightText,
    fontFamily: fontConstant.regular,
    marginVertical: responsiveScreenWidth(3),
    marginHorizontal: responsiveScreenWidth(6.5),
    lineHeight: 22,
    fontSize: responsiveScreenFontSize(2),
  },
  memberImg: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(40),
    alignSelf: 'center',
    marginVertical: responsiveScreenWidth(7),
  },
  box: {
    backgroundColor: colorConstant.backgroundBlack,
    width: responsiveScreenWidth(90),
    alignSelf: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsiveScreenWidth(2),
    marginVertical: responsiveScreenHeight(1),
  },
  leftImg: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(12),
    alignSelf: 'center',
  },
  boxText: {
    color: colorConstant.lightText,
    fontFamily: fontConstant.bold,
    width: '73%',
  },
  rightImg: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(8),
    alignSelf: 'center',
  },
});
