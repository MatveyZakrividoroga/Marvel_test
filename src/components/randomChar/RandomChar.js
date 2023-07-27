import './randomChar.scss';
import { useState,useEffect } from 'react';
import MarvelService from '../../services/MarvelService';

import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar =(props)=> {
    const marvelService = new MarvelService()
    const [char,setChar]=useState({})
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)

    useEffect(()=>{
        updateCharacter()
    },[])

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
        const id = Math.floor(Math.random() * (1011355  - 1009224) + 1009224);
        onCharLoading();
        marvelService.getCharacter(id)
        .then(onCharLoaded)
        .catch(onError)
    }

    const errorMessage=error? <ErrorMessage/>:null
    const spinner=loading?<Spinner/>:null

    return (
        <div className="randomchar">
            {loading ||error ? spinner || errorMessage: <View char={char}/>}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={()=>{updateCharacter()}}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
        </div>
    )
}

const View=({char})=>{
    const {name,description,thumbnail,homepage,wiki}=char;
    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={thumbnail.slice(-23)==='image_not_available.jpg'?{objectFit:'contain'}:null}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ?description.slice(0,100)+'...':'Описания пока нет'}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;