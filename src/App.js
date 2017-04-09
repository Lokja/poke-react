// import libraries
import React, { Component } from 'react';
import axios from 'axios'
import Modal from 'react-modal'
// import components
import Header from './header.js'
import Form from './form.js'
// import Table from './table.js'
// import styles
import { battleStyle, magikarpStyle } from './css/modalStyle.js'
import './css/App.css'
// import functions
// import * as f from './functions.js'
// import classes
import Pokemon from './models/pokemodel.js'
import Battle from './models/battlemodel.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      types: [],
      yourRoster: [],
      enemyRoster: [],
      pokemonObjs: [],
      loading: true,
      battleModal: false,
      results: []
    }
    this.getPokemon = this.getPokemon.bind(this)
    this.handleBattle = this.handleBattle.bind(this)
    this.closeBattle = this.closeBattle.bind(this)
  }

  getTypes() {
    let numTypes = 18
    let typePromises = []
    let self = this
    for (var currentType = 1; currentType <= numTypes; currentType++) {
      typePromises.push(axios.get(`https://pokeapi.co/api/v2/type/${currentType}/`).then((type) => {return type.data}))
    }
    Promise.all(typePromises)
    .then((types) => {
      self.setState({
        loading: false,
        types
      })
    })
  }

  getPokemon(event) {
    this.setState({
      loading: true
    })
    let roster = event.target.id
    let numOrName = event.target.parentElement.parentNode.lastChild.firstChild.value
    let state = this.state
    let self = this
    axios.get(`https://pokeapi.co/api/v2/pokemon/${numOrName.toLowerCase()}`)
    .then((pokemon) => {
      return Pokemon.initialize(pokemon, roster, state)
    })
    .then((pokeArray) => {
      let pokemonObject = pokeArray[0]
      let pokemonInRoster = pokeArray[1]
      let team = pokeArray[1].team
      if (team === 'yourRoster') {
        self.setState({
          pokemonObjs: [...self.state.pokemonObjs, pokemonObject],
          yourRoster: [...self.state.yourRoster, pokemonInRoster],
          loading: false
        })
      } else {
        self.setState({
          pokemonObjs: [...self.state.pokemonObjs, pokemonObject],
          enemyRoster: [...self.state.enemyRoster, pokemonInRoster],
          loading: false
        })
      }
    })
  }

  handleBattle() {
    let battle = new Battle(this.state.yourRoster, this.state.enemyRoster)
    let results = battle.pokeBattle()
    this.setState({
      results,
      battleModal: true
    })
  }

  closeBattle() {
    this.setState({
      battleModal: false
    })
  }

  componentDidMount() {
    this.getTypes()
  }

  render() {
    let matches
    let winner
    if (this.state.results.length > 0) {
      matches = this.state.results[0].map(function(result) {
        return result
      })
      winner = this.state.results[1]
    }
    return (
      <div className="App">
        <Header />
        <Form onClick={this.getPokemon}/>
        <button id="dispBattle" className="btn btn-danger" onClick={this.handleBattle}><em><strong>Battle</strong></em></button>
        <Modal isOpen={this.state.loading} contentLabel="Modal" style={magikarpStyle} />
        <Modal isOpen={this.state.battleModal} contentLabel="Modal" style={battleStyle}>
          <div>{matches}</div>
          <p>{winner}</p>
          <button onClick={this.closeBattle}>close</button>
        </Modal>
      </div>
    );
  }
}

// usuk

export default App;
