import classes from './TaskItem.module.css';
import useHttp from '../../hooks/use-http';
import { useRef, useState } from 'react';

const TaskItem = (props) => {
  //const [updateNeeded, setUpdateNeeded] = useState(false);
  const { isLoading: isDeleting, error: errorDeleting, sendRequest: deleteTaskRequest } = useHttp();
  const { isLoading: isUpdating, error: errorUpdating, sendRequest: updateTaskRequest } = useHttp();

  const taskUpdateRef = useRef();

  const updateTask = async () => {
    await updateTaskRequest(
      {
        url: `https://react-http-3c05d-default-rtdb.firebaseio.com/tasks/${props.id}.json`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {text: taskUpdateRef.current.value}
      }
    );
    props.handleUpdate();
  }

  const deleteTask = async () => {
    await deleteTaskRequest(
      {
        url: `https://react-http-3c05d-default-rtdb.firebaseio.com/tasks/${props.id}.json`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    props.handleUpdate();
  };

  return <li className={classes.task}><p className={classes.text}>{props.children}</p><input className={classes.input} type='text' ref={taskUpdateRef} /><div><button className={classes.button} onClick={updateTask}>Update</button><button className={classes.button} onClick={deleteTask}>Delete</button></div></li>
};

export default TaskItem;