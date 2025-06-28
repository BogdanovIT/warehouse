import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { StudentCourseDescription } from "../../model/course.model";
import { Chip } from "../../../../shared/Chip/Chip";
import { Button } from "../../../../button/button";
import { Colors } from "../../../../shared/tokens";
import { CourseProgress } from "../CourseProgress/CourseProgress";

export function CourseCard ({image, shortTitle,courseOnDirection, alias, tariffs}: StudentCourseDescription) {
    return <View style={styles.card}>
        <Image source={{
            uri: image
        }} style={styles.image}
        height={200}/>
        <View style={styles.header}>
            <CourseProgress totalLessons={120} passedLessons={40}/>
            <Text style={styles.title}>{shortTitle}</Text>
                <View style={styles.chips}>
                    {courseOnDirection.length >0 && courseOnDirection.map((c)=><Chip key={c.direction.name} text={c.direction.name}/>)}
                </View>
                </View>
                <View style={styles.footer}>
                    <Button text="КУПИТЬ" onPress={()=> Linking.openURL(`https://purpleschool.ru/course/${alias}`)}/>
                </View>
        
    </View>
}


const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        borderRadius: 3,
        backgroundColor: Colors.blue,
    },
    image: {
        borderRadius: 3,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    title: {
        fontSize: 21,
        color: Colors.veryDarkBlue,
        fontFamily: "FiraSansSemiBold",
        marginBottom: 12
    },
    chips: {
        flexDirection: 'row',
        gap: 10,
        paddingBottom: 10
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 18
    },
    footer: {
        backgroundColor: Colors.darkBlue,
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }
})