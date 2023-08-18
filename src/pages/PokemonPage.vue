<template>
    <h1>
        Who's that Pokemon?
    </h1>

    <section class="points">
        <h4>
            ✅ Corrects <span>{{ correctAnswerCounter }}</span>
        </h4>
        <h4>
            ❌ Fails <span>{{ failAnswerCounter }}</span>
        </h4>
    </section>

    <h3 v-if="!pokemon">
        Catching Pokemon...
    </h3>

    <section v-else class="container" >
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
        <PokemonOptions v-if="!showPokemon" :options="pokemons" @chosen-pokemon="checkAnswer" />

        <aside v-if="message">
            <h3 class="fade-in">{{ message }}</h3>
            <button @click="getNextPokemon">
                <span>
                    Next Pokemon
                </span>
            </button>
        </aside>
    </section>
</template>

<script>
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import getPokemonOptions from '../helpers/getPokemonOptions';

export default {
    
    name: 'PokemonPage',
    components: {
        PokemonPicture,
        PokemonOptions
    },
    data() {
        return {
            pokemons: [],
            pokemon: null,
            showPokemon: false,
            message: '',
            isCorrectAnswer: false,
            correctAnswerCounter: 0,
            failAnswerCounter: 0
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemons = await getPokemonOptions()
            const randomInt = Math.floor(Math.random() * this.pokemons.length)
            this.pokemon = this.pokemons[randomInt]
        },
        checkAnswer(event) {
            const { pokemonId } = event
            this.isCorrectAnswer = pokemonId === this.pokemon.id
            this.showPokemon = true
            this.message = this.isCorrectAnswer ? "It's " + this.pokemon.name + "!" : "Better luck next time!"
            this.isCorrectAnswer ? this.correctAnswerCounter++ : this.failAnswerCounter++
        },
        async getNextPokemon() {
            this.showPokemon = false
            this.pokemon = null
            this.message = ''
            this.pokemons = []
            await this.mixPokemonArray()
        }
    },
    mounted() {
        this.mixPokemonArray();
    }
}
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    h1 {
        display: flex;
        justify-content: center;
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
    }

    .points {
        display: flex;
        gap: 70px;
        justify-content: center;
    }

    button {
        display: inline-block;
        border-radius: 4px;
        background-color: #3d405b;
        border: none;
        color: #FFFFFF;
        text-align: center;
        font-size: 17px;
        padding: 16px;
        width: 190px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
    }

    button span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }

    button span:after {
        content: '»';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -15px;
        transition: 0.5s;
    }

    button:hover span {
        padding-right: 15px;
    }

    button:hover span:after {
        opacity: 1;
        right: 0;
    }

    @media (max-width: 450px) {
        .points {
            flex-direction: column;
            justify-content: center;
            gap: 15px;
            margin-bottom: 15px;
        }
        h4 {
            margin: 0;
        }
        h1 {
            margin-top: 0;
            margin-bottom: 25px;
            font-size: 1.5em;
        }
        img {
            width: 45%;
        }
    }
</style>