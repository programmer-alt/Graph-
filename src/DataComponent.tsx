import React, { useEffect, useState } from 'react';
import Graph from './graph';
import axios from 'axios';



const DataComponent: React.FC = () => {

  const [weatherData, setWeatherData] = useState<{ current: number; previous: number | null }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=503b5760f08bc1afaf91246a950c28f8&units=metric`)
        const currentTemp = response.data.main.temp;
        const windSpeed = response.data.wind.speed;
        const newData = { current: currentTemp, previous: windSpeed }
         

        setWeatherData([{current: currentTemp, previous: windSpeed}])
      } catch (error) {
        console.log('Ошибка запроса на сервер', error)
      }
    }
    fetchData()
  }, weatherData)
  const specificData = weatherData
  const previousData = specificData.filter(item => item.previous !== null)
  return (
    <div className="data" style={{ display: 'flex', flexDirection: 'row', maxHeight: '1000px' }}>
      {/* <Graph data={specificData} width={400} height={200} color="blue" title="Текущие данные" bottomTitle="Измерения в Bar" /> */}
      <Graph data={previousData} width={400} height={200} color="blue" title="Текущий график" bottomTitle="Измерения в Bar" />
    </div>
  );
};
export default DataComponent;