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
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  useEffect(() => {
    if (params?.email) {
      setEmail(decodeURIComponent(params.email))
    }
  }, [params?.email])

  const getHumanReadableError = (error: any): AppError => {
    const errorCode = error?.code
    const errorMessage = error?.message || ''

    if (errorMessage && !errorMessage.includes('status code') && !errorMessage.includes('Request failed')) {
      return {
        message: errorMessage,
        code: errorCode,
        blocked: errorCode === 403 || errorMessage.includes('заблокирован'),
        reason: (error as any).reason
      }
    }
    switch (errorCode) {
      case 400:
        return {
          message: "Неверный запрос. Проверьте введенные данные",
          code: errorCode
        }
      case 401:
        return {
          message: "Неверный email или пароль",
          code: errorCode
        }
      case 403: 
        return {
          message: "Доступ запрещен",
          code: errorCode,
          blocked: true,
          reason: "Аккаунт заблокирован"
        }
      case 404: 
        return {
          message: "Пользователь не найден",
          code: errorCode
        }
      case 429: 
        return {
          message: "Слишком много попыток входа. Попробуйте позже",
          code: errorCode
        }
      case 500:
        return {
          message: "Внутренняя ошибка сервера. Попробуйте позже"
        }
      case 502:
      case 503:
      case 504:
        return {
          message: "Сервер временно недоступен. Попробуйте позже",
          code: errorCode
        }
      default:
        if (errorMessage.includes('Network Error') || errorMessage.includes('network')) {
          return {
            message: "Нет соединения с интернетом. Проверьте подключение",
            code: errorCode
          }
        }
      if (errorMessage.includes('timeout')) {
        return {
          message: "Превышено время ожидания ответа от сервера",
          code: errorCode
        }
      }
      return {
        message: "Произошла неизвестная ошибка. Попробуйте еще раз",
        code: errorCode
      }
    }
  }

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

  const submit = async () => {
    setLocalError(null)
    setHasUserInteracted(true)
    if (!email) {
      Alert.alert("Ошибка", "Введите email")
      return
    }
    if (!password) {
      Alert.alert("Ошибка", "Введите пароль")
      return
    }

    const isBlocked = await checkBlockStatus(email)
    if (isBlocked) {
      return
    }
    login({ email, password})
  }
  
  useEffect(() => {
    if (error && !isFirstLoad) {
      const humanReadableError = getHumanReadableError(error)
      setLocalError(humanReadableError)
      if (humanReadableError.blocked) {
        Alert.alert("Аккаунт заблокирован", humanReadableError.reason || "Причина не указана")
      } else {
        Alert.alert("Ошибка входа", humanReadableError.message)
      }
    }
  }, [error, hasUserInteracted])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstLoad(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (access_token) {
      router.replace('/index')
    }
  }, [access_token])

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
