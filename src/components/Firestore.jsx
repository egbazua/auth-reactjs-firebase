import { useEffect, useState } from 'react';
import { db } from '../firebase';
import moment from 'moment';
import 'moment/locale/es';

function Firestore(props) {

  const [task, setTask] = useState([]);
  const [taskForm, setTaskForm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState('');
 
  useEffect(() => {
    
    const getData = async () => {

      try {
        
        const data = await db.collection(props.user.uid).get()
        const dataArray = data.docs.map( (doc) => ({id: doc.id, ...doc.data() }));
        /* console.log(dataArray); */
        setTask(dataArray);

      } catch (error) {
        console.log(error);
      }

    }

    getData();

  }, [props.user.uid]);

  const addTask = async (e) => {
    e.preventDefault();
    /* console.log(task); */

    if(!taskForm.trim()){
      return console.log('Empty');
    }

    try {
      
      const newTask = {
        name: taskForm,
        date: Date.now()
      }

      const data = await db.collection(props.user.uid).add(newTask);

      setTask([
        ...task,
        {...newTask, id: data.id}
      ])

      setTaskForm('');

    } catch (error) {
      console.log(error);
    }

    console.log(taskForm);
  }

  const deleteTask = async (idTask) => {
    try {
      
      await db.collection(props.user.uid).doc(idTask).delete();

      const filterArray = task.filter(item => item.id !== idTask);
      setTask(filterArray);

    } catch (error) {
      console.log(error);
    }
  }

  const activateEditMode = (item) => {
    setEditMode(true);
    setTaskForm(item.name);
    setId(item.id);
  }

  const editTask = async (e) => {
    e.preventDefault();
    
    if(!taskForm.trim()){
      console.log('empty')
      return
    }

    try {
      
      await db.collection(props.user.uid).doc(id).update({
        name: taskForm
      });

      const editedArray = task.map(item => (
        item.id === id ? {id: item.id, date: item.date, name: taskForm} : item
      ))

      setTask(editedArray);
      
      setEditMode(false);
      setTaskForm('');
      setId('');

    } catch (error) {
      console.log(error);  
    }

  }

  return (
    <div className="container">
      <h1 className="text-center mt-1"> • ADMINSTRATION • </h1>
      <hr className="mb-4"/>
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              task.map(item => (
                <li className="list-group-item" key={item.id}>
                  {item.name} - {moment(item.date).format('LLL')}
                  <button onClick={ () => deleteTask(item.id)} className="btn btn-danger btn-sm float-end ms-2">
                    Delete
                  </button>
                  <button onClick={ () => activateEditMode(item)} className="btn btn-warning btn-sm float-end">
                    Edit
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center">
            {
              editMode ? 'Edit Task' : 'Add Task'
            }
          </h3>
          <form onSubmit={ editMode ? editTask : addTask }>
            <input onChange={e => setTaskForm(e.target.value)} value={taskForm} type="text" placeholder="Enter Task" className="form-control mb-2" />
            <button className={ editMode ? 'btn btn-warning w-100' : 'btn btn-dark w-100' } type="submit" >
              {
                editMode ? 'Edit' : 'Add'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Firestore;