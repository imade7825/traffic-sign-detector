// Diese Zeile importiert React, damit wir JSX verwenden können.
import React from 'react';
// Diese Zeile importiert den Navigationscontainer von React Navigation.
import { NavigationContainer } from '@react-navigation/native';
// Diese Zeile importiert den Native-Stack-Navigator.
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Diese Zeile importiert den Safe-Area-Provider.
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
    // Diese Zeile stellt die Safe-Area-Kontexte für die gesamte App bereit.
    <SafeAreaProvider>
      {/* Diese Zeile zeigt eine automatisch angepasste Statusleiste an. */}
      <StatusBar style="auto" />
      {/* Diese Zeile kapselt die gesamte Navigation der Anwendung. */}
      <NavigationContainer>
        {/* Diese Zeile rendert den Stack-Navigator der Anwendung. */}
        <ApplicationStackNavigator.Navigator
          // Diese Zeile definiert den ersten Bildschirm beim Start der App.
          initialRouteName="HomeScreen"
          // Diese Zeile definiert gemeinsame Optionen für alle Bildschirme.
          screenOptions={{
            // Diese Zeile richtet den Header-Titel mittig aus.
            headerTitleAlign: 'center'
          }}
        >
          {/* Diese Zeile registriert den Startbildschirm im Navigator. */}
          <ApplicationStackNavigator.Screen
            // Diese Zeile definiert den technischen Namen des Bildschirms.
            name="HomeScreen"
            // Diese Zeile verbindet den Bildschirmnamen mit der Komponente.
            component={HomeScreen}
            // Diese Zeile definiert die sichtbaren Header-Optionen.
            options={{
              // Diese Zeile setzt den sichtbaren Titel im Header.
              title: 'Home'
            }}
          />
          {/* Diese Zeile registriert den Bildprüfungsbildschirm im Navigator. */}
          <ApplicationStackNavigator.Screen
            // Diese Zeile definiert den technischen Namen des Bildschirms.
            name="ImageReviewScreen"
            // Diese Zeile verbindet den Bildschirmnamen mit der Komponente.
            component={ImageReviewScreen}
            // Diese Zeile definiert die sichtbaren Header-Optionen.
            options={{
              // Diese Zeile setzt den sichtbaren Titel im Header.
              title: 'Image Review'
            }}
          />
          {/* Diese Zeile registriert den Ergebnisbildschirm im Navigator. */}
          <ApplicationStackNavigator.Screen
            // Diese Zeile definiert den technischen Namen des Bildschirms.
            name="DetectionResultScreen"
            // Diese Zeile verbindet den Bildschirmnamen mit der Komponente.
            component={DetectionResultScreen}
            // Diese Zeile definiert die sichtbaren Header-Optionen.
            options={{
              // Diese Zeile setzt den sichtbaren Titel im Header.
              title: 'Detection Result'
            }}
          />
          {/* Diese Zeile registriert den Verlaufsbildschirm im Navigator. */}
          <ApplicationStackNavigator.Screen
            // Diese Zeile definiert den technischen Namen des Bildschirms.
            name="HistoryScreen"
            // Diese Zeile verbindet den Bildschirmnamen mit der Komponente.
            component={HistoryScreen}
            // Diese Zeile definiert die sichtbaren Header-Optionen.
            options={{
              // Diese Zeile setzt den sichtbaren Titel im Header.
              title: 'History'
            }}
          />
        </ApplicationStackNavigator.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}