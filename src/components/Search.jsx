import React from 'react'

const Search = ({searchItem, setSearchItem}) => {
  return (
    <div className='search'>
        <div>
            <img src="/Vector.png" alt="" /> {/* Ensure absolute path */}
            <input type="text" 
            placeholder='Search for movies, series, and more...' 
            value={searchItem} 
            onChange={(e) => setSearchItem(e.target.value)} />
        </div>
    </div>
  )
}
export default Search
