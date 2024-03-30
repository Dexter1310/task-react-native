import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Alert,
} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {getDbConnection, insertTask, updateTask} from "../Utils/db";
import {useFocusEffect, useRoute} from "@react-navigation/native";

const EditTask = ({ navigationEdit},props) => {

    const dateEdit = new Date();
    const formattedDateTime = `${dateEdit.getDate().toString().padStart(2, '0')}-${(dateEdit.getMonth() + 1).toString().padStart(2, '0')}-${dateEdit.getFullYear()}
     ${dateEdit.getHours().toString().padStart(2, '0')}:${dateEdit.getMinutes().toString().padStart(2, '0')}:${dateEdit.getSeconds().toString().padStart(2, '0')}`; // Custom format YYYY-MM-DD HH:MM:SS
    const route = useRoute();

    const [newTask, setNewTask] = useState({
        title:'',
        description: "",
        fecha:""

    });



    const handleChangeText = (name, value) => {
        setNewTask({ ...newTask, [name]: value });
    };


    const saveTask = async () => {


        try{
            let db =   await getDbConnection();

            await updateTask(db,newTask.title,newTask.description,formattedDateTime,route.params.task.id);
            await Alert.alert('Success','Task save',[{
                text:'OK',
                // onPress: ()=>navigationEdit.navigate('Tareas')
            }])


        }catch (e){
            console.log('ERROR ORIGEN: '+e)
        }


    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Vista de tarea</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Título"
                        defaultValue={route.params?route.params.task.title:newTask.title}
                        onChangeText={(value) => handleChangeText("title", value)}

                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Descripción"
                        multiline={true}
                        numberOfLines={12}
                        rstyle={{ textAlignVertical: "top" }}
                        defaultValue={route.params?route.params.task.description:newTask.description}
                        onChangeText={(value) => handleChangeText("description", value)}
                    />

                </View>

                <TouchableOpacity style={styles.button} onPress={saveTask}>
                    <Text style={styles.textButton}>Guardar</Text>
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

export default EditTask;
