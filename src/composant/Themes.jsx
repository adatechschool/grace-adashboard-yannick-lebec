

export function Themes({ theme , removeTheme }) {
  return (
    <div className="theme-header">
      <h1 className="title">{theme.name}</h1>
      <button className="btn-remove" onClick={() => removeTheme(theme.id)}>
        Supprimer
      </button>
    </div>
  );
}
