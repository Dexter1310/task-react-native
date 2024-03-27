import {cleanDatabase, getDbConnection, insertTask} from "../Utils/db";
import {Alert, StyleSheet, Text, TouchableOpacity,} from "react-native";


const CleanTasks = ({navigation}) => {


    const deleteTable = async () => {
        try {
            Alert.alert('Eliminación de tareas', 'Se eliminarán las tareas creadas', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Aceptar', onPress: async () => await cleanDatabase()},
            ]);
            navigation.navigate("Tareas", {state: true});
        } catch (e) {
            console.log('ERROR Eliminar ' + e)
        }
    }
    return (
        <TouchableOpacity style={styles.button} onPress={deleteTable}>
            <Text style={styles.textButton}>Eliminar tareas</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({

    button: {

        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        marginTop: 0,
        borderRadius: 5,
        width: "100%",
    },

});


export default CleanTasks