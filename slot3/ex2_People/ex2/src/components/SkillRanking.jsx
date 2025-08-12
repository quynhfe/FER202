import React from "react";
import { persons } from "../data/person";

function SkillRanking() {
  const skillCount = persons.reduce((acc, p) => {
    p.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});

  const sorted = Object.entries(skillCount).sort((a, b) => b[1] - a[1]);
  const topCount = sorted[0]?.[1];

  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>Skill</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(([skill, count]) => (
          <tr key={skill} style={{ fontWeight: count === topCount ? "bold" : "normal" }}>
            <td>{skill}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SkillRanking;
