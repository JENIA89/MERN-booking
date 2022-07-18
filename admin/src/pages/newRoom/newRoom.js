import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import { roomInputs } from "../../formSource";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { data, loading } = useFetch('/hotels');

  const handleChange = (e) => {
    setInfo(prev => ({...prev, [e.target.id]: e.target.value}));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(',').map(room => ({number: room}));
    try {
      await axios.post(`/rooms/${hotelId}`, {...info, roomNumbers});
      navigate('/rooms');
    } catch (error) {
      console.log(error);
    }
  }
 
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    />
                </div>
              ))}
              <div className="formInput">
                  <label>Rooms</label>
                  <textarea onChange={e => setRooms(e.target.value)} placeholder="giva comma between room numbers"/>
                </div>
              <div className="formInput">
                  <label>Choose a hotel</label>
                  <select id="hotelId" onChange={e => setHotelId(e.target.value)}>
                    {loading ? "Loading..." : data && data.map(hotel => (
                      <option key={hotel._id} value={hotel.id}>{hotel.name}</option>
                    ))}
                  </select>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;