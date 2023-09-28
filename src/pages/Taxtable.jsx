import React from 'react'
import { useTable, useSortBy } from 'react-table'
import { CSVLink } from "react-csv";

function Taxtable({ data }) {//data is coming as props from the parent component
  const columns = React.useMemo(
    () => [
      {
        Header: 'Account No.',//this is the head of column
        accessor: 'id',//this is the data of head account no. Here they takes the value of array object id from the props data 
      },
      {
        Header: 'tax year ',
        accessor: 'taxYear',
      },
      {
        Header: 'date ordinals acquired',
        accessor: 'ordinalAcuired',
      },
      {
        Header: 'price ordinals acquired (sats)',
        accessor: 'acquiredSats',
      },
      {
        Header: 'price ordinals acquired  (dollar)',
        accessor: 'acquiredDollor',
      },
      {
        Header: 'price ordinals sold (sats)',
        accessor: 'soldSats',
      },
      {
        Header: 'price ordinals sold (dollar)',
        accessor: 'soldDollor',
      },
      {
        Header: 'net profit/loss -- sats',
        accessor: 'netSats',
      },
      {
        Header: 'net profit/loss -- dollar',
        accessor: 'netDollor',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy)
  return (
    <div>
      <table {...getTableProps()} style={{ margin: 'auto' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <CSVLink data={data} filename={"tax_table.csv"}>Download CSV</CSVLink>
    </div>
  )
}

export default Taxtable

