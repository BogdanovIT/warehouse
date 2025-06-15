import { useEffect, useState } from "react";
import {  Image,  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ImageUploader } from "../../shared/ImageUploader/ImageUploader";
import { useAtom } from "jotai";
import { updateProfileAtom } from "../../entities/user/model/user.state";
import { Button } from "../../button/button";
//import * as ImagePicker from 'expo-image-picker'

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
        <View>
        <View style={styles.container}>            
            {image ? (
                <Image style={styles.image} source={{uri: image}}/>
            ) : ( <Image source={require("../../assets/images/defaultAvatar.png")}/>)}
            <ImageUploader onUpload={setImage}/>            
        </View>
        <Button text="сохранить" onPress={submitProfile}/>
        </View>
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
        paddingVertical: 20
    }
})