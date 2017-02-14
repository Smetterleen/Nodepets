var request = require( '../helper/request.js' ),
    parser = require( 'cheerio' );

var login = require( '../middleware/login.js' );

( function( e ) {
    
    e.stocks = function( cb ) {
        
        request( {
            url: 'http://www.neopets.com/stockmarket.phtml',
            method: "GET",
            qs: {
                type: 'list',
                full: 'true',
            },
        }, function( err, resp, body ) {
            
            if ( err )
                return cb( err );
            
            if ( resp.statusCode !== 200 )
                console.log( 'Unexpected status code: ' + resp.statusCode );
            
            var $ = parser.load( body );

            var stock_list = $( '.content table tr' ).map( function( tr_i, tr ) {
                return {
                    name: $( tr ).find( 'td' ).eq( 1 ).text(),
                };
            } ).get();

            console.log( stock_list );
            
            cb( null );

        } );
        
    };
    
}( module.exports ) );
