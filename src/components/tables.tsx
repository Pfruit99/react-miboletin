import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React,{FC, useState} from 'react';












interface User {
  key: number;
  name: string;
  age:number;
  address:string;
}

const columns: ColumnsType<User> = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
  },  {
      key: 'age',
    title: 'Age',
    dataIndex: 'age',
  },
  {
      key: 'address',
    title: 'Address',
    dataIndex: 'address',
  },
];

const [datasource, setDataSource]=useState([
    
])


const data: User[] = [
  {
    key: 0,
    name: 'Jack',
    age: 18,
    address: '10 Downing Street'
  },
];

const tables: React.FC = () => (
  <>
    <button onClick={}>Añadir nuevo estudiante</button>

    <Table<User> columns={columns} dataSource={data} />
    {/* JSX style usage */}
    <Table<User> dataSource={data}>
      <Table.Column<User> key="name" title="Name" dataIndex="name" />
    </Table>
  </>
);

export default tables;