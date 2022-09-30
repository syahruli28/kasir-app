import { Button } from 'react-bootstrap';
// import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../utils/Constants';
import {useNavigate} from 'react-router-dom';


const TotalBayar = (props) => {


    const navigate = useNavigate(); // inisiasi redirect

    // buat fungsi setelah tombol bayar diklik
    const submitTotalBayar = (totalBayar) => {

        // siapkan data yang akan dimasukkan ke pesanans array
        const pesanan = {
            total_bayar: totalBayar,
            menus: props.keranjangs
        }

        // masukan datanya ke array pesanans
        axios.post(API_URL+"pesanans", pesanan).then((res)=> {
            // this.props.history.push('/sukses'); // redirect halaman
            navigate('/sukses'); // redirect halaman
        })

    } 



    // hitung seluruh total bayar dengan fungsi map.reduce
    const totalBayar = props.keranjangs.reduce(function (result, item) {
        return result + item.total_harga;
    }, 0);


  return (
    <div className='fixed-bottom'>
        <Row>
            <Col md={{ span: 3, offset: 9 }} className='px-4'>
                <h4>Total Harga: <strong className='float-right mr-2'>Rp. {numberWithCommas(totalBayar)}</strong></h4>
                <div className="d-grid gap-2 mb-2 mt-2 mr-2">
                <Button variant="primary" size="lg" onClick={()=> submitTotalBayar(totalBayar)}>
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Bayar
                </Button>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default TotalBayar


// export default class TotalBayar extends Component {


//     // buat fungsi setelah tombol bayar diklik
//     submitTotalBayar = (totalBayar) => {

//         // siapkan data yang akan dimasukkan ke pesanans array
//         const pesanan = {
//             total_bayar: totalBayar,
//             menus: this.props.keranjangs
//         }

//         // masukan datanya ke array pesanans
//         axios.post(API_URL+"pesanans", pesanan).then((res)=> {
//             // this.props.history.push('/sukses'); // redirect halaman
//             this.props.history.replace('/sukses');
//         })

//     } 


//   render() {

//     // hitung seluruh total bayar dengan fungsi map.reduce
//     const totalBayar = this.props.keranjangs.reduce(function (result, item) {
//         return result + item.total_harga;
//     }, 0);

//     return (
//       <div className='fixed-bottom'>
//           <Row>
//               <Col md={{ span: 3, offset: 9 }} className='px-4'>
//                 <h4>Total Harga: <strong className='float-right mr-2'>Rp. {numberWithCommas(totalBayar)}</strong></h4>
//                 <div className="d-grid gap-2 mb-2 mt-2 mr-2">
//                     <Button variant="primary" size="lg" onClick={()=> this.submitTotalBayar(totalBayar)}>
//                         <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Bayar
//                     </Button>
//                 </div>
//               </Col>
//           </Row>
//       </div>
//     )
//   }
// }