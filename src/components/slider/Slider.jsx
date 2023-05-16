import { useEffect, useRef } from 'react'
import './slider.scss'

import img1 from "../../img/slide1.png"
import img2 from "../../img/slide2.png"
import img3 from "../../img/slide3.png"
import img4 from "../../img/slide4.png"
import img5 from "../../img/slide5.png"
import img6 from "../../img/slide6.png"
import img7 from "../../img/slide7.png"
import img8 from "../../img/slide8.png"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const listSlider = [
    {
        src: img1,
    },
    {
        src: img2,
    },
    {
        src: img3,
    },
    {
        src: img4,
    },
    {
        src: img5,
    },
    {
        src: img6,
    },
    {
        src: img7,
    },
    {
        src: img8,
    }
]
export default function Slider() {
    const intervel = useRef();
    const handleSlider = (value) => {
            const sliderFirst = document.querySelector('.discover-slider-item.index0')
            const sliderSecond = document.querySelector('.discover-slider-item.index1')
            const sliderThirst = document.querySelector('.discover-slider-item.index2')
            const sliderFouth = document.querySelector('.discover-slider-item.index3')
            const sliderFive = document.querySelector('.discover-slider-item.index4')
            const sliderSix = document.querySelector('.discover-slider-item.index5')
            const sliderSeven = document.querySelector('.discover-slider-item.index6')
            const sliderEight = document.querySelector('.discover-slider-item.index7')



            if(value === 1){
                sliderFirst.classList.replace('index0', 'index7')
                sliderSecond.classList.replace('index1', 'index0')
                sliderThirst.classList.replace('index2', 'index1')
                sliderFouth.classList.replace('index3', 'index2')
                sliderFive.classList.replace('index4', 'index3')
                sliderSix.classList.replace('index5', 'index4')
                sliderSeven.classList.replace('index6', 'index5')
                sliderEight.classList.replace('index7', 'index6')
            }else if(value === -1){
                sliderFirst.classList.replace('index0', 'index1')
                sliderSecond.classList.replace('index1', 'index2')
                sliderThirst.classList.replace('index2', 'index3')
                sliderFouth.classList.replace('index3', 'index4')
                sliderFive.classList.replace('index4', 'index5')
                sliderSix.classList.replace('index5', 'index6')
                sliderSeven.classList.replace('index6', 'index7')
                sliderEight.classList.replace('index7', 'index0')
            }

            
        }
    useEffect(() => {
        intervel.current = setInterval(() => {handleSlider(1)}, 4000)
        return () => {
            clearInterval(intervel.current) 
        }
    }, [])
    return (
        <div>
            <div className="discover-slider-wrap">
                {/* <div className="discover-btn discover-btn-prev" onClick={() => handleSlider(-1)}>
                    <i className="bi bi-chevron-left"></i>
                </div> */}
                <ArrowBackIosNewIcon className="discover-btn discover-btn-prev" onClick={() => handleSlider(-1)}/>
                <ArrowForwardIosIcon className="discover-btn discover-btn-next" onClick={() => handleSlider(1)}/>
                {/* <div  className="discover-btn discover-btn-next" onClick={() => handleSlider(1)}>
                    <i className="bi bi-chevron-right"></i>
                </div> */}
                <div className="discover-slider-main">
                    {listSlider.map((value, key) => (
                        <div  key={key} className= {`discover-slider-item index${key}`}>
                            <img className='discover-slider-img' src={value.src} alt="" />
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}
