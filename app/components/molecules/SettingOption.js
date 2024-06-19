import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, TYPOGRAPHY } from '../../../stylesheets/theme'
import { Icon } from '../atoms';

const SettingOption = ({icon, action, text, contentStyle, textStyle, goIcon}) => {
    const handlePress = () => {
        if (action) {
          action();
        }
      };
    return (
    <TouchableOpacity style={contentStyle} onPress={handlePress}>
    <View style={{flexDirection:"row", alignSelf:"baseline", paddingHorizontal:10, position:"relative", width:"100%"}}>
        {icon && <Icon icon={icon.name} size={icon.size} color={icon.color}/>}
        <Text style={textStyle}>{text}</Text>
        {goIcon && <View style={{right:0, top:3, position:"absolute"}}><Icon icon="chevron-forward" size={25} color={COLORS.light.second}/></View>}
    </View>
</TouchableOpacity>
  )
}

export default SettingOption