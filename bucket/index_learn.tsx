
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useAtomValue, useSetAtom } from "jotai";

import { useEffect } from "react";
import { courseAtom, loadCourseAtom } from "../entities/course/model/course.state";
import { StudentCourseDescription } from "../entities/course/model/course.model";
import { CourseCard } from "../entities/course/ui/CourseCard/CourseCard";
import { Colors } from "../shared/tokens";

export default function HomePage() {
    const {isLoading, courses} = useAtomValue(courseAtom)
    const loadCourses = useSetAtom(loadCourseAtom)

    useEffect(()=>{
        loadCourses()
    }, [])

    const renderCourse = ({item}: {item: StudentCourseDescription}) =>{
        
    return (
            <View style={styles.item}>
                <CourseCard {...item}/>
            </View>
            )}

        return (
        <>
        {isLoading && <ActivityIndicator size='large' color={Colors.blue}/>}
            {courses.length >0 && (
                <FlatList
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={loadCourses}/>
                }
                data = {courses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCourse}/>
            )}
        </>
    )}
const styles = StyleSheet.create({
    item: {
        padding: 15
    }
})