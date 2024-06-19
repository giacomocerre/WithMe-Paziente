import { View, Text, Alert, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../../../components/molecules/Header";
import { ButtonComponent, Icon } from "../../../../components/atoms";
import { LOCAL } from "../../../../../services/disk/dataService";
import { COLORS, FONTS, SHADOW, TYPOGRAPHY } from "../../../../../stylesheets/theme";
import SettingOption from "../../../../components/molecules/SettingOption";

const SettingsOption = ({ navigation, route }) => {
  const { token } = route.params;
  
  const confirmDelete = () => {
    Alert.alert(
      "Conferma eliminazione",
      "Sei sicuro di voler eliminare questo account?",
      [
        {
          text: "Annulla",
          style: "cancel"
        },
        {
          text: "Elimina",
          onPress: deleteAccount,
          style: "destructive"
        }
      ]
    );
  };

  const deleteAccount = async () => {
    await LOCAL.deleteLocalData(token);
    navigation.navigate(
      (await LOCAL.getAllUsers()).length > 0 ? "ChooseAccount" : "Opener"
    );
  };

  return (
    <View>
      <View style={{height:250, backgroundColor:COLORS.main.first, position:"relative",justifyContent:"center", padding:20}}>
        <View style={{position:"absolute", top:50, left: 20}}>
            <Icon icon="chevron-back-outline" color={COLORS.light.first} size={30} action={() => navigation.goBack()}/>
        </View>
        <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xxl, color:COLORS.light.first}}>Impostazioni</Text>
        <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.text.l, color:COLORS.light.first}}>Informazioni sull'account</Text>
      </View>
      <View style={[SHADOW.normal,  {marginHorizontal:20, backgroundColor:COLORS.light.first, position:"relative", bottom: 50, padding:20, borderRadius:20}]}>
        <View>
            <Text style={{paddingHorizontal:10, paddingVertical:20, fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.text.m, color:COLORS.light.third}}>Informazioni Account</Text>
            <SettingOption
                text="Profilo"
                textStyle={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.paragraph, marginLeft:10, marginTop:8, color:COLORS.main.first}}
                icon={{name:"person-circle-sharp", color:COLORS.main.first, size:30}}
                action={() => navigation.navigate("Tab_UserInfo")}
                goIcon={true}/>
            <SettingOption
                text="Cambia Profilo"
                contentStyle={{marginTop:20, marginBottom:30}}
                textStyle={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.paragraph, marginLeft:10, marginTop:8, color:COLORS.main.first}}
                icon={{name:"people-circle-sharp", color:COLORS.main.first, size:30}}
                action={() => navigation.navigate("ChooseAccount")}
                goIcon={true}/>
        </View>
        <View>
            <Text style={{paddingHorizontal:10, paddingVertical:20, fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.text.m, color:COLORS.light.third}}>Dati e Sicurezza</Text>
            <SettingOption
                text="Backup"
                textStyle={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.paragraph, marginLeft:10, marginTop:8, color:COLORS.main.first}}
                icon={{name:"cloud-download", color:COLORS.main.first, size:25}}
                action={() => navigation.navigate("Tab_Backup")}
                goIcon={true}/>
            <SettingOption
                text="Token"
                contentStyle={{marginTop:20}}
                textStyle={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.paragraph, marginLeft:10, marginTop:8, color:COLORS.main.first}}
                icon={{name:"barcode", color:COLORS.main.first, size:25}}
                action={() => console.log("Token")}
                goIcon={true}/>
            <SettingOption
                text="Documentazione"
                contentStyle={{marginTop:20}}
                textStyle={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.paragraph, marginLeft:10, marginTop:8, color:COLORS.main.first}}
                icon={{name:"book", color:COLORS.main.first, size:25}}
                action={() =>  navigation.navigate("Documentations", {doc:"all"})}
                goIcon={true}/>
            <SettingOption
                text="Privacy"
                contentStyle={{marginTop:20}}
                textStyle={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.paragraph, marginLeft:10, marginTop:8, color:COLORS.main.first}}
                icon={{name:"document-lock", color:COLORS.main.first, size:25}}
                action={() => console.log("Privacy")}
                goIcon={true}/>
        </View>
      </View>
      <SettingOption
        text="Elimina Account"
        textStyle={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.paragraph, marginLeft:10, marginTop:5, color:COLORS.light.first}}
        icon={{name:"trash-outline", color:COLORS.light.first, size:25}}
        action={confirmDelete}
        contentStyle={[SHADOW.normal,  {marginHorizontal:20, backgroundColor:COLORS.light.first, position:"relative", backgroundColor:COLORS.error,bottom:35, padding:20, borderRadius:10}]}/>
    </View>
  );
};

export default SettingsOption;
