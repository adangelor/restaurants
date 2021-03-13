import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import accountStack from "./accountStack";
import restaurantsStack from "./restaurantsStack";
import favoritesStack from "./favoritesStack";
import topRestaurantsStack from "./topRestaurantsStack";
import searchStack from "./searchStack";

const Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="restaurants"
          component={restaurantsStack}
          options={{ title: "Restaurantes" }}
        />
        <Tab.Screen
          name="favorites"
          component={favoritesStack}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="topRestaurants"
          component={topRestaurantsStack}
          options={{ title: "Top 5" }}
        />
        <Tab.Screen
          name="search"
          component={searchStack}
          options={{ title: "Buscar" }}
        />
        <Tab.Screen
          name="account"
          component={accountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
