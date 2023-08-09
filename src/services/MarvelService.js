import { useHttp } from "../hooks/http.hook";


const useMarvelService=()=>{
    const {loading,request,error, clearError}=useHttp()

    const _apiBase='https://gateway.marvel.com:443/v1/public/';
    const _apiKey='9ae8ec6e6b86a9155b0764cf658282c2';
    const _baseOffset=25

    const getAllCharacters= async(offset=_baseOffset)=>{
        const res=await request(`${_apiBase}characters?offset=${offset}&limit=9&apikey=${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }
    const getCharacter=async (id)=>{
        const res=await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }
    const getAllComics=async(offset=_baseOffset)=>{
        const res= await request(`${_apiBase}comics?offset=${offset}&limit=8&apikey=${_apiKey}`)
        return res.data.results.map(_transformComics)
    }
    const getComic=async(id)=>{
        const res=await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`)
        return _transformComics(res.data.results[0]);
    }
    const _transformComics=(comic)=>{
        return{
            id:comic.id,
            name:comic.title,
            description:comic.description || 'No description',
            pageCount:comic.pageCount ? `${comic.pageCount} p.`: 'No information about the number of pages',
            language: comic.textObjects.language || 'en-us',
            price:comic.prices[0].price,
            thumbnail: comic.thumbnail.path+`.${comic.thumbnail.extension}`,
            url:comic.urls[0].url,
        }
    }

    const _transformCharacter=(char)=>{
        return{
                id:char.id,
                name:char.name,
                description:char.description,
                thumbnail:char.thumbnail.path+'.'+char.thumbnail.extension,
                homepage:char.urls[0].url,
                wiki:char.urls[1].url,
                comics:char.comics.items,
            }
    }

    return {loading, error, getAllCharacters, getCharacter,getAllComics,getComic, clearError}
}
export default useMarvelService;