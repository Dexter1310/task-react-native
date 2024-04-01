import {Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import {deleteTask, getDbConnection, insertTask} from "../Utils/db";
import {useFocusEffect} from "@react-navigation/native";
import HTMLView from "react-native-htmlview/HTMLView";



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

        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ViewTask',{task:item})}>

            <View>
                <View>
                    <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteTaskId(item.id)}>
                        <Text style={styles.textButton}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
                    <Text style={styles.data_task}>{item.data_task}</Text>
            </View>
            <View style={{padding:10}}>
                <Text style={{textAlign:"left"}}>{item.title}</Text>
            </View>

                <HTMLView value={item.description}/>

        </TouchableOpacity>
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
    data_task:{
        textAlign:"right",

    },
    inputGroup: {
        flex:1,
        padding: 10,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 5,
        backgroundColor:'#fff'
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
        // flex: 1,
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
        backgroundColor: "#7CA1B4",
        flex: 1,
        alignItems: "center", // ignore this - we'll come back to it
        justifyContent: "center", // ignore this - we'll come back to it
        flexDirection: "column"
    },


});
export default Tasks
