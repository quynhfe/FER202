import { useEffect, useState } from "react";
import { Table, Input, Button, Select, Space } from "antd";
const { Option } = Select;


const companies = [
    { key: 1, name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { key: 2, name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { key: 3, name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { key: 4, name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { key: 5, name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { key: 6, name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { key: 7, name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { key: 8, name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { key: 9, name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const column = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Start Year',
        dataIndex: 'start',
        key: 'start',
    },
    {
        title: 'End Year',
        dataIndex: 'end',
        key: 'end',
    },
    {
        title: 'Duration (years)',
        key: 'duration',
        render: (_, record) => record.end - record.start
    }
];


function ListCompanies() {
    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [filteredData, setFilteredData] = useState(companies);



     useEffect(() => {
        let data = [...companies];

        if (searchText) {
            data = data.filter(company =>
                company.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (categoryFilter) {
            data = data.filter(item => item.category === categoryFilter);
        }

        if (sortOption === "yearAsc") {
            data.sort((a, b) => a.start - b.start);
        } else if (sortOption === "yearDesc") {
            data.sort((a, b) => b.start - a.start);
        } else if (sortOption === "startEnd") {
            data.sort((a, b) => a.end - b.end);
        }

        setFilteredData(data);
    }, [searchText, sortOption, categoryFilter]);


    return (
        <div>
            <h1>Companies List</h1>

            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Search company..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button type="primary" onClick={() => {}}>
                    Search
                </Button>

                <Select
                    placeholder="Sort by"
                    style={{ width: 160 }}
                    onChange={(value) => setSortOption(value)}
                    allowClear
                >
                    <Option value="yearAsc">Year increases</Option>
                    <Option value="yearDesc">Year decreases</Option>
                    <Option value="startEnd">Start-End</Option>
                </Select>

                <Select
                    placeholder="Filter Category"
                    style={{ width: 160 }}
                    onChange={(value) => setCategoryFilter(value)}
                    allowClear
                >
                    <Option value="Finance">Finance</Option>
                    <Option value="Retail">Retail</Option>
                    <Option value="Auto">Auto</Option>
                    <Option value="Technology">Technology</Option>
                </Select>
            </Space>

            {filteredData.length > 0 ? (
                <Table
                    dataSource={filteredData}
                    columns={column}
                    pagination={false}
                    bordered
                />
            ) : (
                <p>No result</p>
            )}
        </div>
    );
}

export default ListCompanies
