import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { ActivitiesListView } from "../../../../components/molecules";
import { LOCAL } from "../../../../../services/disk/dataService";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "../../../../components/atoms";
import { COLORS, FONTS, SHADOW, TEXT, TYPOGRAPHY, UI } from "../../../../../stylesheets/theme";
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { CLOUD } from "../../../../../services/cloud/dataService";
import Tag from "../../../../components/atoms/Tag";

const UserInfo = ({ navigation, route }) => {
  const { token } = route.params;
  const [userData, setUserData] = useState(null);
  const [cloudUserData, setCLoudUserData] = useState(null);
  const [imageProfile, setImageProfile] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      console.log("here")
      const fetchData = async () => {
        setUserData(await LOCAL.readLocalData(token));
        setCLoudUserData(await CLOUD.getUserFromToken(token));
        setImageProfile(null);
        setImageProfile(await LOCAL.retrieveImageFromLocalFolder("profileImage", token));
      };
      fetchData();
    }, [])
  );

  const handleImageProfileUpload = async () => {
    const uploadedImagePath = await LOCAL.uploadFromGalleryToLocalFolder("profileImage", token);
    if (uploadedImagePath) {
      setImageProfile(null);
      setImageProfile(uploadedImagePath);
    }
  };

  return (
    <View style={{flex:1}}>
      <ScrollView>
      <View style={{height:250, width:"100%", backgroundColor:COLORS.main.first, flexDirection:"row"}}>
        <View style={{position:"absolute", top:60, left:20}}>
        <Icon icon="chevron-back" size={30} color={COLORS.light.first} action={() => navigation.goBack()}/>
        </View>
        <View style={{position:"absolute", top:60, right:20}}>
        <TouchableOpacity onPress={() => navigation.navigate("EditUser", {token:token})}>  
          <Feather name="edit" size={24} color={COLORS.light.first}/>
        </TouchableOpacity>
        </View>
      </View>

      {userData &&  (
        <View style={{position:"relative", bottom: 100}}>
          <View style={[UI.distances, SHADOW.normal, {backgroundColor:COLORS.light.first, borderRadius:10}]}>
            <View style={{backgroundColor:COLORS.main.first,  position:"absolute", top:10, right:10, alignSelf:"baseline", paddingHorizontal:10, paddingVertical:5, borderRadius:100}}>
              <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.m, textAlign:"right", color:COLORS.light.first}}>#{userData.token}</Text>
            </View>
            <View style={{position:"relative", bottom:70}}>
              <View style={{alignItems:"center"}}>
                <View style={{position:"relative"}}>
                <View style={[SHADOW.normal, {height:120, width:120, backgroundColor:COLORS.light.first, borderRadius:100}]}>
                  {imageProfile 
                    ? <Image source={{ uri: imageProfile }} style={{ flex: 1, borderRadius:100 }} resizeMode="cover" /> 
                    : <Icon icon="person-circle-sharp" size={120}/>}
                </View>
                <View style={[SHADOW.normal, {position:"absolute", bottom:0, right:0, padding:10, backgroundColor:COLORS.main.first, borderRadius:100}]}>
                  <TouchableOpacity onPress={handleImageProfileUpload}>
                    <MaterialCommunityIcons name="image-edit-outline" size={18} color={COLORS.light.first} />
                  </TouchableOpacity>
                  </View>
                </View>

                <View style={{marginTop:20}}>
                  <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.m, textAlign:"center"}}>{userData.name} {userData.surname}</Text>
                  <View style={{flexDirection:"row", paddingVertical:5}}>
                    <Text style={{fontFamily:FONTS.bold, color:COLORS.main.first, marginRight:10, textTransform:"uppercase"}}><FontAwesome6 name="barcode" size={10} color={COLORS.main.first} />{userData.cf}</Text>
                    <Text style={{fontFamily:FONTS.bold, color:COLORS.main.first}}><FontAwesome name="birthday-cake" size={10} color={COLORS.main.first} />{userData.birthdate}</Text>
                  </View>
                </View>
              </View>
              <View style={{marginHorizontal:20, position:"relative", top:20}}>
                <Text style={{fontFamily:FONTS.bold}}>Descrizione</Text>
                <View style={{padding:10, backgroundColor:"#fff", borderRadius:5, marginTop:5}}>
                  <Text style={{fontFamily:FONTS.regular, fontSize:TYPOGRAPHY.paragraph}}>{userData.info.description}</Text>
                </View>
              </View>
            </View>
          </View>
          {cloudUserData &&
          <View style={UI.distances}>
            <View>
            <View style={{flexDirection:"row"}}>
              {cloudUserData.interests.length > 0?
                cloudUserData.interests.map((int, index) =>
                  <Tag tag={int} key={index}/>
                )
              : <Text>Nessun Interesse</Text>}
            </View>
            </View>

            <View style={{marginTop:20}}>
            <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.m}}>Attività da fare</Text>
              <View style={{flexDirection:"row"}}>
                <ActivitiesListView
                  activitiesList={cloudUserData.games}
                  token={userData.token}
                  onStartGame={(game) => navigation.navigate('GameMain', { activity: game, token: userData.token })}
                  onOpenDoc={(doc) => navigation.navigate('Documentations', { doc })} />
              </View>
            </View>
          </View>
        }
        </View>
        
      )}
      </ScrollView>
    </View>
  );
};

export default UserInfo;
