import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios, { AxiosResponse, AxiosRequestHeaders } from 'axios'; // Импортируем AxiosResponse из axios
import DataComponent from './dataComponent';

describe('DataComponent', () => {
  it('should fetch weather data and update state', async () => {
    // Подготавливаем мок для axios.get
    const mockResponse: AxiosResponse = {
      data: {
        main: {
          temp: 280,
          wind: {
            speed: 5
          }
        }
      },
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json'
      },
      config: {
        url: 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=503b5760f08bc1afaf91246a950c28f8&units=metric',
        headers: {
          'Content-Type': 'application/json', // Указываем правильный тип для заголовков запроса
        } as AxiosRequestHeaders // Изменяем тип заголовков на AxiosRequestHeaders
      }
    };

    // Мокируем axios.get
    const axiosGetSpy = jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);

    // Рендерим компонент
    const { getByTestId } = render(<DataComponent />);

    // Ожидаем, пока состояние не обновится
    await waitFor(() => {
      expect(axiosGetSpy).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/weather?q=London&appid=503b5760f08bc1afaf91246a950c28f8&units=metric'
      );

      // Проверяем, что состояние обновилось
      expect(getByTestId('weather-data')).toHaveTextContent('280');
    });

    // Восстанавливаем оригинальную реализацию axios.get
    axiosGetSpy.mockRestore();
  });
});