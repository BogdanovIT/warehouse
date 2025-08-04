import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { RestorePasswordAtom, RestorePasswordStateAtom } from "../entities/auth/model/auth.state";
import { Input } from "../shared/input/input";
import { Button } from "../button/button";
import { SystemColors } from "../shared/tokens";
import { CustomFonts } from "../shared/tokens";
import { ErrorNotification } from "../shared/ErrorNotifications/ErrorNotification";
import axios from "axios";

export default function RestorePassword() {
    const [email, setEmail] = useState<string>('')
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [step, setStep] = useState(1)
    const [localError, setLocalError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [state, restorePassword] = useAtom(RestorePasswordAtom)
    const [error, setError] = useState('')
    const sendCode = async () => {
        try {
            await axios.post('http://90.189.219.97:8081/api/auth/restore-password', {email})
            setStep(2)
        } catch {
            setError("Ошибка отправки кода")
        }
    }
    const resetPassword = async () => {
        try {
            await axios.post('http://90.189.219.97:8081/api/auth/reset-password', {
                email, 
                code,
                newPassword
            })
            alert("Пароль успешно изменен")
        } catch {
            setError("Неверный код или ошибка сервера")
        }
    }
    return (
     <View style={styles.container}>
        {step === 1 ? (
            <>
                <Input
                style={{width: '85%', alignSelf: 'center', borderWidth: 1.5, 
                    borderColor: SystemColors.VeryLightBlue, borderRadius: 3}}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize="none"
                
                />
                <Button style={{width: '85%', alignSelf: 'center', paddingTop: 20}} text="Отправить код"
                onPress={sendCode}
                />
            </>
        ) : (
            <>
            <Input
            placeholder="Код из письма"
            value={code}
            onChangeText={setCode}
            style={{width: '85%', alignSelf: 'center', borderWidth: 1.5, 
                borderColor: SystemColors.VeryLightBlue, borderRadius: 3}}/>
            <Input 
            style={{width: '85%', alignSelf: 'center', borderWidth: 1.5, 
                borderColor: SystemColors.VeryLightBlue, borderRadius: 3}}
            placeholder="Новый пароль"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}/>
            <Button style={{width: '85%', alignSelf: 'center', paddingTop: 20}} text="Сменить пароль"
            onPress={resetPassword}/>
            </>
        )}
        {error && <Text style={styles.successText}>{error}</Text>}
     </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: SystemColors.MutedBlue,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        maxWidth: 400,
    },
    successText: {
        color: SystemColors.VeryLightBlue,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        fontFamily: CustomFonts.medium
    }
})