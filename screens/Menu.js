import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useTheme} from "react-native-paper";
import {ImageBackground, StyleSheet} from "react-native";
import Tasks from "./Tasks"
import NewTask from "./NewTask";

import CleanTasks from "./CleanTasks";
import EditTask from "./EditTask";
import {useState} from "react";


const Tab = createMaterialBottomTabNavigator();

const Menu = () => {

    // useEffect(() => {
    //     async function init(){
    //         await initDataBase();
    //     }
    //     init().then(r => {console.log('success')})
    // }, []);

    const theme = useTheme();

    theme.colors.secondaryContainer = '#e6e9e7'; //Color menu


    return (
        <Tab.Navigator
            tabBarActivateBackgroundColor="#fff"
            activateColor='#000'
            inactiveColor='#95a5a6'
            barStyle={style.navigationBar}

        >

            <Tab.Screen style={{opacity: 0}}
                        name="ViewTask"
                        component={EditTask}
                       />


            <Tab.Screen
                name="Tareas"
                component={Tasks}
                options={{
                    tabBarLabel: "Tareas",
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="format-list-bulleted" color="#000" size={24}/>
                    )
                }}
            />

            <Tab.Screen
                name="Nueva Tarea"
                component={NewTask}
                options={{
                    tabBarLabel: "Nueva Tarea",
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="plus-box" color="#000" size={24}/>
                    )
                }}
            />

            <Tab.Screen
                name="Limpiar"
                component={CleanTasks}
                options={{
                    tabBarLabel: "Limpiar tareas",
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="delete-sweep" color="#000" size={24}/>
                    )
                }}
            />


        </Tab.Navigator>
    )

}

const style = StyleSheet.create({
    navigationBar: {
        backgroundColor: '#ff33',
        borderTopWidth: 0.5,
        borderTopColor: '#000'
    },
    hidden: {}

})

export default Menu
