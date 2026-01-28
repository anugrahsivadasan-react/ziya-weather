import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// POST → /weather
export const getWeatherData = async (place: string) => {
  const res = await API.post("/weather", { place });
  return res.data;
};

// GET → /forecast7
export const get7DayForecast = async (place: string) => {
  const res = await API.get(`/forecast7?place=${place}`);
  return res.data;
};

// GET → /health
export const checkBackendHealth = async () => {
  const res = await API.get("/health");
  return res.data;
};

// GET → /hourly
export const getHourlyForecast = async (place: string, hours: number = 12) => {
  const res = await API.get(`/hourly?place=${place}&hours=${hours}`);
  return res.data;
};
