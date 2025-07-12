import React, { useEffect, useState } from 'react';

const predefinedTasks = [
  { title: "Faire les courses", description: "Acheter les produits nécessaires pour la semaine." },
  { title: "Réviser les cours", description: "Relire les notes et préparer les exercices." },
  { title: "Appeler le médecin", description: "Prendre rendez-vous pour un contrôle de santé." },
  { title: "Nettoyer la maison", description: "Faire le ménage dans toutes les pièces." },
  { title: "Payer les factures", description: "Régler l'électricité, l'eau et Internet." },
  { title: "Envoyer un email", description: "Répondre aux messages importants." },
  { title: "Préparer le repas", description: "Cuisiner pour le déjeuner ou le dîner." },
  { title: "Faire du sport", description: "Aller courir ou faire une séance de fitness." },
  { title: "Lire un livre", description: "Avancer dans la lecture en cours." },
  { title: "Organiser le bureau", description: "Ranger et trier les documents." }
];

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState(predefinedTasks[0].title);
  const [description, setDescription] = useState(predefinedTasks[0].description);
  const token = localStorage.getItem('token');

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Charger les tâches
  useEffect(() => {
    fetch(`${API_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setTasks(data));
  }, [token]);

  // Quand on change de tâche dans la liste déroulante
  const handleTitleChange = (e) => {
    const selected = predefinedTasks.find(t => t.title === e.target.value);
    setTitle(selected.title);
    setDescription(selected.description);
  };

  // Ajouter une tâche
  const handleAddTask = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, description })
    });
    if (res.ok) {
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setTitle(predefinedTasks[0].title);
      setDescription(predefinedTasks[0].description);
    } else {
      alert('Erreur lors de l\'ajout de la tâche');
    }
  };

  return (
    <div className="taskboard">
      <div className="add-task-col">
        <h2>Ajouter une tâche</h2>
        <form onSubmit={handleAddTask} className="add-task-form">
          <select value={title} onChange={handleTitleChange}>
            {predefinedTasks.map(task => (
              <option key={task.title} value={task.title}>
                {task.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>
      <div className="tasks-col">
        <h2>suppression des tâches</h2>
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <div>
                <strong>{task.title}</strong> - {task.status}
                {task.description && <div>{task.description}</div>}
              </div>
              <button
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
      </div>
    </div>
  );
}

export default TaskList;