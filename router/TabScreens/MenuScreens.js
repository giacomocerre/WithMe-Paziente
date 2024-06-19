import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "../../app/screen/inside/tabNavigator/Menu.js";
import Backup from "../../app/screen/inside/tabNavigator/menuViews/Backup";
import SettingsOption from "../../app/screen/inside/tabNavigator/menuViews/Settings.js";
import UserInfo from "../../app/screen/inside/tabNavigator/menuViews/UserInfo.js";

const MenuStack = createNativeStackNavigator();

export const MenuStackScreen = ({route}) => {
  const {token} = route.params;
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Tab_Menu" component={Menu} options={{ headerShown: false }} initialParams={{token:token}} key={Math.random()}/>
      <MenuStack.Screen name="Tab_Backup" component={Backup} options={{ headerShown: false }} initialParams={{token:token}}/>
      <MenuStack.Screen name="Tab_Settings" component={SettingsOption} options={{ headerShown: false }} initialParams={{token:token}} key={Math.random()}/>
      <MenuStack.Screen name="Tab_UserInfo" component={UserInfo} options={{ headerShown: false }} initialParams={{token:token}} key={Math.random()}/>

    </MenuStack.Navigator>
  );
};