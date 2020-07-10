// (function() {
    /*----- constants -----*/
    const baseURL = 'https://pokeapi.co/api/v2/pokemon';

    /*----- app's state (variables) -----*/
    let pokemon, pokemonDetail;
    /*----- cached element references -----*/

    const $ulEL  = $('.collection');
    const $imgEL = $('.modal-content img');
    const $name = $('#name');
    const $moves = $('#moves');
    const $abilities = $('#abilities');
    const $height = $('#height');
    const $modal = $('.modal');

    /*----- event listeners -----*/
    $ulEL.on('click', 'span', handleClick);

    /*----- functions -----*/
    //initialize modal
    $modal.modal();
    const instance = M.Modal.getInstance($modal);

    function handleClick(evt) {
        getPokemon(evt.target.dataset.url, true); // when 'Detail' is clicked we want the dataset at the pokemon url to appear in the console. 'true' makes it a boolean
    }
    getPokemon(); // makes the data available as soon as the pagel loads

    function getPokemon(detailURL, isDetail) { 
        
        const url = detailURL || baseURL; // it will try  to run detailURL. If it can't, it will try baseURL before declaring it an error.

    $.ajax(url) // one line broken up for organization. no semi-colon.
        .then( //ajax(baseURL) is a promise. When it runs, 'then' runs, changed when we added 'const url'
            function(data){
                if(!isDetail) {
                pokemon = data.results;
                render(); // having the render here means it renders programmatically immediately.
                } else {
                    pokemonDetail = data;
                    render(true);
                // console.log("Data: ", data);
                }
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
            </li>`;
        })
    }

    function render(isDetail =false) {
        if(!isDetail) {
        const html = generateHTml().join("");
        $ulEL.html(html);
        } else {
            /// produce the modal
            $imgEL.attr('src', pokemonDetail.sprites.front_default);
            $imgEL.attr('alt', pokemonDetail.name);
            $name.text(pokemonDetail.name);
            $height.text("Height: " + pokemonDetail.height);
            $moves.text("Number of moves: " + pokemonDetail.moves.length);
            $abilities.text("Number of abilities: " + pokemonDetail.abilities.length);
            // open the modal
            instance.open();
        
        }
    }
// }) ();