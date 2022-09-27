import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../utils/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUtensils, faCoffee, faCheese } from '@fortawesome/fontawesome-svg-core';
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons';



// fungsi penentuan iconnya sesuai parameter
const Icon =({nama}) => {
  
  if(nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
  if(nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-1" />
  if(nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
}


export default class ListCategories extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       categories: [], // isi variabel categories dengan array kosong
    }
  }

  // jalankan setiap render
  componentDidMount() {
    axios.get(API_URL+'categories/').then(res=>{
      const categories = res.data;
      this.setState({categories})
    }).catch(error =>{ // jika error
      console.log(error)
    })
  }

  render() {

    // ambil data categories dari state
    const {categories} = this.state

    // ambil data dari prop yang dikirim dari app.js
    const {changeCategory,categoriYangDipilih} = this.props

    return (
      <Col md={2} mt={2}>
          <h4><strong>Daftar Kategori</strong></h4>
          <hr />
          <ListGroup>

            {/* fetch data categorynya */}
            {categories && categories.map((category)=> (
              <ListGroup.Item onClick={()=>changeCategory(category.nama)} className={categoriYangDipilih===category.nama && 'category-aktif'} style={{cursor: 'pointer'}}>
                <h5>
                  <Icon nama={category.nama} /> {category.nama}
                </h5>
              </ListGroup.Item>
            ))}

          </ListGroup>
      </Col>
    )
  }
}
