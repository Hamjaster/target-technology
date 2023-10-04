import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TablePagination, TableSortLabel, TextField } from '@material-ui/core';

export default function Users() {
    const [ageOrderDirection, setAgeOrderDirection] = useState("asc");
    const [serialOrderDirection, setSerialOrderDirection] = useState('asc')
    const [pages, setPages] = useState([5, 10, 15])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchQuery, setSearchQuery] = useState('')
    const [rows, setRows] = useState([
        { no: '1', name: 'Hamza', age: '18', role: 'Front-end dev', gender: 'M' },
        { no: '2', name: 'Hasnat', age: '24', role: 'Back-end dev', gender: 'M' },
        { no: '3', name: 'Sarah', age: '30', role: 'UI/UX Designer', gender: 'F' },
        { no: '4', name: 'John', age: '28', role: 'Full-stack dev', gender: 'M' },
        { no: '5', name: 'Alice', age: '22', role: 'Front-end dev', gender: 'F' },
        { no: '6', name: 'Michael', age: '35', role: 'Back-end dev', gender: 'M' },
        { no: '7', name: 'Emily', age: '26', role: 'UI/UX Designer', gender: 'F' },
        { no: '8', name: 'Daniel', age: '32', role: 'Full-stack dev', gender: 'M' },
        { no: '9', name: 'Olivia', age: '29', role: 'Front-end dev', gender: 'F' },
        { no: '10', name: 'Ethan', age: '23', role: 'Back-end dev', gender: 'M' },
        { no: '11', name: 'Ava', age: '27', role: 'UI/UX Designer', gender: 'F' },
        { no: '12', name: 'William', age: '31', role: 'Full-stack dev', gender: 'M' },
        { no: '13', name: 'Sophia', age: '25', role: 'Front-end dev', gender: 'F' },
        { no: '14', name: 'Liam', age: '19', role: 'Back-end dev', gender: 'M' },
        { no: '15', name: 'Mia', age: '28', role: 'UI/UX Designer', gender: 'F' },
        { no: '16', name: 'James', age: '33', role: 'Full-stack dev', gender: 'M' },
        { no: '17', name: 'Emma', age: '26', role: 'Front-end dev', gender: 'F' },
        { no: '18', name: 'Benjamin', age: '20', role: 'Back-end dev', gender: 'M' },
        { no: '19', name: 'Charlotte', age: '29', role: 'UI/UX Designer', gender: 'F' },
        { no: '20', name: 'Lucas', age: '34', role: 'Full-stack dev', gender: 'M' },
        { no: '21', name: 'Amelia', age: '24', role: 'Front-end dev', gender: 'F' },
        { no: '22', name: 'Henry', age: '21', role: 'Back-end dev', gender: 'M' },
        { no: '23', name: 'Ella', age: '30', role: 'UI/UX Designer', gender: 'F' },
        { no: '24', name: 'Alexander', age: '28', role: 'Full-stack dev', gender: 'M' },
        { no: '25', name: 'Lily', age: '23', role: 'Front-end dev', gender: 'F' },
        { no: '26', name: 'Sebastian', age: '31', role: 'Back-end dev', gender: 'M' },
        { no: '27', name: 'Grace', age: '27', role: 'UI/UX Designer', gender: 'F' },
        { no: '28', name: 'Matthew', age: '22', role: 'Full-stack dev', gender: 'M' },
        { no: '29', name: 'Chloe', age: '25', role: 'Front-end dev', gender: 'F' },
        { no: '30', name: 'Daniel', age: '29', role: 'Back-end dev', gender: 'M' },
    ])

    const sortByAge = (arr, orderBy) => {
        switch (orderBy) {
            case "asc":
            default:
                return arr.sort((a, b) =>
                    a.age > b.age ? 1 : b.age > a.age ? -1 : 0
                );
            case "desc":
                return arr.sort((a, b) =>
                    a.age < b.age ? 1 : b.age < a.age ? -1 : 0
                );
        }
    };

    const sortBySerial = (arr, orderBy) => {
        switch (orderBy) {
            case 'asc':
                console.log(orderBy);
                return arr.sort((a, b) =>
                    a.no - b.no
                );

            case 'desc':
                console.log(orderBy);
                return arr.sort((a, b) =>
                    b.no - a.no
                );

            default:
                break;
        }
    }

    const handleSortAge = () => {
        setRows(sortByAge(rows, ageOrderDirection));
        setAgeOrderDirection(ageOrderDirection === "asc" ? "desc" : "asc");
    };

    const handleSortSerialNo = () => {

        setRows(sortBySerial(rows, serialOrderDirection))
        console.log(sortBySerial(rows, serialOrderDirection))
        setSerialOrderDirection(serialOrderDirection === "asc" ? "desc" : "asc")
    }

    const rowsAfterPagingAndFiltering = () => {
        if (searchQuery === '') {
            return rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
        }
        else {
            return rows
                .filter((row) => {
                    return row.name.toLowerCase().includes(searchQuery.toLowerCase())
                })
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
        }
    }


    return (

        <>

            <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                style={{ marginBottom: 16 }}
            />

            <TableContainer component={Paper}>
                <Table aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableSortLabel onClick={handleSortSerialNo} active={true} direction={serialOrderDirection}>
                                <TableCell>S.No</TableCell>
                            </TableSortLabel>
                            <TableCell>Name</TableCell>
                            <TableSortLabel onClick={handleSortAge} active={true} direction={ageOrderDirection}>
                                <TableCell>Age</TableCell>
                            </TableSortLabel>
                            <TableCell>Role</TableCell>
                            <TableCell>Gender</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rowsAfterPagingAndFiltering()

                            .map((row) => (
                                <TableRow key={row.no}>
                                    <TableCell>{row.no}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.age}</TableCell>
                                    <TableCell align="left">{row.role}</TableCell>
                                    <TableCell align="left">{row.gender}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={pages}
                    page={page}
                    count={searchQuery === '' ? rows.length : rows.filter(row => row.name.toLowerCase().includes(searchQuery.toLowerCase())).length}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(e.target.value)
                    }}
                />

            </TableContainer>

        </>


    )
}
