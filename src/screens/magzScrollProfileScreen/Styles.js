import { StyleSheet } from "react-native";
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

export default StyleSheet.create({
    carousel: {
      flex: 1,
      transform: [{scaleY: 1}],
      backgroundColor: 'black',
    },
    placeholderContainer: {
      // flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      justifyContent: 'center',
      width: responsiveScreenWidth(100),
      gap: responsiveScreenHeight(2),
    },
    placeholderHeader: {
      width: responsiveScreenWidth(95),
      height: responsiveScreenHeight(7),
      borderRadius: 12,
      backgroundColor: '#E1E9EE',
      marginBottom: responsiveScreenHeight(0.5),
    },
    placeholderImage: {
      width: responsiveScreenWidth(95),
      height: responsiveScreenHeight(44),
      borderRadius: 12,
      backgroundColor: '#E1E9EE', 
    },
  
    placeholderText: {
      height: responsiveScreenHeight(20),
      width: responsiveScreenWidth(95),
      borderRadius: 12,
      backgroundColor: '#E1E9EE',
    },
  });