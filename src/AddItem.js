import React, { useRef } from 'react'

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRf = useRef();
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
        <input
            required
            ref={inputRf}
            type='text'
            id='addInput'
            onChange={(e) => setNewItem(e.target.value)}
            value={newItem}
        />
        <button onClick={() => inputRf.current.focus()}>Add</button>
    </form>
  )
}

export default AddItem;