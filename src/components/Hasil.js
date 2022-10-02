import React, { Component } from 'react';
import { Row, Col, ListGroup, Badge, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar';
import { API_URL } from '../utils/Constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Hasil extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       showModal: false,
       keranjangDetail: false,
       jumlah: 0,
       keterangan: '',
       totalHarga: 0, // untuk button plus dan minus di edit
    }
  }

  // buat handle untuk show modal
  handleShow = (keranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: keranjang,
      jumlah: keranjang.jumlah, // update datanya sesuai jumlah
      keterangan: keranjang.keterangan, // buat data baru
      totalHarga: keranjang.total_harga // update totalHarga setelah buka modal edit
    })
  }
  // buat handle untuk close modal
  handleClose = () => {
    this.setState({
      showModal: false
    })
  }


  // fungsi untuk tombol tambah jumlah di modal
  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah+1,
      totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah+1) // tambah totalHarga saat tombol plus diklik
    })
  }
  // fungsi untuk tombol kurangi jumlah di modal
  kurang = () => {
    if(this.state.jumlah !== 1) { // kalau jumlahnya bukan 1 maka bisa jalankan fungsi kurang
      this.setState({
        jumlah: this.state.jumlah-1,
        totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah-1) // kurangi totalHarga saat tombol minus diklik
      })
    }
  }


  // buat fungsi untuk menampung data keterangan baru dari modal
  changeHandler = (e) => {
    this.setState({
      keterangan: e.target.value
    })
  }

  // buat fungsi saat tombol submit modal diklik
  handleSubmit = (e) => {
    e.preventDefault();
    
    // ubah data setelah tombol edit diklik
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan
    }

    // masukan update ke array data
    axios.put(API_URL+'keranjangs/'+this.state.keranjangDetail.id, data).then(res=>{
      this.props.getListKeranjang(); // ambil data keranjang
      // saat berhasil masukan data tampilkan success dengan sweetalert
      swal({
        title: "Berhasil update pesanan",
        text: data.product.nama+" berhasil diupdate.",
        icon: "success",
        button: false,
        timer: 1200,
      });
    }).catch(error =>{ // jika error
      console.log(error)
    })

    this.handleClose(); // tutup modal setelah edit
  }


  // buat fungsi saat tombol hapus dimodal diklik
  hapusPesanan = (id) => {

    // masukan update ke array data
    axios.delete(API_URL+'keranjangs/'+id).then(res=>{
      this.props.getListKeranjang(); // ambil data keranjang
      // saat berhasil hapus data tampilkan error icon dengan sweetalert
      swal({
        title: "Berhasil hapus pesanan",
        text: this.state.keranjangDetail.product.nama+" berhasil dihapus.",
        icon: "error",
        button: false,
        timer: 1200,
      });
    }).catch(error =>{ // jika error
      console.log(error)
    })

    this.handleClose(); // tutup modal setelah hapus
  }


  render() {

    // ambil data dari state/props dari app.js
    const { keranjangs } = this.props

    return (
        <Col md={3} className='mt-3'>
            <h4><strong>Keranjang : </strong> {keranjangs.length} </h4>
            <hr />
            {/* cek apakah keranjang ada isinya */}
              {keranjangs.length !== 0 && (
                <Card className='overflow-auto hasil'>
                  <ListGroup variant="flush">
                    {keranjangs.map((keranjang) => (
                      <ListGroup.Item key={keranjang.id} onClick={()=>this.handleShow(keranjang)}>
                        <Row>
                          <Col xs={2}>
                            <h4><Badge bg="success">{keranjang.jumlah}</Badge></h4>
                          </Col>
                          <Col>
                            <h5>{keranjang.product.nama}</h5>
                            <p>Rp. {numberWithCommas(keranjang.product.harga)}</p>
                          </Col>
                          <Col>
                            <strong className='float-right'>
                              <p>Rp. {numberWithCommas(keranjang.total_harga)}</p>
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}

                      {/* component modal */}
                      <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan} />

                  </ListGroup>
                </Card>
            )}

            <TotalBayar keranjangs={keranjangs} {...this.props} />
        </Col>
    )
  }
}
