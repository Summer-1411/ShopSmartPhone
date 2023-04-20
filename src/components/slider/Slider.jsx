import { useEffect, useRef } from 'react'
import './slider.scss'

const listSlider = [
    {
        src: "https://photo-zmp3.zmdcdn.me/banner/1/2/b/0/12b076c5938acd263e244fcf9ae26fc5.jpg"
    },
    {
        src: "https://photo-zmp3.zmdcdn.me/banner/f/9/7/1/f971cf9140149e7dffd3476d2987bd05.jpg"
    },
    {
        src: "https://photo-zmp3.zmdcdn.me/banner/b/6/2/6/b626fb9a54285751c7f35319c7ecb105.jpg"
    },
    {
        src: "https://photo-zmp3.zmdcdn.me/banner/7/3/a/7/73a7e372d21bf6fb18431ed872ad13df.jpg"
    },
    {
        src: "https://photo-zmp3.zmdcdn.me/banner/a/c/a/1/aca1550cf30f71eacc4a65ef4eae97e7.jpg"
    },
    {
        src: "https://photo-zmp3.zmdcdn.me/banner/d/8/a/d/d8ad63089ab5a6925bec96bedf6da9c1.jpg"
    },
    {
        src: "https://photo-zmp3.zmdcdn.me/banner/7/3/a/7/73a7e372d21bf6fb18431ed872ad13df.jpg"
    },
    {
        src: "https://photo-zmp3.zmdcdn.me/banner/a/c/a/1/aca1550cf30f71eacc4a65ef4eae97e7.jpg"
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
                <div className="discover-btn discover-btn-prev" onClick={() => handleSlider(-1)}>
                    <i className="bi bi-chevron-left"></i>
                </div>
                <div  className="discover-btn discover-btn-next" onClick={() => handleSlider(1)}>
                    <i className="bi bi-chevron-right"></i>
                </div>
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
