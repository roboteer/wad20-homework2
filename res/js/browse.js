/* executes after page fully loaded: */
$(function() {
    console.log("JQuery loaded and working");

    /*Profile drop-down*/
    $('img.avatar').on('click', ()=>{
        $('#profile-menu').toggle();
    });

    /* Like button toggle*/
    /* Like button is loaded dynamically, so we attach function to static class 'main-container'*/
    $('.main-container').on('click',".like-button",function () {    
        var postId = $(this).data('postid');    
        $('.like-button[data-postid="'+postId+'"]').toggleClass('liked');
    });
    
    /* Fetch user info and put it into dropdown */
    $.get('https://private-anon-6783f8eed5-wad20postit.apiary-mock.com/users/1')
        .done( (data) => updateUserInfo(data) )
        .fail((error) => console.log(error));


    


})



function updateUserInfo(data) {
    console.log(data);

    let userinfo = $('<span>').text(data.firstname + " " + data.lastname);
    let email = $('<span>').text( data.email );
    $('#profile-menu').prepend( userinfo, email );
    $('img.avatar').attr('src', data.avatar);
}







