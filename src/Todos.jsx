import React,{useState,useEffect} from 'react'

const Todos = () => {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [pageNo, setPageNo] = useState(1)
  // fetch("https://codesandbox.io/s/json-server-forked-m6g3bt?file=/src/db.json")
//   https://api.github.com/search/users?q=masai&page=3&per_page=4
    
    const saveInfo = () => {
        // call api to save this information in backend
        fetch("http://localhost:8080/todos", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                text: newTodo,
                isCompleted: false,
            })
        })
            .then((r) => r.json())
            .then((d) => {
                setTodos([...todos, d]);
                setNewTodo("")
            });
    }
  
    useEffect(() => {
        fetch(`http://localhost:8080/todos?_page=${pageNo}&_limit=5`)
            .then((r) => r.json())
            .then((d) => {
                setTodos(d) ;
            });
    }, [pageNo]);
    
  return (
      <div>
          Todos
          <div>
              <div>
                  <input value={newTodo}
                  onChange={({target}) => setNewTodo(target.value)} />
                  <button onClick={saveInfo}>Add</button>
              </div>
          {todos.map((todo) => (
              <div key={todo.id}>{todo.text} </div>
          ))}
          </div>
          <br/>
          <button
              disabled={pageNo <= 1}
          onClick={() => setPageNo(pageNo - 1)}>{"‹ Prev"}</button>
          <button onClick={() => setPageNo(pageNo + 1)}>{"Next ›"}</button>
    </div>
  )
}

export default Todos;