import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import "./Main.css"
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { cardActions } from '../store/card-slice'
import CardDummyData from '../Card/CardDummyData'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const Main = () => {
    const [pageNumber,setPageNumber]=useState(1);
    const dispatch=useDispatch();
    const users=useSelector((state)=>state.card.users);
    const numberOfPages=useSelector((state)=>state.card.numberOfPages);
    const currentUserId=useSelector((state)=>state.card.currentUserId);
    const singleUser=useSelector((state)=>state.card.singleUser);
    const isLoading=useSelector((state)=>state.card.loading);
    
    function handlePrev(){
        setPageNumber(pageNumber-1)
    }
    function handleNext(){
        setPageNumber(pageNumber+1)
    }
    useEffect(()=>{
        async function getUsers(){
            dispatch(cardActions.isLoading(true))
            const res=await axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
            const data=res.data.data;
            const numberOfPages=res.data.total_pages;
            dispatch(cardActions.allUsers({data,numberOfPages}))
            dispatch(cardActions.isLoading(false))
        }
        async function getSingleUser(){
            if(currentUserId){
                dispatch(cardActions.isLoading(true))
                const res=await axios.get(`https://reqres.in/api/users/${currentUserId}`);
                const data=res.data.data;
                dispatch(cardActions.singleUser(data));
                dispatch(cardActions.isLoading(false))
            }
        }
        getUsers();
        getSingleUser();
    },[pageNumber,dispatch,currentUserId])
  return (
    <main className='main'>
        {isLoading && <LoadingSpinner />}
        <Card data={currentUserId ? singleUser : CardDummyData} />
        <div className='button-div'>
            <button className={`btn ${pageNumber>1 && 'btn-active'}`} onClick={handlePrev} disabled={pageNumber===1}>Prev</button>
            {users.map((user)=>{
                return <Button id={user.id} key={user.id} />
            })}
            <button className={`btn ${pageNumber<numberOfPages && 'btn-active'}`} onClick={handleNext} disabled={pageNumber===numberOfPages}>Next</button>
        </div>
    </main>
  )
}

export default Main