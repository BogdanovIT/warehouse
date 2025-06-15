import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { Input } from '../shared/input/input';
import { Button } from '../button/button';
import { useEffect, useState } from 'react';
import { ErrorNotification } from '../shared/ErrorNotifications/ErrorNotification';
import { Link, router } from 'expo-router';
import { useAtom } from 'jotai';
import { loginAtom } from '../entities/auth/model/auth.state';

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
      <Image style={styles.logo} source={require('./../assets/line-05.png')}/>
      <View style={styles.form}>
        <Input placeholder='email' onChangeText={setEmail}/>
        <Input isPassword placeholder='password' onChangeText={setPassword} />
        <Button text='ВОЙТИ' onPress={submit} isLoading={isLoading}/>
      </View>
      <Link href={'/restore'}>
      <Text style={{color: "#a4bbff", fontSize:16}}>восстановить пароль</Text>
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
    backgroundColor: "#0b3784",
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 90,
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
    backgroundColor: '#a4bbff',
    borderWidth: 0.5,
    borderColor: "#a4bbff"
  },
  text: {
    color: '#0b3784',
    fontSize: 16,
  }
});
