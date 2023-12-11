
import SearchForm from "./SearchForm"
import { useState } from "react";
import SearchResults from "./SearchResults";


function RickAndMortyApp() {

    const [query, setQuery] = useState('');

    function performSearch(queryText){
        console.log(`in rickandmortyapp::performSearch()` , queryText)
        setQuery(queryText)
    }

    // let output ; 
    // if(query.length > 0){
    //     output = <p>search result go here</p>
    // }else{
    //     output = <p> Please enter a search</p>
    // }

    let output  = query.length > 0 
    ?  <SearchResults searchText={query} />
    : <p> Please enter a search</p>

  return (
    <>
    <div>Rick And Morty App</div>
    <hr/>

    {/* so tht the child csn pss the search 
    text from the form back uo the tree to the parent */}
    <SearchForm  onSearchSubmit={performSearch}  />
   

    {output}
    </>
    
    )
}

export default RickAndMortyApp