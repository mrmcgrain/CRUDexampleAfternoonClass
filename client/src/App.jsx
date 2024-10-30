import { useState } from 'react'
import './App.css'
import axios from "axios"

function App() {

  const [todo, setTodo] = useState("")

  const [allTodos, setAllTodos] = useState([])

  const [edit, setEdit] = useState(false)

  const [editValue, setEditValue] = useState("")


  const handleNewTodo = (e) => {
    console.log("handleNewTodo HIT", e.target.value)
    setTodo(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("handleSubmit  HIT")

    axios({
      method: "post",
      url: "http://localhost:3002/api/create",
      data: { todo: todo }
    })
      .then(res => {
        console.log("res", res)
      })
  }

  const handleGetTodos = (e) => {
    e.preventDefault()

    axios({
      method: "get",
      url: "http://localhost:3002/api/getTodo"
    })
      .then(res => {
        console.log("res", res)
        setAllTodos(res.data)
      })

  }

  const handleDelete = (e) => {
    console.log("Del HIT", e.target.id)

    axios({
      method: "delete",
      url: `http://localhost:3002/api/delete/${e.target.id}`
    })
      .then(res => {
        // console.log("filter", allTodos.filter((item) => item._id !== e.target.id))

      })
      .catch(err => console.log(err))

    setAllTodos(allTodos.filter((item) => item._id !== e.target.id))
  }

  const handleEdit = (e) => {
    setEditValue(e.target.value)
  }

  const handleEditSubmit = (e) => {

    axios({
      method: "put",
      url: `http://localhost:3002/api/edit/${e.target.id}`,
      data: { todo: editValue }
    })
      .then(res => {
        console.log("res", res)

        let copy = [...allTodos]
        // console.log("copy", copy)

        // console.log(allTodos.indexOf(allTodos.find((item) => item._id === e.target.id)))
        // let update = allTodos[allTodos.indexOf(allTodos.find((item) => item._id === e.target.id))]
        // console.log("update", update)
        // console.log(allTodos.slice(0, allTodos.indexOf(allTodos.find((item) => item._id === e.target.id))))
        // console.log("editing", allTodos.indexOf(allTodos.find((item) => item._id === e.target.id)))
        copy[allTodos.indexOf(allTodos.find((item) => item._id === e.target.id))] = res.data

        // console.warn("copy", copy)
        setAllTodos(copy)
      })


    setEdit(!edit)
  }


  return (
    <>
      {console.log("todo", todo)}
      {console.log("allTodos", allTodos)}
      {console.log("edit", edit)}
      <h1>Todo Awesomeness</h1>


      <input placehold="new todo" onChange={(e) => handleNewTodo(e)}></input>
      <button onClick={(e) => handleSubmit(e)}>Submit</button>

      <br />
      <hr />
      <br />

      <button onClick={(e) => handleGetTodos(e)}>Get Todo's</button>

      <br />
      <hr />
      <br />

      {allTodos.map((item) => {
        return (

          <div key={item._id} style={{ border: '2px yellow solid', marginBottom: '20px' }}>

            {edit
              ?
              (
                <div>
                  <input placeholder={item.todo} onChange={(e) => handleEdit(e)}></input>
                  <button id={item._id} onClick={(e) => handleEditSubmit(e)}>Submit</button>
                </div>
              )
              :
              (
                <div>
                  <p>{item.todo}</p>
                  <button id={item._id} onClick={(e) => handleDelete(e)}>X</button>
                  <button id={item._id} onClick={(e) => setEdit(!edit)}>Edit</button>
                </div>
              )
            }


          </div>

        )
      })}


    </>
  )
}

export default App
