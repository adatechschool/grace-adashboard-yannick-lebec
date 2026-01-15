import { useState } from "react";

export function AddThemeButton({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [skills, setSkills] = useState([{ label: "", status: "OK" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addSkill = () => {
    setSkills((prev) => {
      return [...prev, { label: "", status: "OK" }];
    });
  };

  const updateSkillLabel = (index, value) => {
    setSkills((prev) => {
      return prev.map((s, i) => {
        if (i === index) {
          return { ...s, label: value };
        }
        return s;
      });
    });
  };

  const updateSkillStatus = (index, value) => {
    setSkills((prev) => {
      return prev.map((s, i) => {
        if (i === index) {
          return { ...s, status: value };
        }
        return s;
      });
    });
  };

  const removeSkill = (index) => {
    setSkills((prev) => {
      const next = prev.filter((_, i) => {
        return i !== index;
      });

      if (next.length === 0) {
        return [{ label: "", status: "OK" }];
      }

      return next;
    });
  };

  const createTheme = async () => {
    setError("");

    const payload = {
      name: name.trim(),
      skills: skills
        .map((s) => {
          return { label: s.label.trim(), status: s.status };
        })
        .filter((s) => {
          return s.label.length > 0;
        }),
    };

    if (!payload.name) {
      setError("Le nom est obligatoire.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const raw = await res.text();

      if (!res.ok) {
        throw new Error(raw || "Erreur création");
      }

      let createdTheme = null;

      if (raw) {
        try {
          createdTheme = JSON.parse(raw);
        } catch {
          createdTheme = null;
        }
      }

      if (onCreated) {
        if (createdTheme) {
          onCreated(createdTheme);
        } else {
          onCreated();
        }
      }

      setOpen(false);
      setName("");
      setSkills([{ label: "", status: "OK" }]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          className="btn-ajouter-theme"
          onClick={() => {
            setOpen(true);
          }}
        >
          Ajouter theme
        </button>
      )}

      {open && (
        <div
          className="container-modal"
          onClick={() => {
            setOpen(false);
          }}
        >
          <div
            className="modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2>Ajouter theme</h2>

            <p>nom :</p>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <p>compétence :</p>
            <button type="button" onClick={addSkill}>
              ➕
            </button>

            {skills.map((skill, index) => {
              return (
                <div key={index} className="skill-input-group">
                  <input
                    value={skill.label}
                    onChange={(e) => {
                      updateSkillLabel(index, e.target.value);
                    }}
                  />

                  <select
                    value={skill.status}
                    onChange={(e) => {
                      updateSkillStatus(index, e.target.value);
                    }}
                  >
                    <option value="OK">OK</option>
                    <option value="KO">KO</option>
                    <option value="PROGRESS">PROGRESS</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      removeSkill(index);
                    }}
                  >
                    ❌
                  </button>
                </div>
              );
            })}

            {error && <p className="error-text">{error}</p>}

            <button
              type="button"
              onClick={createTheme}
              disabled={loading}
            >
              {loading && "Création..."}
              {!loading && "créer"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}