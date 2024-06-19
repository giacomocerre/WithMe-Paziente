import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { GoBackTop } from "../../components/molecules";
import { BUTTON, FONTS, TEXT, TYPOGRAPHY, UI } from "../../../stylesheets/theme";
import { useFocusEffect } from "@react-navigation/native";
import { LOCAL } from "../../../services/disk/dataService";
import { ButtonComponent } from "../../components/atoms";
import TextEditInput from "../../components/molecules/TextEditInput";
import DatePicker from "../../components/molecules/DatePIcker";

const EditUser = ({ navigation, route }) => {
  const { token } = route.params;
  const [userData, setUserData] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const readDataFromDisk = async () => {
        setUserData(await LOCAL.readLocalData(token));
      };
      readDataFromDisk();
    }, [])
  );

  const updateUserData = () => {
    LOCAL.writeLocalData(token, userData);
    navigation.navigate("ChooseAccount");
  };
  return (
    <View style={{flex:1}}>
      <GoBackTop action={() => navigation.goBack()} />
      <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps='never'>
      {userData &&
      <View style={UI.distances}>
        <View style={{marginBottom:30, marginTop:20}}>
          <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl}}>Modifica</Text>
          <Text>Da qui puoi modificare i tuoi dati personali.</Text>
          </View>

        <View>
          <TextEditInput label="Nome" value={userData.name} icon="person-circle-sharp" onChange={(text) => setUserData({ ...userData, name: text }) }/>
          <TextEditInput label="Cognome" value={userData.surname} icon="person-circle-sharp" onChange={(text) => setUserData({ ...userData, surname: text }) }/>
          <TextEditInput label="Descrizione" value={userData.info.description} icon="document-text-outline"onChange={(text) =>  setUserData({...userData,info: { ...userData.info, description: text } }) }/>
          <TextEditInput label="Codice Fiscale" value={userData.cf} icon="barcode" onChange={(text) => setUserData({ ...userData, cf: text }) }/>
          <View style={{marginBottom:50}}>
          <DatePicker label="Data di Nascita" placeholder={userData.birthdate} onDateSelect={(date) => setUserData({ ...userData, birthdate: date ? date.toISOString().split('T')[0]: null})}/>
          </View>
          <ButtonComponent
            text="Aggiorna Dati"
            action={updateUserData}
            buttonStyle={BUTTON.buttonOutlineMain}
            textStyle={TEXT.main1}
          />
        </View>
      </View> }
      </ScrollView>
    </View>
  );
};

export default EditUser;
