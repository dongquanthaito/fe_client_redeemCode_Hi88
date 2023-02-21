import '../assets/styles/StarAnimation.css'
import star from '../assets/images/star.svg'

const StartAnimation = () => {
    return (
        <div className="bubbles">
            <img src={star} className='bubble'></img>
            <img src={star} className='bubble'></img>
            <img src={star} className='bubble'></img>
            <img src={star} className='bubble'></img>
            <img src={star} className='bubble'></img>
            <img src={star} className='bubble'></img>
            <img src={star} className='bubble'></img>
            <img src={star} className='bubble'></img>
            <img src={star} className='bubble'></img>
            <img src={star} className='bubble'></img>
        </div>
    )
}

export default StartAnimation