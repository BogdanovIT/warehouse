import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import { CustomFonts, SystemColors } from "@/shared/tokens";
import { Input } from "@/shared/input/input";
import { InputRegister } from "@/shared/input/input_register";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button } from "@/button/button";
import { router } from "expo-router";

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        loginLv: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        operators: [''],
        place: ''
    })
    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({...prev, [field]: value}))
    }
    const validate = () => {
        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Ошибка, пароли не совпадают')
            return false
        }
        if (formData.email !== formData.confirmEmail) {
            Alert.alert('Ошибка, email не совпадает')
            return false
        }
        return true
    }
    const [place, setPlace] = useState('')
    const [operators, setOperators] = useState<string[]>([''])
    const addOperatorField = () => {
        setOperators([...operators, ''])
    }
    const removeOperatorField = (index: number) => {
        if (operators.length > 1) {
            const newOperators = [...operators]
            newOperators.splice(index, 1)
            setOperators(newOperators)
        }
    }
    const updateOperator =(index: number, value: string) => {
        const newOperators = [...formData.operators]
        newOperators[index] = value
        setFormData(prev => ({...prev, operators: newOperators}))
    }
    const handleSubmit = async () => {
        if (!validate()) return
        
        try {
            const response = await fetch('https://literally-fair-lark.cloudpub.ru/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    place: formData.place,
                    loginLv: formData.loginLv,
                    operators: formData.operators.filter(op => op.trim() !=='')
                })
            })
            const data = await response.json()
            if (response.ok) {
                Alert.alert("Пользователь успешно добавлен") 
                router.replace({
                    pathname: '/login',
                    params: {email: encodeURIComponent(formData.email)}
                })
            } else {
                Alert.alert("Ошибка", data.error || 'Ошибка регистрации')
            }
        } catch (error){
            const err = error as Error
            console.error('FULL ERROR:', err)
            Alert.alert(`Код: ${'code' in err ? err.code : 'unknown'} \n${err.message}`)
        }
    }
    return (
        <View style={styles.mainContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        keyboardVerticalOffset={Platform.select({ios:60, android:0})}
        style={styles.avoidingView}>
        <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false} 
            showsHorizontalScrollIndicator={false} 
            style={styles.scrollContainer}>
                <View style={styles.container}>
                <Text style={styles.header}>Регистрация пользователя </Text>
                </View>
                    <Text style={styles.textStyle}>Имя:</Text>
                    <Input style={styles.inputData} value={formData.firstName} onChangeText={(text) => handleChange('firstName', text)}/>
                    <Text style={styles.textStyle}>Фамилия:</Text>
                    <Input style={styles.inputData} value={formData.lastName} onChangeText={(text) => handleChange('lastName', text)}/>
                    <Text style={styles.textStyle}>Login LV:</Text>
                    <Input style={styles.inputData} value={formData.loginLv} onChangeText={(text) => handleChange('loginLv', text)}/>
                    <Text style={styles.textStyle}>Email:</Text>
                    <Input style={styles.inputData} value={formData.email}
                    autoCapitalize="none"
                    keyboardType="email-address" onChangeText={(text) => handleChange('email', text.toLowerCase())}/>
                    <Text style={styles.textStyle}>Подтвердите email:</Text>
                    <Input style={styles.inputData} value={formData.confirmEmail} 
                    autoCapitalize="none"
                    keyboardType="email-address" onChangeText={(text) => handleChange('confirmEmail', text.toLowerCase())}/>
                    <Text style={styles.textStyle}>Пароль:</Text>
                    <InputRegister isPassword style={{...styles.inputData}} value={formData.password} onChangeText={(text) => handleChange('password', text)}/>
                    <Text style={styles.textStyle}>Подтвердите пароль:</Text>
                    <InputRegister isPassword style={styles.inputData} value={formData.confirmPassword} onChangeText={(text) => handleChange('confirmPassword', text)}/>
                    <Text style={styles.textStyle}>Укажите свой РЦ:</Text>
                    <View style={{width: '85%', borderWidth: 1, borderColor: SystemColors.VeryLightBlue, borderRadius: 6,
                        marginBottom: 10, alignSelf: 'center', overflow: 'hidden'
                    }}>
                    <Picker
                        selectedValue={formData.place}
                        onValueChange={(itemValue) => handleChange('place',itemValue)}
                        style={{...styles.picker, width:'100%'}} dropdownIconColor={SystemColors.VeryLightBlue}>
                            <Picker.Item style={{...styles.pickerItem, fontSize:16}} label="ФРЦ БРИЗ Шереметьево" value="ФРЦ БРИЗ Шереметьево" />
                            <Picker.Item style={{...styles.pickerItem, fontSize:16}} label="МОС БРИЗ Медведково" value="МОС БРИЗ Медведково" />
                            <Picker.Item style={{...styles.pickerItem, fontSize:16}} label="МОС БРИЗ Саларьево" value="МОС БРИЗ Саларьево" />
                            <Picker.Item style={{...styles.pickerItem, fontSize:16}} label="МОС БРИЗ Рязанское" value="МОС БРИЗ Рязанское" />
                            <Picker.Item style={{...styles.pickerItem, fontSize:16}} label="ДРЦ БРИЗ Софьино" value="ДРЦ БРИЗ Софьино" />
                            <Picker.Item style={{...styles.pickerItem, fontSize:16}} label="РРЦ Бриз Екатеринбург LV" value="РРЦ Бриз Екатеринбург LV" />
                            <Picker.Item style={{...styles.pickerItem, fontSize:16}} label="РРЦ Бриз Новосибирск LV" value="РРЦ Бриз Новосибирск LV" />
                            <Picker.Item style={{...styles.pickerItem, fontSize:16}} label="РРЦ Бриз Ростов LV" value="РРЦ Бриз Ростов LV" />
                            <Picker.Item style={{...styles.pickerItem, fontSize:16}} label="РРЦ Бриз Самара LV" value="РРЦ Бриз Самара LV" />
                        </Picker>
                    </View>
                    <Text style={styles.textStyle}>Укажите email оператора(ов):</Text>
                    {operators.map((operator, index) => (
                        <View key={index} style={styles.operatorContainer}>
                            <View style={styles.operatorInputContainer}>
                            <InputRegister style={styles.operatorInput} value={formData.operators[index]}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={(text) => updateOperator(index, text.toLowerCase())}/>
                            </View>
                            {operators.length > 1 && (
                                <TouchableOpacity style={styles.removeButton}
                                onPress = {() => removeOperatorField(index)}>
                                    <Text style={styles.removeButtonText}>x</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                    <TouchableOpacity 
                    style={styles.addButton}
                    onPress={addOperatorField}>
                        <Text style={styles.addButtonText}>+ Добавить оператора</Text>
                    </TouchableOpacity>
                    
                    <Button text="ГОТОВО" onPress={handleSubmit} style={{paddingTop: 30, width: '75%', alignSelf: 'center', marginBottom: 30}}/>
        </ScrollView>
        </KeyboardAvoidingView>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: SystemColors.MutedBlue
    },
    scrollContent:{
        paddingBottom: 40
    },
    avoidingView: {
        flex: 1,
    },
    scrollContainer: {
        backgroundColor: SystemColors.MutedBlue,
    },
    container: {
        height: 60,
        backgroundColor: SystemColors.PrimaryBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    header: {
        fontFamily: CustomFonts.medium,
        fontSize: 18,
        color: SystemColors.VeryLightBlue,
        alignSelf: 'flex-start',
        paddingLeft: 30
    },
    textStyle: {
        color: SystemColors.VeryLightBlue,
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 5
    },
    inputData: {
        width: '85%',
        backgroundColor: SystemColors.MutedBlue,
        alignSelf: 'center',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: SystemColors.VeryLightBlue,
        color: SystemColors.VeryLightBlue
    },
    picker: {
        alignSelf: 'center',
        backgroundColor: SystemColors.MutedBlue, 
        borderWidth: 1,
        borderColor: SystemColors.VeryLightBlue       
    },
    pickerItem: {
        fontFamily: CustomFonts.regular,
        color: SystemColors.VeryLightBlue,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: SystemColors.VeryLightBlue,
        fontSize: 16
    },
    operatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    operatorInput: {
        width: '100%',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: SystemColors.VeryLightBlue,
        color: SystemColors.VeryLightBlue,
        padding: 10,
        height: 42
    },
    operatorInputContainer: {
        width: '85%',
        paddingVertical: 5,
    },
    removeButton: {
        marginLeft: 5,
        backgroundColor: SystemColors.MutedBlue,
        width: 42,
        height: 42,
        borderRadius: 6,
        borderColor: SystemColors.VeryLightBlue,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        color: SystemColors.VeryLightBlue,
        fontSize: 20,
        lineHeight: 24
    },
    addButton: {
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center'
    },
    addButtonText: {
        color: SystemColors.VeryLightBlue,
        textDecorationLine: 'underline'
    },
})