import pokemonApi from "../api/pokemonApi"

const TOTAL_POKEMONS = 650

const getPokemonIds = () => {
    const pokemonIds = Array.from(Array(TOTAL_POKEMONS))
    return pokemonIds.map((_item, index) => ++index)
}

const getPokemonNames = async ([ pokemonA, pokemonB, pokemonC, pokemonD ] = []) => {

    const [respA, respB, respC, respD] = await Promise.all([
        pokemonApi.get(`/${pokemonA}`),
        pokemonApi.get(`/${pokemonB}`),
        pokemonApi.get(`/${pokemonC}`),
        pokemonApi.get(`/${pokemonD}`),
    ])

    return [
        { id: respA.data.id, name: respA.data.name },
        { id: respB.data.id, name: respB.data.name },
        { id: respC.data.id, name: respC.data.name },
        { id: respD.data.id, name: respD.data.name },
    ]
}

const getPokemonOptions = async () => {
    const mixedPokemons = getPokemonIds().sort(() => Math.random() - 0.5).splice(0, 4)
    return await getPokemonNames(mixedPokemons)
}

export default getPokemonOptions