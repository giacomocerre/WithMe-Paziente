import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LOCAL } from '../../../services/disk/dataService'
import { COLORS, FONTS, MAIN_STYLE, TEXT, TYPOGRAPHY, UI } from '../../../stylesheets/theme'
import UserCard from '../../components/molecules/UserCard'
import Header from '../../components/molecules/Header'
import { ButtonComponent } from '../../components/atoms'
import { useFocusEffect } from '@react-navigation/native'

const ChooseAccount = ({navigation}) => {
    const [users, setUsers] = useState([])
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                setUsers([])
                const users = await LOCAL.getAllUsers();
                const usersWithImages = await Promise.all(
                    users.map(async (user) => {
                        const imageProfile = await LOCAL.retrieveImageFromLocalFolder("profileImage", user.token);
                        return { ...user, imageProfile };
                    })
                );
                setUsers(usersWithImages);
            }
            fetchData();
        }, [])
    );

  return (
    <View>
        <Header/>
        <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="never">
            <View style={UI.distances}>
                <View>
                    <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl, marginTop:20}}>Ciao, ci rivediamo! 😄</Text>
                    <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.paragraph, marginBottom:20}}>Come stai? Abbiamo trovato <Text style={MAIN_STYLE.textHighlight}>{users.length} account</Text> collegati a questo dispositivo. Prima di continuare <Text style={MAIN_STYLE.textHighlight}>selezionane uno</Text></Text>
                </View>
                <View style={{marginTop:20}}>
                {
                    users.map((user, index) => 
                    <View style={{width:"100%"}} key={index}>
                        <UserCard patient={user} action={() => navigation.navigate("TabNavigator", { token: user.token })}/>
                    </View>
                )
                }
                </View>
            </View>
            <TouchableOpacity>
                <View style={{flexDirection:"row", alignItems:"baseline", justifyContent:"center",width:"100%"}}>
                    <View style={{borderBottomWidth:1, borderBottomColor:COLORS.main.first}}>
                        <ButtonComponent text="Oppure Aggiungi un Account" textStyle={TEXT.main1} icon={{name:"add", size:20, color:COLORS.main.first}} action={() => navigation.navigate("Login")}/>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    </View>
  )
}

export default ChooseAccount