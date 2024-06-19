import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { BUTTON, COLORS, FONTS, MAIN_STYLE, TEXT, TYPOGRAPHY, UI } from "../../stylesheets/theme";
import { ButtonComponent } from "../components/atoms";
import { GoBackTop, TextInputComponent } from "../components/molecules";

const Login = ({ navigation }) => {

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps='never'>
      <GoBackTop action={() => navigation.navigate('Opener')}/>
      <View style={{ marginTop: 50, padding: 20 }}>
        <View>
          <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl }}>
            Benvenut* su WithMe! 👋
          </Text>
          <Text  style={{ fontFamily: FONTS.regular, marginTop: 10, fontSize: 16 }}>Ciao! Siamo felici di averti qui!{"\n"}
          Questa è la <Text style={MAIN_STYLE.textHighlight}>prima volta che utlizzi WithMe</Text> o lo hai giù utlizzato in passato?{"\n"}
          Se preferisci, puoi <Text style={MAIN_STYLE.textHighlight}>creare un nuovo account</Text> oppure <Text style={MAIN_STYLE.textHighlight}>caricare i dati relativi al tuo account</Text> precedente. Scegli l'opzione che ti sembra più comoda e inizia subito a esplorare!</Text>
        </View>
        <View style={{marginTop:50}}>
          <ButtonComponent text="Crea un nuovo account" buttonStyle={BUTTON.buttonFullMain} textStyle={TEXT.light1} action={() => navigation.navigate("Registration")}/>
          <ButtonComponent text="Utilizza account esistente" buttonStyle={BUTTON.buttonOutlineMain} textStyle={TEXT.main1} action={() => navigation.navigate("Recovery")}/>
        </View>
      </View>

    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
  },
  loginButtonContainer: {
    alignItems: "center",
    backgroundColor: COLORS.main.first,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  loginButtonText: {
    color: COLORS.light.first,
  },
});
