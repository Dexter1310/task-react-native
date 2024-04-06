import {
    StyleSheet,
    View,
    ScrollView, Text,
} from "react-native";
import React, { useState} from "react";


import {useRoute} from "@react-navigation/native";
import HTMLView from "react-native-htmlview/HTMLView";


const ViewTask = ({navigation}) => {
    const route = useRoute();
    const [title, setTitle] = useState(route.params.task.title)
    const [description, setDescription] = useState(route.params.task.description)


    return (


        <ScrollView style={styles.container}>

           <View style={styles.row}>
               <Text>{title}</Text>

           </View>

            <View style={styles.row}>

                <HTMLView value={description}/>
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

export default ViewTask;
