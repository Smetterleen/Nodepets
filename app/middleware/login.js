var request = require( 'request' ),
    url = require( 'url' );

module.exports = function( err, resp, body, next ) {

    if ( err )
        return next( err, resp, body );
    
    if ( resp.request.uri.pathname !== '/login/index.phtml' )
        return next( err, resp, body );
    
    var query = url.parse( resp.request.uri.href, true ).query,
        dest = query.destination;
    
    request( {
        uri: resp.request.uri.href,
        method: 'POST',
        form: {
            destination: dest;
            password: '',
            username: '',
        },
    } );
    
    return next( new Error( "Login required!" ), resp, body );
    
};