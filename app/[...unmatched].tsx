import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../shared/tokens";
import { Button_2 } from "../button/button_2";



export default function UnmatchedCustom() {
    const router = useRouter()
    const comeback = () => {
        router.push('/')
    }
    
    return (
        <View style={style.container}>
            <Image style={style.logo} source={require("./../assets/line-05_blue.png")}/>
            <View style={style.content}>
                <Text style={style.errorText}>ЭТА СТРАНИЦА</Text>
                <Text style={style.errorText}>ЕЩЕ НЕ СОЗДАНА</Text>
            </View>
            <View style={style.form}>
                <Button_2 text='Вернуться на главную' onPress={comeback}/>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 55,
        gap: 15,
        backgroundColor: Colors.lightBlue,

      },
      logo: {
        width: 130,
        height: 130,
        resizeMode: 'contain',
        marginBottom: 95,
        marginTop:60
      },
      form: {
        alignSelf: 'stretch',
        gap: 25,
      },
      content:{
        alignItems: 'center',
        textAlign: 'center',
      },
    errorText: {
        fontFamily: 'FiraSansSemiBold',
        fontSize: 28,
        color: Colors.veryDarkBlue,
    
    },
    errorText2: {
        fontFamily: 'FiraSansSemiBold',
        fontSize: 28,
        color: Colors.darkBlue,
    },
    comebackText: {
        fontFamily: 'FiraSans',
        fontSize: 18,
        color: Colors.darkBlue,
    },
})