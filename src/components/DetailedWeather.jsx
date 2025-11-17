import DetailedInfoCard from "./DetailedInfoCard.jsx";
import "./DetailedWeather.css";

const DetailedWeather = ({ weatherData }) => {
  const emptyCards = ["Feels Like","Humidity", "Wind","Precipitation"];

  // Show loading state if weatherData is not available
  if (!weatherData ) {
      return <div className="loading-detailed-weather">
        {emptyCards.map((card, index) => (
        <DetailedInfoCard 
          key={index}
          label={card}
          value="-"
        />
      ))}
      </div>;
    }

  const current = weatherData.current;
  const current_units = weatherData.current_units;

  const cards = [
    {
      label: "Feels Like",
      value: current.apparent_temperature,
      valueUnit: current_units.apparent_temperature,
    },
    {
      label: "Humidity",
      value: current.relative_humidity_2m,
      valueUnit: current_units.relative_humidity_2m,
    },
    {
      label: "Wind",
      value: current.windspeed_10m,
      valueUnit: current_units.windspeed_10m,
    },
    {
      label: "Precipitation",
      value: current.precipitation,
      valueUnit: current_units.precipitation,
    },
  ];

  return (
    <div className="detailed-cards-container">
      {cards.map((card, index) => (
        <DetailedInfoCard 
          key={index}
          label={card.label}
          value={`${card.value} ${card.valueUnit}`}
        />
      ))}
    </div>
  );
};

export default DetailedWeather;
