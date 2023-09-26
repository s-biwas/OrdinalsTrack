import { useQuery } from "@tanstack/react-query";
import { fetchOrdinals } from "../hooks/useFetch";
import { useSelector } from "react-redux";

function ShowOrdinals() {
  const { inputAddress } = useSelector((state) => state.explore);
  const { data } = useQuery({
    queryKey: ["inscription", inputAddress],
    queryFn: () => fetchOrdinals(inputAddress),
  });
  const filteredOrdinals = data?.results.filter((item) =>
    item.content_type.startsWith("image/png"),
  );

  return (
    <div className="flex flex-wrap gap-4">
      {filteredOrdinals ? (
        filteredOrdinals?.map((image) => {
          return (
            <div key={image.id} className="h-48 w-48">
              <img
                src={getImage(image.id)}
                alt="nft image"
                className="h-full w-full rounded-md"
              />
            </div>
          );
        })
      ) : (
        <p>Seems like nothing is here</p>
      )}
    </div>
  );
}

export default ShowOrdinals;

function getImage(id) {
  return `https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`;
}
