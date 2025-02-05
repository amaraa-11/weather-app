"use client";
import { useState, useEffect } from "react";
import {
  Circle,
  Searchinput,
  Square,
  WhiteSquare,
  MidCircle,
  CircleGray,
  Icons,
} from "./components/card.js";

const API_KEY = "a9bd50909a544a9c84172455241312";

export default function Home() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Ulaanbaatar");
  const [forecastDate, setForecastDate] = useState("");
  const [dayweather, setDayWeather] = useState({
    number: 0,
    condition: "",
  });
  const [nightweather, setNightWeather] = useState({
    number: 0,
    condition: "",
  });

  const onChangeText = (e) => {
    setSearch(e.target.value);
  };

  const onPressEnter = (e) => {
    if (e.code === "Enter" && search.trim()) {
      setCity(search);
    }
  };

  useEffect(() => {
    if (city) {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`
      )
        .then((response) => response.json())
        .then((data) => {
          const forecastDay = data.forecast?.forecastday[0];

          const date = new Date(forecastDay.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          setForecastDate(formattedDate);

          setDayWeather({
            number: Math.round(forecastDay.day.maxtemp_c),
            condition: forecastDay.day.condition.text,
          });
          setNightWeather({
            number: Math.round(forecastDay.day.mintemp_c),
            condition: forecastDay.hour[23].condition.text,
          });
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [city]);

  return (
    <div className="h-screen w-full flex justify-center overflow-hidden">
      <div className="bg-stone-50 w-full h-[1200px] flex items-center flex-col-reverse justify-between pb-[200px] pt-[50px] rounded-l-[50px] text-black">
        <Card
          value="day"
          city={city}
          weather={dayweather}
          forecastDate={forecastDate}
        />
        <Searchinput
          search={search}
          onChangeText={onChangeText}
          onPressEnter={onPressEnter}
        />
      </div>

      <div className="relative w-full h-[1200px] bg-[#0F141E] flex items-center flex-col-reverse justify-between pb-[200px]">
        <MidCircle size={160} top={420} left={-80} />
        <Circle size={340} top={330} left={-170} />
        <CircleGray size={340} top={330} left={-170} />
        <Circle size={540} top={230} left={-270} />
        <CircleGray size={540} top={230} left={-270} />
        <Circle size={940} top={50} left={-460} />
        <CircleGray size={940} top={50} left={-460} />
        <Circle size={1340} top={-120} left={-650} />
        <CircleGray size={1340} top={-120} left={-650} />
        <Circle size={1740} top={-300} left={-880} />
        <CircleGray size={1740} top={-300} left={-880} />
        <Card
          value="night"
          city={city}
          weather={nightweather}
          forecastDate={forecastDate}
        />
        <Square size={100} top={326} left={-0} />
        <Square size={100} top={574} left={-0} />
        <WhiteSquare size={40} top={390} left={-12} />
        <WhiteSquare size={40} top={566} left={-12} />
        <img src="left.png" className="absolute top-[450px] left-[-50px]" />
        <img src="right.png" className="absolute top-[450px] left-[10px]" />
        <img
          src="sunright.png"
          className="absolute top-[100px] left-[-860px] z-0"
        />
        <img src="moonleft.png" className="absolute top-[930px] left-[650px]" />
      </div>
    </div>
  );
}

export function Card({ value, city, weather, forecastDate }) {
  const isDay = value === "day";
  const [dayStatus, setDayStatus] = useState("/Sun.png");
  const [nightStatus, setNightStatus] = useState("/moon.png");
  const weatherStatus = isDay ? dayStatus : nightStatus;
  const { number, condition } = weather;

  useEffect(() => {
    if (isDay) {
      if (condition.includes("Sunny")) {
        setDayStatus("/Sun.png");
      } else if (condition.includes("Overcast")) {
        setDayStatus("/Clouds.png");
      } else if (condition.includes("snow")) {
        setDayStatus("/Snow.png");
      } else if (condition.includes("rain")) {
        setDayStatus("/Rain.png");
      } else if (condition.includes("thunder")) {
        setDayStatus("/storm.png");
      } else if (condition.includes("wind")) {
        setDayStatus("/Wind.png");
      } else if (condition.includes("Mist")) {
        setDayStatus("/Clouds.png");
      } else if (condition.includes("Cloudy")) {
        setDayStatus("/Clouds.png");
      }
    } else {
      if (condition.includes("Clear")) {
        setNightStatus("/moon.png");
      } else if (condition.includes("Overcast")) {
        setNightStatus("/nightClouds.png");
      } else if (condition.includes("snow")) {
        setNightStatus("/nightsnow.png");
      } else if (condition.includes("rain")) {
        setNightStatus("/nightRain.png");
      } else if (condition.includes("thunder")) {
        setNightStatus("/nightstorm.png");
      } else if (condition.includes("wind")) {
        setNightStatus("/nightWind.png");
      } else if (condition.includes("Cloudy")) {
        setNightStatus("/nightClouds.png");
      }
    }
  }, [city, condition]);

  const temperatureStyle = isDay
    ? "text-[96px] text-transparent bg-clip-text bg-gradient-to-b from-[#111827] to-[#6b7280] font-extrabold"
    : "text-[96px] text-transparent bg-clip-text bg-gradient-to-b from-[#F9FAFB] to-[#F9FAFB00] font-extrabold";

  const conditionStyle = isDay
    ? "text-[#FF8E27] font-bold text-[24px]"
    : "text-[#777CCE] font-bold text-[24px]";

  const cardBg = isDay ? "bg-[#FFFFFFbf]" : "bg-[#111827BF]";
  const nightCardColors =
    "bg-[111827bf] bg-gradient-to-b from-[#1F2937] to-[#11182700] text-white shadow-[#111827]";
  const colors = isDay ? "bg-[#FFFFFF]" : nightCardColors;

  return (
    <div
      className={`w-[414px] h-[832px] rounded-[48px] flex justify-center ${cardBg} z-10 overflow-hidden`}
    >
      <div className={`w-[398px] h-[504px] rounded-[42px] mt-[10px] ${colors}`}>
        <div className="flex justify-center">
          <div className="w-[290px] mt-[64px] ml-[10px]">
            <p className="text-md">{forecastDate || "Date Unavailable"}</p>
            <h2 className="text-5xl font-bold">{city || "Unknown"}</h2>
          </div>
        </div>
        <div className="flex justify-center items-center mt-[30px]">
          <img
            className="h-[300px] w-[300px]"
            src={weatherStatus}
            alt={value}
          />
        </div>
        <div className="flex justify-center items-center mr-32 ">
          <p className={temperatureStyle}>{number || "--"}°</p>
        </div>
        <div className="mt-[30px] ml-[60px]">
          <p className={conditionStyle}>{condition || "No Data"}</p>
        </div>
        <div className="flex justify-center items-center mt-[80px] gap-20">
          <Icons value={value} />
        </div>
      </div>
    </div>
  );
}
