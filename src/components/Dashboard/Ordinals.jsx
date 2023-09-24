import { useQuery } from "@tanstack/react-query"
import { fetchOrdinals } from "../../hooks/useFetch";

export default function Ordinals(address) {

    const { data } = useQuery({
        queryKey: ["Ordinals", address],
        queryFn: () => fetchOrdinals(address),
    });

    console.log(data);

    return (
        <div>

        </div>
    )
}
