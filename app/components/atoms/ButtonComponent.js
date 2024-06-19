import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Icon from './Icon';

const ButtonComponent = ({ buttonStyle, textStyle, text, action, icon, disabled }) => {
  const handlePress = () => {
    if (!disabled) {
      action();
    }
  };

  return (
    <Pressable
      
      style={({pressed}) => [
        {
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
          ...buttonStyle,
        },
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <View style={{flexDirection:"row"}}>
        {icon 
          ? <View style={{position:"relative", bottom:3, right:10}}><Icon icon= {icon.name} color={icon.color} size={icon.size}/></View>
          : null }
      <Text style={textStyle}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonComponent;
