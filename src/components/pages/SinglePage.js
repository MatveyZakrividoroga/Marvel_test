import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import { useState,useEffect } from 'react';
import { useParams} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';


const SinglePage = ({Component, dataType}) => {
    const {id}=useParams()
    const [data, setData]=useState(null);

    const {loading,error, getComic,getCharacter, clearError}=useMarvelService()

    const onDataLoaded=(data)=>{
        setData(data)
    }
    const updateData = () => {
        clearError()

        switch(dataType){
            case 'comic':
                getComic(id).then(onDataLoaded)
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded)
            
        }
    }
    useEffect(()=>{
        updateData()
    },[id])

    const errorMessage= error ?<ErrorMessage/>: null
    const spinner =loading ? <Spinner/>: null
    const content=!(loading || error || !data)? <Component data={data}/>: null
    console.log(data)
    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;