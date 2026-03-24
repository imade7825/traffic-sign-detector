// Diese Zeile importiert React, damit wir JSX verwenden können.
import React from 'react';

// Diese Zeile importiert den Navigationscontainer von React Navigation.
import { NavigationContainer } from '@react-navigation/native';

// Diese Zeile importiert den Native-Stack-Navigator.
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Diese Zeile importiert den Safe-Area-Provider.
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Diese Zeile importiert den Root-Container für Gesten.
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Diese Zeile importiert den Statusleisten-Baustein von Expo.
import { StatusBar } from 'expo-status-bar';

// Diese Zeile importiert den Startbildschirm.
import { HomeScreen } from '../screens/HomeScreen';

// Diese Zeile importiert den Bildprüfungsbildschirm.
import { ImageReviewScreen } from '../screens/ImageReviewScreen';

// Diese Zeile importiert den Ergebnisbildschirm.
import { DetectionResultScreen } from '../screens/DetectionResultScreen';

// Diese Zeile importiert den Verlaufsbildschirm.
import { HistoryScreen } from '../screens/HistoryScreen';

// Diese Zeile importiert die Typdefinition aller Stack-Parameter.
import type { ApplicationStackParameterList } from '../types/applicationNavigation';


// Diese Zeile erstellt den typisierten Stack-Navigator der Anwendung.
const ApplicationStackNavigator = createNativeStackNavigator<ApplicationStackParameterList>();


// Diese Funktion rendert die oberste sichtbare Struktur der Anwendung.
export function ApplicationRoot(): React.JSX.Element {
  // Diese Zeile gibt den kompletten Navigationsaufbau der Anwendung zurück.
  return (
    // Diese Zeile stellt den Root-Container für alle Gesten bereit.
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Diese Zeile stellt die Safe-Area-Kontexte für die gesamte App bereit. */}
      <SafeAreaProvider>
        {/* Diese Zeile zeigt eine automatisch angepasste Statusleiste an. */}
        <StatusBar style="auto" />

        {/* Diese Zeile kapselt die gesamte Navigation der Anwendung. */}
        <NavigationContainer>
          {/* Diese Zeile rendert den Stack-Navigator der Anwendung. */}
          <ApplicationStackNavigator.Navigator initialRouteName="HomeScreen">
            {/* Diese Zeile registriert den Startbildschirm. */}
            <ApplicationStackNavigator.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ title: 'Home' }}
            />

            {/* Diese Zeile registriert den Bildprüfungsbildschirm. */}
            <ApplicationStackNavigator.Screen
              name="ImageReviewScreen"
              component={ImageReviewScreen}
              options={{ title: 'Image Review' }}
            />

            {/* Diese Zeile registriert den Ergebnisbildschirm. */}
            <ApplicationStackNavigator.Screen
              name="DetectionResultScreen"
              component={DetectionResultScreen}
              options={{ title: 'Detection Result' }}
            />

            {/* Diese Zeile registriert den Verlaufsbildschirm. */}
            <ApplicationStackNavigator.Screen
              name="HistoryScreen"
              component={HistoryScreen}
              options={{ title: 'History' }}
            />
          </ApplicationStackNavigator.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}