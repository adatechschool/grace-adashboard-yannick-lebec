export function Select({ event, s, index, updateSkillValidation }) {
  return (
    <li>
      {s.label}
      <select
        className="select"
        value={s.validation}
        onChange={(e) =>
          updateSkillValidation(event.id, index, e.target.value)
        }
      >
        <option value="OK">OK</option>
        <option value="KO">KO</option>
        <option value="PROGRESS">PROGRESS</option>
      </select>
    </li>
  );
}