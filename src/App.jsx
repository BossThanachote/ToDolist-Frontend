import { useEffect, useState } from "react";
import ToDos from "./components/ToDo";
import { getAllToDo,addToDo,updateToDo,deleteToDo } from "./utils/HandleApi";

function App() {

  const [text,setText] = useState("")
  const [ToDo, setToDo] = useState([])
  const [isUpdating,setIsUpdating] = useState(false)
  const [toDoId,setToDoId] = useState("")

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  const updateMode = (_id,text) =>{
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }

  return (
  <div className="App">
    <section className="container">
      <h1>แอพบันทึกสิ่งที่ต้องทำ</h1>
      <div className="Top">
        <input type="text" 
        placeholder="เพิ่มรายการ" 
        value={text}
        onChange={(e)=> setText(e.target.value)}
        />

        <div className="add" 
        onClick={ isUpdating ? 
          () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating) 
          : ()=>addToDo(text,setText,setToDo)}>
          {isUpdating ? "แก้ไข" : "เพิ่ม"}</div>
        </div>
        <div className="list">
          {ToDo.map((item) => <ToDos 
          key={item._id} 
          text={item.text} 
          updateMode={()=> updateMode(item._id, item.text)}
          deleteToDo={()=> deleteToDo(item._id,setToDo)}
          />)}
        </div>
    </section>
  </div>
  );
}

export default App;
