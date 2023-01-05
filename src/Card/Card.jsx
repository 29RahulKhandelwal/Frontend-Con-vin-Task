import React from 'react'
import "./Card.css";

const Card = (props) => {
    const {data}=props;
  return (
    <div className='card'>
        <img className='user-img' src={data.avatar} alt={`${data.first_name+data.last_name+"-Image"}`} />
        <div className="user-info">
            <h2 className="user-name">{data.first_name+" "+data.last_name}</h2>
            <p className='user-mail'>{data.email}</p>
        </div>
    </div>
  )
}

export default Card