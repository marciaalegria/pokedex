$(function(){
    start();
    $("#buscar").click( e=>{ 
        findpoke();
        
    });
    $("#limpiar").click( e=>{
        limpiar();
    })

    $(document).keypress( e=>{
        if(e.which == 13){
            findpoke();
        };
    })
})




function getpoke(id){
    $.ajax({
    type: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
    success: function (response) {
        console.log(response);
        $("#card").append(impCard(response));
        grafico();
    }
});
}

function impCard(nombre){
 var card= `
    <div class="col-sm-12 col-md-4">
        <div class="card" style="width: 75%;">
            <div class="card-body">
                <h5 class="card-title">${nombre.name}</h5>
                <p class="card-text">Habilidad: ${nombre.abilities[0].ability.name}, ${nombre.abilities[1].ability.name}</p>
            </div>
            <img class="card-img-top img-rounded" src="${nombre.sprites.front_shiny}" alt="img.pokemón" width="150" height="300">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Altura: ${nombre.height} cm.</li>
                <li class="list-group-item">Peso: ${nombre.weight} gr. </li>
                <li class="list-group-item">Experiencia base: ${nombre.base_experience}</li>
                
            </ul>
            <div id="graf"class="card-body" style= "height: 150px; width: 90%; margin: 0 auto;">
                
            </div>
        </div>
    </div>
    
 `
 return card;
}

function validar(id){
var exp = /^\d{1,3}$/;

if (!exp.test(id)) {
    alert("sólo hasta 3 dígitos");
    $("#poke").focus();
    return false
}

return true;
}

function findpoke(){
    var id_poke= $("#poke").val();
    if(validar(id_poke)){
    getpoke(id_poke);
    $("#poke").val("");
    $("#poke").focus();
    }
}

function limpiar(){
    $("#card").empty();
    $("#poke").focus();
}

function getStats(x, y){
    $.ajax({
        type: "GET",
        url: ` https://pokeapi.co/api/v2/stat/${id}/`,
        success: function (response) {
            console.log(response);
        }
    });
   
}

function start(){
    getStats();
}
function grafico(pokemones){
    
    var options = {
        title: {
            text: "Column Chart in jQuery CanvasJS"              
        },
        data: [              
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: [
                { label: "apple",  y: 10  },
                { label: "orange", y: 15  },
                { label: "banana", y: 25  },
                { label: "mango",  y: 30  },
                { label: "grape",  y: 28  }
            ]
        }
        ]
    };
    
    $("#graf").CanvasJSChart(options);
}
console.log(getStats);
