import { Select } from "./Select";

export function Skills({ event, updateSkillValidation }) {
  return (
    <ul>
      {event.skills.map((s, index) => (
        <Select
          key={`${event.id}-${index}`}
          event={event}
          s={s}
          index={index}
          updateSkillValidation={updateSkillValidation}
        />
      ))}
    </ul>
  );
}