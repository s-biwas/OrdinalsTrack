import { useQuery } from "@tanstack/react-query";
import { fetchOrdinals } from "../../hooks/useFetch";
import ContentDisplay from "./Content";
import { Link } from "react-router-dom";

export default function Ordinals({ address }) {
  const { data } = useQuery({
    queryKey: ["Ordinals"],
    queryFn: () => fetchOrdinals(address),
  });

  return (
    <>
      <div className="my-5 grid grid-cols-1 gap-3  sm:grid-cols-2 lg:grid-cols-3">
        {data?.results?.length === 0 && (
          <span className="text-gradient col-span-3 text-center text-lg font-bold uppercase lg:text-xl">
            Sorry, you don&apos;t have any inscribed ordinals in your wallet!
          </span>
        )}

        {data?.results?.map((ordinal) => {
          return (
            <Link
              key={ordinal.id}
              to={`/detail/${ordinal.id}`}
              className="group relative cursor-pointer p-5"
            >
              <ContentDisplay
                id={ordinal.id}
                content_type={ordinal.content_type}
                number={ordinal.number}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
