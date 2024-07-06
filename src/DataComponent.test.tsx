import {jest} from '@jest/globals';
import { render } from '@testing-library/react';
import axios from 'axios';
import DataComponent from './DataComponent';
import { act } from 'react';

jest.mock('axios');

describe('DataComponent', () => {
  it('should handle API error', async () => {
    // Мокируем axios.get для имитации ошибки
    const mockedGet = axios.get as jest.MockedFunction<typeof axios.get>;
    mockedGet.mockRejectedValue(new Error('Network Error'));

    // Заменяем console.log фиктивной функцией
    const consoleSpy =  jest.fn();
    console.log = consoleSpy; // Непосредственно заменяем глобальную функцию

    await act(async () => {
      render(<DataComponent />);
    });
    await new Promise(resolve => setTimeout(resolve, 0)); // Ждем завершения вызова console.log

    // Проверяем вызовы фиктивной функции console.log
    expect(consoleSpy).toHaveBeenCalledWith('Ошибка запроса на сервер', expect.any(Error));
  });
});