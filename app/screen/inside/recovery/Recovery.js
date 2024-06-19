import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { ButtonComponent } from "../../../components/atoms";
import { GoBackTop } from "../../../components/molecules";
import { BUTTON, FONTS, MAIN_STYLE, TEXT, TYPOGRAPHY, UI } from "../../../../stylesheets/theme";

const Recovery = ({ navigation }) => {
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps='never'>
      <GoBackTop action={() => navigation.goBack()}/>
      <View style={UI.distances}>
        <Text style={{fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl, marginTop:30, marginBottom:30}}>Bentornato!</Text>
        <Text style={{fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.m}}>Purtroppo non riusciamo a trovare i tuoi dati su questo dispositivo. 😔</Text>
        <Text style={{fontFamily: FONTS.regular, fontSize: TYPOGRAPHY.text.xl, marginTop:30}}>Se desideri procedere senza i tuoi dati precedenti, ti preghiamo di <Text style={MAIN_STYLE.textHighlight}>inserire solo il codice fornito</Text> durante la registrazione. Grazie</Text>
        <Text style={{fontFamily: FONTS.regular, fontSize: TYPOGRAPHY.text.xl, marginTop:10, marginBottom: 70}}>Altrimenti, se hai eseguito un <Text style={MAIN_STYLE.textHighlight}>backup</Text> puoi caricarlo.</Text>
        <ButtonComponent action={() => navigation.navigate("BackupRecovery")} text="Si, ho un backup" buttonStyle={BUTTON.buttonFullMain} textStyle={TEXT.light1}/>
        <ButtonComponent action={() =>  navigation.navigate("CodeRecovery")} text="No, non ho un backup" buttonStyle={BUTTON.buttonOutlineMain} textStyle={TEXT.main1}/>
      </View>
    </ScrollView>
  );
};

export default Recovery;


const styles = StyleSheet.create({});