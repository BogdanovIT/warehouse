import { Alert, Image, LayoutAnimation, Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import SwitchButton from "../../switch/switch";
import { CustomFonts, SystemColors } from "../../shared/tokens";
import { useState } from "react";
import { Input2 } from "../../shared/input/input copy";
import { launchCameraAsync, requestCameraPermissionsAsync, PermissionStatus, useCameraPermissions, useMediaLibraryPermissions } from "expo-image-picker";
import axios, { AxiosError } from "axios";
import { UploadResponse } from "../../shared/ImageUploader/imageUploader.interface";
import { FILE_API } from "../../shared/api";
import FormData from "form-data";
import { Button_2 } from "../../button/button_2";
import { Button } from "../../button/button";


interface ImageUploaderProps {
    onUpload: (uri:string) => void
    onError? : (error: string) => void
}

const DEFAULT_IMAGES = [
    require('../../assets/images/recieving/face.jpg'),
    require('../../assets/images/recieving/0.jpg'),
    require('../../assets/images/recieving/20.jpg'),
    require('../../assets/images/recieving/40.jpg'),
    require('../../assets/images/recieving/60.jpg'),
    require('../../assets/images/recieving/80.jpg'),
    require('../../assets/images/recieving/open.jpg'),
    require('../../assets/images/recieving/polnaya_opa.jpg'),
    require('../../assets/images/recieving/plomba.jpg'),
    require('../../assets/images/recieving/N.jpg'),
]

export default function Receiving ({onUpload}: ImageUploaderProps) {
    const [isContainer, setIsContaner] = useState(false)
    const [libraryPermission, requestLibraryPermission] = useMediaLibraryPermissions()
    const [imageUris, setImageUris] = useState<(string | null)[]>(Array(10).fill(null))
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
    const [showDefectiveProducts, setShowDefectiveProducts] = useState(false)
    const [defectiveImages, setDefectiveImages] = useState<string[]>([])
    const verifyCameraPermission = async () => {
        const cameraPermissionInfo = await requestCameraPermissionsAsync()
        if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
            const response = await requestPermission();
            return response.granted;
        }        
        if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Недостаточно прав',
                'Для работы с камерой необходимо предоставить разрешение',
                [
                    { text: 'Отмена', style: 'cancel' },
                    { text: 'Настройки', onPress: () => Linking.openSettings() }
                ]
            );
            return false;
        }        
        return true;
    }
    const pickAvatar = async (index: number) => {
        const isPermissionGranted = await verifyCameraPermission();
        if (!isPermissionGranted) return;
        try {
            const result = await launchCameraAsync({
                mediaTypes: ['images'],
                allowsEditing: false,
                //aspect: [16, 9],
                quality: 1,
            });            
            if (!result.canceled) {
                const newImageUris = [...imageUris]
                newImageUris[index] = result.assets[0].uri
                setImageUris(newImageUris)
                await uploadToServer(result.assets[0].uri, result.assets[0].fileName ?? '')
            }
        } catch (error) {
            console.error('Ошибка при вызове камеры:', error);
            Alert.alert('Ошибка', 'Не удалось открыть камеру');
        }
    }
    const pickDefectiveImages = async () => {
        const isPermissionGranted = await verifyCameraPermission()
        if (!isPermissionGranted) return
        try {
            const result = await launchCameraAsync({
                mediaTypes: ['images'],
                allowsEditing: false,
                quality: 1
            })
            if (!result.canceled) {
                const newDefectiveImages = [...defectiveImages, result.assets[0].uri]
                setDefectiveImages(newDefectiveImages)
                await uploadToServer(result.assets[0].uri, result.assets[0].fileName ?? '')
            }
        } catch (error) {
            console.error('Ошибка при вызове камеры:', error)
            Alert.alert('Ошибка', 'Не удалось открыть камеру')
        }
    }
    const uploadToServer = async (uri: string, name: string) => {
        const formData = new FormData()
        formData.append('files', {
            uri,
            name,
            type: 'image/jpeg'
        })
        try {const { data } = await axios.post<UploadResponse>(FILE_API.uploadImage, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        onUpload(data.urls.original)
    } catch(error) {
        if (error instanceof AxiosError) {
            console.error(error)
        }
        return null
        }
    
    }
    const clearAllImages = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setImageUris(Array(10).fill(null))
        setDefectiveImages([])
        Alert.alert("Все изображения удалены")
    }
    const toggleDefectiveProducts = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setShowDefectiveProducts(!showDefectiveProducts)
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View>
                <View style={{paddingTop: 10, flexDirection: 'row'}}>
                    <View style={{width: '40%', 
                        alignItems: 'center',
                        paddingLeft: 20,
                        justifyContent: 'center'}}>
                            <Text style={{...styles.text, color: SystemColors.VeryLightBlue}}>Ворота №</Text>
                    </View>
                    <View style={{width: '60%', 
                        alignItems: 'flex-start', 
                        justifyContent: 'center',
                        }}><Input2 />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop:10, paddingBottom: 15}}>
                <View style={{width: '45%', alignItems: 'center', paddingLeft: 8}}>
                    <Text style={{...styles.text, 
                        color: !isContainer? SystemColors.VeryLightBlue : SystemColors.VeryLightBlue,
                        opacity: isContainer? 0.15 : 1
                    }}>Контейнер</Text>
                </View>
                <View style={{width: '10%', alignItems: 'center'}}>
                    <SwitchButton 
                    value={isContainer}
                    onChange={(newValue) => setIsContaner(newValue)}/>
                </View>
                <View style={{width: '45%', alignItems: 'flex-start', paddingLeft: 30}}>
                    <Text style={{...styles.text, 
                        color: isContainer? SystemColors.VeryLightBlue : SystemColors.VeryLightBlue,
                        opacity: isContainer? 1 : 0.15
                    }}>Авто</Text>
                </View>
            </View>
            
            
            <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                {DEFAULT_IMAGES.slice(0,9).map((defaultImage, index)=>(
                <Pressable key={index} onPress={()=>pickAvatar(index)}>
                    <Image source={imageUris[index] ? {uri: imageUris[index]!} : defaultImage}
                    style={{ width: '90%', height: undefined, resizeMode:'cover', aspectRatio:16/9, borderRadius: 3}}/>
                </Pressable>
                ))}
                { !isContainer && (
                    <Pressable onPress={()=> pickAvatar(9)}>
                        <Image 
                        source={imageUris[9] ? {uri: imageUris[9]!} : DEFAULT_IMAGES[9]}
                        style={{ width: '90%', height: undefined, resizeMode:'cover', aspectRatio:16/9, borderRadius: 3}}
                        />
                    </Pressable>
                )}
            </View>
            <View style={styles.buttonContainer}>
            <Button style={styles.button} text="ОТПРАВИТЬ" onPress={clearAllImages}/>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontFamily: CustomFonts.regular  
    },
    container: {
        alignItems: 'center', 
        gap: 30
    },
    buttonContainer: {
        paddingVertical: 30, 
        alignItems: 'center',
        marginBottom: 40
    },
    button: {
        width: '90%'
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 60
    },
    toggleButtonContainer: {
        paddingVertical: 15,
        alignItems: 'center'
    },
    toggleButton: {
        width: '90%',
        backgroundColor: SystemColors.LightBlue,
        fontFamily: CustomFonts.medium
    },
    defectiveContainer: {
        marginTop: 0,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    defectiveTitle: {
        fontSize: 16,
        fontFamily: CustomFonts.regular,
        color: SystemColors.VeryLightBlue,
        marginBottom: 15,
        textAlign: 'center'
    },
    defectiveImagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15
    },
    defectiveImage: {
        width: 150,
        height: 100,
        borderRadius: 3,
        resizeMode: 'cover'
    },
    addDefectiveButton: {
        width: 150,
        height: 100,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: SystemColors.VeryLightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    addDefectiveButtonText: {
        color: SystemColors.VeryLightBlue,
        textAlign: 'center',
        fontFamily: CustomFonts.regular,
        fontSize: 14
    }
})