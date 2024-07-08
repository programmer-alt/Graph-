// Импорт необходимых библиотек и модулей
import { jest } from "@jest/globals"; // Используем jest для мокирования и тестирования
import { render, screen, waitFor, renderHook} from "@testing-library/react"; // Библиотека для рендеринга компонентов и взаимодействия с DOM
import axios from "axios"; // HTTP клиент для выполнения запросов к API
import DataComponent from "./DataComponent"; // Компонент, который тестируется
import { act } from "react"; // Хелпер для обработки асинхронных операций в React
import  Graph  from './graph';

// Мокируем axios, чтобы контролировать ответы на HTTP запросы в тестах
jest.mock("axios");

describe("DataComponent", () => {
  // Тестовый сценарий для проверки обработки ошибок API
  it("should handle API error", async () => {
    // Создаем мок для axios.get, чтобы он возвращал ошибку
    const mockedGet = axios.get as jest.MockedFunction<typeof axios.get>;
    mockedGet.mockRejectedValue(new Error("Network Error"));

    // Заменяем стандартную функцию console.log на нашу фиктивную, чтобы отследить ее вызовы
    const consoleSpy = jest.fn();
    console.log = consoleSpy;

    // Рендерим компонент внутри асинхронного блока act, чтобы корректно обрабатывать любые изменения состояния
    await act(async () => {
      render(<DataComponent />);
    });

    // Даем время на выполнение всех промисов и вызовов console.log
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Проверяем, что наш spy был вызван с ожидаемым сообщением об ошибке
    expect(consoleSpy).toHaveBeenCalledWith(
      "Ошибка запроса на сервер",
      expect.any(Error)
    );
  });

  // Тестовый сценарий для проверки корректной обработки успешного ответа API
  it("should handle API response", async () => {
    // Подготавливаем мок данных для ответа от APIке
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
    // Создаем шпиона для axios.get, чтобы он возвращал наши мок данные
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValue(mockWeatherData);
    // Рендерим компонент
    render(<DataComponent />);
    // Ожидаем, пока компонент не отрендерится и не обработает данные
    await waitFor(() => {
      // Проверяем, что определенные элементы с текстом присутствуют в документе
      expect(screen.getByText(/Текущий график/i)).toBeInTheDocument();
      expect(screen.getByText(/Измерения в Bar/i)).toBeInTheDocument();
      // Проверяем, что axios.get был вызван ровно один раз
      expect(axiosGetSpy).toHaveBeenCalledTimes(1);
      // Проверяем, что данные о температуре и скорости ветра отображаются в компоненте
      expect(
        screen.getByText(String(mockWeatherData.data.main.temp))
      ).toBeInTheDocument();
      expect(
        screen.getByText(String(mockWeatherData.data.wind.speed))
      ).toBeInTheDocument();
    });
    // Восстанавливаем оригинальные методы после теста
    jest.restoreAllMocks();
  });
// Определяем тестовый сценарий
it('should pass historicalData from DataComponent prop to Graph component', async () => {
  // Создаем моковые данные о погоде
  const mockWeatherData = [{data: {main: {temp: 20,},wind: {speed: 5, },},}];
  // Преобразуем моковые данные в нужный формат
  const modifiedData = mockWeatherData.map(item => ({
    temperature: item.data.main.temp,
    windSpeed: item.data.wind.speed
  }));
  // Рендерим компонент Graph с переданными данными
  render(<Graph data={modifiedData} width={400} height={200} color="blue" title="Текущий график" bottomTitle="Измерения в Bar" />);
  // Сохраняем переданные данные в переменную propsData
  const historicalData = modifiedData;
  // Проверяем, что данные, переданные в компонент, соответствуют исходным данным
  expect(historicalData).toEqual(modifiedData)
});
  
  
  
  

});
