import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS, TYPOGRAPHY } from '../../../stylesheets/theme'

const Tag = ({tag}) => {
  return (
    <View style={{paddingHorizontal:10, paddingVertical:5, backgroundColor:COLORS.main.first, marginRight:10, borderRadius:100}}>
      <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.m, color:COLORS.light.first}}>{tag}</Text>
    </View>
  )
}

export default Tag