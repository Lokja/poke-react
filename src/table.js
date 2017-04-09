import React from 'react'
import Pokemon from './pokemon.js'

class Table extends React.Component {
  render() {
    let rosters = this.props.state.roster
    return(
      <div>
        <table>
          <tr>
            <th className="col-sm-6 text-center">Your Team</th>
          </tr>
          <tbody>
            {rosters.your_team.map((pokemon) => {
              return <tr><Pokemon pokemon={pokemon}/></tr>
            })}
          </tbody>
        </table>

        <table>
          <tr>
            <th className="col-sm-6 text-center">Opponent's Team</th>
          </tr>
          <tbody>
            {rosters.enemy_team.map((pokemon) => {
              return <tr><Pokemon pokemon={pokemon}/></tr>
            })}
          </tbody>

        </table>
      </div>
    )
  }
}
