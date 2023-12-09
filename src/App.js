import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect, createContext } from "react";
import AddTask from "./components/AddTask";
import Switch from "react-switch";
import { BsMoon } from 'react-icons/bs'
import { BsSun } from 'react-icons/bs'


export const ThemeContext = createContext(null);

const App=()=>{
  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks,setTasks] =useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer.reverse())
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    //console.log(data);
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)  //backtick 
    const data = await res.json()
    //console.log(data);
    return data
  }


  const addTask = async(task)=>{

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task), //js object to json string
    })

    const data = await res.json()

    setTasks([...tasks, data])

    //console.log(task)
    // const id = Math.floor(Math.random()*10000) +1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      //console.log('delete',id)
      setTasks(tasks.filter((task)=>task.id!==id))

  }

  const toggleReminder =async (id)=>{
    const taskToToggle= fetchTask(id)
    //fetchTask olmasaydı taskToToggle olusturamazdık
    const updTask={...taskToToggle, reminder: !taskToToggle.reminder}
    // const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(updTask), //js object to json string
    // })
    


    setTasks(
      tasks.map((task)=>
      task.id===id?{...task, reminder:!task.reminder} : task
      )
    )


  }
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  console.log(theme)

return( 

  <ThemeContext.Provider value={{ theme, toggleTheme }}>
 
<div className={theme}>     

<div className="switch">
   <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <Switch onChange ={toggleTheme}
                  checked={theme === "dark"}
                  checkedIcon={
                   <div
                   style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "100%",
                     fontSize: 17,
                     paddingLeft: 2
                   }}>
                  <BsMoon/>
                 </div>}
                  uncheckedIcon={
                  
                   <div
                   style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "100%",
                     fontSize: 17,
                     paddingRight: 2
                   }} >
                  <BsSun/>
                 </div>
                  }
                  offColor={"#eec7eedc"}
                 onColor={"#846584dc"}                       
                  />
  </div>

  <h1 className="mainh1">todos</h1>

  <div className="middle-container">
  <div className='task-container'>
    <Header title='' onAddBtn={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>


    {showAddTask && <AddTask onAdd={addTask}/>}

    {tasks.length>0? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks to show'}
 
  </div>
  </div>
 </div>
 </ThemeContext.Provider>

  ) 

} 

export default App
