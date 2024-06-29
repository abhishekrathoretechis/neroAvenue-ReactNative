import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { imageConstant} from '../../utils/constant';
import NewHeader from '../../components/NewHeader';

import styles from './Style';
export default function HelpCenter(props) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NewHeader
        rightImage={false}
        navigation={props.navigation}
        title={'Help Center'}
      />

      <View style={styles.mainView}>
        <TouchableOpacity
          style={styles.rowUnderContainer}
          onPress={() => props.navigation.navigate('ReportProblem')}>
          <Text style={styles.bodyText}>Report a problem</Text>
          <Image source={imageConstant.leftarrow} style={styles.arrowImg} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

