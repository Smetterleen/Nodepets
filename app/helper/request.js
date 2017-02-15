var fs = require( 'fs' ),
    request = require( 'request' );


fs.readFile( '../.tmp/cookies.json', function( err, data ) {
    console.log( err, data );
} );

request = request.defaults( {
    jar: true,
} );


var middleware = [
    require( '../middleware/login.js' ),
    require( '../middleware/base_info.js' ),
];
 
module.exports = function( options, callback ) {
     
    return request( options, function( err, resp, body ) {

        var middleware_i = 0;

        function next_middleware( err, resp, body ) {

            if ( middleware_i >= middleware.length )
                return callback( err, resp, body );

            middleware[middleware_i++]( err, resp, body, next_middleware );

        };

        return next_middleware( err, resp, body );

    } );

};

module.exports.raw = function( options, callback ) {
    
    return request( options, function( err, resp, body ) {
        
        request.jar().getCookies( 'http://www.neopets.be' )i;
