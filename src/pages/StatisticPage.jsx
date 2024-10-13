import Header from "../components/header/Header";
import StatisticsCard from "../components/statistics/StatisticsCard";
import React from 'react';
import ReactDOM from 'react-dom';
import { Area,Pie } from '@ant-design/plots';

const Statistics = () => {  
    const config = {
        data: {
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/aapl.json',
        },
        xField: (d) => new Date(d.date),
        yField: 'close',
      };  

      const config2 = {
        data: [
          { type: '分类一', value: 27 },
          { type: '分类二', value: 25 },
          { type: '分类三', value: 18 },
          { type: '分类四', value: 15 },
          { type: '分类五', value: 10 },
          { type: '其他', value: 5 },
        ],
        angleField: 'value',
        colorField: 'type',
        paddingRight: 80,
        innerRadius: 0.6,
        label: {
          text: 'value',
          style: {
            fontWeight: 'bold',
          },
        },
        legend: {
          color: {
            title: false,
            position: 'right',
            rowPadding: 5,
          },
        },
        annotations: [
          {
            type: 'text',
            style: {
              text: 'AntV\nCharts',
              x: '50%',
              y: '50%',
              textAlign: 'center',
              fontSize: 40,
              fontStyle: 'bold',
            },
          },
        ],
      };


    return (
          <div>
             <Header />
             <div className="px-6">
                <h1 className="text-4xl font-bold text-center mb-6">Statistics</h1>
                <div>
                    <h2 className="mb-6  text-left text-lg">
                         Welcome
                        <span className="text-green-500 font-bold"> Admin</span>   
                    </h2>    
                    <div className="static-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">  
                        <StatisticsCard title={"Total Customer"} amount={"10"} imageSrc={"images/user.png"} />
                        <StatisticsCard title={"Total Earning"} amount={"2000 $"} imageSrc={"images/money.png"} />
                        <StatisticsCard title={"Total Sales"} amount={"14000"} imageSrc={"images/sale.png"} />
                        <StatisticsCard title={"Total Products"} amount={"30"} imageSrc={"images/product.png"} />
                    </div>
               </div>
              </div>
              <div className="flex h-full justify-between gap-10 lg:flex-row flex-col items-center p-8">
                    <div className="lg:w-1/2 lg:h-full h-72">
                      <Area {...config} />   
                    </div>
                    <div className="lg:w-1/2 lg:h-full h-72 mb-10">
                       <Pie {...config2} />   
                    </div>  
                </div> 
          </div>
    
    );
}
export default Statistics; 