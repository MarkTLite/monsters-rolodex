import { Component } from 'react';

// import logo from './logo.svg';
import './App.css';
import CardList from './components/card-list/card-list-component';
import SearchBox from './components/search-box/search-box-component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchStr: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(() => {
        return { monsters: users };
      },
      ));
  }
  // Created for Optimization
  onSearchChange = (event) => {
    const searchStr = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchStr: searchStr };
    })
  }

  render() {
    const { monsters, searchStr } = this.state; // optimization
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchStr);
    });
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

}

export default App;
