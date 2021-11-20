// import 'react-native-gesture-handler';

import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text, Dimensions } from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import MapScreen from "../screens/MapScreen";
import TestScreen from "../screens/TestScreen";

const fullScreenWidth = Dimensions.get("window").width;
const Stack = createNativeStackNavigator();

// change component !
function DashboardStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TestScreen" component={TestScreen} />
    </Stack.Navigator>
  );
}

function MapStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function TabBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size, padding }) => {
            let iconName;

            if (route.name === "Dashboard") {
              iconName = focused
                ? "view-dashboard-variant"
                : "view-dashboard-variant-outline";
            } else if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
            }
            return (
              <Icon
                name={iconName}
                size={size}
                color={color}
                style={{ paddingBottom: padding }}
              />
            );
          },
          tabBarActiveTintColor: "lightseagreen",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: { fontSize: 16 },
          style: { width: fullScreenWidth },
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardStackScreen} />
        <Tab.Screen name="Map" component={MapStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
