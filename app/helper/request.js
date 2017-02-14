var request = require( 'request' );

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