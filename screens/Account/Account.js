import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import {useFocusEffect} from '@react-navigation/native'
import { getCurrentUser } from "../../Utils/actions";
import UserGuest from './UserGuest';
import UserLogged from './UserLogged'
export default function Account() {
  const [login, setLogin] = useState(null);

  useFocusEffect (
    useCallback(() => {
        const user = getCurrentUser()
        user ? setLogin(true) : setLogin(false)
    }, [])
  );

  if (login == null) {
    return <Text>Cargando información...</Text>;
  }
  return login ? <UserLogged/> : <UserGuest/>
}
const styles = StyleSheet.create({});
