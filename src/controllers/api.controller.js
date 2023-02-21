import { addPointClient, getCodeClient } from "../services/api.service"
import Swal from 'sweetalert2'

export const getCode = async(codeID) => {
    let codeResult = await getCodeClient(codeID)
    document.getElementById('submit-btn').setAttribute('click-id', 'false')
    try {
        if(codeResult.status_code == 403) { //KM đã sử dụng
            Swal.fire({
                icon: 'error',
                title: codeResult.title_mess,
                html: 
                "<div class='modal-text-wrapper'>"+
                    "<div class='modal-text-cont'>"+
                        "<p class='modal-text'>Mã khuyến mãi: &nbsp;</p>" + "<p style='font-weight: 600'>" +codeResult.detail.promo_code+"</p>"+
                    "</div>"+
                    "<div class='modal-text-cont'>"+
                        "<p class='modal-text'>Điểm thưởng: &nbsp;</p>" + "<p style='font-weight: bold; color:#ec164c'>" +codeResult.detail.point+"&nbsp; điểm</p>"+
                    "</div>"+
                    "<div class='modal-text-cont'>"+
                        "<p class='modal-text'>Hạn sử dụng : &nbsp;</p>" + "<p style='font-weight: 600'>" +codeResult.detail.used_time+"</p>"+
                    "</div>" +
                "</div>",
                footer: '<a href="https://live.f8bet.win/" target="_blank">Chăm sóc khách hàng 24/7</a>',
            })
        } else {
            if(codeResult.valid == false) {
                Swal.fire({
                    icon: 'warning',
                    title: codeResult.title_mess,
                    text: codeResult.text_mess,
                    footer: '<a href="https://live.f8bet.win/" target="_blank">Chăm sóc khách hàng 24/7.</a>'
                })
            } else if(codeResult.valid == true){
                Swal.fire({
                    icon: 'success',
                    title: codeResult.title_mess,
                    html: 
                    "<div class='modal-text-wrapper'>"+
                        "<div class='modal-text-cont'>"+
                            "<p class='modal-text'>Mã khuyến mãi: &nbsp;</p>" + "<p style='font-weight: 600'>" +codeResult.detail.promo_code+"</p>"+
                        "</div>"+
                        "<div class='modal-text-cont'>"+
                            "<p class='modal-text'>Điểm thưởng: &nbsp;</p>" + "<p style='font-weight: bold; color:#ec164c'>" +codeResult.detail.point+"&nbsp; điểm</p>"+
                        "</div>"+
                        "<div class='modal-text-cont'>"+
                            "<p class='modal-text'>Hạn sử dụng : &nbsp;</p>" + "<p style='font-weight: 600'>" +codeResult.detail.time+"</p>"+
                        "</div>" +
                    "</div>",
                    footer: '<a href="https://live.f8bet.win/" target="_blank">Chăm sóc khách hàng 24/7</a>',
                    input: 'text',
                    inputLabel: 'Vui lòng nhập tên tài khoản để nhận thưởng',
                    inputPlaceholder: 'Tên tài khoản',
                    showCancelButton: true,
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Hủy',
                    inputValidator: async (playerID) => {
                        if (!playerID) {
                        return 'Vui lòng nhập tên tài khoản!'
                        } else {
                            Swal.fire({
                                text: 'Đang cộng điểm ...',
                                allowOutsideClick: false,
                                width: 300,
                                didOpen: () => {
                                    Swal.showLoading()
                                }
                            })
                            let addPoint = await addPointClient(playerID, codeResult.detail.promo_code)
                            if(addPoint.status_code == 502) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: addPoint.title_mess,
                                    text: addPoint.text_mess,
                                    footer: '<a href="https://live.f8bet.win/" target="_blank">Chăm sóc khách hàng 24/7.</a>'
                                })
                            } else {
                                if(addPoint.valid == false) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: addPoint.title_mess,
                                        text: addPoint.text_mess,
                                        footer: '<a href="https://live.f8bet.win/" target="_blank">Chăm sóc khách hàng 24/7.</a>'
                                    })
                                } else if(addPoint.valid == true) {
                                    document.getElementsByClassName('congrat-id')[0].innerHTML = playerID
                                    document.getElementsByClassName('congrat-score')[0].innerHTML = addPoint.point
                                    document.getElementsByClassName('congrat-wrapper')[0].classList.add('congrat-margin')
        
                                    const Toast = Swal.mixin({
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                    })
                                    Toast.fire({
                                    icon: 'success',
                                    title: "Cộng điểm thành công"
                                    })
                                    
                                }
                                
                            }
                        }
                    }
                })
            }
        }
    } catch (error) {
        Swal.fire({
            icon: 'warning',
            title: 'Mất kết nối đến máy chủ !',
            footer: '<a href="https://live.f8bet.win/" target="_blank">Chăm sóc khách hàng 24/7.</a>'
        })
    }
}