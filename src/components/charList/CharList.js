import './charList.scss';
import PropTypes from 'prop-types';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component{
    state={
        charList:[],
        loading:true,
        error:false,
        newItemLoading:false,
        offset:25,
        charEnded:false
    }

    marvelService=new MarvelService();

    onUpdateCharacters=()=>{
        this.onRequest();
    }
    onRequest=(offset)=>{
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }
    onCharListLoading=()=>{
        this.setState({newItemLoading:true});
    }
    onCharLoaded=(newCharList)=>{
        let ended=false;
        if(newCharList.length<9){
            ended=true
        }

        this.setState(({charList,offset})=>({charList:[...charList,...newCharList],
            loading:false,
            error:false,
            newItemLoading:false,
            offset:offset+9,
            charEnded:ended}))
    }
    onError=()=>{
        this.setState({loading:false,
        error:true})
    }
    componentDidMount(){
        this.onUpdateCharacters();
    }
    render(){
        const{charList,loading,error,newItemLoading,offset, charEnded}=this.state
        const onCharSelected=this.props.onCharSelected;
        const errorMessage=error? <ErrorMessage/>:null
        const spinner=loading?<Spinner/>:null
        return (
            <div className="char__list">
                {loading ||error ? spinner || errorMessage:<View charList={charList} onCharSelected={onCharSelected}/>}
                <button className="button button__main button__long" disabled={newItemLoading} style={{display:charEnded?'none':'block'}} onClick={()=>{this.onRequest(offset)}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View=({charList,onCharSelected})=>{
    
    const res=charList.map((item)=>{
        return(
            <li className="char__item" key={item.id} onClick={()=>onCharSelected(item.id)}>
                <img src={item.thumbnail} alt="abyss" style={item.thumbnail.slice(-23)==='image_not_available.jpg'?{objectFit:'contain'}:null}/>
                <div className="char__name">{item.name}</div>
            </li>
        )
    })
    return(
        <ul className="char__grid">
            {res}
        </ul>
    )
}

CharList.propTypes={
    onCharSelected:PropTypes.func.isRequired
}

export default CharList;