import React from 'react';
import { Table } from 'antd';

const people = [
  { key: 1, name: 'Jack', age: 50 },
  { key: 2, name: 'Michael', age: 9 },
  { key: 3, name: 'John', age: 40 },
  { key: 4, name: 'Ann', age: 19 },
  { key: 5, name: 'Elisabeth', age: 16 }
];

const columns = [
  {
    title: 'Name',      
    dataIndex: 'name',   
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }
];

export default function PeopleTable() {
  return (
    <div className='App'>
      <h1>People List</h1>
      <Table
      dataSource={people}  
      columns={columns}     
      pagination={false}    
      bordered              
    />
    </div>
  );
}
