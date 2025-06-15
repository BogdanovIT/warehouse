import { ActivityIndicator, Animated, GestureResponderEvent, Pressable, PressableProps, StyleSheet, Text} from "react-native";
import { Colors } from "../shared/tokens";

export function Button ({text, isLoading, ...props}: PressableProps & {text: string, isLoading?: boolean}) {
    const animatedValue = new Animated.Value(100)
    const color = animatedValue.interpolate({
        inputRange: [0,100],
        outputRange: ["#0b3784", "#abcdef"]
    })

    const fadeIn = (e: GestureResponderEvent)=> {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration:200,
            useNativeDriver: true
        }).start()
        props.onPressIn && props.onPressIn(e)}

    const fadeOut = (e: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue:300,
            duration:200,
            useNativeDriver: true
        }).start()
        props.onPressOut && props.onPressOut(e)
    }
    return (
        <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
            <Animated.View style={{...styles.button, backgroundColor: color}}>
                {!isLoading && <Text style={styles.text}>{text}</Text>}
                {isLoading && <ActivityIndicator size="large" color={Colors.blue}/>}
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        height: 48,   
        backgroundColor: "#3d5f9e",
    },
    text: {
        color: '#0b3784',
        fontSize: 24,
        fontFamily: 'FiraSansSemiBold'
    }
})