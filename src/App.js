import './style.css';
import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Search from './components/Search';
import axios from 'axios';
import Header from './components/Header';

function App() {

  const[mans, setMans] = useState([]);

  useEffect(() => {
    axios.get(`http://static.my.ge/myauto/js/mans.json`)
    .then((res) => {
        setMans(res.data);
    }).catch((err) => {
        console.log(err);
    })

  }, [])

  return (
    <div className="App">
      <Header />

      <div className="content">
        <Search />
        <ProductList mans={mans} />
      </div>
    </div>
  );
}

export default App;
