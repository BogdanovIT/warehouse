import { StyleSheet, Text, View } from "react-native";
import { SystemColors } from "../../../../shared/tokens";

export function CourseProgress ({totalLessons, passedLessons}: {totalLessons: number; passedLessons: number}) {
   const percent = Math.round((passedLessons/totalLessons)*100)
   return (<View style={styles.wrapper}>
        <View style={styles.head}>
            <Text style={styles.textPercent}>{percent}%</Text>
            <Text style={styles.textCount}>{passedLessons} / {totalLessons}</Text>
        </View>
        <View style={styles.bar}>
            <View 
                style={{
                    ...styles.progress, width:  `${percent}%`
                }}/>
        </View>
    </View>)
}


const styles = StyleSheet.create({
    progress: {
        height: 5,
        borderRadius: 20,
        backgroundColor: SystemColors.LightBlue
    },
    wrapper: {
        marginBottom: 18
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6
    },
    bar: {
        height: 5,
        borderRadius: 20,
        backgroundColor: SystemColors.VeryLightBlue,
    },
    textPercent: {
        fontSize: 16,
        fontFamily: 'FiraSans',
        color: SystemColors.VeryLightBlue
    },
    textCount: {
        fontSize: 12,
        color: SystemColors.VeryLightBlue
    },

})