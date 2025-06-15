import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font'
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect } from "react";


SplashScreen.preventAutoHideAsync()
export default function RootLayout() {
    const [loaded] = useFonts({
        FiraSans: require('../assets/fonts/FiraSans-Regular.ttf'),
        FiraSansSemiBold: require('../assets/fonts/FiraSans-SemiBold.ttf') 
    })

    useEffect(()=> {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    const insets = useSafeAreaInsets()
    if (!loaded) {
        return null
    }
    return (
        <SafeAreaProvider>
            <StatusBar style='dark'/>
            <Stack screenOptions={{
                headerShown: false,
                contentStyle: {
                    paddingTop: insets.top
                }
            }}> 
                {/* <Stack.Screen  name="welcome"/> */}
                <Stack.Screen  name="login"/>
                <Stack.Screen  name="restore" options={{
                    presentation:'modal',
                    
                }}/>
            </Stack>
        </SafeAreaProvider>
    )
}