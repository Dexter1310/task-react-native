import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import {getDbConnection} from "../Utils/db";
import {useFocusEffect} from "@react-navigation/native";


const Tasks = () => {

    const [tasks, setTasks] = useState([]);

    const focusEffect = useCallback(() => {
        async function fechDB() {

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

        fechDB()

    }, []);
    useFocusEffect(focusEffect)

    const renderItem = ({item}) => (

        <View style={styles.container}>
            <View style={{padding: 20}}>
                <Text>{item.title}   {item.data_task}</Text>
                <Text>{item.description}</Text>

            </View>

            <View style={styles.containerGrid}>
                <View style={styles.row}>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Ver</Text>
                </TouchableOpacity>

                    <TouchableOpacity style={styles.butttonDelete}>
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
        padding:5,
        backgroundColor: "#fff",
        borderBlockColor:"#1f232b",
        borderTopWidth: 0.5 ,
    },
    button: {
        flex:1,
        alignItems: "center",
        backgroundColor: "#1f232b",
        padding: 5,
        margin:10,
        borderRadius: 5,
        width: "25%",
    },

    butttonDelete: {
        flex:1,
        alignItems: "center",
        backgroundColor: "#C52E0E",
        padding: 5,
        margin:10,
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