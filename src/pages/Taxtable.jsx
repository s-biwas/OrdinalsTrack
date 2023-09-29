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
        Header: 'Tax year ',
        accessor: 'taxYear',
      },
      {
        Header: 'Date Ordinals Acquired',
        accessor: 'ordinalAcuired',
      },
      {
        Header: 'Price Ordinals Acquired (sats)',
        accessor: 'acquiredSats',
      },
      {
        Header: 'Price Ordinals Acquired  (dollar)',
        accessor: 'acquiredDollor',
      },
      {
        Header: 'Price Ordinals Sold (sats)',
        accessor: 'soldSats',
      },
      {
        Header: 'Price Ordinals Sold (dollar)',
        accessor: 'soldDollor',
      },
      {
        Header: 'Net profit/loss -- sats',
        accessor: 'netSats',
      },
      {
        Header: 'Net profit/loss -- dollar',
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
      <table {...getTableProps()} style={{ margin: 'auto', borderCollapse: 'collapse', width: '100%', backgroundColor: "#111" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: '#222' }}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    padding: '8px',
                    fontWeight: 'bold',
                    borderBottom: '2px solid #ddd',
                    textAlign: 'left',
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ borderBottom: '1px solid #ddd' }}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '8px',
                      textAlign: 'left',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <CSVLink data={data} filename={'tax_table.csv'} style={{ display: 'block', marginTop: '20px' }}>
        Download CSV
      </CSVLink>
    </div>
  )
}

export default Taxtable

