import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { reauthenticate, updateEmail } from '../../Utils/actions'
import { validateEmail } from '../../Utils/helpers'

export default function ChangeEmailForm({ email, setShowModal, toastRef, setReloadUser }) {
    const [newEmail, setNewEmail] = useState(email);
    const [password, setPassword] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        console.log('Inicio');
        const resultReauthenticate = await reauthenticate(password);
        console.log('Autenticado')
        if(!resultReauthenticate.statusResponse){
            setErrorPassword("Contraseña incorrecta");
            setLoading(false);
            return;
        }
        console.log('IniciandoUpdateImail');
        const resultUpdateEmail = await updateEmail(email);
        console.log("Finalizó update imail")
        setLoading(false);
        console.log("Se seteologó false")
        console.log("Resultado de la operaci+ónga",resultUpdateEmail.statusResponse);
        if(!resultUpdateEmail.statusResponse){
            setErrorEmail("Error al intentar actualizar el email. Reintente con otro email o más tarde");
            return;
        }
        console.log("IniciarSetReloadUser");
        setReloadUser(true);
        console.log("FinalizarSetreloadUSer")
        toastRef.current.show("Se han actualizado el email.", 3000);
        setShowModal(false);
    }

    const validateForm = () => {
        setErrorEmail(null);
        setErrorPassword(null);
        var isValid = true;
        
        if(!validateEmail(newEmail)){
            setErrorEmail("Debes ingresar un email eválido");
            isValid = false;
        }

        if(email === newEmail) {
            setErrorEmail("Debes ingresar un email diferente al actual.");
            isValid = false;
        }

        if(isEmpty(password)){
            setErrorPassword("Debes ingresar la contraseña para cambiar el email.")
            isValid=false;
        }

        return isValid;
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa el nuevo email..."
                containerStyle={styles.input}
                defaultValue={email}
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                keyboardType="email-address"
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
            />
            <Input
                placeholder="Ingresa tu contraseña..."
                containerStyle={styles.input}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                    type="material-community"
                    name={ showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={{ color:"#C2C2C2" }}
                    onPress={() => setShowPassword(!showPassword)}
                />
                }
            />
            <Button
                title="Cambiar Email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#442484"
    }
});