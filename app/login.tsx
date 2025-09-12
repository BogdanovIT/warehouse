import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
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
    blocked?: boolean
    reason?: string
  }
  const [localError, setLocalError] = useState<AppError | null>(null)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [{access_token, isLoading, error}, login] = useAtom(loginAtom)
  const params = useLocalSearchParams<{ email?: string}>()

  useEffect(() => {
    if (params?.email) {
      setEmail(decodeURIComponent(params.email))
    }
  }, [params?.email])
  const checkBlockStatus = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch('https://literally-fair-lark.cloudpub.ru/api/auth/check-block-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
      })
      const data = await response.json()
      if (data.blocked) {
        Alert.alert("Пользователь заблокирован", data.message)
        return true
      }
      return false
    } catch(error) {
      console.error('Ошибка проверки блокировки', error)
      return false
    }
  }

  const showErrorAlert = (error: AppError) => {
    if (error.blocked) {
      Alert.alert(
        "Аккаунт заблокирован",
        error.reason || "Причина не указана"
      )
    } else {
      Alert.alert("Ошибка:", error.message)
    }
  }
  const submit = async () => {
    setLocalError(null)
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

    const isBlocked = await checkBlockStatus(email)
    if (isBlocked) {
      return
    }
    login({ email, password})
  }
  

  useEffect(()=> {
    if (error) {
      let errorMessage = "Произошла ошибка при входе"
      let isBlocked = false
      let blockReason = ''
      const anyError = error as any
      if (anyError.message) {
        errorMessage = anyError.message
      }
      if (error.code === 403 || errorMessage.includes('заблокирован')) {
        isBlocked = true
        blockReason = anyError.reason || 'Причина не указана'
      }
      const appError: AppError = {
        message: errorMessage,
        code: anyError.code,
        blocked: isBlocked,
        reason: blockReason
      }
      setLocalError(appError)
      showErrorAlert(appError)
    }
  }, [error])

  useEffect(() => {
    if (access_token) {
      router.replace('/index')
    }
  }, [access_token])
  useEffect(() => {
    if (localError && !localError.blocked) {
      Alert.alert("Ошибка", localError.message)
    }
  }, [localError]) 
  

  return (
    <View style={styles.container}>
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
