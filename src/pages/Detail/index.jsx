import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import './index.scss';

const Detail = () => {
  const { id } = useParams(); 

  const [product, setProduct] = useState(null);

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  
  if (!product) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID :</td>
            <td>{product._id}</td>
          </tr>
          <tr>
            <td>Nama :</td>
            <td>{product.nama}</td>
          </tr>
          <tr>
            <td>Price :</td>
            <td>{product.price}</td>
          </tr>
          <tr>
            <td>Stock : </td>
            <td>{product.stock}</td>
          </tr>
          <tr>
            <td>Status : </td>
            <td>{product.status ? 'Ready' : 'Not Ready'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;