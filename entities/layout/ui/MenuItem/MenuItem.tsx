import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { ReactNode, useState } from "react";
import { Pressable, PressableProps, View, Text, StyleSheet } from "react-native";
import { Colors, CustomFonts, SystemColors } from "../../../../shared/tokens";

interface MenuItemProps { //navigation: DrawerContentComponentProps['navigation']
    drawer: DrawerContentComponentProps
    icon: ReactNode
    text: string
    path: string
}
export function MenuItem({
    drawer, 
    icon, 
    text, 
    path, 
    ...props
}: MenuItemProps & PressableProps) {
    const [clicked, setClicked] = useState<boolean>(false);
    const isActive = drawer.state.routes[drawer.state.index].name===path
    return (<Pressable 
    {...props} 
    onPress = { () => drawer.navigation.navigate(path)}
    onPressIn = { () => setClicked(true)}
    onPressOut = { () => setClicked(false)}>
        <View style={{ ...styles.menu,
            //borderColor: isActive ? SystemColors.PrimaryBlue : SystemColors.MutedBlue, 
            backgroundColor: clicked || isActive ? SystemColors.PrimaryBlue : SystemColors.MutedBlue}}>
            {icon}
            <Text style = {styles.text}>{text}</Text>
        </View>
    </Pressable>)
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        gap: 20,
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: 'center',
        //borderRightWidth: 10,
        borderRadius: 0,
        
    },
    text: {
        color: SystemColors.VeryLightBlue,
        fontSize: 16,
        fontFamily: CustomFonts.medium
    }
})