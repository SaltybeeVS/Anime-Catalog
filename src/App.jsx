import Header from './Components/Header/Header.jsx';
import SearchBar from './Components/SearchBar/SearchBar.jsx';

function App() {
  
  return (
    <>
      <Header/>
      <SearchBar
        onSearch={handleSearch}
        onRandomSearch={handleRandomSearch}
        genres={genres}
        formats={formats}
        statuses={statuses}
      />
    </>
  )
}

export default App
