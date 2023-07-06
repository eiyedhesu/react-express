import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import axios from 'axios';


const Home = () => {
    const [Products, setProducts] = useState([]);
   
    const getProducts = async () => {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    };
   
    const deleteProduct = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        getProducts(); 
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getProducts();
    }, []);

  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..."/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
            {Products.map((products, index) => (
              <tr key={products._id}>
                <td>{index + 1}</td>
                <td>{products.nama}</td>
                <td>{products.price}</td>
                <td>{products.stock}</td>
                <td>{products.status ? 'Ready' : 'Not Ready'}</td>
                <td>
                <Link 
                to={`detail/${products._id}`}
                className="btn btn-sm btn-info"
                >
                  Detail
                </Link>
                  <Link
                    to={`edit/${products._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct (products._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}
export default Home;