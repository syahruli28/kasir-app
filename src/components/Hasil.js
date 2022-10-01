import React, { Component } from 'react';
import { Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar';

export default class Hasil extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       showModal: false,
       keranjangDetail: false,
       jumlah: 0,
       keterangan: '',
    }
  }

  // buat handle untuk show modal
  handleShow = (keranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: keranjang,
      jumlah: keranjang.jumlah, // update datanya sesuai jumlah
      keterangan: keranjang.keterangan // buat data baru
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
      jumlah: this.state.jumlah+1
    })
  }
  // fungsi untuk tombol kurangi jumlah di modal
  kurang = () => {
    if(this.state.jumlah !== 1) { // kalau jumlahnya bukan 1 maka bisa jalankan fungsi kurang
      this.setState({
        jumlah: this.state.jumlah-1
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
    console.log("Keterangan "+ this.state.keterangan);
  }


  render() {

    // ambil data dari state/props dari app.js
    const { keranjangs } = this.props

    return (
        <Col md={3} mt={2}>
            <h4><strong>Hasil</strong></h4>
            <hr />
            {/* cek apakah keranjang ada isinya */}
            {keranjangs.length !== 0 &&
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
                  <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} />

              </ListGroup>
            }

            <TotalBayar keranjangs={keranjangs} {...this.props} />
        </Col>
    )
  }
}
