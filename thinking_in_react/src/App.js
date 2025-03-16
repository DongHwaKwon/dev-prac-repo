import './App.css';
import { useState, useEffect } from 'react';

const ProductCategoryRow = ({ category }) => {
  return(
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

const ProductRow = ({ product }) => {
  const name = product.stocked ? product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>;
  
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

const ProductTable = ({ products, filterText, inStockOnly }) => {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(
      filterText.toLowerCase()
    ) === -1) { return; }

    if (inStockOnly && !product.stocked) { return; }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });
  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

const SearchBar = ({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText} 
        onChange={(e) => {onFilterTextChange(e.target.value)}}  
          /><br/>
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => {onInStockOnlyChange(e.target.checked)}}
          />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const FilterableProductTable = ({products}) => {
  const [filterText, setFilterText] = useState('fruit');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable 
        filterText={filterText}
        inStockOnly={inStockOnly}
        products={products} 
      />
    </div>
  );
}

function App() {
  const PRODUCTS = [
        { "category": "Fruits", "price": "$1", "stocked": true, "name": "Apple" },
        { "category": "Fruits", "price": "$1", "stocked": true, "name": "Dragonfruit" },
        { "category": "Fruits", "price": "$2", "stocked": false, "name": "Passionfruit" },
        { "category": "Vegetables", "price": "$2", "stocked": true, "name": "Spinach" },
        { "category": "Vegetables", "price": "$4", "stocked": false, "name": "Pumpkin" },
        { "category": "Vegetables", "price": "$1", "stocked": true, "name": "Peas" },
        { "category": "Fastfood", "price": "$10", "stocked": false, "name": "Fried Chicken" }
      ]
  return (
    <FilterableProductTable products={PRODUCTS} />
  );
}

export default App;

// const [data, setData] = useState([]);

// useEffect(() => {
//   const fetchProducts = async () => {
//     const response = await fetch('http://localhost:3001/todos')
//     const PRODUCTS = await response.json()
//     setData(PRODUCTS)
//   };
//   fetchProducts();
// }, [])