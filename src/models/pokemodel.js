class Pokemon {
  constructor(number, name, types, stats, sprite, team, weak_to, not_weak_to, super_effective, not_very_effective) {
    this.number = number
    this.name = name
    this.types = types
    this.stats = stats
    this.sprite = sprite
    this.team = team
    this.weak_to = weak_to
    this.not_weak_to = not_weak_to
    this.super_effective = super_effective
    this.not_very_effective = not_very_effective
  }
  static initialize(pokemon, roster, state) {
    var pokemons = mutate(pokemon, roster, state)
    return [pokemon, pokemons]
  }
}

function mutate(pokemonIn, team, state) {
  var pokemon = pokemonIn.data
  var sprite = `https://assets-lmcrhbacy2s.stackpathdns.com/img/pokemon/animated/${pokemon.name}.gif`
  var types = pokemon.types.map(function(ptype) {
    return state.types.filter(function(type) {
      return type.name === ptype.type.name
    })[0]
  })
  var pokemonNew = new Pokemon(pokemon.id, pokemon.name, types, pokemon.stats, sprite, team, [], [], [], [])
  addDamageRelations(pokemonNew)
  removeDuplicates(pokemonNew)
  return pokemonNew
}

function removeDuplicates(pokemon) {
  pokemon.weak_to = pokemon.weak_to.filter(function(elem, pos) {
    return pokemon.weak_to.indexOf(elem) === pos;
  });
  pokemon.not_weak_to = pokemon.not_weak_to.filter(function(elem, pos) {
    return pokemon.not_weak_to.indexOf(elem) === pos;
  });
  pokemon.super_effective = pokemon.super_effective.filter(function(elem, pos) {
    return pokemon.super_effective.indexOf(elem) === pos;
  });
  pokemon.not_very_effective = pokemon.not_very_effective.filter(function(elem, pos) {
    return pokemon.not_very_effective.indexOf(elem) === pos;
  });
}

function addDamageRelations(pokemon) {
  for (var j = 0; j < pokemon.types.length; j++) {
    var type = pokemon.types[j]
    // pokemon.weak_to.push(type.damage_relations.double_damage_from.map(d => d.name)
    // Object.keys(type.damage_relations).forEach((damageType) => {
    //   pokemon.weak_to.push(type.damage_relations[damageType].map(d => d.name)
    // })
    for (var k = 0; k < type.damage_relations.double_damage_from.length; k++) {
      pokemon.weak_to.push(type.damage_relations.double_damage_from[k].name)
    }
    for (var l = 0; l < type.damage_relations.half_damage_from.length; l++) {
      pokemon.not_weak_to.push(type.damage_relations.half_damage_from[l].name)
    }
    for (var m = 0; m < type.damage_relations.no_damage_from.length; m++) {
      pokemon.not_weak_to.push(type.damage_relations.no_damage_from[m].name)
    }
    for (var n = 0; n < type.damage_relations.double_damage_to.length; n++) {
      pokemon.super_effective.push(type.damage_relations.double_damage_to[n].name)
    }
    for (var o = 0; o < type.damage_relations.half_damage_to.length; o++) {
      pokemon.not_very_effective.push(type.damage_relations.half_damage_to[o].name)
    }
    for (var p = 0; p < type.damage_relations.no_damage_to.length; p++) {
      pokemon.not_very_effective.push(type.damage_relations.no_damage_to[p].name)
    }
  }
}

export default Pokemon
