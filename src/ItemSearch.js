import React from 'react'

const ItemSearch = ({ searchItem, setSearchItem }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <input 
            type='searchbox'
            id='searchBox'
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
        />
    </form>
  )
}

export default ItemSearch