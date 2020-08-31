$(function(){
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
            <img class="card-img-top img-fluid" src="${nombre.sprites.front_shiny}" alt="img.pokemón">
            <div class="card-body">
                <h5 class="card-title">${nombre.name}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Vestibulum at eros</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
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

function grafico(){
    
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
    
    $("#grafico").CanvasJSChart(options);
}
