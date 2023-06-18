import Link from "next/link"


const Winners = () => {
    return (
        <div className="bg-[#EDE8DB] flex flex-col items-center p-16 my-6 rounded-md">
            <h1 className="text-3xl leading-tight text-cs_green">
                Great Choices!
            </h1>
            <p className="mt-4 text-gray-600 max-w-[280px] text-center mb-8">
                You have reached the 5 film limit. Remove any film to select a new one.
            </p>
            <Link href="results" className="py-3 px-6 font-semibold bg-[#008060] text-white rounded  focus:shadow-[#00806080] hover:shadow-[#00806080] shadow-xl border border-transparent hover:bg-cs_green transition duration-500">Reveal Winner!</Link>
        </div>
    )
}

export default Winners