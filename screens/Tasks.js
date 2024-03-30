import {Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import {deleteTask, getDbConnection, insertTask} from "../Utils/db";
import {useFocusEffect} from "@react-navigation/native";

import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";


const Tasks = ({navigation}) => {

    const [tasks, setTasks] = useState([]);

    const focusEffect = useCallback(() => {
        async function fechDB() {
            await loadTasks();
        }

        fechDB()

    }, []);
    useFocusEffect(focusEffect);


    const loadTasks = async () => {
        const db = await getDbConnection();
        var query = "SELECT * FROM task";
        var params = [];
        db.transaction((tx) => {
            tx.executeSql(query, params, (tx, results) => {
                setTasks(results.rows._array)
                console.log(results.rows._array)
            }, function (result) {
                console.log('Profile: Something went wrong');
            });
        });
    }

    const deleteTaskId = async (id) => {

        try {
            await Alert.alert('Eliminar', '¿Quiere eliminar la tarea seleccionada?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Aceptar', onPress: () => {
                        deleteTask(id);
                        const arr = tasks.filter((item) => item.id !== id);
                        setTasks(arr);
                    }
                },
            ]);

        } catch (e) {
            console.log('ERROR Eliminar ' + e)
        }

    };


    const renderItem = ({item}) => (

        <View style={styles.container}>
            <View style={{padding: 20}}>
                <Text>{item.title} {item.data_task}</Text>
                <Text>{item.description}</Text>

            </View>

            <View style={styles.containerGrid}>
                <View style={styles.row}>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewTask',{task:item})}>
                        <Text style={styles.textButton}>Visualizar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteTaskId(item.id)}>
                        <Text style={styles.textButton}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: "#ff33",
        borderBlockColor: "#1f232b",
        borderColor: '#000',
        borderRadius: 10,
        margin: 5
    },
    button: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#1f232b",
        padding: 5,
        margin: 10,
        borderRadius: 5,
        width: "25%",
    },

    buttonDelete: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#C52E0E",
        padding: 5,
        margin: 10,
        borderRadius: 5,
        width: "25%",
    },
    textButton: {
        fontSize: 14,
        color: "#fff",
    },
    containerGrid: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        margin: 5,
    },
});
export default Tasks
