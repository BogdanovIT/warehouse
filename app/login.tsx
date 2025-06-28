import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Input } from '../shared/input/input';
import { Button } from '../button/button';
import { useEffect, useState } from 'react';
import { ErrorNotification } from '../shared/ErrorNotifications/ErrorNotification';
import { Link, router } from 'expo-router';
import { useAtom } from 'jotai';
import { loginAtom } from '../entities/auth/model/auth.state';
import { Colors, CustomFonts, SystemColors } from '../shared/tokens';

export default function Login() {
  const [localError, setLocalError] = useState<string | undefined>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [{access_token, isLoading, error}, login] = useAtom(loginAtom)
  const submit = () => {
    if (!email) {
      setLocalError('invalid email')
      return
    }
    if (!password) {
      setLocalError('invalid password')
      return
    }
    login({ email, password})
  }

  useEffect(()=> {
    if (error) {
      setLocalError(error)
    }
  }, [error])

  useEffect(() => {
    if (access_token) {
      router.replace('/(app)')
    }
  }, [access_token])
  return (
    <View style={styles.container}>
      <ErrorNotification error={localError} />
      <KeyboardAvoidingView behavior={'padding'} 
      style={styles.content}>
      <Image style={styles.logo} source={require('./../assets/images/logo.png')}/>
      <View style={styles.form}>
        <Input placeholder='email' onChangeText={setEmail} placeholderTextColor={SystemColors.VeryLightBlue}/>
        <Input isPassword placeholder='password' onChangeText={setPassword} placeholderTextColor={SystemColors.VeryLightBlue} />
        <Button text='ВОЙТИ' onPress={submit} isLoading={isLoading}/>
      </View>
      <Link href={'/restore'} style={{paddingTop: 15, paddingBottom: 105}}>
      <Text style={{color: SystemColors.VeryLightBlue, fontSize:16, fontFamily: CustomFonts.medium}}>восстановить пароль</Text>
      </Link>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 55,
    gap: 15,
    backgroundColor: SystemColors.MutedBlue
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 120,
    marginTop:45
  },
  content:{
    alignItems: 'center',
  },
  form: {
    alignSelf: 'stretch',
    gap: 25
  },
  input: {
    backgroundColor: Colors.blue,
    borderWidth: 0.5,
    borderColor: Colors.veryLightBlue
  },
  text: {
    color: 'red',
    fontSize: 16,
  }
});
