import React, { useState } from "react";
import { persons } from "../data/person";

function SearchSortStats() {
  const [query, setQuery] = useState("");

  const filtered = persons.filter(p =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (a.isActive !== b.isActive) return a.isActive ? -1 : 1; 
      if (a.age !== b.age) return a.age - b.age; 
      return a.lastName.localeCompare(b.lastName); 
    });

  const stats = filtered.reduce(
    (acc, p) => {
      acc.total++;
      acc.sumAge += p.age;
      if (p.isActive) acc.active++;
      return acc;
    },
    { total: 0, sumAge: 0, active: 0 }
  );
  const avgAge = stats.total ? (stats.sumAge / stats.total).toFixed(1) : "N/A";

  return (
    <div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by full name..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <ul className="list-group mb-3">
        {filtered.map(p => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            {p.firstName} {p.lastName} (Age: {p.age})
            <span className={`badge ${p.isActive ? 'bg-success' : 'bg-danger'}`}>
              {p.isActive ? "Active" : "Inactive"}
            </span>
          </li>
        ))}
      </ul>

      <div className="alert alert-secondary">
        <h4 className="alert-heading">Statistics</h4>
        <p className="mb-1">Total people: <strong>{stats.total}</strong></p>
        <p className="mb-1">Average age: <strong>{avgAge}</strong></p>
        <p className="mb-0">Active people: <strong>{stats.active}</strong></p>
      </div>
    </div>
  );
}

export default SearchSortStats;