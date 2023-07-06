import {React, useState} from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import Input from '../../components/Input/index';
import './index.scss';

const Tambah = () => {
  const [nama, setNama] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("false");
  
 
  const history = useHistory()
 
  const saveProducts = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", {
        nama,
        price,
        stock,
        status
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleStatusChange = (e) => {
    setStatus(e.target.checked);
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={saveProducts}>
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

export default Tambah;