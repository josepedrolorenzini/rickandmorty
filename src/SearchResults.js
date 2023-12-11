import { useState , useEffect } from "react";
import axios from 'axios';
import CharactersDetails from "./CharactersDetails";


const RICKANDMORTY_BASE_URL = 'https://rickandmortyapi.com/api/character';
//const RICKANDMORTY_API_KEY  = '2f5ac274ecfac5a455f38745704ad084';



function SearchResults(props) {

    const [ data, setData ]                 = useState( [] );
    const [ loading, setLoading ]           = useState( true );
    const [ error, setError ]               = useState( null );
    const [searchItem, setSearchItem]       = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [character , setCharacter]   = useState({})
    

    useEffect(() => {
        
        loadSearchResults(props.searchText)
    }, [props.searchText])//second empty arg means 'run once on mount'


    function loadSearchResults(query =1 ){

        console.log('loadsearchResult()' , query)

       axios.get(`https://rickandmortyapi.com/api/character?page=${query}`)
            .then(response => {
                console.log(response.data.results);
                 setData( response.data.results);
                 setLoading( false ); // finished loading!
              //this.renderSearchResults(res.data.photos.photo);
            })
            .catch(err => {
              console.warn('Error loading search results', err);
                 setError( err );
                 setLoading( false ); // finished loading!
              // TODO: message to user in the DOM
            });



    }///loads search results



    function newAxiosRequest(e){
        console.log(e.target)
        axios.get(`https://rickandmortyapi.com/api/character/${e.target.id}`)
        .then(response => 
            { console.log(response.data)
             setCharacter(response.data)}
             )
        .catch(err => console.warn(err))
    }

    function handleFilter(e){
        const searchTerm = e.target.value;
         console.log(searchTerm)
        
        setSearchItem(searchTerm);
         let filtersNames = data.filter(character => 
            character.name.toLowerCase().includes(searchTerm.toLowerCase())

         )
        //  setData(filtersNames)
        //  console.log(filtersNames)
        setFilteredUsers(filtersNames)
      }


 if(error){return <b>there is an error loading your page or character</b>}
 
 let displayList = data;

 if(searchItem.length > 0 ){
   displayList = filteredUsers;
 }

  return (
    <div>
          <form id="FilterSearch">
        <input 
        type="text" 
        value={searchItem}
        onChange={handleFilter} 
        placeholder="filter by name"></input>
        <button>filter</button>
    </form>
      <p>results {props.searchText}</p> 
        
        {
            loading 
            ? <p>loading ........</p>
            :  <>
            <ul className="ulListRickAndMorty" style={{ listStyleType: 'none' }}>
              {displayList.map(e => (
                <div key={e.id} className="containerChar">
                  <li>
                    <p>{e.name}</p>
                  <span><small>{e.species}</small></span>  
                  <a href="#">  <img 
                  src={e.image} 
                  alt={e.name} 
                  id={e.id} 
                  onClick={newAxiosRequest}
                  />  </a> 
                  </li>
                </div>
              ))}
            </ul> 
        
          </>
        }
       { character && <CharactersDetails  character={character}  />}
        </div>
  )
}

export default SearchResults;