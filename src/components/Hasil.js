import React, { Component } from 'react';
import { Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';
import TotalBayar from './TotalBayar';

export default class Hasil extends Component {
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
                  <ListGroup.Item key={keranjang.id}>
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
              </ListGroup>
            }

            <TotalBayar keranjangs={keranjangs} {...this.props} />
        </Col>
    )
  }
}
