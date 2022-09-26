import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';

const Menus = ({menu}) => {
  return (
    <Col md={4} xs={6}>
        <Card className='mb-4 shadow'>
        <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} />
        <Card.Body>
            <Card.Title>{menu.nama}</Card.Title>
            <Card.Text>
                {numberWithCommas(menu.harga)}
            </Card.Text>
        </Card.Body>
        </Card>
    </Col>
  )
}

export default Menus