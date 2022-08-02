import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { store } from './store';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';


const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <Provider store={ store }>
            <NavigationContainer>
                <SafeAreaProvider>
                    <KeyboardAvoidingView
                        behavior={ Platform.OS === "ios" ? "padding" : "height" }
                        keyboardVerticalOffset={ Platform.OS === "ios" ? -64 : 0 }
                        style={ { flex: 1 } }
                    >
                        <Stack.Navigator>
                            <Stack.Screen
                                name="HomeScreen"
                                component={ HomeScreen }
                                options={ {
                                    headerShown: false,
                                } }
                            />
                            <Stack.Screen
                                name="MapScreen"
                                component={ MapScreen }
                                options={ {
                                    headerShown: false,
                                } }
                            />
                        </Stack.Navigator>
                    </KeyboardAvoidingView>
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider >
    );
}
