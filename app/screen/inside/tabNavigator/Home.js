import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform, ImageBackground } from "react-native";
import React, { useCallback, useState } from "react";
import { LOCAL } from "../../../../services/disk/dataService";
import { CLOUD } from "../../../../services/cloud/dataService";
import { BUTTON, COLORS, FONTS, INFOBOX, TEXT, TYPOGRAPHY, UI } from "../../../../stylesheets/theme";
import { ButtonComponent, Icon } from "../../../components/atoms";
import { useFocusEffect } from "@react-navigation/native";
import { InfoBox } from "../../../components/molecules";


const Home = ({navigation, route}) => {
  const {token} = route.params;
  const [userData, setUserData] = useState(null);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const newData = await LOCAL.readLocalData(token);
        setUserData(newData);
      };
      fetchData();
    }, [])
  );


    return (
      <ScrollView contentContainerStyle={{flex: 1}}>
            <ImageBackground
              style={{height:350,}}
              resizeMode="contain"
              source={require("../../../../assets/img/doctors.jpg")}
            >
              <View style={{ height: "100%", width: "100%",borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor: 'rgba(227, 132, 0, 0.6)' }}>
                <View style={{ position:"relative", top:100}}>
                <Text style={{ padding: 20, zIndex: 10, position:"relative", top:30, color:COLORS.light.first, fontFamily:FONTS.bold, fontSize: TYPOGRAPHY.title.s }}>
                <Text style={{fontSize:TYPOGRAPHY.title.xxl,}}>Ciao! {userData ? userData.name : null}</Text>
                {"\n"}Gestisci al meglio le cure dei tuoi pazienti.</Text>
                <View style={{width:"50%", marginLeft:20, marginTop:20}}>
                <ButtonComponent text="Esplora le Novità" buttonStyle={BUTTON.buttonFullLight} textStyle={[TEXT.blue1, {fontFamily:FONTS.bold}]}/>
                </View>
                </View>
            </View>
          </ImageBackground>
          <View style={UI.distances}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop:0}}>
                <InfoBox 
                  text="Docs"
                  action={() => navigation.navigate("Documentations", {doc:"all"})}
                  style={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxSmall]}
                  textStyle={INFOBOX.InfoBoxTextDark} icon={{icon:"book", size:30, color:COLORS.main.first}}/>
                <InfoBox
                  text="Appuntamenti"
                  action={() => console.log("Appuntamenti")}
                  style={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxSmall]}
                  textStyle={INFOBOX.InfoBoxTextDark} icon={{icon:"calendar-outline", size:30, color:COLORS.main.first}}/>
                <InfoBox
                  text="Attività Assegante"
                  action={() => navigation.navigate("ActivitiesList", {token:token})}
                  style={[INFOBOX.InfoBox, INFOBOX.InfoBoxFull, INFOBOX.InfoBoxBig]}
                  textStyle={INFOBOX.InfoBoxTextLight} icon={{icon:"albums-outline", size:30, color:COLORS.light.first}}/>
              </View>
            </View>
          <View style={{position: "relative", flex: 1}}>
            {/* Pressable Button */}
            <View style={styles.container}>
                <TouchableOpacity
                  activeOpacity={.8} //The opacity of the button when it is pressed
                  style = {styles.button}
                  onPress = {() => navigation.navigate("GenerateQR", {token:token})}
                >
                  <View style={styles.text}>
                    <Icon icon="qr-code" size={30} color={COLORS.light.first}/>
                    </View>
                </TouchableOpacity>
              </View>
            </View>
        {/* </View> */}
      </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 0,
    
  },
  button: {
    backgroundColor: COLORS.main.first,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: (70 / 2),
    width: 70,
    height: 70,
    shadowColor: "#212121",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },

  text: {
    textAlign: 'center',
    color: COLORS.light.first,
    fontSize: TYPOGRAPHY.title.xxl,
    fontFamily: FONTS.medium,
    position:"relative",
    top: Platform.OS === 'ios' ? 0 : 0,
    left: 20
  }
});
