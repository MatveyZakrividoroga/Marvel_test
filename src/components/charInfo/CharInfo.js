import { useState,useEffect } from 'react';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import MarvelService from '../../services/MarvelService';

const CharInfo=(props)=> {
    const marvelService = new MarvelService()
    const [char,setChar]=useState(null)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)
    
    const onError=()=>{
        setLoading(false)
        setError(true)
    }
    const onCharLoading=()=>{
        setLoading(true)
    }
    const onCharLoaded=(char)=>{
        setChar(char)
        setLoading(false)
        setError(false)
    }
    const updateCharacter = () => {
        const {charId}=props;
        if(!charId){
            return;
        }
        onCharLoading();
        marvelService.getCharacter(charId)
        .then(onCharLoaded)
        .catch(onError)
    }
    useEffect(()=>{
        updateCharacter()
    },[])
    useEffect(()=>{
        updateCharacter()
    },[props.charId])

    const errorMessage=error? <ErrorMessage/>:null
    const spinner=loading?<Spinner/>:null
    const skeleton=!loading && !error &&!char ? <Skeleton/>:null
    return (
        <div className="char__info">
            {loading ||error ||skeleton ? spinner || errorMessage|| skeleton: <View char={char}/>}
        </div>
    )
}

const View=({char})=>{
    const {name,description,thumbnail,homepage,wiki,comics}=char
    return(
        <>
        <div className="char__basics">
                <img src={thumbnail} alt="name" style={thumbnail.slice(-23)==='image_not_available.jpg'?{objectFit:'contain'}:null}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length==0?<div className="char__comics">No comics</div>:
                    comics.map((item,id)=>{
                        if(id>=9){
                            return;
                        }
                        return( <li className="char__comics-item" key={id}>
                                {item.name}
                                </li>)
                    })
                }
            </ul>
            </>
    )
}

export default CharInfo;