"use client";
import { BiMoviePlay } from "react-icons/bi";
import { ImSearch } from "react-icons/im";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { useAppSelector } from "../_store/hooks";
import MoviesResults from "./MoviesResults";
import Loading from "../loading";
import NotFound from "../not-found";
import Winners from "./Winners";

interface MovieData {
    id: number
    Title: string
    Year: string
    imdbID: string
}

function LeftSide() {
    const [input, setInput] = useState<string>("")
    const [moviesData, setMoviesData] = useState<MovieData[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const isRendered = useRef<boolean>(false);

    const nominations = useAppSelector((state) => state.movie.nominations);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        isRendered.current = true;
    }

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true)
            const res = await fetch(`https://www.omdbapi.com/?s=${input}&apikey=13552153`)
            try {
                const data = await res.json()
                if (data.Response === "False") {
                    setMoviesData(null);
                }
                else {
                    setMoviesData(data.Search)
                }
                setIsLoading(false)
            }
            catch (err) {
                console.log(err)
            }
        }
        if (!isRendered.current) return;
        fetchMovies()
    }, [input])

    return (
        <div className="pb-8 lg:pb-0 bg-cs_white">
            <div className={`flex flex-col pl-[72px] pr-[72px] lg:w-3/5 lg:pr-0 ${moviesData ? "h-auto" : "h-screen"}`}>
                <header className="flex items-center gap-2 my-10">
                    <BiMoviePlay className="text-3xl text-green-700 " />
                    <span className="text-2xl font-bold text-gray-900">Movie App</span>
                </header>
                <article className="flex flex-col">
                    <h1 className="text-5xl font-bold leading-tight text-cs_brown">
                        Nominate — <span className="block text-cs_green">amazing cinema</span>
                    </h1>
                    <p className="mt-4 text-2xl text-gray-600">
                        Search below to nominate your top 5 favorite movies & series.
                    </p>
                </article>
                <div className="pt-1 mt-16">
                    <div className="relative">
                        <ImSearch
                            className="absolute text-gray-600 top-[50%] left-3 translate-y-[-50%]"
                            size={20}
                        />
                        <input
                            type="text"
                            className="w-full py-[18px] border box-border border-gray-800 rounded px-11 focus:outline-[0px] focus:shadow-[0_0_0_2px_rgb(0,128,96)] transition duration-500  focus:text-black"
                            placeholder="Search movie titles"
                            onChange={handleChange}
                            disabled={nominations.length === 5}
                            value={nominations.length === 5 ? "" : input}
                        />
                    </div>
                    {
                        nominations.length === 5 ?
                            (
                                < Winners />
                            )
                            : (
                                <>
                                    {input.length > 0 && (
                                        <h3 className="mt-8 mb-4 text-xl font-semibold">
                                            Movie results for <span className="text-cs_green">"{input}"</span>
                                        </h3>
                                    )}
                                    {input.length > 0 && isLoading ? (
                                        <Loading />
                                    ) : moviesData && moviesData.length > 0 ? (
                                        moviesData?.map((movie) => (
                                            <MoviesResults setInput={setInput} key={movie.imdbID} title={movie.Title} year={movie.Year} imdbID={movie.imdbID} />
                                        ))
                                    ) : (
                                        input.length > 0 && !isLoading && <NotFound />
                                    )}
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default LeftSide;

