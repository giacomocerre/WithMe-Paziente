import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { ButtonComponent } from "../components/atoms";
import { BUTTON, COLORS, FONTS, TEXT, TYPOGRAPHY } from "../../stylesheets/theme";
import React from "react";
import { LOCAL } from "../../services/disk/dataService";
import { useFocusEffect } from "@react-navigation/native";

const Opener = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      const userExist = async () => {
        if(await await LOCAL.checkUserFoldersExist()){
          navigation.navigate("Inside")
        }
      }
      userExist();
        }, [])
    );
  return (
    <View>
      <ImageBackground style={styles.openerMain} source={require('../../assets/img/openerBg.png')}>
      <Image style={styles.openerLogo} source={require("../../assets/img/logo_light.png")} />
      <View style={styles.openerContainer}>
        <View style={styles.openerText}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: TYPOGRAPHY.title.xxl,
              marginBottom: 20,
              color: COLORS.light.first,
            }}
          >
            Accedi alle cure che meriti con facilità e chiarezza.
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: TYPOGRAPHY.paragraph,
              color: COLORS.light.first,
            }}
          >
           Cura informata a portata di mano: accesso diretto a risorse e informazioni per migliorare la tua esperienza in clinica.
          </Text>
        </View>
        <ButtonComponent
          action={() => navigation.navigate("Login")}
          buttonStyle={BUTTON.buttonFullLight}
          textStyle={TEXT.main1}
          text="Entra"
        />
      </View>
      </ImageBackground>
    </View>
  );
};

export default Opener;

const styles = StyleSheet.create({
  openerMain: {
    height: '100%',
    position: "relative",
    resizeMode: 'cover',
  },
  openerLogo: {
    width: 60,
    height: 60,
    position: "absolute",
    top: 50,
    left: 20,
    resizeMode: "contain",
  },
  openerContainer: {
    position: "absolute",
    padding: 20,
    bottom: 0,
  },
  openerText: {
    marginBottom: 40,
  },
});
