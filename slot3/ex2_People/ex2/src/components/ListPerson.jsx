import React, { useState } from "react";
import { persons } from "../data/person";

function ListPerson() {
  const [data, setData] = useState(persons);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = () => {
    const sorted = [...data].sort((a, b) =>
      sortAsc
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName)
    );
    setData(sorted);
    setSortAsc(!sortAsc);
  };

  return (
    <div>
      <button onClick={handleSort} className="btn btn-primary mb-3">
        Sort First Name: {sortAsc ? "A → Z" : "Z → A"}
      </button>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, firstName, lastName, age, city, skills }) => (
            <tr key={id}>
              <td>{`${firstName} ${lastName}`}</td>
              <td>{age}</td>
              <td>{city}</td>
              <td>{skills.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPerson;