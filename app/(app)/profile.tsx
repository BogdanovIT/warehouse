import { useEffect, useState } from "react";
import {  Image,  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ImageUploader } from "../../shared/ImageUploader/ImageUploader";
import { useAtom } from "jotai";
import { updateProfileAtom } from "../../entities/user/model/user.state";
import { Button } from "../../button/button";
import { CustomFonts, SystemColors } from "../../shared/tokens";
import Pencil from "../../assets/icons/pencil";


export default function MyProfile() {
    const [image, setImage] = useState<string|null>(null);  
    const [profile, updateProfile] = useAtom(updateProfileAtom)  
    const submitProfile = () => {
        if (!image) {
            return
        }
        updateProfile({photo: image})
    }
    useEffect(()=>{
        if (profile && profile.profile?.photo) {
            setImage(profile.profile?.photo)
        }
    }, [profile])
    return (
        <>
        <View style = {{backgroundColor: SystemColors.PrimaryBlue}}>
        <View style ={styles.container}>
                        
            {image ? (
                <Image style={styles.image} source={{uri: image}}/>
            ) : ( <Image style={{width: 70, height: 70, borderRadius: 35}} source={require("../../assets/images/defaultAvatar.png")}/>)}
            {/* <ImageUploader onUpload={setImage}/>  */}
            <Pencil/>
        </View>
        
        </View>
        <View>
        <Text style={styles.textProfile}>Имя: Андрей</Text>
        <Text style={styles.textProfile}>Фамилия: Богданов</Text>
        <Text style={styles.textProfile}>Должность: Кладовщик</Text>
        <Text style={styles.textProfile}>Город: Новосибирск</Text>
        <Text style={styles.textProfile}>Подразделение: РРЦ</Text>
        <Text style={styles.textProfile}>email: abogdanov@breez.ru</Text>
        <Text style={styles.textProfile}>email: nkosorukova@breez.ru</Text>
        
        <Text style={styles.textProfile}>Изменить аватар</Text>
        </View>
        <View style={{paddingTop: 150}}>
        <Button style={{backgroundColor: SystemColors.LightBlue, borderRadius: 3, width: "90%", alignSelf: 'center'}} text="сохранить" onPress={submitProfile}/>
        </View>
        </>
        
    );
}
const styles = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    container: {
        flexDirection: "row",
        gap: 20,
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        paddingVertical: 20,        
    },
    textProfile: {
        fontFamily: CustomFonts.medium,
        fontSize: 20,
        paddingLeft: 30,
        paddingVertical: 10,
        color: SystemColors.VeryLightBlue
    },
})