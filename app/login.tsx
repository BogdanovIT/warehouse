import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Input } from '@/shared/input/input';
import { Button } from '@/button/button';
import { useEffect, useState } from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useAtom } from 'jotai';
import { loginAtom } from '@/entities/auth/model/auth.state';
import { CustomFonts, SystemColors } from '@/shared/tokens';

export default function Login() {
  interface AppError {
    message: string
    code?: number
  }
  const [localError, setLocalError] = useState<AppError | null>(null)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [{access_token, isLoading, error}, login] = useAtom(loginAtom)
  const params = useLocalSearchParams<{ email?: string}>()

  useEffect(() => {
    if (access_token) {
      router.replace('/index')
    }
  }, [access_token])

  useEffect(() => {
    if (params?.email) {
      setEmail(decodeURIComponent(params.email))
    }
  }, [params?.email])

  const submit = () => {
    
    if (!email) {
      setLocalError({
        message: "Поле email обязательно",
        code: 400
      })
      return
    }
    if (!password) {
      setLocalError({
        message: "Поле password обязательно",
        code: 400
      })
      return
    }
    login({ email, password})
  }
  

  useEffect(()=> {
    if (error) {
      setLocalError({
        message: error.message,
        code: error.code
      })
    }
  }, [error])

  useEffect(() => {
    if (access_token) {
      router.replace('/(app)')
    }
  }, [access_token])
  return (
    <View style={styles.container}>
      {/* <ErrorNotification error={localError?.message ? localError.message : null} /> */}
      <KeyboardAvoidingView behavior={'padding'} 
      style={styles.content}>
      <Image style={styles.logo} source={require('./../assets/images/logo.png')}/>
      <View style={styles.form}>
        <Input placeholder='email' onChangeText={setEmail} autoCapitalize='none' keyboardType='email-address'
         placeholderTextColor={SystemColors.VeryLightBlue}
         value={email}/>
        <Input isPassword placeholder='password' onChangeText={setPassword} placeholderTextColor={SystemColors.VeryLightBlue} />
        <Button text='ВОЙТИ' onPress={submit} isLoading={isLoading} style={{paddingBottom: 15}}/>
      </View>
      <Link href={'/restore'} style={{paddingTop: 15}}>
      <Text style={{color: SystemColors.VeryLightBlue, fontSize:16, fontFamily: CustomFonts.medium}}>Восстановить пароль</Text>
      </Link>
      <Link href={'/register'} style={{paddingTop: 15}}>
      <Text style={{color: SystemColors.VeryLightBlue, fontSize:16, fontFamily: CustomFonts.medium}}>Зарегистрироваться</Text>
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
    backgroundColor: SystemColors.MutedBlue,
    paddingBottom: 150
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
    backgroundColor: SystemColors.MutedBlue,
    borderWidth: 0.5,
    borderColor: SystemColors.VeryLightBlue
  },
  text: {
    color: 'red',
    fontSize: 16,
  }
});
