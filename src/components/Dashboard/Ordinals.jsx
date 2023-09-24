import { useQuery } from "@tanstack/react-query"
import { fetchOrdinals } from "../../hooks/useFetch";

export default function Ordinals({ address }) {

    const { data } = useQuery({
        queryKey: ["Ordinals", address],
        queryFn: () => fetchOrdinals("bc1pqcdd4c0xq546fuwat4vhks4wx2scyamzd9ameg5awp9czptwq3lstuzunh"),
    });

    return (
        <div className="grid grid-cols-3 gap-3 my-5">
            {data?.results?.map((ordinal) => {
                return (
                    <div key={ordinal.id} className="p-5">
                        <img src={`https://api.hiro.so/ordinals/v1/inscriptions/${ordinal.id}/content`} />
                    </div>
                )
            })}
        </div>
    )
}
