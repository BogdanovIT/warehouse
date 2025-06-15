import { Link, Stack } from "expo-router"
import { Text, View } from "react-native"

export default function Restore() {
    return (
        <View>
            <Stack.Screen/>
            <Link href='/' replace>
            <Text>Restore</Text>
            </Link>
        </View>
    )
}