import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';

const ModalKeranjang = ({showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah, kurang, changeHandler, handleSubmit, totalHarga, hapusPesanan}) => {
    if(keranjangDetail) {
        return (
          <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>{keranjangDetail.product.nama} <strong>Rp. {numberWithCommas(keranjangDetail.product.harga)}</strong></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* form */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Total harga : </Form.Label>
                        <p>
                        <strong>Rp. {numberWithCommas(totalHarga)}</strong>
                        </p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Jumlah : </Form.Label><br />
                        <Button variant="primary" size="sm" onClick={()=>kurang()}>
                            <FontAwesomeIcon icon={faMinus}  />
                        </Button>
                        <strong className="mx-2">{jumlah}</strong>
                        <Button variant="primary" size="sm" onClick={()=>tambah()}>
                            <FontAwesomeIcon icon={faPlus}  />
                        </Button>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Keterangan : </Form.Label>
                        <Form.Control as="textarea" rows="3" name="keterangan" placeholder='Contoh, Pedas Karetnya 2 ya' value={keterangan} onChange={(e)=>changeHandler(e)} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Simpan
                    </Button>
                </Form>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={()=>hapusPesanan(keranjangDetail.id)}>
                    <FontAwesomeIcon icon={faTrash}  /> Hapus Pesanan
                </Button>
              </Modal.Footer>
          </Modal>
        )
    } else {
        return (
          <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Kosong.</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              Kosong.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary">Understood</Button>
              </Modal.Footer>
          </Modal>
        )
    }
}

export default ModalKeranjang