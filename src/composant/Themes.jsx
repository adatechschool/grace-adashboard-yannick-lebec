

export function Themes({ event, removeTheme }) {
  return (
    <div className="theme-header">
      <h1 className="title">{event.name}</h1>
      <button className="btn-remove" onClick={() => removeTheme(event.id)}>
        remove
      </button>
    </div>
  );
}
