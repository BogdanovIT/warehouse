import { Text, View } from "react-native";
import { SystemColors } from "../../shared/tokens";

export default function About () {
    return (
        <View>
            <Text style={{color: SystemColors.VeryLightBlue}}>This is About?</Text>
        </View>
    )
}