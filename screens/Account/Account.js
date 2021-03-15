import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { isUserLogged } from "../../Utils/actions";
import UserGuest from './UserGuest';
import UserLogged from './UserLogged'
export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    const userLogged = isUserLogged();
    setLogin(userLogged);
  }, []);

  if (login == null) {
    return <Text>Cargando información...</Text>;
  }
  return login ? <UserLogged/> : <UserGuest/>
}
const styles = StyleSheet.create({});
