import { Component } from 'react';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {
    marvelService = new MarvelService()
    state = {
        defaultDescription:'Описания пока нет',
        char:null,
        loading:false,
        error:false,
    }
    onError=()=>{
        this.setState({loading:false,
        error:true})
    }
    onCharLoading=()=>{
        this.setState({loading:true})
    }
    onCharLoaded=(char)=>{
        this.setState({char,
        loading:false,
        error:false})
    }
    updateCharacter = () => {
        const {charId}=this.props;
        if(!charId){
            return;
        }
        this.onCharLoading();
        this.marvelService.getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }
    componentDidMount(){
        this.updateCharacter()
    }
    componentDidUpdate(prevProps){
        if(this.props.charId !==prevProps.charId){
            this.updateCharacter()
        }
    }
    render(){
        const {char,loading,error}=this.state
        const errorMessage=error? <ErrorMessage/>:null
        const spinner=loading?<Spinner/>:null
        const skeleton=!loading && !error &&!char ? <Skeleton/>:null
        return (
            <div className="char__info">
                {loading ||error ||skeleton ? spinner || errorMessage|| skeleton: <View char={char}/>}
            </div>
        )
   }
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