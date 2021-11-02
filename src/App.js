import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';



export default class App extends Component {

  constructor(props){
    super(props);

    this.state={
      query:"eevee",
      pokemon:"",
      err:""
    }
  }

  componentDidMount(){
    this.getPokemon(this.state.query);
  }

  getPokemon = async() => {
    try{

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.query.toLowerCase()}`);
      const data = await res.json();

      this.setState({ 

        pokemon:data,
        err:null

      })
    }catch(err){

      this.setState({ 
        pokemon:null,
        err
      })

    }

  }

  handleChange = e => {
    this.setState({ query:e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.getPokemon(e.target.value);
  }


  render() {

    let { query,pokemon,err } = this.state;

    return (
      <>
      <div className="main-div">
        <form onSubmit={this.handleSubmit}>
          <h3>Search Pokemon</h3>
          <input type="text" onChange={this.handleChange} value={query}/>
          <input type="submit" value="Search"/>
        </form>

        {pokemon && !err ? (
          <div className="pokemon-pic">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.state.pokemon.id}.svg`} alt={this.state.pokemon.name}/>
          <h2 className="pokemon-name-title">{pokemon.name}</h2>
          <ul>
            {pokemon.abilities.map((abil,index) => (
              <li>Ability {index+1} : {abil.ability.name}</li>
            ))}
          </ul>
        </div>
        ) : (
          <div className="error">
          <img className="img-error" src=""/>
          <h2>Whoops! Couldn't find that Pokemon!</h2>

         </div>
      
        )}
        
      </div>
        
    
    </>
    )
  }
}





