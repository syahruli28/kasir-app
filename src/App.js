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
       menus: [], // isi variabel menus dengan array kosong
       categoriYangDipilih: 'Makanan' // set nilai categori awal     
    }
  }

  // jalankan setiap render
  componentDidMount() {
    axios.get(API_URL+'products?category.nama='+this.state.categoriYangDipilih).then(res=>{
      const menus = res.data;
      this.setState({menus})
    }).catch(error =>{ // jika error
      console.log(error)
    })
  }


  // buat fungsi yang akan mengganti categori
  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,  // ubah nilai categori sesuai yang dipilih
      menus: [] // kosongkan kembali variabel menus
    })

    // ubah nilai variabel category sesuai dengan yang diklik
    axios.get(API_URL+'products?category.nama='+value).then(res=>{
      const menus = res.data;
      this.setState({menus})
    }).catch(error =>{ // jika error
      console.log(error)
    })

  }


  render() {

    // tampung data menu dan changecategory
    const {menus, categoriYangDipilih} = this.state

    return (
      <div className="App">
        <NavbarComponent />
        <div className='mt-4'>
          <Container fluid>
            <Row>
              {/* mengirim arrow function dan state ke ListCategory */}
              <ListCategories changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih} />
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