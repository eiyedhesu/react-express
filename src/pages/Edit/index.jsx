import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Input from '../../components/Input/index';

const Edit = () => {
  const [nama, setNama] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("true");
  const { id } = useParams();
  const history = useHistory()
 
  useEffect(() => {
    getProductsById();
  }, []);
 
  const getProductsById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      const { nama, price, stock, status } = response.data; 
      setNama(nama);
      setPrice(price);
      setStock(stock);
      setStatus(Boolean(status));
    } catch (error) {
      console.log(error);
    }
  };
  
 
  const updateProducts = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/products/${id}`, {
        data: {
          nama,
          price,
          stock,
          status
        }
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

 
  function handleStatusChange(e) {
    setStatus(e.target.checked);
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={updateProducts}>
          <Input name="Nama" type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama Produk..." label="Nama"/>
          <Input name="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Harga Produk..." label="Harga"/>
          <Input name="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock Produk..." label="Stock"/>
          <Input name="Status" type="checkbox" checked={status} onChange={handleStatusChange} label="Active"/>
          <button type="submit"  className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;