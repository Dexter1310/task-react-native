// import {StatusBar} from 'expo-status-bar';
// import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Menu from "./screens/Menu";

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Menu"
                          component={Menu}
                          options={{
                              title: "Mis tareas",
                              headerTitleAlign: "center",
                              headerStyle: {
                                  backgroundColor: '#fff'
                              },
                              headerTintColor: '#000',
                              headerTitleStyle: {
                                  fontWeight: 'bold'
                              }
                          }}
            />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


