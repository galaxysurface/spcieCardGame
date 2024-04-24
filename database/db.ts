import * as SQLite from 'expo-sqlite/next';


const db = SQLite.openDatabaseSync('spieDatabase-v3');

export const initializeDatabase = {

    // INISILIEZ TABLE
    createTable: async() => {
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL);`)
    },
    // GET ALL PLAYERS
    getAllPlayers: async() =>{
        try {
        const allRows = await db.getAllAsync('SELECT * FROM players');
          return allRows
        } catch (error) {
             console.log(error)
        }
    },

    // ADD PLAYER
    addPLayer: async (name: string) =>{
        try {
            const result = await db.runAsync('INSERT INTO players (name) VALUES (?)', name);
            console.log(result.lastInsertRowId, result.changes);
            
        } catch (error) {
            console.log(error)
        }
    },

    // DELETE PLAYER BY
    deleteAllPlayer: async (id) => {
        try {
            await db.runAsync('DELETE FROM players WHERE id = $id', { $id: id })
        } catch (error) {
            console.log(error)
        }
    }


}







// export const initDataBase = async()=>{
//     if(db){
//         return db;
//     }
//     db = await SQLite.openDatabaseAsync('toDoDatabase-v2');
//     await db.execAsync(
//         await db.execAsync(`
//         PRAGMA journal_mode = WAL;
//         CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL);`)
//     )
// }


// export const getAllPlayers = async()=>{
//     try {
//         const allRows = await db.getAllAsync('SELECT * FROM players');
//          return allRows;
        
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const addPlayer = async(name: string)=>{
//     await db.runAsync('INSERT INTO players (name) VALUES (?)', name);
// }


// export const deletePLayer = async (id: number) => {
//     await db.runAsync('DELETE FROM players WHERE id = $id', { $id: id });
// }


// export const deleteAllPlayers = async()=>{
//     await db.runAsync('DELETE FROM tasks');
// }



// INSERT INTO players (name) VALUES ('player1');
// INSERT INTO players (name) VALUES ('player2');
// INSERT INTO players (name) VALUES ('player3');

