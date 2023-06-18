"use client";
import { GiQueenCrown } from 'react-icons/gi'
import { useAppSelector } from '../_store/hooks'
import { useAppDispatch } from '../_store/hooks';
import { restart } from '../_store/movieSlice';
import Link from 'next/link'
const page = () => {
    const nominations = useAppSelector((state) => state.movie.nominations)
    const dispatch = useAppDispatch()
    const getStyleByIndex = (index: number): React.CSSProperties => {
        const styles: React.CSSProperties[] = [
            {
                zIndex: 3,
                position: 'relative',
                left: '80px',
                height: '101px',
                width: '68px',
                filter: 'blur(2px)',
            },
            {
                zIndex: 4,
                position: 'relative',
                width: '86px',
                height: '128px',
                left: '40px',
                filter: 'blur(1px)',
            },
            {
                position: 'relative',
                zIndex: 5,
                width: '105px',
            },
            {
                zIndex: 4,
                position: 'relative',
                width: '86px',
                height: '128px',
                right: '40px',
                filter: 'blur(1px)',
            },
            {
                zIndex: 3,
                position: 'relative',
                height: '101px',
                width: '68px',
                right: '80px',
                filter: 'blur(2px)',
            },
        ];

        return styles[index] || {};
    };


    const randomIndex = Math.floor(Math.random() * nominations.length);
    const randomNomination = nominations[randomIndex];

    // Convert the style object to a string of CSS properties
    // return Object.entries(style)
    //     .map(([key, value]) => `${key}: ${value};`)
    //     .join(' ');
    return (
        <div className='flex items-center justify-center w-full h-screen bg-cs_green'>
            <div className='flex justify-center items-center shadow-[0_20px_60px_rgba(0,0,0,0.7)] bg-cs_green h-[90%] w-[90%] my-5 mx-auto rounded-xl'>
                <div className='w-[90%] max-w-[830%] my-0 mx-auto'>
                    <GiQueenCrown size={70} className='mx-auto my-16 text-cs_light_white' />
                    <div className='flex items-center justify-center bg-cs_green text-[#008060] rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.3)]'>
                        {nominations.map((nominate, i) =>
                            i === 2 ? (
                                <img
                                    key={i}
                                    src={randomNomination.poster}
                                    alt={`${nominate.title} poster`}
                                    style={getStyleByIndex(2)}
                                />
                            ) :
                                (
                                    <img
                                        key={i}
                                        src={nominate.poster}
                                        alt={`${nominate.title} poster`}
                                        style={
                                            getStyleByIndex(i)
                                        }
                                    />
                                )
                        )}
                    </div>
                    <div className='relative z-[1] bottom-20 pt-24 border-t border-y-[#085948]'>
                        <div className='mt-[10px] p-5 text-[#c1f0d0] text-center flex flex-col gap-4'>
                            <p className='mt-4 text-lg'>The winner nominated movie.</p>
                            <h1 className='text-4xl font-bold tracking-widest'>{randomNomination?.title}</h1>
                            <Link onClick={() => dispatch(restart())} href="/" className='mt-10 py-3 px-6 bg-[#008060] hover:outline-offset-4 hover:outline outline-[#008060] transition-all duration-300 font-semibold text-cs_white rounded shadow-xl'>
                                Restart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default page
