import { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import CardList from './components/card-list/card-list-component';
import SearchBox from './components/search-box/search-box-component';

const App = () => {
  const [monstersState, setMonstersState] = useState([]);
  const [searchStr, setSearchStr] = useState('');
  const [filteredMonsters, setFilterMonsters] = useState(monstersState);

  console.log('render');
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => response.json())
          .then((users) => setMonstersState(users)
          );
  },[]);

  const onSearchChange = (event) => {
    console.log('search event');
    const searchVal = event.target.value.toLocaleLowerCase();
    setSearchStr(searchVal);
  }
  
  useEffect(()=>{
    console.log('filter monsters');
    const newMonsters = monstersState.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchStr);
    })
    setFilterMonsters(newMonsters);
  }, [searchStr, monstersState]);

  return (
    <div className="App">
         <h1 className='app-title'>Monsters Rolodex</h1>
         <SearchBox 
          className='monsters-search-box'
          placeholder='search monster'
          onChangeHandler={onSearchChange} />
        <CardList monsters={filteredMonsters} />
      </div>
  );
}

export default App;
