module.exports = function( err, resp, body, next ) {

    if ( err )
        return next( err, resp, body );
    
    return next( err, resp, body );
    
};
