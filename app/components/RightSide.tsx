"use client";
import { useAppSelector } from "../_store/hooks";
import NominatedMovie from "./NominatedMovie";
function RightSide() {
  const nominations = useAppSelector((state) => state.movie.nominations);


  return (
    <div className={` bg-cs_green py-6 px-5 lg:w-3/6 h-auto`}>
      <div className="flex lg:justify-end justify-center items-stretch mr-12 mb-[74px] text-cs_light_white">
        <p className="flex items-center my-4 font-extralight">Nominated <span className="ml-2 text-2xl">{nominations.length}/5</span></p>
      </div>
      {nominations.map((movie, index) => <NominatedMovie key={index} index={index} title={movie.title} imdbRating={movie.imdbRating} id={movie.id} rated={movie.rated} poster={movie.poster} genre={movie.genre} />)}
    </div>
  );
}

export default RightSide;
