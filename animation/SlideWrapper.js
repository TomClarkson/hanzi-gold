import React, {View, Text} from 'react-native';
import { TransitionMotion, spring } from 'react-motion/native';
import Dimensions from 'Dimensions';

const Slide = ({slide}) => {
  var slideContainerStyes = {
    flex: 1,
    left: slide.x,
    position: 'absolute',
    height: slide.item.height,
    opacity: slide.opacity,
    width: Dimensions.get('window').width - 40
  };

  return (
    <View style={slideContainerStyes}>
      {slide.item.component}
    </View>
  );
}

export default function SlideWrapper({item}) {
  return (
    <TransitionMotion
      willEnter={key => ({
        item,
        opacity: spring(0),
        x: spring(380, [120, 14]),
      })}
      willLeave={(key, {item}) => ({
        item,
        leaving: true,
        opacity: spring(0),
        x: spring(-380, [120, 14]),
      })}
      styles={{
        [item.id]: {
          item,
          opacity: spring(1),
          x: spring(0, [120, 14]),
        },
      }}>
      {configs =>
        <View style={{
          position: 'relative',
          flex: 1
        }}>
          {Object.keys(configs).map(key => <Slide key={key} slide={configs[key]} />)}
        </View>
        
      }
    </TransitionMotion>
  );
}