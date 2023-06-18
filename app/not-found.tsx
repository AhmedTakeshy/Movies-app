import React from 'react'

const NotFound = () => {
    return (
        <div className='flex flex-col items-center bg-red-100 text-rose-600 p-3 rounded border border-rose-200'>
            <p><strong>Too many results.</strong></p>
            <p>Please adjust your search.</p>
        </div>
    )
}

export default NotFound