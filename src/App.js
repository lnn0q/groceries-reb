import Header from './Header'
import Content from './Content'
import Footer from './Footer'

import { useState, useEffect } from 'react'
import AddItem from './AddItem';
import ItemSearch from './ItemSearch';
import apiRequest from './apiRequest';


function App() {
  const [items, setItems] = useState('');
  const [newItem, setNewItem] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // const [items, setItems] = useState(JSON.parse(localStorage.getItem('groceries')) || [
  //   {
  //     id: 1,
  //     checked: false,
  //     item: 'Salt'
  //   },
  //   {
  //     id: 2,
  //     checked: true,
  //     item: 'Pepper'
  //   },
  //   {
  //     id: 3,
  //     checked: false,
  //     item: 'Tomato'
  //   }
  // ]);

  // useEffect(() => {
  //   localStorage.setItem('groceries', JSON.stringify(items));
  // }, [items]);

  const API_URL = 'http://localhost:3500/items';
  useEffect(() => {
    const recieveList = async() => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Failed recieve data');
        const JSONresponse = await response.json();
        setItems(JSONresponse);
        setIsLoading(false);
        setFetchError(null);
      } catch(err) {
        setFetchError(err.message);
      }    
    }
    recieveList();
  }, [])

  const addNewItem = async() => {
    const myNewItem = {
      id: items[items.length - 1].id + 1,
      checked: false,
      item: newItem
    }
    const listItems = [...items, myNewItem];
    setItems(listItems);
    setNewItem('');
    
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if(result) setFetchError(result);
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    if(newItem) {
      addNewItem();
    }
  }

  const handleCheck = async(id) => {
    const listItems = items.map(item => item.id === id ? {...item, checked: !item.checked} : item);
    setItems(listItems);

    const myItem = listItems.filter(item => item.id === id ? item : null);

    const checkOptions = {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }
    const myUrl = `${API_URL}/${id}`
    const result = await apiRequest(myUrl, checkOptions);
    if(result) setFetchError(result);
  }

  const handleDelete = async(id) => {
    const listItems = items.filter(item => item.id !== id ? item : null);
    setItems(listItems);

    const deleteOptions = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    }
    const myUrl = `${API_URL}/${id}`;
    const result = await apiRequest(myUrl, deleteOptions);
    if(result) setFetchError(result);
  }
  return (
    <div className="App">
      <Header />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        addNewItem={addNewItem}
        handleSubmit={handelSubmit}
      />
      <ItemSearch 
        searchItem={searchItem}
        setSearchItem={setSearchItem}
      />
      {isLoading && <p style={{color: 'green'}}>Loading list...</p>}
      {fetchError && <p style={{color: 'red'}}>{`${fetchError}`}</p>}
      {!fetchError && !isLoading &&
      <main>
        <Content
          items={items.filter(item => (item.item).toLowerCase().includes(searchItem.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      </main>
      }
      <Footer items={items}/>
      {/* <Footer items={items.filter(item => (item.item).toLowerCase().includes(searchItem.toLowerCase()))}/> */}
    </div>
  );
}

export default App;