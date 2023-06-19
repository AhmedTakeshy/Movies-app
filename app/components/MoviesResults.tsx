import { useAppDispatch, useAppSelector } from "../_store/hooks";
import { addMovie } from "../_store/movieSlice";

interface MovieProps {
    title: string
    year: string
    imdbID: string
    setInput: React.Dispatch<React.SetStateAction<string>>
}


const MoviesResults = ({ title, year, imdbID, setInput }: MovieProps) => {
    const dispatch = useAppDispatch()
    const nominations = useAppSelector((state) => state.movie.nominations);

    const addMovieToNominations = async () => {
        const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=13552153`)
        try {
            const data = await res.json()
            dispatch(addMovie(
                {
                    id: data.imdbID, title: data.Title, poster: data.Poster, imdbRating: data.imdbRating, rated: data.Rated, genre: data.Genre
                }
            ))
        }
        catch (err) {
            console.log(err)
        }
    }
    const isNominated = nominations.some((nomination) => nomination.id === imdbID)
    return (
        <div className='flex items-center py-6 border-gray-300 border-t mt-[-1px] justify-between'>
            <article className='flex flex-col items-start'>
                <h3 className='text-xl text-[#008060]'>{title}</h3>
                <p className='text-lg text-gray-600'>{year}</p>
            </article>
            <button disabled={isNominated} onClick={addMovieToNominations} className='py-3 px-6 bg-[#008060] text-white rounded shadow-md border border-transparent hover:bg-cs_green transition-colors duration-500 disabled:bg-[#e2e6dc] disabled:shadow-none'>Nominate</button>
        </div>
    )
}

export default MoviesResults
