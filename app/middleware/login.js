var parser = require( 'cheerio' ),
    request = require( 'request' ).defaults( {
        jar: true,
    } ),
    url = require( 'url' );

module.exports = function( err, resp, body, next ) {

    if ( err )
        return next( err, resp, body );
    
    if ( resp.request.uri.pathname !== '/login/index.phtml' )
        return next( err, resp, body );
    
    var query = url.parse( resp.request.uri.href, true ).query,
        dest = query.destination;

    request( {
        uri: 'http://www.neopets.com/login.phtml',
        method: 'POST',
        form: {
            destination: dest,
            password: 'tester01',
            username: 'nodepets_tester',
        },
        followAllRedirects: true,
    }, function( err, resp, body ) {

        if ( resp.statusCode === 403 ) {

            if ( body === '' )
                throw new Error( "Too many logins" );

            throw new Error( "Invalid credentials" );

        }
    
        return next( err, resp, body );
    
    } );
    
};
