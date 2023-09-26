import { useQuery } from "@tanstack/react-query";
import { getContent } from "../hooks/useFetch";

function ShowOrdinals() {
  const id =
    "cd35629a4c0def566b6e20a70357610e22f50a7a98ebe9ad0d9478a6f3a8edb2i0";
  const { data } = useQuery({
    queryKey: ["inscription"],
    queryFn: () => getContent(id),
  });

  console.log(data);
  return <div></div>;
}

export default ShowOrdinals;
