/* executes after page fully loaded: */
$(function() {
    console.log("JQuery loaded and working");

    /*Profile drop-down*/
    $('img.avatar').on('click', ()=>{
        $('#profile-menu').toggle();
    });

    /* Like button toggle*/
    /* Like button is loaded dynamically, so we attach function to static class 'main-container'*/
    $('.main-container').on('click',".follow-button",function () {    
        var avatarId = $(this).data('avatarid');
        console.log("press on " + $(this).data('avatarid')) 
        $('.follow-button[data-avatarid="'+avatarId+'"]').toggleClass('followed');
    });
    
    /* Fetch user info and put it into dropdown */
    $.get('https://private-anon-6783f8eed5-wad20postit.apiary-mock.com/users/1')
        .done( (data) => updateUserInfo(data) )
        .fail((error) => console.log(error));
    /* same for profiles  */
    $.get('https://private-anon-f4948f1c5a-wad20postit.apiary-mock.com/profiles')
        .done( (data) => updateAvatarInfo(data) )
        .fail((error) => console.log(error));

    


})

let profileTemplate = '<div class="profile-browse">\n' +
'       <div class="avatar-container">\n' +
'               <img src="res/images/avatar.png" class="avatar-browse" alt="Me">\n' +
'       </div>\n' +
'       <div class="profile-name"><h3>Gordon Freeman</h3></div>\n' +
'       <div class="profile-actions"><button type="button" name="follow" class="follow-button">Follow</button></div>\n' +
'       </div>\n' +
'</div>'


function updateAvatarInfo(avatars) {
    
    for (avatar of avatars){
        console.log(avatar)
        let profileElement = $(profileTemplate);
        
        $('.avatar-container img', profileElement).attr('src', avatar.avatar);
        $('.profile-name h3', profileElement).text(avatar.firstname + " " + avatar.lastname);
        $('.follow-button', profileElement).attr('data-avatarid', avatar.firstname );

        $('section.main-container').append(profileElement);
    }
}

function updateUserInfo(data) {

    let userinfo = $('<span>').text(data.firstname + " " + data.lastname);
    let email = $('<span>').text( data.email );
    $('#profile-menu').prepend( userinfo, email );
    $('img.avatar').attr('src', data.avatar);
}







