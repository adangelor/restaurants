import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import restaurantsStack from './restaurantsStack'
import favoritesStack from './favoritesStack'
import topRestaurantsStack from './topRestaurantsStack'
import accountStack from './accountStack'
import searchStack from './searchStack'


const Tab = createBottomTabNavigator()

export default function Navigation() {
    const screenOptions = (route, color) => {
        let iconName
        switch (route.name) {
            case "restaurants":
                iconName = "compass-outline"
                break;
            case "favorites":
                iconName = "heart-outline"
                break;
            case "top-restaurants":
                iconName = "star-outline"
                break;
            case "search":
                iconName = "magnify"
                break;
            case "account":
                iconName = "home-outline"
                break;
        }

        return (
            <Icon
                type="material-community"
                name={iconName}
                size={22}
                color={color}
            />
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="restaurants"
                tabBarOptions={{
                    inactiveTintColor: "#E0C1FF",
                    activeTintColor: "#442484" 
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                })}
            >
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
                    name="top-restaurants"
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
    )
}