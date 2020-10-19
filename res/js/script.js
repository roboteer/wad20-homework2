/* executes after page fully loaded: */
$(function() {
    console.log("JQuery loaded and working");

    /*Profile drop-down*/
    $('img.avatar').on('click', ()=>{
        $('#profile-menu').toggle();
    });

    /* Fetch user info and put it into dropdown */
    $.get('https://private-anon-6783f8eed5-wad20postit.apiary-mock.com/users/1')
        .done( (data) => updateUserInfo(data) )
        .fail((error) => console.log(error));

    /* Task2: fetch all posts.. */
    $.get('https://private-anon-6783f8eed5-wad20postit.apiary-mock.com/posts')
        .done( (data) => updateAllPosts(data) )
        .fail((error) => console.log(error));


})



function updateUserInfo(data) {
    console.log(data);

    let userinfo = $('<span>').text(data.firstname + " " + data.lastname);
    let email = $('<span>').text( data.email );
    $('#profile-menu').prepend( userinfo, email );
    $('img.avatar').attr('src', data.avatar);
}



// use a "template"?
// TODO: backticked string-building might be more readable
let postTemplate = '<div class="post">\n' +
    '        <div class="post-author">\n' +
    '          <span class="post-author-info">\n' +
    '            <img src="res/images/avatar.png" alt="Post author">\n' +
    '            <small>John Doe</small>\n' +
    '          </span>\n' +
    '          <small>Sep 18, 2020 15:16</small>\n' +
    '        </div>\n' +
    '        <div class="post-title">\n' +
    '          <h3>This you should not see</h3>\n' +
    '        </div>\n' +
    '        <div class="post-actions">\n' +
    '          <button type="button" name="like" class="like-button">-999</button>\n' +
    '        </div>\n' +
    '      </div>';


/* composes a blog post and appends it to main container */
function updateAllPosts(posts) {
    console.log(posts);

    for (post of posts) {

        let postElement = $(postTemplate);

        $('.post-author>small', postElement).text( post.createTime );
        $('.post-author-info small', postElement).text( post.author.firstname + " " + post.author.lastname );
        $('.post-author-info img', postElement).attr('src', post.author.avatar);

        $('.post-title h3', postElement).text( post.text );
        $('.like-button', postElement).text( post.likes );

        //TODO: video content by type
       
        if(post.media){
            $( ".post-author", postElement ).after('<div class="post-image"></div>');
            if(post.media.type == "image"){
                $('.post-image', postElement).html( $('<img>').attr('src', post.media.url) );
            }else if(post.media.type == "video"){
                var video = $('<video />', {
                    id: 'video',
                    src: post.media.url,
                    type: 'video/mp4',
                    controls: true
                  });
                video.appendTo($('.post-image', postElement));
            }

        }else{
        //TODO: if there is no media, then remove .post-image also?
        }

        

        $('section.main-container').append(postElement);
    }
}

//TODO: like button clickable
//TODO: remove static posts from index.html