import React from 'react'
import "./Button.css"
import { useDispatch, useSelector } from 'react-redux';
import { cardActions } from '../store/card-slice';

const Button = (props) => {
    const dispatch=useDispatch();
    const currentUserId=useSelector((state)=>state.card.currentUserId);
    const {id}=props;
    function handleClick(id){
        dispatch(cardActions.currentUser(id))
    }
  return (
    <button className={`btn-number ${id===currentUserId && 'btn-number-active'}`} onClick={()=>handleClick(id)}>{id}</button>
  )
}

export default Button