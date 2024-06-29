import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { colorConstant, imageConstant } from '../utils/constant';
import { responsiveScreenFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';

const InChatFileTransfer = ({filePath}) => {
  var fileType = '';
  var name = '';
  if (filePath !== undefined) {
    name = filePath.split('/').pop();
    fileType= filePath.split('.').pop();
  }
  return (
    <View style={styles.container}>
      <View
        style={styles.frame}
      >
         <Image
            source={
              fileType === 'pdf'
                ? imageConstant.pdf
                : imageConstant.unknown
            }
            style={{height: 60, width: 60,borderRadius:8}}
          />
        <View>
            <View style={{width:responsiveScreenWidth(30)}}>
          <Text style={styles.text} numberOfLines={2} >
            {name.replace('%20', '').replace(' ', '')}
          </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default InChatFileTransfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    marginTop: 10,
    fontSize: responsiveScreenFontSize(2.2),
    lineHeight: 20,
    marginLeft: 5,
    // marginRight: 10,
  },
 
  frame: {
    backgroundColor: '#656161',
    flexDirection: 'row',
    borderRadius: 12,
    padding: 5,
    marginTop: -4,
    width:responsiveScreenWidth(50),borderWidth:1,borderColor:colorConstant.lightWhite
  },
});