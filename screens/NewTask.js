import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Alert, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform,
} from "react-native";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Config from "../config";
import {getDbConnection, insertTask} from "../Utils/db";
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import {useFocusEffect} from "@react-navigation/native";
import title from "react-native-paper/src/components/Typography/v2/Title";

const NewTask = ({navigation}) => {
    const api = Config.api;
    const date = new Date();
    const formattedDateTime = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}
     ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`; // Custom format YYYY-MM-DD HH:MM:SS


    let richTextNew = React.createRef() || useRef();
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        fecha: ""

    });
    const handleChangeText = (name, value) => {
        setNewTask({...newTask, [name]: value});

    };



    const saveTask = async () => {
        // const sendData = {
        //     title: newTask.title,
        //     description: newTask.description,
        // };

        try {
            let db = await getDbConnection();

            await insertTask(db, newTask.title, newTask.description, formattedDateTime);

            await Alert.alert('Success', 'Task created', [{
                text: 'OK',
                onPress: () => navigation.navigate('Tareas')
            }])


        } catch (e) {
            console.log('ERROR ORIGEN: ' + e)
        }
        setNewTask({
            title: "",
            description: "",

        });

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

    };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>New task</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Título"
                        value={newTask.title}
                        onChangeText={(value) => handleChangeText("title", value)}
                    />
                </View>


                <SafeAreaView style={styles.inputGroup}>
                    <ScrollView>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>

                            <RichEditor
                                ref={richTextNew}
                                initialHeight={200}
                                onChange={(value) => {handleChangeText("description", value)}}
                                onFocus={()=>richTextNew.current.setContentHTML('')}

                            />
                        </KeyboardAvoidingView>
                    </ScrollView>

                    <RichToolbar
                        editor={richTextNew}


                        actions={[
                            actions.keyboard,
                            actions.setBold,
                            actions.setItalic,
                            actions.setUnderline,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                            actions.insertLink,

                        ]}
                    />
                </SafeAreaView>
                <TouchableOpacity style={styles.button} onPress={saveTask}>
                    <Text style={styles.textButton}>Save task</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
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
