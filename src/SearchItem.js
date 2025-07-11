import React from 'react'

const SearchItem = ({search, setSearch}) => {
  return (
        <form className='searchForm' onSubmit={(e) => e.preventDefault() }>
            <label htmlFor="search">Search</label>
            <input 
                id='search' //Always make sure the label’s htmlFor matches the input’s id exactly
                type="text" 
                role='searchbox'
                placeholder='Search Items'
                value={search} //current search value
                onChange={(e) => setSearch(e.target.value)} //update the search value whenever user change it
            />
        </form>
  )
}

export default SearchItem