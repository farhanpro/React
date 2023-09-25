import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import image1 from './img/image1.jpg';
import image2 from './img/image2.jpg';
import image3 from './img/image3.jpg';


function ImageSlide() {
    const [allImage, setAllImage]=useState([image1,image2,image3])    
    const [current, setCurrent] = useState(0);
    const length = allImage.length;
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };
    const goToSlide = (index) => {
        setCurrent(index);
      };
    //let url = images[0];
    // console.log(url);
    return (
        <div>
            <div>
                <img src={allImage[current]} height={597} width={1240} alt="image_slide" />
            </div>
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
            <div>
        {allImage.map((image, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={
              index === current
                ? 'option-circle active'
                : 'option-circle'
            }
          ></div>
        ))}
      </div>
        </div>
    )
}

export default ImageSlide