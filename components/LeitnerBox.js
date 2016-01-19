import React, { 
  Component, Image, StyleSheet, View, Text, TextInput, TouchableHighlight
} from 'react-native';
import moment from 'moment';

const boxesToColor = [
  '#FF0000',
  '#FF9C00',
  '#F5E701',
  '#9BE603',
  '#5AE539'
];

const leitnerBoxToRange = [
  [0],
  [0,1],
  [0,1,2],
  [0,1,2,3],
  [0,1,2,3, 4]
];

export default function({leitnerBox}) {
  // array methods not available in android
  // var range = Array.from(Array(leitnerBox).keys());

  var range = leitnerBoxToRange[leitnerBox -1];

  var boxes = range.map(index => 
    <View 
    key={index}
    style={{
      backgroundColor: boxesToColor[index],
      width: 15,
      width: (index + 5) * 2,
      height: (index + 1) * 4,
      marginRight: 2,
      marginTop: 20 - ((index + 1) * 4)
    }} />      
  );

  return (
    <View style={{flexDirection: 'row'}}>
      {boxes}
    </View>
  );
};