import {FaPlus} from 'react-icons/fa';
import { useRef } from 'react';

const AddItem = ({newItem, setNewItem, handleSubmit}) => {

  const inputRef = useRef();

  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor="addItem">Add Item</label>
        <input 
            autoFocus
            ref={inputRef} // re-focus to the input after submitting 
            id='addItem'
            type='text'
            placeholder='Add Item'
            required 
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)} // anonymous function (e) is used yo handle user entered data (e.target.value)
        />
        <button
            type='submit'
            aria-label='Add Item'
            onClick={() => inputRef.current.focus() }
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItem