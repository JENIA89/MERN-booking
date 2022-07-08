import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch('hotels?featured=true&limit=4');

  if(loading) {
    return 'Loadingplease wait'
  }
  
  return (
    <div className="fp">
      {data?.map((item, i) => (
        <div className="fpItem" key={i}>
          <img
            src={item.photos[0]}
            alt="photo"
            className="fpImg"
          />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
          {item.rating && 
          <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
          </div>}
      </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
