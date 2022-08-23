import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchDataStack from "./screens/SearchData/SearchDataStack";
import AddItemStack from "./screens/AddItem/AddItemStack";
import Inventory from "./screens/inventory/Inventory";
import More from "./screens/More/More";

const Home = ({ setLoggedIn }) => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "search" : "search";
            } else if (route.name === "Add item") {
              iconName = focused ? "add-circle" : "add-circle";
            } else if (route.name === "Inventory") {
              iconName = focused ? "server" : "server";
            } else if (route.name === "ChangePassWord") {
              iconName = focused ? "reload" : "reload";
            } else if (route.name === "More") {
              iconName = focused
                ? "ellipsis-horizontal"
                : "ellipsis-horizontal-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen
          options={{ headerShown: false }}
          name="Home"
          component={SearchDataStack}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Add item"
          component={AddItemStack}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Inventory"
          component={Inventory}
        />

        <Tab.Screen
          options={{ headerShown: false }}
          name="More"
          children={() => <More setLoggedIn={setLoggedIn} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

/*<Tab.Screen
  options={{ headerShown: false }}
  name="ChangePassWord"
  component={AddItemStack}
/>*/
export default Home;
