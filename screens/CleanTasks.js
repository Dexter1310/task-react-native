import {cleanDatabase, getDbConnection, insertTask} from "../Utils/db";
import {Alert, StyleSheet, Text, TouchableOpacity,} from "react-native";


const CleanTasks = ({navigation}) => {


    const deleteTable = async () => {
        try {
           await Alert.alert('Deleting tasks', 'All created tasks are deleted', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Accept', onPress: () =>  {
                    cleanDatabase();
                    Alert.alert('Tasks successfully deleted',"All tasks were deleted")
                    }},
            ]);

        } catch (e) {
            console.log('ERROR Delete ' + e)
        }
    }
    return (
        <TouchableOpacity style={styles.button} onPress={deleteTable}>
            <Text style={styles.textButton}>Delete tasks</Text>
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
