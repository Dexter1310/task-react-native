import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    Alert, ScrollView, Platform, KeyboardAvoidingView, SafeAreaView, Keyboard,
} from "react-native";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {getDbConnection, insertTask, updateTask} from "../Utils/db";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import menu from "./Menu";


const EditTask = ({navigation}, props) => {

    const dateEdit = new Date();
    const formattedDateTime = `${dateEdit.getDate().toString().padStart(2, '0')}-${(dateEdit.getMonth() + 1).toString().padStart(2, '0')}-${dateEdit.getFullYear()}
     ${dateEdit.getHours().toString().padStart(2, '0')}:${dateEdit.getMinutes().toString().padStart(2, '0')}`; // Custom format YYYY-MM-DD HH:MM:SS
    const route = useRoute();


    let richText = React.createRef() || useRef();
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        fecha: ""

    });

    if (route.params) {
        newTask.title = route.params.task.title;
        newTask.description = route.params.task.description;


    }


    const handleChangeText = (name, value) => {

        if (name === 'title') {
            newTask.title = value;
        }
        if (name === 'description') {
            newTask.description = value;
        }


    };

    const saveTask = async () => {

        try {
            let db = await getDbConnection();
            await updateTask(db, newTask.title, newTask.description, formattedDateTime, route.params.task.id);
            await Alert.alert('Success', 'Task save', [{
                text: 'OK',
                onPress: () => navigation.navigate('Tareas')
            }])

        } catch (e) {
            console.log('ERROR ORIGEN: ' + e)
        }
    };



    return (



        <ScrollView style={styles.container}>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Título"
                        defaultValue={newTask.title}
                        onChangeText={(value) => handleChangeText("title", value)}

                    />
                </View>

                <SafeAreaView style={styles.inputGroup}>
                    <ScrollView>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>

                            <RichEditor
                                initialHeight={200}
                                autoCorrect={true}
                                ref={richText}
                                onChange={(value=newTask.description) =>{ handleChangeText("description", value);console.log('dsd')}}
                                // onFocus={(value=newTask.description) => handleChangeText("description", value)}
                                onFocus={()=>richText.current.setContentHTML(newTask.description)}

                            />


                        </KeyboardAvoidingView>
                    </ScrollView>

                    <RichToolbar
                        editor={richText}
                        iconTint={"purple"}
                        selectedIconTint={"pink"}
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

                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Menu')}>
                        <Text style={styles.textButton}>Return</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={saveTask}>
                        <Text style={styles.textButton}>Save</Text>
                    </TouchableOpacity>

                </View>

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
        // marginTop: 20,
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
        flex: 4,
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
        margin: 1,
        borderRadius: 5,
        width: "50%",
    },
    textButton: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff",
    },
    row: {
        flexDirection: 'row', // Main axis
        justifyContent: 'center', // Main axis
        alignItems: 'center', // Cross axis
        marginVertical: 8,
    },
});

export default EditTask;
