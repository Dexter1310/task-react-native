import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Alert,
} from "react-native";
import React, { useState } from "react";
import Config from "../config";
import {getDbConnection, insertTask} from "../Utils/db";

const NewTask = ({ navigation }) => {
    const api = Config.api;
    const date = new Date();
    const formattedDateTime = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`; // Custom format YYYY-MM-DD HH:MM:SS



    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        fecha:""

    });

    const handleChangeText = (name, value) => {
        setNewTask({ ...newTask, [name]: value });

    };

    const saveTask = async () => {
        // const sendData = {
        //     title: newTask.title,
        //     description: newTask.description,
        // };

        try{
            let db =   await getDbConnection();

            await insertTask(db,newTask.title,newTask.description,formattedDateTime);
            Alert.alert('Success','Task created',[{
                text:'OK',
                onPress: ()=>navigation.navigate('Tareas')
            }])


        }catch (e){
            console.log('ERROR ORIGEN: '+e)
        }


        // await fetch(api + "new-task.php", {
        //     method: "POST",
        //     header: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(sendData),
        // })
        //     .then((res) => res.json())
        //     .catch((error) => {
        //         Alert.alert("Error!", "Inténtalo más tarde");
        //     })
        //     .then((response) => {
        //         if (response.message === "error") {
        //             Alert.alert("Error!", "Inténtalo más tarde");
        //         } else {
        //             //Redirigimos a tasks
        //             navigation.navigate("Tareas", {state: true});
        //         }
        //     });

        // console.log(newTask);
        setNewTask({
            title: "",
            description: "",

        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Crea una nueva tarea</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Título"
                        value={newTask.title}
                        onChangeText={(value) => handleChangeText("title", value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Descripción"
                        multiline={true}
                        numberOfLines={12}
                        style={{ textAlignVertical: "top" }}
                        value={newTask.description}
                        onChangeText={(value) => handleChangeText("description", value)}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={saveTask}>
                    <Text style={styles.textButton}>Guardar tarea</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    titleContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
    },
    form: {
        padding: 40,
    },
    inputGroup: {
        padding: 10,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 5,
    },
    button: {

        alignItems: "center",
        backgroundColor: "#1f232b",
        padding: 12,
        marginTop: 0,
        borderRadius: 5,
        width: "100%",
    },
    textButton: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff",
    },
});

export default NewTask;