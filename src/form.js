import React from 'react'

class Form extends React.Component {
  render() {
    return (
      <div className="container">
      <div className="col-sm-12 text-center">
        <input type="text" name="numOrName" id="numOrName"/><br/>
        <p>Add Pokémon to:</p>
        <button className="pokeSubmit btn btn-primary" id="yourRoster" onClick={this.props.onClick}>Your Roster</button>
        <button className="pokeSubmit btn btn-primary" id="enemeyRoster" onClick={this.props.onClick}>Enemy Roster</button> <br/> <br/>
      </div>
    </div>
    )
  }
}

export default Form
