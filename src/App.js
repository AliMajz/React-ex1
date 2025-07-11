
import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer'; 
import { useState, useEffect} from "react";

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('ShoppingList')) || []); //ShoppingList here is case sensitive with one set in the localStorage

  const [newItem, setNewItem] = useState('');

  const [search, setSearch] = useState('');


  useEffect(() => {
    localStorage.setItem('ShoppingList', JSON.stringify(items));
  }, [items])


  // const setAndSaveItems = (newItems) => {
  //     setItems(newItems); // return new list 
      
  // }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id, checked : false, item}
    const listItems = [...items, myNewItem];
    setItems(listItems);
  }

    const handleCheck = (id) =>{
      const newListItems = items.map((item) => 
      item.id === id //check if id refers to an item id in the list
          ? {...item, checked: !item.checked } //if yes create new object item and reverse the check 
          : item); // if false keep the item the same 
          setItems(newListItems); // return new list 
          
  }

  const handleDelete = (id) =>{
      const newListItems = items.filter((item) => item.id !== id ) 
      setItems(newListItems); // return new list 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return; //in case no new item is written

    //else set the new item 
    addItem(newItem);//from state
    setNewItem('');
  }



  return (
    <div className="App">
        <Header 
          title = "Groceries" 
        />

        <AddItem 
          newItem = {newItem}
          setNewItem = {setNewItem}
          handleSubmit = {handleSubmit}
        />

        <SearchItem
          search = {search}
          setSearch = {setSearch}
        />

        <Content
          items = {items.filter(item =>((item.item).toLowerCase()).includes
          (search.toLocaleLowerCase()))}
          // setItems = {setItems}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
        />
        <Footer  length = {items.length}/>
    </div>
  );
}

export default App;
