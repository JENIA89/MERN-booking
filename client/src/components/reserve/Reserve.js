import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './reserve.css';
import useFetch from '../../hooks/useFetch';
import { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { getDatesInRange } from '../../utils/date';

const Reserve = ({setOpen, hotelId}) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const {dates, options} = useContext(SearchContext);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
      ? [...selectedRooms, value]
      : selectedRooms.filter(item => item !== value)
    )
  }

  const handleClick = () => {

  }
console.log(getDatesInRange(dates[0]?.startDate, dates[0]?.endDate));
  return (
    <div className='reserve'>
      <div className='rContainer'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className='rClose'
          onClick={() => setOpen(false)}
          />
          <span>Select your rooms:</span>
          {data.map(item => (
            <div className='rItem' key={item._id}>
              <div className='rItemInfo'>
                <div className='rTitle'>{item.title}</div>
                <div className='rDesc'>{item.desc}</div>
                <div className='rMax'>Max people: <b>{item.maxPeople}</b></div>
                <div className='rPrice'>{item.price}</div>
              </div>
              {item.roomNumbers.map(roomNumber => (
                <div className='room' key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input type='checkbox' value={roomNumber._id} onChange={handleSelect}/>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleClick} className='rButton'>Reserve Now!</button>
      </div>
    </div>
  )
}

export default Reserve