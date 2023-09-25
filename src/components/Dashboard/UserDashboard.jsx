import { useEffect, useState } from 'react';
import { fetchOrdinals } from '../../hooks/useFetch';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const UserDashboard = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordinals = await fetchOrdinals('bc1pgfmx47uegje06trqpd8szclsxhk5twsy46xmrydm32f42eajhvzsdk38ce');
        setData({ ordinals });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div>
        {data ? (
          <>
            <h2>Ordinals:</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.ordinals.map((ordinal) => (
                    <TableRow key={ordinal.id}>
                      <TableCell>{ordinal.number}</TableCell>
                      <TableCell>{ordinal.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
       
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;