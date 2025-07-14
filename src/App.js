
import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer'; 
import { useState, useEffect} from "react";
import apiRequest from './apiRequest';

function App() {
  const API_URL ='http://localhost:3500/items'

  const [items, setItems] = useState([]); //ShoppingList here is case sensitive with one set in the localStorage

  const [newItem, setNewItem] = useState('');

  const [search, setSearch] = useState('');

  const [fetchError, setFetchError] = useState(null);

  const[isLoading, setIsLoading] = useState(true);


  useEffect(() => { // we can't use async here directly we must make a method and call it 

    const fetchItems = async () => {

      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Didn't received expected data");
        const listItems =  await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch(err) {
        setFetchError(err.message);
      } finally{
        setIsLoading(false);
      }
    }

    setTimeout(() => { // we don't need this it is just simlulation for loading time 
        (async () => await fetchItems())();//that is the original line without setTimeOut
    },2000)
    
  }, [])//empty array means useEffect happens at a one time 


  // const setAndSaveItems = (newItems) => {
  //     setItems(newItems); // return new list 
      
  // }

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id, checked : false, item}
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method : 'POST',
      Headers : {
        'Content-Type':'applicaton/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if(result) setFetchError(result);
  }

    const handleCheck = async (id) =>{
      const listItems = items.map((item) => 
      item.id === id //check if id refers to an item id in the list
          ? {...item, checked: !item.checked } // Toggle if it's the matching item
          : item); // Otherwise, leave it unchanged

          // Step 2: Update the UI immediately with the new list (React state)
          setItems(listItems); 
    
      // Step 3: Find the updated item from the new list (for use in the PATCH request)      
      const myItem = listItems.filter((item) =>item.id === id );

      // Step 4: Prepare the options object for the PATCH request
      const updateOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json' // Let the server know we are sending JSON
        },
        body: JSON.stringify({checked : myItem[0].checked})// Send the updated "checked" value
      };      

      // Step 5: Build the URL to update the specific item by ID
      const reqUrl = `${API_URL}/${id}`;

      // Step 6: Send the PATCH request to update the item in the backend (json-server)
      const result = await apiRequest(reqUrl, updateOptions);

      // Step 7: If there's an error (e.g., server is down), save it in fetchError to show in the UI
      if(result) setFetchError(result); 
  }

  const handleDelete = async (id) =>{
      const listItems = items.filter((item) => item.id !== id ) 
        setItems(listItems); // return new list 

      const deleteOptions = {method : 'DELETE'};
      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl, deleteOptions);
      if(result) setFetchError(result); 
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
        <main>
          {isLoading && <p>Loading Items...</p>}
          {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
          {!fetchError && !isLoading && <Content
            items = {items.filter(item =>((item.item).toLowerCase()).includes
            (search.toLocaleLowerCase()))}
            // setItems = {setItems}
            handleCheck = {handleCheck}
            handleDelete = {handleDelete}
          />}
        </main>
        <Footer  length = {items.length}/>
    </div>
  );
}

export default App;
