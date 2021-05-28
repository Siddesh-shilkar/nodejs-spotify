$(document).ready(() => {  
    $("#search").on('click', () => {  
        let searchItem = $("#searchItem").val()
        $.ajax({  
            url: `http://localhost:8080/getArtist?searchItem=${searchItem}`,  
            type: 'GET',  
            success: function(data) {  
                let artists = data.data.items
                let cardHtml = ''
                $('#artistsList').html('')
                for (artist of artists) {
                  cardHtml += `<div class="col">
                    <div class="card shadow-sm" >
                        <img width="100%" height="250px" src=${artist.images.length !== 0 ? artist.images[0].url: 'placeholder.png'}>
            
                        <div class="card-body">
                        <h5 class="card-name">${artist.name}</h5>
                        <p class="card-text"><a href="http://localhost:8080/getAlbums?artistId=${artist.id}">Artist</a></p>
                        
                        </div>
                    </div>
                    </div>`
                }
                $('#artistsList').append(cardHtml)
            }
        });  
    });
});  