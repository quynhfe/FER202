import React from "react";
import { persons } from "../data/person";

function SkillRanking() {
  const skillCount = persons.reduce((acc, p) => {
    p.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});

  const sorted = Object.entries(skillCount).sort(([, countA], [, countB]) => countB - countA);
  const topCount = sorted[0]?.[1];

  return (
    <table className="table table-hover table-bordered" style={{ maxWidth: '300px' }}>
      <thead className="table-dark">
        <tr>
          <th>Skill</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(([skill, count]) => (
          <tr key={skill}>
            <td>{count === topCount ? <strong>{skill}</strong> : skill}</td>
            <td>{count === topCount ? <strong>{count}</strong> : count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SkillRanking;