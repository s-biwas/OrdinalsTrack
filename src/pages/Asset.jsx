import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import LoadingBar from 'react-top-loading-bar'
import InfiniteScroll from "react-infinite-scroll-component";
import 'tailwindcss/tailwind.css';

export default function Shop() {
    const [search, setSearch] = useState("nepal");
    const [loading, setLoading] = useState(false);
    const [totalResult, setTotalResult] = useState(0);
    const [page, setPage] = useState(1);
    const [image, setImage] = useState([]);
    const [progress, setProgress] = useState(0)
    const handleChange = (event) => {
        setSearch(event.target.value);
    }
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(search);
        fetchdata();
    }

    const fetchdata = async () => {
        setProgress(20)
        setLoading(true)
        const url = `https://api.pexels.com/v1/search?query=${search}&per_page=12&page=${page}`;
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: 'ZHHmlIMaTJQcOccs5hdOMouRGG2MlYEsMiIJSn3TpqF6Uw7lrswSPeol'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                setProgress(60)
                let Data = await response.json();
                setImage(Data.photos);
                setTotalResult(Data.total_results)
                console.log(Data.photos);
                setLoading(false);
                setProgress(100)
            }
        } catch (error) {
            console.log('Fetch failed: ', error);
        }
    };
    const fetchMoreData = async () => {
        setPage(page + 1);
        const url = `https://api.pexels.com/v1/search?query=${search}&per_page=12&page=${page}`;
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: 'ZHHmlIMaTJQcOccs5hdOMouRGG2MlYEsMiIJSn3TpqF6Uw7lrswSPeol'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                let Data = await response.json();
                setImage(image.concat(Data.photos));
                setTotalResult(Data.total_results)
                console.log(Data.photos);
            }
        } catch (error) {
            console.log('Fetch failed: ', error);
        }
    };

    useEffect(() => {
        fetchdata();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (

        <div className="container mx-auto">

            <div className="shop-nav">
                <LoadingBar
                    color='#f11946'
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                />
                {/* <h2>Shop</h2> */}

                <div className="search-bar my-3">
                    <form onSubmit={handleSearch} className="flex justify-center">
                        <input
                            type="text"
                            placeholder="Search by title"
                            onChange={handleChange}
                            required
                            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-black text-sm focus:outline-none"
                        />
                        <input type='submit' value='Search' className='btn btn-primary mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' />
                    </form>
                </div>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={image.length}
                    next={fetchMoreData}
                    hasMore={image.length !== totalResult}
                    loader={!loading && <Spinner />}
                >
                    <div className="shop-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {image.map((element) => (
                            <div key={element.src.original} className="img-grid max-w-sm rounded overflow-hidden shadow-lg m-2">
                                <figure key={element.src.original}>
                                    <img src={element.src.medium} alt="img" className="w-full object-cover h-48" />
                                    <figcaption className="px-6 py-4">{element.alt.slice(0, 30)}...</figcaption>
                                    <figcaption className="px-6 py-4"><a href={element.url} rel="noreferrer" target='_blank' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Download</a></figcaption>
                                </figure>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}
