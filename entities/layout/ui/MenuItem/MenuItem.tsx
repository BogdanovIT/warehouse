import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { ReactNode, useState } from "react";
import { Pressable, PressableProps, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../../shared/tokens";

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
    //onPress={ () => console.log(path)}
    onPressIn = { () => setClicked(true)}
    onPressOut = { () => setClicked(false)}>
        <View style={{ ...styles.menu,
            borderColor: isActive ? Colors.veryDarkBlue : Colors.veryLightBlue, 
            backgroundColor: clicked || isActive ? Colors.lightBlue : Colors.veryLightBlue}}>
            {icon}
            <Text style = {styles.text}>{text}</Text>
        </View>
    </Pressable>)
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        gap: 20,
        paddingHorizontal: 24,
        paddingVertical: 16,
        alignItems: 'center',
        //borderRightWidth: 5,
        borderRadius: 3,
    },
    text: {
        color: Colors.darkBlue,
        fontSize: 16,
        fontFamily: 'FiraSansSemiBold'
    }
})