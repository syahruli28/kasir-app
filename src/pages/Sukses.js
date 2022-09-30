import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/Constants';

export default class Sukses extends Component {

  componentDidMount() {
    // untuk menghapus semua data keranjang setelah bayar
    axios.get(API_URL+'keranjangs').then((res)=>{
      const keranjangs = res.data;
      keranjangs.map(function(item){// hapus datanya secara satu satu
        return axios.delete(API_URL+'keranjangs/'+item.id)
        .then((res)=> console.log(res)) // kalau berhasil
        .catch((error)=> console.log(error)) //kalau eror
      }) 
    }).catch(error =>{ // jika error
      console.log(error)
    })
  }

  render() {
    return (
      <div className='mt-4 text-center'>
          <Image src="assets/images/sukses.png" width={500} />
          <h2>Pesanan Sukses</h2>
          <p>Terima kasih sudah memesan.</p>
          <Button variant="primary" as={Link} to="/">
              Kembali
          </Button>
      </div>
    )
  }
}
