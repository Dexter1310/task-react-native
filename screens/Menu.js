import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useTheme} from "react-native-paper";
import {ImageBackground, StyleSheet, View} from "react-native";
import Tasks from "./Tasks"
import NewTask from "./NewTask";
import CleanTasks from "./CleanTasks";
import EditTask from "./EditTask";



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

    const ok=false;



    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: ok,
            }}
            tabBarActivateBackgroundColor="#fff"
            activateColor='#000'
            inactiveColor='#95a5a6'
            barStyle={style.navigationBar}

        >

            <Tab.Screen
                name="Tareas"
                component={Tasks}
                options={{
                    tabBarLabel: "Tasks",
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="format-list-bulleted" color="#000" size={24}/>
                    )
                }}
            />





            <Tab.Screen
                name="Nueva Tarea"
                component={NewTask}
                options={{
                    tabBarLabel: "New Task",
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="plus-box" color="#000" size={24}/>
                    )
                }}
            />

            <Tab.Screen
                name="Limpiar"
                component={CleanTasks}
                options={{
                    tabBarLabel: "Clean task",
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


})

export default Menu
