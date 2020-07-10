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

function getPokemon(evt) { //ajax(baseURL) is a promise. When it runs, 'then' runs
    $.ajax(baseURL) // one line broken up for organization. no semi-colon.
    .then(
        function(data){
            pokemon = data.results;
            render(); // having the render here means it renders programmatically immediately.
            // console.log("Data: ", data);
    }, function(error) {
            console.log("Error: ", error)
    });
}

// p represent every pokemon in the pokemon array.

function generateHTml() { 
    return pokemon.map(function(p) {
        return `
        <li class="collection-item red-text">
            <div style="text-transform: capitalize;">${p.name}<span data-url="${p.url}" class="secondary-content blue-text">
                    Detail</span>
            </div>
        </li>`
    })
}

function render() {
    const html = generateHTml().join("");
    $ulEL.html(html);
}