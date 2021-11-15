import React, {useState} from 'react';
import './App.css';



function App() {
  

  const [toDos, setToDos] = useState([])
  const [toDo, setToDo] = useState('')
  const [err, setErr] = useState(false);
  const [isEditing, setEditing]=useState(false);
  const [id, setId] = useState("")


  let inputHandler = (e) => {
    setToDo(e.target.value)
  }
  let editHandler= ()=> {
  if(toDo!=="") {
    setEditing(false)
    setErr(false)
    setToDos((old)=>{
    return old.map((ele)=> {
        if(ele.id===id){
          ele.text=toDo;
          return ele;
        }
        else return ele;
      })
    })
  }
  else setErr(true);
 
  }
  
let submitHandler = () => {

  if(toDo!=="") {
    setErr(false)
    setToDos([...toDos, {id:Date.now(), text: toDo, status:false}])
    setToDo('')
  }
  else setErr(true);
    
}
let editItem  = (id) => {
  setToDo(toDo)
  toDos.map((ele)=>{
    if(ele.id===id) {
      setToDo(ele.text)
      return ele
    }
    return null;
  })
  setToDo(toDo)
  setId(id)
  setEditing(true)
}
let removeList = (id) => {

  setToDos((oldValue)=> {
    return oldValue.filter((ele)=> ele.id !==id)
  })
}

// { id:Date.now(), text: toDo, status:false }
    

  return (
    <div className="App">
      <header>
        <h1>
          To-Do List
        </h1>
      </header>
      {err && <small>Empty Input</small>}
     <div className='con'>
       <div className="inp-field">
       <input value={toDo} onChange={inputHandler}    type="text" name="" id="" />
       {
     
         isEditing ? <button className='edit-btn' onClick={editHandler} type="Submit"><img alt='' src="https://img.icons8.com/flat-round/64/000000/loop.png"/></button>
         : 
         <button className='submit-btn' onClick={submitHandler} type="Submit"><img alt='' src="https://img.icons8.com/fluency/48/000000/add.png"/></button>
       }
       </div>
       
      <div>
        { toDos.map((obj)=>{

          return <div key={obj.id} className='list'>
            <input value={obj.status} 
            onChange={((e)=>{
            // console.log(e.target.value)
            // console.log(obj);
           setToDos(toDos.filter(obj2=>{
             if(obj2.id === obj.id){
               obj2.status = e.target.checked
             }
             return obj2
           }))
            })} type="checkbox"  />
            <div>
              {obj.status ? <h1 className="through-line" >{obj.text}</h1> :  <h1 className="items">{obj.text} </h1> }
           
            </div>
            <div>
            <button className='edit-btn' onClick={ () => {editItem(obj.id)}}><img alt='' src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-edit-interface-kiranshastry-lineal-color-kiranshastry-1.png"/></button>
          
            <button className='delete-btn'  onClick={ () => {removeList(obj.id)}}><img alt='' src="https://img.icons8.com/color/48/000000/delete-forever.png"/></button>
            </div>
            
            </div>

           
       
      }) }

      {toDos.map((obj)=>{
        if(obj.status){
          // return( <h3>{obj.text}</h3> )
        } return null
      })}

      
       </div>
     </div>
    </div>
  );
}

export default App;
