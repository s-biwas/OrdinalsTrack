import ContentDisplay from "./Content";
import { Link } from "react-router-dom";

export default function Ordinals({ ordinalData }) {
  return (
    <>
      <div className="">
        {ordinalData?.results?.length === 0 && (
          <span className="text-gradient col-span-3 text-center text-lg font-bold uppercase lg:text-xl">
            Sorry, you don&apos;t have any inscribed ordinals in your wallet!
          </span>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          {ordinalData?.results?.map((ordinal) => {
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
      </div>
    </>
  );
}
