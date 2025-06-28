import { FlatList, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomFonts, SystemColors } from "../../shared/tokens";
import { Input } from "../../shared/input/input";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { Button } from "../../button/button";
import Hammer from "../../assets/icons/hammer";

export default function Defect () {
    const [place, setPlace] = useState('')
    const [inputValuePlace, setInputValuePlace] = useState("Разгрузка")
    const [prefix, setPrefix] = useState('')
    const [inputValuePrefix, setInputValuePrefix] = useState("NS-")
    return (
        <KeyboardAvoidingView behavior={'padding'}
        keyboardVerticalOffset={200}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            
            <Text style={styles.text}>Выберите место обнаружения дефекта</Text>
            <View style={{borderWidth: 1.5, borderRadius: 3, borderColor: SystemColors.VeryLightBlue, 
                width: 163}}>
            <Picker
            selectedValue={place}
            onValueChange={(itemValue) => setPlace(itemValue)}
            style={{...styles.picker, width:160}} dropdownIconColor={SystemColors.VeryLightBlue}>
                <Picker.Item style={{...styles.pickerItem, fontSize:16}} label="Разгрузка" value="Разгрузка" />
                <Picker.Item style={{...styles.pickerItem, fontSize:16}} label="Ячейка" value="Ячейка" />
            </Picker>
            </View>
            <Text style={styles.text}>Введите номер палета SSCC</Text>
            <Input style={styles.inputText}/>
            <Text style={styles.text}>Укажите номер документа прихода</Text>
            <Input style={styles.inputText}/>
            <Text style={styles.text}>Введите артикул товара (NS-, B-)</Text>
            
            <View style={{flexDirection: "row", justifyContent: "flex-start",
                alignItems: 'center', borderWidth: 1.5, borderRadius: 3,
                borderColor: SystemColors.VeryLightBlue, width: 163}}>
            <Picker selectedValue={prefix} onValueChange={(itemValue)=> setInputValuePrefix(itemValue)}
                style={{...styles.picker, width: 160}} dropdownIconColor={SystemColors.VeryLightBlue}>
                <Picker.Item style={styles.pickerItem} label="NS-" value={"NS-"}/>
                <Picker.Item style={styles.pickerItem} label="B-" value={"B-"}/>
            </Picker>
            <Text>    </Text>
            <Input style={{...styles.inputText, width: 160}}/>
            </View>
            <View>
                <Text></Text>
            </View>
            <View style={{...styles.inputText, height: 45}}>
                <Text style={{fontFamily: CustomFonts.regular, fontSize: 16,
                    color: SystemColors.VeryLightBlue, textAlign: 'auto', justifyContent: 'center',
                    textAlignVertical:'center'}}>Здесь будет видно наименование</Text>
            </View>

            <Text style={styles.text}>Введите серийный номер товара</Text>
            <Input style={styles.inputText}/>
        <Text style={styles.text}>Выберите сорт дефекта</Text>
        <View style={{borderWidth: 1.5, borderRadius: 3, borderColor: SystemColors.VeryLightBlue, 
                width: 163}}>
            <Picker style={{...styles.picker, width: 160, textAlign: 'center'}} dropdownIconColor={SystemColors.VeryLightBlue}>
                <Picker.Item style={styles.pickerItem} label="Сорт 1" value={'Сорт 1'}/>
                <Picker.Item style={styles.pickerItem} label="Сорт 2" value={'Сорт 2'}/>
                <Picker.Item style={styles.pickerItem} label="Сорт 3" value={'Сорт 3'}/>
                <Picker.Item style={styles.pickerItem} label="Сорт 4" value={'Сорт 4'}/>
                <Picker.Item style={styles.pickerItem} label="Сорт 5" value={'Сорт 5'}/>
                <Picker.Item style={styles.pickerItem} label="Сорт 6" value={'Сорт 6'}/>
            </Picker>
        </View>
            <Text style={styles.text}>Добавьте комментарий</Text>
            <Input multiline={true} numberOfLines={4} textAlignVertical="top" style={{...styles.inputText,}}/>
            <Button text="ПРОСМОТРЕТЬ" style={{paddingTop: 20}}/>
            <Button text="ОТПРАВИТЬ" style={{paddingTop: 20}}/>
            </ScrollView>
        </KeyboardAvoidingView>
        
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: CustomFonts.regular,
        fontSize: 18,
        color: SystemColors.VeryLightBlue,
        paddingTop: 20,
        paddingBottom:5
    },
    inputText: {
        backgroundColor: SystemColors.MutedBlue,
        borderWidth: 1.5,
        borderColor: SystemColors.VeryLightBlue,
        fontFamily: CustomFonts.regular,
        color: SystemColors.VeryLightBlue,
        borderRadius: 3,
        fontSize: 16
    },
    container: {
        width: "95%",
        //alignItems: 'stretch',
        paddingLeft: 25,
        
    },
    picker: {
        backgroundColor: SystemColors.MutedBlue,
        borderRadius: 3,
    },
    pickerItem: {
        fontFamily: CustomFonts.regular,
        color: SystemColors.VeryLightBlue,
        fontSize: 16,
        borderWidth: 2,
        borderColor: SystemColors.VeryLightBlue,
        textAlign: 'center',
        justifyContent: 'center'
    },
})