import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { closeSession, getCurrentUser } from '../../Utils/actions';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import InfoUser from '../../components/account/InfoUser';
import AccountOptions from '../../components/account/AccountOptions';

export default function UserLogged() {
    useEffect(() => {
        setUser(getCurrentUser());
        setReloadUser(false);
    }, [reloadUser])
    const toastReference = useRef();
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [user, setUser] = useState(null)
    const navigation = useNavigation();
    const [reloadUser, setReloadUser] = useState(false);
    return (
        <View style={styles.container}>
            {user && (
                <View>
                    <InfoUser 
                        user={user} 
                        setLoading={setLoading} 
                        setLoadingText={setLoadingText}
                        />
                   <AccountOptions 
                   user={user}
                   toastRef={toastReference}
                   setReloadUser={setReloadUser}/>
                </View>
            )}
            <Button 
                titleStyle={styles.btnCloseSessionTitle}
                buttonStyle={styles.btnCloseSession} 
                title="Cerrar Sesión" 
                onPress={() => {closeSession()
                navigation.navigate("restaurants"); 
            }} />
            <Toast ref={toastReference} position="center" opacity={0.9} />
            <Loading text={loadingText} isVisible={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: "#F9F9F9"
    },
    btnCloseSession: {
         paddingVertical:10,
         marginTop:30, 
         borderRadius:5, 
         backgroundColor:"#fff", 
         borderTopWidth:1, 
         borderTopColor: "#442484", 
         borderBottomWidth: 1, 
         borderBottomColor:"#442484"},
    btnCloseSessionTitle: {
        color: "#442484", 
    }
})
