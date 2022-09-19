import React from 'react'

const Footer = ({ items }) => {
  return (
    <footer>{(items.length === 0 ? 'No' : items.length) + ' list ' + (items.length === 1 ? 'item' : 'items')}</footer>
  )
}

export default Footer