var request = require( '../helper/request.js' ),
    parser = require( 'cheerio' );

var login = require( '../middleware/login.js' );

( function( e ) {
    
    e.stocks = function( cb ) {
        
        request( {
            url: 'http://www.neopets.com/stockmarket.phtml',
            method: "GET",
        }, function( err, resp, body ) {
            
            if ( err )
                return cb( err );
            
            if ( resp.statusCode !== 200 )
                console.log( 'Unexpected status code: ' + resp.statusCode );
            
            var $ = parser.load( body );
            
            cb( null );
        } );
        
    };
    
}( module.exports ) );