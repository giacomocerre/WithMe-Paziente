import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SHADOW, TYPOGRAPHY } from '../../../stylesheets/theme';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';
import { Icon } from '../atoms';

const TextEditInput = ({label, value, placeholder, onChange, icon}) => {
    const handleChangeText = (text) => {
        if(onChange) {
            onChange(text);
        }
    }
  return (
    <View>
        <View style={{flexDirection:"row"}}>
            <View style={{marginRight:5}}>
            <Icon icon={icon} size={20}/>
            </View>
            <Text style={styles.label}>
            {label}
        </Text>
        </View>
        
          <TextInput
            style={[SHADOW.normal, styles.value]}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
          />
    </View>
  )
}

export default TextEditInput

const styles = StyleSheet.create({
    label: {
        fontFamily:FONTS.bold,
        fontSize:TYPOGRAPHY.text.m,
        marginTop:5
    },
    value:{
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor: COLORS.light.first,
        marginBottom:30,
        marginTop:10,
        borderRadius:10,
        fontFamily:FONTS.medium,
        fontSize:TYPOGRAPHY.text.xl
    }
})