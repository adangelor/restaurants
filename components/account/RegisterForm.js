import React from 'react'
import { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { validateEmail } from '../../Utils/helpers';
import { registerUser } from '../../Utils/actions';
import { size } from 'lodash';
import Loading from '../Loading';

export default function RegisterForm() {
    const [formData, setFormData] = useState(defaultFormValues());
    const [loading, setLoading] = useState(false);
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirm, setErrorConfirm] = useState("");
    
    const navigation = useNavigation();

    const validateData = () => {
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true
    
        if(!validateEmail(formData.email)) {
            setErrorEmail("Debes de ingresar un email válido.")
            isValid = false
        }
    
        if(size(formData.password) < 6) {
            setErrorPassword("Debes ingresar una contraseña de al menos seis carácteres.")
            isValid = false
        }
    
        if(size(formData.confirm) < 6) {
            setErrorConfirm("Debes ingresar una confirmación de contraseña de al menos seis carácteres.")
            isValid = false
        }
    
        if(formData.password !== formData.confirm) {
            setErrorPassword("La contraseña y la confirmación no son iguales.");
            setErrorConfirm("La contraseña y la confirmación no son iguales.");
            isValid = false
        };
        return isValid;
    }

    const doRegisterUser = async () =>{
        if(!validateData()){
            return;
        }
        setLoading(true);
        const result = await registerUser(formData.email, formData.password);
        setLoading(false);
        if(!result.statusResponse){
            setErrorEmail(result.error);
            return;
        } 
        navigation.navigate("account");
    };
        
    
    const onChange= (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text });
    };
            
    return (
        <View style={styles.form}>
            <Input 
                containerStyle={styles.input} 
                placeholder="Ingresa tu email..." 
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input 
                password={true} 
                secureTextEntry={true} 
                containerStyle={styles.input} 
                placeholder="Ingresa tu contraseña..."
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formData.password} 
            />
            <Input 
                password={true} 
                secureTextEntry={true} 
                containerStyle={styles.input} 
                placeholder="Confirma tu contraseña..."
                onChange={(e) => onChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
            />
            <Button 
                title="Registrar nuevo usuario"
                buttonStyle={styles.btn}
                containerStyle={styles.btnContainer}
                onPress={() => doRegisterUser()}/>
            <Loading isVisible={loading} text="Creando cuenta de usuario, aguarde..."/>
        </View>
    )
};

const defaultFormValues = () => {
    return { email: "", password: "", confirm: "" }
};


const styles = StyleSheet.create({
    form: {
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    btnContainer: {
        width: "95%",
        marginTop: 20,
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#442484"
    }
});
