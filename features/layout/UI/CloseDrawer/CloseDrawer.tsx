import {  Pressable, StyleSheet, View} from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import CloseIcon from "../../../../assets/icons/close";

export function CloseDrawer ({ onClose }: {onClose: ()=>void}) {

    return (
        <Pressable onPress={onClose}
         >
            <View style={styles.button}>
                <CloseIcon/>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        right: 20,
        top: 20
    },
})