
class MarvelService{
    _apiBase='https://gateway.marvel.com:443/v1/public/';
    _apiKey='9ae8ec6e6b86a9155b0764cf658282c2';
    _baseOffset=25


    getResource= async (url)=>{
        let res=await fetch(url);
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json();
    }
    getAllCharacters= async(offset=this._baseOffset)=>{
        const res=await this.getResource(`${this._apiBase}characters?offset=${offset}&limit=9&apikey=${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }
    getCharacter=async (id)=>{
        const res=await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`)
        return this._transformCharacter(res.data.results[0]);
    }
    
    _transformCharacter(char){
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
}
export default MarvelService;