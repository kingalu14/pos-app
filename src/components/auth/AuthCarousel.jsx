import { Descriptions } from 'antd';
import React from 'react';

const AuthCarousel = ({img,title,description}) => {
    return (
        <div>
                 <div className="!flex flex-col items-center justify-center h-full mb-10">
                           <img src={img} alt="1"
                            className="w-[600px] h-[500px]" />
                           <h3 className="text-4xl text-white text-center font-bold mt-6">{title}</h3>
                           <p className="text-white text-center mt-5 text-2xl">{description}</p>
                  </div>
        </div>
    );
};

export default AuthCarousel;