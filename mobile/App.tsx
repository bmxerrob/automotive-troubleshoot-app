import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import HomeScreen from './src/screens/HomeScreen'
import DiagnoseScreen from './src/screens/DiagnoseScreen'
import ResultScreen from './src/screens/ResultScreen'
import PricingScreen from './src/screens/PricingScreen'
import type { DiagnosticResult } from './src/lib/diagnostics'

export type RootStackParamList = {
  Home: undefined
  Diagnose: undefined
  Result: {
    result: DiagnosticResult
    vehicle: { year: string; make: string; model: string }
  }
  Pricing: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#0f172a' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: '#f8fafc' },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'AutoDiag' }} />
          <Stack.Screen name="Diagnose" component={DiagnoseScreen} options={{ title: 'Diagnose' }} />
          <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Results' }} />
          <Stack.Screen name="Pricing" component={PricingScreen} options={{ title: 'AutoDiag Pro' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
