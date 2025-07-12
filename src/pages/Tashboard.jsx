// ...existing code...

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

<ul>
  {tasks.map(task => (
    <li key={task._id}>
      <strong>{task.title}</strong> - {task.status}
      {task.description && <div>{task.description}</div>}
      <button
        style={{ marginLeft: 10 }}
        onClick={async () => {
          const res = await fetch(`${API_URL}/api/tasks/${task._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            setTasks(tasks.filter(t => t._id !== task._id));
          } else {
            alert("Erreur lors de la suppression");
          }
        }}
      >
        Supprimer
      </button>
    </li>
  ))}
</ul>
// ...existing code...