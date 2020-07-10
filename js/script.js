/*----- constants -----*/
const baseURL = 'https://pokeapi.co/api/v2/pokemon';

/*----- app's state (variables) -----*/
let pokemon, pokemonDetail;
/*----- cached element references -----*/

const $ulEL  = $('.collection');

/*----- event listeners -----*/
$ulEL.on('click', handleClick);

/*----- functions -----*/

function handleClick(evt) {
    console.log(evt);
}
getPokemon(); // makes the data available as soon as the pagel loads

function getPokemon() { //ajax(baseURL) is a promise. When it runs, 'then' runs
    $.ajax(baseURL) // one line broken up for organization. no semi-colon.
    .then(
        function(data){
            pokemon = data.results;
            // console.log("Data: ", data);
    }, function(error) {
            console.log("Error: ", error)
    });

}