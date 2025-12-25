import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));

type WeatherResp = {
  coord: { lon: number; lat: number };
  main: { temp: number };
  weather: { description: string; icon: string }[];
};

type PollutionResp = {
  list: { main: { aqi: number }; components: { pm2_5: number; pm10: number } }[];
};

app.get("/api/weather", async (req: Request, res: Response) => {
  const city = (req.query.city as string) || "London";
  const appKey = process.env.OPENWEATHER_KEY;
  if (!appKey) return res.status(500).json({ message: "Missing OPENWEATHER_KEY" });

  try {
    // 1. Call Weather endpoint to get temp, description, icon, and lat/lon
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${appKey}&units=metric`;
    const weatherResponse = await fetch(weatherUrl);
    
    if (!weatherResponse.ok) {
      return res.status(weatherResponse.status).json({ message: "City not found" });
    }
    
    const weatherData: WeatherResp = await weatherResponse.json();

    // 2. Extract values from weather response
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;

    // 3. Call Air pollution endpoint using lat and lon
    const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${appKey}`;
    const pollutionResponse = await fetch(pollutionUrl);
    
    if (!pollutionResponse.ok) {
      return res.status(pollutionResponse.status).json({ message: "Air pollution data not available" });
    }
    
    const pollutionData: PollutionResp = await pollutionResponse.json();

    // 4. Extract air quality values
    const aqi = pollutionData.list[0].main.aqi;
    const pm25 = pollutionData.list[0].components.pm2_5;
    const pm10 = pollutionData.list[0].components.pm10;

    // 5. Return JSON in the required format
    res.json({
      city: city,
      temp: temp,
      desc: description,
      iconUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      aqi: aqi,
      pm25: pm25,
      pm10: pm10
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

app.listen(port, () => console.log(`http://localhost:${port}`));
