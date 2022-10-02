import { Col, Row, Container } from 'react-bootstrap';
import '../App.css';
import { Hasil, ListCategories, Menus } from '../components/Index';
import React, { Component } from 'react'
import { API_URL } from '../utils/Constants';
import axios from 'axios';
import swal from 'sweetalert';


export default class Home extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       menus: [], // isi variabel menus dengan array kosong
       categoriYangDipilih: 'Makanan', // set nilai categori awal     
       keranjangs: [] // isi variabel keranjang dengan array kosong
    }
  }

  // jalankan setiap render
  componentDidMount() {
    // untuk menampilkan data menu
    axios.get(API_URL+'products?category.nama='+this.state.categoriYangDipilih).then(res=>{
      const menus = res.data;
      this.setState({menus})
    }).catch(error =>{ // jika error
      console.log(error)
    })

    // untuk menampilkan data keranjang
    this.getListKeranjang();

  }


  // agar data yang dimasukkan ke keranjang langsung update tanpa load ulang halaman
  // componentDidUpdate(prevState) {
  //   // cek apakah ada update pada state keranjangs
  //   if(this.state.keranjangs !== prevState.keranjangs) {
  //     // untuk menampilkan data keranjang
  //     axios.get(API_URL+'keranjangs').then(res=>{
  //       const keranjangs = res.data;
  //       this.setState({keranjangs})
  //     }).catch(error =>{ // jika error
  //       console.log(error)
  //     })
  //   }
  // }



  // buat fungsi baru menggantikan componentDidUpdate (infinite loops) untuk ambil list keranjang
  getListKeranjang = () => {
    // untuk menampilkan data keranjang
    axios.get(API_URL+'keranjangs').then(res=>{
      const keranjangs = res.data;
      this.setState({keranjangs})
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



  // buat fungsi untuk masuk keranjang
  masukKeranjang = (value) => {

    // cek apakah data yang diklik masih sama agar jumlahnya saja yang ditambah
    axios.get(API_URL+'keranjangs?product.id='+value.id).then(res=>{
      // cek bila memang yang diklik belum ada dikeranjang maka akan buat baru, jadi jumlahnya 1
      if(res.data.length === 0){
        // proses masukan data
        // buat variabel baru untuk menampung beberapa data, untuk dimasukan ke post
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value
        }

        // masukan ke array keranjangs
        axios.post(API_URL+'keranjangs', keranjang).then(res=>{
          this.getListKeranjang(); // ambil data keranjang
          // saat berhasil masukan data tampilkan success dengan sweetalert
          swal({
            title: "Berhasil masuk keranjang",
            text: keranjang.product.nama+" berhasil ditambahkan.",
            icon: "success",
            button: false,
            timer: 1200,
          });
        }).catch(error =>{ // jika error
          console.log(error)
        })
      } else { // tapi jika sudah ada di keranjang maka hanya tambahkan total jumlah dan harganya
          // proses persiapan datanya
          const keranjang = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga+value.harga,
            product: value
          }

          // input data yang sama, dan tambah jumlah dan harga
          // masukan ke array keranjangs
          axios.put(API_URL+'keranjangs/'+res.data[0].id, keranjang).then(res=>{
            this.getListKeranjang(); // ambil data keranjang
            // saat berhasil masukan data tampilkan success dengan sweetalert
            swal({
              title: "Berhasil masuk keranjang",
              text: keranjang.product.nama+" berhasil ditambahkan.",
              icon: "success",
              button: false,
              timer: 1200,
            });
          }).catch(error =>{ // jika error
            console.log(error)
          })

      }
    }).catch(error =>{ // jika error
      console.log(error)
    })


  }


  render() {

    // tampung data menu dan changecategory
    const {menus, categoriYangDipilih, keranjangs} = this.state

    return (
        <div>
          <Container fluid>
            <Row>
              {/* mengirim arrow function dan state ke ListCategory */}
              <ListCategories changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih} />
                <Col className='mt-3'>
                  <h4><strong>Daftar Produk</strong></h4>
                  <hr />
                  <Row className='overflow-auto menu'>
                    {menus && menus.map((menu) => (
                      <Menus key={menu.id} menu={menu} masukKeranjang={this.masukKeranjang} />
                    ))}
                  </Row>
                </Col>
              <Hasil keranjangs={keranjangs} getListKeranjang={this.getListKeranjang} {...this.props} />  
            </Row>
          </Container> 
        </div>
    )
  }
}