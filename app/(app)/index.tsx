
import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { courseAtom, loadCourseAtom } from "../../entities/course/model/course.state";
import { useEffect } from "react";
import { CourseCard } from "../../entities/course/ui/CourseCard/CourseCard";
import { StudentCourseDescription } from "../../entities/course/model/course.model";
import { Colors, CustomFonts, SystemColors } from "../../shared/tokens";
import { useRouter } from "expo-router";
import CourseImages from "../../entities/course/ui/CourseCard/courseImages";
import TestImages from "../../entities/course/ui/CourseCard/TestImages";
import { authAtom } from "../../entities/auth/model/auth.state";


export default function HomePage() {
    const [auth, setAuth] = useAtom(authAtom)
    useEffect(() => {
        if (auth.error) {
            setAuth({
                ...auth,
                error: null
            })
        }
    }, [])
    const router = useRouter()
    return (
        <View>
            <View style={{paddingLeft:5}}>
                <Text style={styles.TitleStyle}>КУРСЫ</Text>
                <ScrollView horizontal
                showsHorizontalScrollIndicator={false} style={styles.scrollImage}>
                    {CourseImages.map((image) =>(
                        <Pressable key={image.id}
                        onPress={()=>router.push(image.screen)}>
                    <View style={{alignItems:'stretch', width: 150, marginRight: 20, }}>
                        <Image 
                        key={image.id}
                        source={image.uri}
                        style={styles.imagess}
                        resizeMode='cover'/>
                        {/* <View style={styles.textOverImage}> */}
                            <Text style={styles.annotation}>{image.title}</Text>
                        {/* </View> */}
                    </View>
                    </Pressable>
                    ))}
                </ScrollView>
            </View>
            <View style={{paddingLeft:5}}>
                <Text style={styles.TitleStyle}>ТЕСТЫ</Text>
                <ScrollView horizontal
                showsHorizontalScrollIndicator={false} style={styles.scrollImage}>
                    {TestImages.map((image) =>(
                        <Pressable key={image.id}
                        onPress={()=>router.push(image.screen)}>
                    <View style={{alignItems:'stretch', width: 150, marginRight: 20, }}>
                        <Image 
                        key={image.id}
                        source={image.uri}
                        style={styles.imagess}
                        resizeMode='cover'/>
                            <Text style={styles.annotation}>{image.title}</Text>
                    </View>
                    </Pressable>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    scrollImage: {
        paddingTop: 0,
        paddingHorizontal:20,   
    },
    textOverImage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(33,150,243,0.8)",
        borderBottomRightRadius: 15,
        borderBottomLeftRadius:15,
        //paddingVertical: 10,
        width:150,
        height:30,
        textAlignVertical: 'center'        
    },
    imagess: {
        width: 150,
        height: 150,
        marginRight: 20,
        borderRadius: 15,
    },
    TitleStyle: {
        fontFamily: CustomFonts.bold,
        fontSize: 18,
        color: SystemColors.VeryLightBlue,
        paddingVertical: 0,
        paddingTop: 25,
        paddingBottom: 15,
        paddingLeft: 20,
        textAlign: 'left'

    },
    annotation: {
        fontFamily: CustomFonts.medium,
        fontSize: 14,
        color: SystemColors.VeryLightBlue,
        textAlign: 'left',
        paddingTop: 5,
        paddingLeft:5,
    }

})