import { useState } from "react";

export function Skills({ event}) {

  const [skills, setSkills] = useState(event.skills)

  async function updateValidation(id, skillIndex, status) {
    setSkills((prev) =>
      prev.map((skill, index) =>
        index === skillIndex ? { ...skill, validation: status } : skill
      )
    );
    console.log(id, skillIndex, status)
    await fetch(
      `http://localhost:3000/themes/${id}/skills/${skillIndex}/${status}`,
      { method: "PUT" }
    );
    
    
  }
  
  
  return (
   
    <ul>
      {skills.map((skill, index) => (
        <li key={index} className="skills-item">
      {skill.label}
      <select
        className="select"
        value={skill.validation}
        onChange={(e) => updateValidation(event.id, index, e.target.value)
        
          
        }
      >
        <option value="OK">OK</option>
        <option value="KO">KO</option>
        <option value="PROGRESS">PROGRESS</option>
      </select>
    </li>
        
      ))}
    </ul>
  );
}