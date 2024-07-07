import {jest} from '@jest/globals';
import { render, screen, waitFor} from '@testing-library/react';
import axios from 'axios';
import DataComponent from './DataComponent';
import { act } from 'react';
import axiosMockAdapter from 'axios-mock-adapter';

jest.mock('axios');

describe('DataComponent', () => {
  it('should handle API error', async () => {
    // Мокируем axios.get для имитации ошибки
    const mockedGet = axios.get as jest.MockedFunction<typeof axios.get>;
    mockedGet.mockRejectedValue(new Error('Network Error'));

    // Заменяем console.log фиктивной функцией
    const consoleSpy = jest.fn();
    console.log = consoleSpy; // Непосредственно заменяем глобальную функцию

    await act(async () => {
      render(<DataComponent />);
    });
    await new Promise(resolve => setTimeout(resolve, 0)); // Ждем завершения вызова console.log

    // Проверяем вызовы фиктивной функции console.log
    expect(consoleSpy).toHaveBeenCalledWith('Ошибка запроса на сервер', expect.any(Error));
  });
  it ('should handle API response', async () => {
    const mockWeatherData = {
      data: {
        main: {
          temp: 20,
        },
        wind: {
          speed: 5,
        },
      },
    };
  
    jest.spyOn(axios, 'get').mockResolvedValue(mockWeatherData);
  
    render(<DataComponent />);
  
    await waitFor(() => {
      expect(screen.getByText(/Текущий график/i)).toBeInTheDocument();
      expect(screen.getByText(/Измерения в Bar/i)).toBeInTheDocument();
      // Проверяем, что данные о температуре и скорости ветра отображаются в компоненте
      // Это предполагает, что компонент Graph корректно обрабатывает и отображает полученные данные
    });
  
    jest.restoreAllMocks();
  })

})