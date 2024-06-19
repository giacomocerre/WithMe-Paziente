import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../app/components/atoms/Icon";
import { COLORS } from "../stylesheets/theme";
import { HomeStackScreen } from "./TabScreens/HomeScreens";
import { MenuStackScreen } from "./TabScreens";
import UserInfo from "../app/screen/inside/tabNavigator/menuViews/UserInfo";

const Tab = createBottomTabNavigator();


const TabNavigator = ({route}) => {
  const { token } = route.params;

  const getIcon = (route, focused, color, size) => {
    let Iconsize = size;
    let iconName;
    switch (route.name) {
      case 'Home':
        iconName =  focused ? "home-sharp" : "home-outline";
        iconSize = size;
        break;
      case 'Profile':
          iconName = focused ? "person-circle-sharp" : "person-circle-outline";
          iconSize = size;
          break;
      case 'Menu':
        iconName = focused ? "menu" : "menu";
        iconSize = size;
        break;
      
      default:
        break;
    }

      return <Icon icon={iconName} size={Iconsize} color={color} />;
  }

  return (
<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      return getIcon(route, focused, color, size);
    },
    tabBarActiveTintColor: COLORS.main.first,
    tabBarInactiveTintColor: COLORS.dark.first,
  })}
>
  <Tab.Screen
    name="Home"
    component={HomeStackScreen}
    options={{  tabBarLabel: '', headerShown: false }}
    initialParams={{ token: token }}
    key={Math.random()}  />
   <Tab.Screen
    name="Profile"
    component={UserInfo}
    options={{  tabBarLabel: '', headerShown: false }}
    initialParams={{ token: token }}
    key={Math.random()}
  />
  <Tab.Screen
    name="Menu"
    component={MenuStackScreen}
    options={{  tabBarLabel: '', headerShown: false }}
    initialParams={{ token: token }}
    key={Math.random()}
  />
</Tab.Navigator>
  );
};

export default TabNavigator;
