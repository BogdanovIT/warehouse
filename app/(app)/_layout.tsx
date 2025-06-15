import { Redirect, Stack } from "expo-router";
import { useAtomValue } from "jotai";
import { authAtom } from "../../entities/auth/model/auth.state";
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from "../../shared/tokens";
import { Text } from "react-native";
import MenuIcon from "../../assets/icons/menu-icon";
import { MenuButton } from "../../features/layout/UI/MenuButton/MenuButton";
import { CustomDrawer } from "../../widget/layout/ui/CustomDrawer/CustomDrawer";

export default function AppLayout() {
    const { access_token } = useAtomValue(authAtom)
    if (!access_token) {
        return <Redirect href="/login"/>
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer 
            drawerContent={(props) => <CustomDrawer {...props}/>} 
            screenOptions={({navigation}) => ({
                headerStyle: {
                    backgroundColor: Colors.blue,
                },
                headerLeft: () => {
                    return <MenuButton navigation={navigation}/>
                },
                headerTitleStyle: {
                    color: Colors.veryLightBlue,
                    fontFamily: 'FiraSans',
                    fontSize: 20
                },
                sceneStyle: {
                    backgroundColor: Colors.lightBlue
                },
                
                headerTitleAlign:'center',
            })}>
                <Drawer.Screen  name="index" options={{
                    title: 'ГЛАВНАЯ СТРАНИЦА'
                }}/>
                <Drawer.Screen  name="profile" options={{
                    title: 'ПРОФИЛЬ'
                }}/>
                <Drawer.Screen  name="statistic" options={{
                    title: 'ОТГРУЗКА'
                }}/>
                <Drawer.Screen  name="receiving" options={{
                    title: 'ПРИЕМКА'
                }}/>
                <Drawer.Screen  name="barcode" options={{
                    title: 'ШТРИХ - КОД'
                }}/>
                <Drawer.Screen  name="defect" options={{
                    title: 'РАБОТА С БРАКОМ'
                }}/>
                <Drawer.Screen  name="about" options={{
                    title: 'O ПРОГРАММЕ'
                }}/>
            </Drawer>
        </GestureHandlerRootView>
    )
}