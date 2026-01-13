import { useState, useEffect } from "react";
import "./App.css";
import { Skills } from "./composant/Skills";
import { Themes } from "./composant/Themes";

function App() {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/themes")
      .then((res) => res.json())
      .then((data) => {
        setValue(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  const updateSkillValidation = async (themeId, skillIndex, newValidation) => {
  const theme = value.find((t) => t.id === themeId);
  if (!theme) return;

  const updatedSkills = theme.skills.map((skill, i) =>
    i === skillIndex ? { ...skill, validation: newValidation } : skill
  );

  // UI
  setValue((prev) =>
    prev.map((t) => (t.id === themeId ? { ...t, skills: updatedSkills } : t))
  );

  // Backend: on remplace la colonne skills
  try {
    const res = await fetch(`http://localhost:3000/themes/${themeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: updatedSkills }),
    });

    if (!res.ok) throw new Error("Erreur update validation");
  } catch (err) {
    setError(err.message);
  }
};
const removeTheme = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/themes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Erreur suppression");

    setValue((prev) => prev.filter((item) => item.id !== id));
  } catch (err) {
    setError(err.message);
  }
};


  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      {value.map((event) => (
        <div className="container" key={event.id}>
          <Themes event={event} removeTheme={removeTheme} />

          <Skills event={event} updateSkillValidation={updateSkillValidation}/>
        </div>
      ))}
    </div>
  );
}

export default App;
