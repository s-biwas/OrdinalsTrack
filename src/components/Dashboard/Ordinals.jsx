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

            {(data?.results?.length === 0) &&
                <span className="col-span-3 text-center text-lg lg:text-xl font-bold text-gradient uppercase">
                    Sorry, you don&apos;t have any inscribed ordinals in your wallet!
                </span>
            }

            {data?.results?.map((ordinal) => {
                console.log(ordinal.content_type)
                return (
                    <div key={ordinal.id} className="p-5 cursor-pointer group relative">
                        <ContentDisplay id={ordinal.id} content_type={ordinal.content_type} number={ordinal.number} />
                    </div>
                )
            })}
        </div>
    )
}
