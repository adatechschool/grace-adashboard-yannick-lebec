import { useState, useEffect } from "react";
import "./App.css";
import { Skills } from "./composant/Skills";
import { Themes } from "./composant/Themes";
import { AddThemeButton } from "./composant/AddThemeButton";

function App() {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/themes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        setValue(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

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

  const addThemeToList = (createdTheme) => {
    setValue((prev) => [createdTheme, ...prev]);
  };

  if (loading){ console.log(loading);
   return <p>Chargement...</p>};
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <AddThemeButton onCreated={addThemeToList} />

      {value.map((event) => (
        <div className="container" key={event.id}>
          <Themes theme={event} removeTheme={removeTheme} />
          <Skills event={event} />
        </div>
      ))}
    </div>
  );
}

export default App;