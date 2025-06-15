import { Image, StyleSheet, Text, View } from "react-native";
import { User } from "../../model/user.model";
import { Colors } from "../../../../shared/tokens";

export function UserMenu( { user }: {user: User | null }) {
    if (!user) {
        return
    }
    return (
        <View style={styles.container}>
            {user.photo ? (
                <Image 
                style= {styles.image}
                source={{
                    uri: user.photo
                }}
                />
            ) : (
            <Image style= {styles.image} source={require('../../../../assets/images/defaultAvatar.png')}/>)}
            <Text style={styles.name}>{user.name} {user.surname}</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        gap: 16,
        marginTop: 30,
        marginBottom: 40,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    name:{
        color: Colors.veryDarkBlue,
        fontSize: 16,
        fontFamily: 'FiraSans'
    },
})