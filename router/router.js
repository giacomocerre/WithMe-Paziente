import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Opener from "../app/screen/Opener";
import Registration from "../app/screen/Registration";
import Login from "../app/screen/Login";
import InsideLayout from "./Inside";
import { LOCAL } from "../services/disk/dataService";
import BackupRecovery from "../app/screen/inside/recovery/BackupRecovery";
import CodeRecovery from "../app/screen/inside/recovery/CodeRecovery";
import Recovery from "../app/screen/inside/recovery/Recovery";
import GameMain from "../app/screen/GameMain";
import Documentations from "../app/screen/inside/Documentations";
import ActivitiesList from "../app/screen/ActivitiesList";

const Stack = createNativeStackNavigator();

const Router = (loaderRootView) => {
  useEffect(() => {
    const initializeApp = async () => {
      // LOCAL.deleteAllLocalData();
    };
    initializeApp();
  }, []);

  return (
    <NavigationContainer onLayout={loaderRootView}>
      <Stack.Navigator initialRouteName="Opener">
        <Stack.Screen
          name="Inside"
          component={InsideLayout}
          options={{ headerShown: false }}
          key={Math.random()}
        />
        <Stack.Screen
          name="Opener"
          component={Opener}
          options={{ headerShown: false }}
          key={Math.random()}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
          key={Math.random()}
        />
        <Stack.Screen
          name="Recovery"
          component={Recovery}
          options={{ headerShown: false }}
          key={Math.random()}
        />
        <Stack.Screen
          name="BackupRecovery"
          component={BackupRecovery}
          options={{ headerShown: false }}
          key={Math.random()}
        />
        <Stack.Screen
          name="CodeRecovery"
          component={CodeRecovery}
          options={{ headerShown: false }}
          key={Math.random()}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
          key={Math.random()}
        />
        <Stack.Screen
          name="GameMain"
          component={GameMain}
          options={({ route }) => ({
            headerShown: false,
            activity: route.params.activity,
            token: route.params.token,
            key: Math.random(),
          })}
        />
        <Stack.Screen
          name="Documentations"
          component={Documentations}
          options={({ route }) => ({
            headerShown: false,
            doc: route.params.doc,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
