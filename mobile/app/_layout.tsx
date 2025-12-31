import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  CormorantGaramond_300Light,
  CormorantGaramond_400Regular,
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  DMSans_300Light,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';
import { CartProvider } from '../src/context/CartContext';
import { OrderProvider } from '../src/context/OrderContext';
import { colors } from '../src/constants/theme';

SplashScreen.preventAutoHideAsync();

function LoadingScreen() {
  return (
    <View style={loadingStyles.container}>
      <StatusBar style="light" />
      <View style={loadingStyles.logoBox}>
        <Text style={loadingStyles.logoText}>AP</Text>
      </View>
      <Text style={loadingStyles.title}>AFRICAN PARADISE</Text>
      <Text style={loadingStyles.tagline}>AUTHENTIC AFRICAN CUISINE</Text>
    </View>
  );
}

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0A09',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    width: 140,
    height: 140,
    borderWidth: 2,
    borderColor: '#D4A574',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoText: {
    fontSize: 56,
    color: '#D4A574',
    fontWeight: '600',
    letterSpacing: 4,
  },
  title: {
    fontSize: 24,
    color: '#D4A574',
    letterSpacing: 6,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 12,
    color: '#A8A29E',
    letterSpacing: 3,
  },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_300Light,
    CormorantGaramond_400Regular,
    CormorantGaramond_500Medium,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
    DMSans_300Light,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <CartProvider>
      <OrderProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.foreground,
            headerTitleStyle: {
              fontFamily: 'CormorantGaramond_600SemiBold',
            },
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="menu/[id]"
            options={{
              title: '',
              headerBackTitle: 'Back',
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="checkout"
            options={{
              title: 'Checkout',
              headerBackTitle: 'Back',
              presentation: 'card',
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="confirmation"
            options={{
              title: 'Order Confirmed',
              headerBackVisible: false,
            }}
          />
        </Stack>
      </OrderProvider>
    </CartProvider>
  );
}
