import { useQuery } from "@tanstack/react-query"
import { fetchOrdinals } from "../../hooks/useFetch";
import ContentDisplay from "./Content";

export default function Ordinals({ address }) {

    const { data } = useQuery({
        queryKey: ["Ordinals", address],
        queryFn: () => fetchOrdinals(address),
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 my-5">
            {data?.results?.map((ordinal) => {
                console.log(ordinal);
                return (
                    <div key={ordinal.id} className="p-5 cursor-pointer group">
                        <ContentDisplay id={ordinal.id} content_type={ordinal.content_type} />
                    </div>
                )
            })}
        </div>
    )
}
