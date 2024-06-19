import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, TYPOGRAPHY, UI } from "../../../../stylesheets/theme";
import { LOCAL } from "../../../../services/disk/dataService";
import { Icon } from "../../../components/atoms";
import InfoBox from "../../../components/molecules/InfoBox";
import { useFocusEffect } from "@react-navigation/native";

const Menu = ({navigation, route}) => {
  const {token} = route.params;
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageProfile, setImageProfile] = useState(null);

  

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          setImageProfile(null);
          setImageProfile(await LOCAL.retrieveImageFromLocalFolder("profileImage", token));
          const localData = await LOCAL.readLocalData(token);
          if (localData) {
            setUserData(localData);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        }
      };
  
      fetchUserData();
        }, [])
    );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps='never'>
      <View style={{ marginTop: 60, marginBottom: 30, marginHorizontal: 20, flexDirection:"row", justifyContent:"space-between" }}>
        <Text style={{ fontFamily: FONTS.black, fontSize: TYPOGRAPHY.title.xxl }}>Menu</Text>
        <Icon icon="settings-outline" size={25} action={() => navigation.navigate("Tab_Settings")} color={COLORS.main.first}/>
      </View>
      {userData && (
        <View style={UI.distances}>
          <View style={{marginBottom:20}}>
            <Icon icon="swap-horizontal-outline" text="Cambia Utente" size={25} action={() => navigation.navigate("ChooseAccount")} color={COLORS.main.first}/>
          </View>
          <TouchableOpacity style={styles.userBox} onPress={() => navigation.navigate("Tab_UserInfo")}>
            {imageProfile
              ? <Image source={{ uri: imageProfile }} style={{ width:50, height:50, borderRadius:100 }} resizeMode="cover" />
              : <Icon icon="person-circle" size={50} />}
            <Text style={{ marginTop: 20, marginLeft: 10, fontFamily: FONTS.bold }}>{userData.email || userData.name + " " + userData.surname}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={UI.distances}>
        <Text>Alcune impostazioni utili</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop:20}}>
          <InfoBox text="Backup" style={styles.settingBox} textStyle={styles.settingText} icon={{icon:"cloud-download-outline", size:30, color:COLORS.main.first}} action={() => navigation.navigate("Tab_Backup")}/>
          <InfoBox text="Docs." action={() => navigation.navigate("Documentations", {doc:"all"})}style={styles.settingBox} textStyle={styles.settingText} icon={{icon:"book-outline", size:30, color:COLORS.main.first}}/>
          <InfoBox text="Privacy" style={styles.settingBox} textStyle={styles.settingText} icon={{icon:"document-lock-outline", size:30, color:COLORS.main.first}}/>
        </View>
      </View>
    </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingBox: {
    backgroundColor: COLORS.light.first,
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    padding: 20,
    borderRadius: 10,
    width: "48%",
    marginTop: 10
  },
  settingText: {
    fontFamily: FONTS.bold,
    fontSize: TYPOGRAPHY.text.xl,
    marginTop: 5,
  }, 
  userBox: {
    backgroundColor: COLORS.light.first,
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    padding: 20,
    flexDirection: "row",
    borderRadius: 10
  }
});
