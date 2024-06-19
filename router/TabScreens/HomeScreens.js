import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../app/screen/inside/tabNavigator/Home";

const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = ({navigation, route}) => {
  const { token } = route.params;
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Tab_Home" component={Home} options={{ headerShown: false }} initialParams={{token:token}} key={Math.random()}/>
      </HomeStack.Navigator>
    );
};