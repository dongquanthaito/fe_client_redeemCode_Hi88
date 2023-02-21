import { useEffect } from 'react'
import './assets/styles/HomePage.css'
import StartAnimation from './components/StarAnimation'
import Swal from 'sweetalert2'
import Congrat from './components/congrat/Congrat'
import {  getCode } from './controllers/api.controller'
import sunrise from './assets/images/sunrise.png'
import logo from './assets/images/logoF8.png'
import text from './assets/images/text.png'

const HomePage = () => {
    useEffect(() => {

        document.getElementById('submit-btn').addEventListener('click', () => {
            let codeID = document.getElementById('code-id').value
            if(codeID == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại!',
                    text: 'Vui lòng nhập đầy đủ thông tin!',
                    footer: '<a href="https://live.f8bet.win/" target="_blank">F8BET - THỬ NGAY VẬN MAY SẼ ĐẾN</a>'
                })
            } else {
                if(document.getElementById('submit-btn').getAttribute('click-id') == 'false') {
                    document.getElementById('submit-btn').setAttribute('click-id', 'true')
                    Swal.fire({
                        text: 'Đang kiểm tra ...',
                        allowOutsideClick: false,
                        width: 300,
                        didOpen: () => {
                            Swal.showLoading()
                        }
                    })
                    getCode(codeID)
                }
            }
        })
    })

    return(
        <>
            <div id="home-page">
                <div className='warpper'>
                    <img src={logo} className='logo'></img>
                    <p className='slogan'>THỬ NGAY VẬN MAY SẼ ĐẾN</p>
                    <img src={text} className='text-img'></img>
                    <div className='input-cont'>
                        <div className='input-item-cont'>
                            <input id='code-id' type="text" placeholder='Nhập mã khuyến mãi' autoComplete='off'></input>
                        </div>
                        <div id='submit-btn' click-id='false'>KIỂM TRA NGAY</div>
                    </div>
                </div>
                <StartAnimation />
                <Congrat />
                <img src={sunrise} className='sunrise'></img>
            </div>
        </>
    )
}

export default HomePage