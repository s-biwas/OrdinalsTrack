import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { fetchInscriptionDetail, fetchInscriptionTransfer } from "../hooks/useFetch";
import ContentDisplay from "../components/Dashboard/Content";

export default function Detail() {
    const { id } = useParams();

    const { data: Details } = useQuery({
        queryKey: ["OrdinalsInscription", id],
        queryFn: () => fetchInscriptionDetail(id),
    });

    //Details has table data

    const { data: Transfers } = useQuery({
        queryKey: ["Transfers", id],
        queryFn: () => fetchInscriptionTransfer(id),
    });


    return (
        <div className="max-w-screen-xl min-h-[70vh] mx-auto flex flex-col md:flex-row my-14">
            <div className="basis-3/12 h-fit rounded-md">{Details &&
                <ContentDisplay
                    id={Details.id}
                    content_type={Details.content_type}
                />
            }
            </div>
            {/* <TableContainer component={Paper} style={{
                background: "transparent", border: "2px solid white"
            }}>
                <Table >
                    <TableHead>
                        <TableRow >

                            <TableCell style={{ color: "#eee" }} >ID</TableCell>
                            <TableCell style={{ color: "#eee" }}>Number</TableCell>
                            <TableCell style={{ color: "#eee" }}>Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.results?.map((ordinal) => (
                            <TableRow key={ordinal.id}>
                                <TableCell style={{ color: "#eee" }}>{ordinal.id && ordinal.id.slice(0, 5)}</TableCell>
                                <TableCell style={{ color: "#eee" }}>{ordinal.number}</TableCell>
                                <TableCell style={{ color: "#eee" }}>{ordinal.address && ordinal.address.slice(0, 10)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </div>
    )
}
