import { collection, query, getDocs, setDoc} from "firebase/firestore";
import { db } from "../firebase-config.ts";
import { doc, updateDoc, deleteDoc  } from "firebase/firestore"; 
class DbRequest{
    async queryDb(queryParams){
        const tableRef = collection(db, queryParams.table);
        const tableQuery1 = query(tableRef, queryParams.orderBy, ...queryParams.whereCondition);
        const table1Snapshot = await getDocs(tableQuery1);
        const filterdData1 = table1Snapshot.docs.map((doc)=>({
          ...doc.data(),
          id: doc.id,
        }))
        if(queryParams.whereCondition2){
          const tableQuery2 = query(tableRef, queryParams.orderBy, ...queryParams.whereCondition2);
          const table2Snapshot = await getDocs(tableQuery2);
          const filterdData2 = table2Snapshot.docs.map((doc)=>({
              ...doc.data(),
              id: doc.id,
          }))
          return [filterdData1,filterdData2];
        }else{
          return filterdData1
        }
    }

    async setDb(id:string,table:string,setParams:object){
      try {
        await setDoc(doc(db, table, id), setParams);
      } catch (error) {
        throw error;
      }
    }

    async updateDb(id:string,table:string,updateParams:object){
      try{
        await updateDoc(doc(db,table,id), updateParams);
      }catch(error){
        console.log(error)
      }
      
    }

    async removeFromDb(id,table){
      await deleteDoc(doc(db,table,id));
    }
  

}

export default new DbRequest();