import React from 'react'

export const ListItem = ({ item, handleCheck, handleDelete}) => {
  return (
    <li>
        <input type='checkbox' checked={item.checked} onChange={() => handleCheck(item.id)}/>
        <label>{item.item}</label>
        <button onClick={() => handleDelete(item.id)}>Del</button>
    </li>
  )
}
