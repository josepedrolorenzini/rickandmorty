
function CharactersDetails(props) {
  return (
        <div>
        <h2>CharactersDetails</h2>
        <h4>{props.character.name}</h4>
        <p>{props.character.species}</p>
        <img src={props.character.image} />
        </div>
  )
}

export default CharactersDetails

