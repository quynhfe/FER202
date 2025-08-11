const People = [
  { name: 'Jack', age: 50 },
  { name: 'Michael', age: 9 },
  { name: 'John', age: 40 },
  { name: 'Ann', age: 19 },
  { name: 'Elisabeth', age: 16 }
]

function PeopleList() {
  return (
    <ul>
      <p>People List</p>
      {People.map((person, index) => (
        <li key={index}>
          {person.name} - {person.age} years old
        </li>
      ))}
    </ul>
  )
}

export default PeopleList
