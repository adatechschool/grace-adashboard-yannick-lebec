export function Remove({ event, removeTheme }) {
  return (
    <button
      className="btn-remove"
      onClick={() => removeTheme(event.id)}
    >
      remove
    </button>
  );
}