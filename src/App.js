import { Col, Row, Container } from 'react-bootstrap';
import './App.css';
import { Hasil, NavbarComponent, ListCategories, Menus } from './components/Index';
import React, { Component } from 'react'
import { API_URL } from './utils/Constants';
import axios from 'axios';


export default class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       menus: [],
    }
  }

  // jalankan setiap render
  componentDidMount() {
    axios.get(API_URL+'products/').then(res=>{
      const menus = res.data;
      this.setState({menus})
    }).catch(error =>{ // jika error
      console.log(error)
    })
  }

  render() {

    // tampung data menu
    const {menus} = this.state

    return (
      <div className="App">
        <NavbarComponent />
        <div className='mt-4'>
          <Container fluid>
            <Row>
              <ListCategories />
                <Col>
                  <h4><strong>Daftar Produk</strong></h4>
                  <hr />
                  <Row>
                    {menus && menus.map((menu) => (
                      <Menus key={menu.id} menu={menu} />
                    ))}
                  </Row>
                </Col>
              <Hasil />  
            </Row>
          </Container> 
        </div>
      </div>
    )
  }
}