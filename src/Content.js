import React from 'react'
import ItemsList from './ItemsList';

export const Content = ({ items, handleCheck, handleDelete}) => {
  return (
    <>
      <ItemsList
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default Content