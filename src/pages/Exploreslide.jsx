import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { fetchOrdinals } from "../hooks/useFetch";
import Carousel from 'react-material-ui-carousel';
import { Link } from "react-router-dom";
import ContentDisplay from "../components/Dashboard/Content";

function Exploreslide() {
  const address = "bc1pgfmx47uegje06trqpd8szclsxhk5twsy46xmrydm32f42eajhvzsdk38ce";
  const { data } = useQuery({
    queryKey: ["Ordinals Slideshow"],
    queryFn: () => fetchOrdinals(address),
  });
  console.log(data?.results);
  return (
    <div className='w-full'>
      <Carousel indicatorContainerProps={{
        style: {
          // display: "none"
        }
      }}
        navButtonsAlwaysVisible
        animation='slide' >
        {data?.results.filter((item) =>
          item.content_type.startsWith("image/png"),
        ).map((ordinal) => {
          return (
            <div key={ordinal.id} className='h-full w-[290px] mx-auto'>
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
            </div>
          );
        })}
      </Carousel>


    </div>
  )
}

export default Exploreslide;