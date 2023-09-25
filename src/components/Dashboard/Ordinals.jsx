import { useQuery } from "@tanstack/react-query"
import { fetchOrdinals } from "../../hooks/useFetch";
import ContentDisplay from "./Content";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function Ordinals({ address }) {

    const { data } = useQuery({
        queryKey: ["Ordinals", address],
        queryFn: () => fetchOrdinals(address),
    });

    return (
        <>
  <TableContainer component={Paper} style={{
    background:"transparent", border:"2px solid white"
  }}>
        <Table >
          <TableHead>
            <TableRow >
             
              <TableCell style={{color:"#eee"}} >ID</TableCell>
              <TableCell style={{color:"#eee"}}>Number</TableCell>
              <TableCell style={{color:"#eee"}}>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.results?.map((ordinal) => (
              <TableRow key={ordinal.id}>
                <TableCell style={{color:"#eee"}}>{ordinal.id && ordinal.id.slice(0,5)}</TableCell>
                <TableCell style={{color:"#eee"}}>{ordinal.number}</TableCell>
                <TableCell style={{color:"#eee"}}>{ordinal.address && ordinal.address.slice(0,10)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 my-5">

            {(data?.results?.length === 0) &&
                <span className="col-span-3 text-center text-lg lg:text-xl font-bold text-gradient uppercase">
                    Sorry, you don&apos;t have any inscribed ordinals in your wallet!
                </span>
            }

            {data?.results?.map((ordinal) => {
                return (
                    <div key={ordinal.id} className="p-5 cursor-pointer group relative  ">
                        <ContentDisplay id={ordinal.id} content_type={ordinal.content_type} number={ordinal.number}/>
                    </div>
                )
            })}
        </div>
        </>
    )
}
