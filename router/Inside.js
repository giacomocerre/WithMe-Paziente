import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./Tabs";
import { Text, View } from "react-native";
import React, { useState } from "react";
import { LOCAL } from "../services/disk/dataService";
import CodeRecovery from "../app/screen/inside/recovery/CodeRecovery";
import BackupRecovery from "../app/screen/inside/recovery/BackupRecovery";
import Recovery from "../app/screen/inside/recovery/Recovery";
import ChooseAccount from "../app/screen/inside/ChooseAccount";
import GenerateQR from "../app/screen/inside/GenerateQR";
import { useFocusEffect } from "@react-navigation/native";
import EditUser from "../app/screen/inside/EditUser";
import ActivitiesList from "../app/screen/ActivitiesList";

const InsiteStack = createNativeStackNavigator();

const InsideLayout = () => {
    const [users, setUsers] = useState([]);

    useFocusEffect(
      React.useCallback(() => {
        const getAllUsers = async () => {
          setUsers(await LOCAL.getAllUsers());
        };
        getAllUsers();
          }, [])
      );
  
    if (users.length <= 0) {
      return (
        <View
          style={{
            height: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Loading...</Text>
        </View>
      );
    }
  
    return (
      <InsiteStack.Navigator
        initialRouteName="ChooseAccount"
      >
        <InsiteStack.Screen
          name="ChooseAccount"
          component={ChooseAccount}
          options={{ headerShown: false }}
          key={Math.random()}
        />
        <InsiteStack.Screen
          name="GenerateQR"
          component={GenerateQR}
          options={{ headerShown: false }}
          key={Math.random()}
        />
        <InsiteStack.Screen
          name="EditUser"
          component={EditUser}
          options={{ headerShown: false }}
          initialParams={{ token: null }}
          key={Math.random()}
        />
        <InsiteStack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
          initialParams={{ token: null }}
          key={Math.random()}
        />
         <InsiteStack.Screen
          name="ActivitiesList"
          component={ActivitiesList}
          options={{ headerShown: false }}
          initialParams={{ token: null }}
          key={Math.random()}
        />
        
        
      </InsiteStack.Navigator>
    );
  };

export default InsideLayout