import React, { useState } from 'react';
import { View, TextInput, Button, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONTS, TEXT, TYPOGRAPHY } from '../../../stylesheets/theme';
import { ButtonComponent } from '../atoms';

const DatePicker = ({ onDateSelect, currentDate, label, placeholder }) => {
  const [date, setDate] = useState(currentDate || null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleConfirm = () => {
    onDateSelect(date)
    hideDatePicker();
  };

  return (
    <View>
            
      <Text style={{marginBottom:10, fontFamily:FONTS.regular, marginTop:20}}>{label}</Text>
      <View style={{borderWidth:1, borderColor:COLORS.main.first, borderRadius:10, padding:20,backgroundColor:COLORS.main.first}}>
      <ButtonComponent
        text={date ? date.toISOString().split('T')[0] : placeholder}
        action={showDatePickerModal}
        textStyle={TEXT.light1}/>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          style={{ borderWidth: 1, borderRadius: 10, borderColor: COLORS.main.first }}
        />
      )}
      {showDatePicker && Platform.OS === "ios" ?
        <Button title="Conferma" onPress={handleConfirm} color={COLORS.main.first} />
      : null}
    </View>
  );
};

export default DatePicker;
