const StatisticsCard = ({title,amount,imageSrc}) => { 
    return (
            <div className="card-item bg-gray-800 p-8 rounded-lg shadow-md"> 
              <div className="flex gap-x-4">
                <div className="rounded-full bg-white w-16 h-16 p-3">
                    <img src={imageSrc} width={100} alt="icon" /> 
                </div>
                <div className="text-white">
                    <p className="mb-2 text-lg font-medium text-grey-400">{title}</p> 
                    <p className="text-xl font-medium text-grey-200">{amount}</p>   
                </div>
              </div>
           </div>      
    );      
 }
export default StatisticsCard;