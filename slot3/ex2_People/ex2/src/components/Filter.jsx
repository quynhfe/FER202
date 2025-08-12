import React, { useState } from "react";
import { persons } from "../data/person";

function Filter() {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [skill, setSkill] = useState("");

  const skills = [...new Set(persons.flatMap(p => p.skills))].sort();

  const filtered = persons.filter(p => {
    const inAge = (!min || p.age >= min) && (!max || p.age <= max);
    const hasSkill = !skill || p.skills.includes(skill);
    return inAge && hasSkill;
  });

  return (
    <div>
      <div className="row g-3 align-items-center mb-3">
        <div className="col-auto">
          <input
            type="number"
            className="form-control"
            placeholder="Min age"
            value={min}
            onChange={e => setMin(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <input
            type="number"
            className="form-control"
            placeholder="Max age"
            value={max}
            onChange={e => setMax(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <select className="form-select" value={skill} onChange={e => setSkill(e.target.value)}>
            <option value="">-- Select skill --</option>
            {skills.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <ul className="list-group">
        {filtered.length > 0 ? (
          filtered.map(({ id, firstName, lastName, skills }) => (
            <li key={id} className="list-group-item">
              {firstName} {lastName} - <span className="text-muted">{skills.join(", ")}</span>
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted">No results found.</li>
        )}
      </ul>
    </div>
  );
}

export default Filter;