var stockmarket = require( global.app_dir + 'games/stockmarket.js' );

describe( "Stock market API", function() {
    
    describe( "get stock information", function() {
        
        it( "should return a list of stocks and their information", function( done ) {
        
            stockmarket.stocks( function( stock_list ) {
                
                console.log( stock_list );
                fail();
                done();
                
            } );
            
        } );
        
    } );
    
} );