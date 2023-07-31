import './comicsList.scss';

import {useState, useEffect} from'react'
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
    const [comicsList,setComicsList]=useState([])
    const [newItemLoading,setNewItemLoading]=useState(false)
    const [offset,setOffset]=useState(25)
    const [comicsEnded,setComicsEnded]=useState(false)

    const {loading, error, getAllComics}=useMarvelService()

    useEffect(()=>{
        onRequest(offset,true)
    }, [])
    const onRequest=(offset,inicial)=>{
        inicial ? setNewItemLoading(false): setNewItemLoading(true)
        getAllComics(offset)
        .then(onComicsLoaded)
    }
    const onComicsLoaded=(comics)=>{
        let ended=false;
        if(comics.length<8){
            ended=true
        }
        setComicsList(comicsList=>[...comicsList,...comics])
        setNewItemLoading(false)
        setOffset(offset=>offset+8)
        setComicsEnded(ended)
    }
    function renderItems(arr){
        const items=arr.map((item,i)=>{
            return(
                <li className="comics__item" 
                    key={item.id}>
                        <a href={item.url}>
                            <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                            <div className="comics__item-name">{item.name}</div>
                            <div className="comics__item-price">{item.price}$</div>
                        </a>
                </li>
            )
        })
        return(
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const items=renderItems(comicsList)
    const errorMessage=error? <ErrorMessage/>:null
    const spinner=loading && !newItemLoading?<Spinner/>:null

    return (
        <>
        {console.log('aaaaaaaaa')}
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
            disabled={newItemLoading} 
            onClick={()=>{onRequest(offset)}}>
                <div className="inner">load more</div>
            </button>
        </div>
        </>
        
    )
}

export default ComicsList;