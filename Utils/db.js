// import { enablePromise,openDatabase} from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite';


// enablePromise(true);

const DATABASE_NAME = 'task.db';



export async function getDbConnection()  {

    const db = SQLite.openDatabase(DATABASE_NAME)
     db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS task(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT,data_task DATETIME DEFAULT CURRENT_TIMESTAMP)')
    })
    return db;
};


export async function cleanDatabase(){
    const db = SQLite.openDatabase(DATABASE_NAME)
    const query = 'DROP TABLE IF EXISTS task';
    db.transaction(function (tx) {tx.executeSql(query)})

}

export async function deleteTask(id){
    const db = SQLite.openDatabase(DATABASE_NAME)
    const query = 'DELETE  FROM  task where id=? ';
    db.transaction(function (tx) {tx.executeSql(query,[id])})
}

export async function insertTask(db,title,description,fecha){

     db.transaction(function (tx) {tx.executeSql('INSERT INTO task (title, description,data_task)  VALUES (?,?,?)', [title, description,fecha])})
}

export async function updateTask(db,title,description,fecha,id){

    db.transaction(function (tx) {tx.executeSql('UPDATE task SET  title = ?, description = ? ,data_task = ? WHERE id=?', [title, description,fecha,id])})
}

// export async function getTasks(db){
//     let task=[];
//     try{
//         var query = "SELECT * FROM task";
//         var params = [];
//         db.transaction((tx) => {
//             tx.executeSql(query, params, (tx, results) => {
//                 task= results.rows._array;
//             }, function (result) {
//                 console.log('Profile: Something went wrong');
//             });
//         });
//         db.closeAsync();
//     }catch (e){
//         console.log(e)
//     }
//
//     return task;
// }



