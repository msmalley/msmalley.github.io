/*

UTILS

*/

var minting_costs = {
    initial: {
        artist: 1000000000000000,
        art: 100000000000000
    },
    increase: {
        artist: 1000000000000000,
        art: 500000000000000
    },
    now: {
        artist: 0,
        art: 0
    }
};

var total_mints = {
    artist: 1,
    art: 1
};

const colorThief = new ColorThief();

var get_current_params = function()
{
    var params = {};
    if(window.location.search.indexOf('?') > -1)
    {
        var t = window.location.search.split('?')[1];
        var terms = t.split('&');
        for(term = 0; term < terms.length; term++)
        {
            var p = terms[term].split('=');
            params[p[0]] = p[1];
        };
    }
    return params;
}

var shuffle_array = function(array) 
{
  var currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}

/*

CONFIG

*/

var pandora_options = 
{
    apis: {
        png: 'https://xtend.cokeeps.com/pandora/art/'
    },
    contracts: {
        art: {
            abi: '[{"inputs":[{"internalType":"address","name":"artistAddress","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"_paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"artBase","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"artCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"creatorAddress","type":"address"},{"internalType":"uint256","name":"artist","type":"uint256"},{"internalType":"string","name":"initial","type":"string"}],"name":"artID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"artIncrease","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"artistsAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nft_id","type":"uint256"}],"name":"displayArt","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"},{"internalType":"string","name":"initial","type":"string"}],"name":"generateArt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nft_id","type":"uint256"}],"name":"getArt","outputs":[{"internalType":"string","name":"initial","type":"string"},{"internalType":"string","name":"style","type":"string"},{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"artistId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nft_id","type":"uint256"}],"name":"getArtist","outputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"name":"getArtistMintCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"initial","type":"string"}],"name":"searchArt","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"name":"searchArtist","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"initial","type":"string"}],"name":"searchStyles","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"styleAddress","type":"address"}],"name":"setStyles","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stylesAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbolBytes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
            address: '0x1722A7Eb98172f97c6fFB054068200FA2d8ADeDE'
        },
        artists: {
            abi: '[{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"_paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"artistBase","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"artistCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"artistAddress","type":"address"},{"internalType":"string","name":"firstInitial","type":"string"},{"internalType":"string","name":"secondInitial","type":"string"}],"name":"artistId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"artistIncrease","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"firstInitial","type":"string"},{"internalType":"string","name":"secondInitial","type":"string"}],"name":"generateArtist","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"name":"getArtist","outputs":[{"internalType":"string","name":"firstInitial","type":"string"},{"internalType":"string","name":"secondInitial","type":"string"},{"internalType":"string","name":"style","type":"string"},{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"name":"getArtistBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"name":"getArtisticStyleBytes","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"name":"getAttributes","outputs":[{"internalType":"uint256","name":"bodyStyle","type":"uint256"},{"internalType":"uint256","name":"headStyle","type":"uint256"},{"internalType":"uint256","name":"eyeStyle","type":"uint256"},{"internalType":"uint256","name":"mouthStyle","type":"uint256"},{"internalType":"uint256","name":"accessoriesStyle","type":"uint256"},{"internalType":"uint256","name":"bodyAndHeadColour","type":"uint256"},{"internalType":"uint256","name":"eyeAndMouthColour","type":"uint256"},{"internalType":"uint256","name":"accessoriesColour","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"initial","type":"string"}],"name":"searchArtists","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbolBytes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
            address: '0xBfeC653ee2c292388576c2A02E9dD4413Ea9F17F'
        }
    },
    terms: get_current_params(),
    nfts: {
        squares: [
            '94205699822451333113128196630514675934246267212697860626635805911484442300603',
            '24896609405935375194686464106580803410536231185002612372733023314821754720325',
            '8280014841493775768269889089140861101248968995127777670513128502581481679673'
        ],
        rectangles: [
            '69984170702987381290309537176874370225028844312874816477667819560514941546731',
            '72433975199183629307991977809769806792884668132126573071342444737766792464911',
            '69544949948015069734918543146121324721257548822950280321460481177646092164697'
        ],
        lines: [
            '92534124047290146278043326703167710883639173503604198568420372031349076814846',
            '13365509954640446027089386226120574655443475842229233781010355947666665675637',
            '100812401244203211575870309660881945455283896459085784354670057419644854231137'
        ],
        circles: [
            '47460250141908196842333047280368161694251853271219034994987677364717398098359',
            '108509900992095891178012528350690267225311108381293536026076356923394241306042',
            '24743269374905393971984838330046267805598164433783484730662098565250144866952'
        ],
        crosses: [
            '2026021459919010537862043921991336462514764039207126140806084860050495268800',
            '61018971902072860888502452389289464420248782030659390721759027961316311643290',
            '113279331518578651873525886796810563361323253774480485509439805514992476220168'
        ]
    }
};

/*

PANDORA

*/
    
var pandora = 
{
    config: pandora_options,
    costs: function()
    {
        var available_art = 17576;
        var available_artists = 676;
        var costs = minting_costs;
        var mints = total_mints;
        var cost_to_mint = {
            artist: minting_costs.now.artist,
            art: minting_costs.now.art
        };
        var remaining_art = available_art - mints.art;
        var remaining_artists = available_artists - mints.artist;
        var art_contract_explorer = 'https://blockscout.cokeeps.com/address/' + pandora_options.contracts.art.address + '/write-contract';
        var artist_contract_explorer = 'https://blockscout.cokeeps.com/address/' + pandora_options.contracts.artists.address + '/write-contract';
        jQuery('.art-contract-explorer').attr('href', art_contract_explorer);
        jQuery('.artist-contract-explorer').attr('href', artist_contract_explorer);
        jQuery('.total-artists').text(available_artists);
        jQuery('.art-remain').text(remaining_art);
        jQuery('.artists-remain').text(remaining_artists);
        jQuery('.art-cost b').text(parseFloat((cost_to_mint.art / 1000000000000000000)));
        jQuery('.artist-cost b').text(parseFloat((cost_to_mint.artist / 1000000000000000000)));
        return cost_to_mint;
        
    },
    html: {
        art: function(nft_id = false, art_contract, artist_contract, style = false, term = false)
        {
            if(term)
            {
                art_contract.methods.searchArt(term).call({}, function(error, result)
                {
                    if(!error && result)
                    {
                        pandora.nfts.filter(result, false);
                    }
                });
            }
            else if(style)
            {
                art_contract.methods.searchStyles(style).call({}, function(error, result)
                {
                    if(!error && result)
                    {
                        pandora.nfts.filter(result, false);
                    }
                });
            }
            else
            {
                pandora.nfts.filter([nft_id]);
            }
        },
        artist: function(artist_id = false, art_contract, artist_contract, initial = false)
        {
            if(initial)
            {
                artist_contract.methods.searchArtists(initial).call({}, function(error, result)
                {
                    if(!error && result)
                    {
                        var results = [];
                        jQuery.each(result, function(r)
                        {
                            var got = false;
                            jQuery.each(results, function(rs)
                            {
                                if(results[rs] == result[r]) got = true;
                            });
                            if(!got) results.push(result[r]);
                        })
                        pandora.artists.filter(results, false);
                    }
                    else
                    {
                        pandora.ux.modal('Warning', '<p>No artists matching <code>' + initial + '</code>.</p><p>Must be a single initial from A to Z.</p>');
                    }
                });
            }
            else
            {
                pandora.artists.filter([artist_id], true);
            }
        },
        owner: function(address = false, art_contract, artist_contract)
        {
            var selected_nfts = [];
            var selected_artists = [];
            
            try
            {
                art_contract.methods.balanceOf(address).call({}, function(error, b)
                {
                    if(!error && b)
                    {
                        var balance = parseInt(b);
                        for(index = 0; index < balance; index++)
                        {
                            art_contract.methods.tokenOfOwnerByIndex(address, index).call({}, function(error, results)
                            {
                                if(!error && results)
                                {
                                    selected_nfts.push(results);
                                    if(selected_nfts.length == balance)
                                    {
                                        pandora.nfts.filter(selected_nfts, false);
                                    }
                                }
                            });
                        }
                    }
                });
            }
            catch(err)
            {
                pandora.ux.modal('Warning', 'Invalid Owner Address');
                jQuery('.section.loading').removeClass('loading');
            }
            
            artist_contract.methods.balanceOf(address).call({}, function(error, c)
            {
                if(!error && c)
                {
                    var balance = parseInt(c);
                    for(index = 0; index < balance; index++)
                    {
                        artist_contract.methods.tokenOfOwnerByIndex(address, index).call({}, function(error, result)
                        {
                            if(!error && result)
                            {
                                selected_artists.push(result);
                                if(selected_artists.length == balance)
                                {
                                    pandora.artists.filter(selected_artists, false);
                                }
                            }
                        });
                    }
                }
            });
        },
        gallery: function(nfts, slide_show = true, artists = false, artist_profile = false)
        {
            var loaded_count = 0;
            var filtered_nfts = nfts;
            if(artists) 
            {
                slide_show = false;
                filtered_nfts = false;
            }
            var html = pandora.nfts.gallery(filtered_nfts, slide_show, artists, artist_profile);
            jQuery('#random-nfts').append(html);
            if(artists)
            {
                var thing = 'artists';
                if(typeof pandora.config.terms.initial != 'undefined')
                {
                    var remain = 52 - artists.length;
                    var word = 'Artists';
                    if(artists.length == 1) word = 'Artist'
                    thing = '<h4 class="pstart smaller">'+ artists.length + ' Minted ' + pandora.config.terms.initial + ' ' + word + ' - ' +remain + ' Remaining</h4>';
                }
                else if(typeof pandora.config.terms.artist != 'undefined')
                {
                    thing = '<h4 class="pstart smaller">NFA</h4><small class="btn-blocks">' + pandora.config.terms.artist + '</small>';
                }
                else if(typeof pandora.config.terms.address != 'undefined')
                {
                    thing = '<h4 class="pstart smaller">Art &amp; Artists owned by ' + pandora.config.terms.address.toUpperCase().substring(0, 5) + '</small>';
                }
                var html = '<p>&nbsp;</p>' + thing;
                jQuery('alert.intro-text').html(html);
                jQuery('.section.loading').removeClass('loading');
                var costs = pandora.costs();
            }
            jQuery('.pandora-image').each(function(i)
            {
                var this_img = jQuery(this);
                jQuery(this).load(function()
                {
                    loaded_count++;
                    var img = new Image();
                    img.addEventListener('load', function() 
                    {
                        var acolours = [];
                        var p = colorThief.getPalette(img, 5);
                        acolours.push({
                            hex: rgbToHex(p[0][0], p[0][1], p[0][2]),
                            name: ntc.name(rgbToHex(p[0][0], p[0][1], p[0][2]))[1]
                        });
                        acolours.push({
                            hex: rgbToHex(p[1][0], p[1][1], p[1][2]),
                            name: ntc.name(rgbToHex(p[1][0], p[1][1], p[1][2]))[1]
                        });
                        acolours.push({
                            hex: rgbToHex(p[2][0], p[2][1], p[2][2]),
                            name: ntc.name(rgbToHex(p[2][0], p[2][1], p[2][2]))[1]
                        });
                        acolours.push({
                            hex: rgbToHex(p[3][0], p[3][1], p[3][2]),
                            name: ntc.name(rgbToHex(p[3][0], p[3][1], p[3][2]))[1]
                        });
                        acolours.push({
                            hex: rgbToHex(p[4][0], p[4][1], p[4][2]),
                            name: ntc.name(rgbToHex(p[4][0], p[4][1], p[4][2]))[1]
                        });
                        var matt_colour = jQuery.xcolor.opacity('#eee', acolours[1].hex, 0.15);
                        var frame_colour = jQuery.xcolor.opacity('#eee', acolours[0].hex, 0.15);
                        var frame_colour_darker = jQuery.xcolor.opacity('#eee', acolours[0].hex, 0.2);
                        var insert_colour = jQuery.xcolor.opacity('#eee', acolours[2].hex, 0.15);
                        var gradient_top = jQuery.xcolor.opacity('#eee', acolours[3].hex, 0.15);
                        var gradient_bottom = jQuery.xcolor.opacity('#aaa', acolours[4].hex, 0.15);

                        jQuery(this_img).css({background: matt_colour});
                        jQuery(this_img).css({'border-color': insert_colour});
                        jQuery(this_img).css({'border-left-color': frame_colour});
                        jQuery(this_img).css({'border-right-color': frame_colour});
                        jQuery(this_img).css({'border-top-color': frame_colour_darker});
                        jQuery(this_img).css({'border-bottom-color': frame_colour_darker});
                        
                        if(slide_show)
                        {
                            jQuery(this_img).parent().parent().parent().parent().parent().css(
                            {
                                'background-image': 'linear-gradient('+gradient_top+', '+gradient_bottom+')'
                            });
                            
                            var thing = false;
                            if(typeof pandora.config.terms.nft != 'undefined')
                            {
                                thing = '<h4 class="pstart smaller">NFTX1</h4><br />';
                                thing+= '<small class="btn-blocks">' + pandora.config.terms.nft + '</small>';
                            }
                            if(thing)
                            {
                                var html = '<p>&nbsp;</p>' + thing;
                                jQuery('alert.intro-text').html(html);
                            }
                        }
                        else if(!artist_profile)
                        {
                            var thing = 'artists';
                            var art_minted = nfts.length;
                            var art_remaining = 676 - art_minted;
                            
                            if(typeof pandora.config.terms.style != 'undefined')
                            {
                                thing = pandora.config.terms.style + ' Artwork:';
                            }
                            else if(typeof pandora.config.terms.term != 'undefined')
                            {
                                thing = '' + art_minted + ' Minted ' + pandora.config.terms.term + ' Artwork - ' + art_remaining + ' Remaining';
                            }
                            else if(typeof pandora.config.terms.address != 'undefined')
                            {
                                thing = 'Artists &amp; Art owned by ' + pandora.config.terms.address.toUpperCase().substring(0, 5);
                            }
                            var html = '<p>&nbsp;</p><h4 class="pstart smaller">' + thing + '</h4>';
                            jQuery('alert.intro-text').html(html);
                        }

                        jQuery(this_img).parent().removeClass('loading');

                        if(loaded_count == filtered_nfts.length && !artist_profile)
                        {
                            var costs = pandora.costs();
                            jQuery('.section.loading').removeClass('loading');
                        }
                    });
                    img.crossOrigin = 'Anonymous';
                    img.src = jQuery(this).attr('src');
                })
            });
            var avatar_objects = filtered_nfts;
            if(artists)
            {
                avatar_objects = artists;
            }
            jQuery.each(avatar_objects, function(fn)
            {
                var artist_id = false;
                var artist_attributes = false;
                if(artists)
                {
                    artist_id = artists[fn].id;
                    artist_attributes = artists[fn].attributes;
                }
                else
                {
                    artist_id = filtered_nfts[fn].artist.id;
                    artist_attributes = filtered_nfts[fn].artist.attributes;
                }
                renderArtist(
                    artist_attributes, 
                    function(avatar = false)
                    {   
                        if(avatar)
                        {
                            jQuery('#avatar-' + artist_id).html(avatar);
                        }
                    }
                );
            });
        }
    },
    init: function()
    {
        var nfts = [];
        jQuery.each(pandora_options.nfts.squares, function(s){
            nfts.push(pandora_options.nfts.squares[s]);
        });
        jQuery.each(pandora_options.nfts.rectangles, function(r){
            nfts.push(pandora_options.nfts.rectangles[r]);
        });
        jQuery.each(pandora_options.nfts.lines, function(l){
            nfts.push(pandora_options.nfts.lines[l]);
        });
        jQuery.each(pandora_options.nfts.circles, function(c){
            nfts.push(pandora_options.nfts.circles[c]);
        });
        jQuery.each(pandora_options.nfts.crosses, function(c){
            nfts.push(pandora_options.nfts.crosses[c]);
        });
        var random_nfts = shuffle_array(nfts);
        var selected_nfts = [
            random_nfts[0], 
            random_nfts[1], 
            random_nfts[2],
            random_nfts[3],
            random_nfts[4],
            random_nfts[5]
        ];
        pandora.config.nfts.random = random_nfts;
        pandora.config.nfts.select = selected_nfts;
        
        var web3 = new Web3(
            new Web3.providers.HttpProvider('https://poa.cokeeps.com'), 
            "utils"
        );
        var art_contract = new web3.eth.Contract(
            JSON.parse(pandora_options.contracts.art.abi), 
            pandora_options.contracts.art.address
        );
        var artist_contract = new web3.eth.Contract(
            JSON.parse(pandora_options.contracts.artists.abi), 
            pandora_options.contracts.artists.address
        );
        
        var things_to_do = 4;
        var thing_done = 0;
        
        // Update current totals ...
        
        art_contract.methods.totalSupply().call({}, function(error, result)
        {
            if(!error && result)
            {
                thing_done++;
                total_mints.art = parseInt(result);
                art_contract.methods.artCost().call({}, function(error, result)
                {
                    if(!error && result)
                    {
                        thing_done++;
                        minting_costs.now.art = parseInt(result);
                        if(thing_done == things_to_do) get_ready();
                    }
                });
            }
        });
        artist_contract.methods.totalSupply().call({}, function(error, result)
        {
            if(!error && result)
            {
                thing_done++;
                total_mints.artist = parseInt(result);
                artist_contract.methods.artistCost().call({}, function(error, result)
                {
                    if(!error && result)
                    {
                        thing_done++;
                        minting_costs.now.artist = parseInt(result);
                        if(thing_done == things_to_do) get_ready();
                    }
                });
            }
        });
        
        // Render relevant page ...
        
        function get_ready()
        {
            if(typeof pandora.config.terms == 'object' && typeof pandora.config.terms.nft != 'undefined')
            {
                pandora.html.art(pandora.config.terms.nft, art_contract, artist_contract);
            }
            else if(typeof pandora.config.terms == 'object' && typeof pandora.config.terms.term != 'undefined')
            {
                pandora.html.art(false, art_contract, artist_contract, false, pandora.config.terms.term);
            }
            else if(typeof pandora.config.terms == 'object' && typeof pandora.config.terms.style != 'undefined')
            {
                pandora.html.art(false, art_contract, artist_contract, pandora.config.terms.style, false);
            }
            else if(typeof pandora.config.terms == 'object' && typeof pandora.config.terms.artist != 'undefined')
            {
                pandora.html.artist(pandora.config.terms.artist, art_contract, artist_contract);
            }
            else if(typeof pandora.config.terms == 'object' && typeof pandora.config.terms.initial != 'undefined')
            {
                pandora.html.artist(false, art_contract, artist_contract, pandora.config.terms.initial);
            }
            else if(typeof pandora.config.terms == 'object' && typeof pandora.config.terms.address != 'undefined')
            {
                pandora.html.owner(pandora.config.terms.address, art_contract, artist_contract);
            }
            else
            {
                pandora.nfts.filter(selected_nfts);
            }
        }
    },
    artists: 
    {
        filter: function(artists, is_single = false)
        {
            var filter_count = 0;
            var loaded_count = 0;
            var filtered_artists = [];
            jQuery.each(artists, function(sn)
            {
                var web3 = new Web3(
                    new Web3.providers.HttpProvider('https://poa.cokeeps.com'), 
                    "utils"
                );
                var art_contract = new web3.eth.Contract(
                    JSON.parse(pandora_options.contracts.art.abi), 
                    pandora_options.contracts.art.address
                );
                var artist_contract = new web3.eth.Contract(
                    JSON.parse(pandora_options.contracts.artists.abi), 
                    pandora_options.contracts.artists.address
                );
                
                var artist = artists[sn];
                
                try
                {
                    artist_contract.methods.getAttributes(artist).call({}, function(error, attr)
                    {
                        if(!error && attr)
                        {
                            artist_contract.methods.getArtist(artist).call({}, function(error, result)
                            {
                                if(!error && result)
                                {
                                    // Now need to get their NFTs ...

                                    var this_artist = {
                                        id: artist,
                                        name: result.firstInitial + result.secondInitial,
                                        block: parseInt(result.blockNumber),
                                        style: result.style,
                                        creator: result.creator,
                                        owner: result.owner,
                                        attributes: attr
                                    };

                                    art_contract.methods.searchArtist(artist).call({}, function(error, results)
                                    {
                                        if(!error && results)
                                        {
                                            this_artist.art = results;
                                            this_artist.artworks = results.length;

                                            filter_count++;
                                            filtered_artists.push(this_artist);

                                            if(filter_count == artists.length)
                                            {
                                                pandora.html.gallery(false, false, filtered_artists, is_single);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                catch(err)
                {
                    pandora.ux.modal('Warning', 'Invalid Artist ID');
                    jQuery('.section.loading').removeClass('loading');
                }
            });
        }
    },
    nfts: 
    {
        filter: function(nfts, slide_show = true)
        {
            var filter_count = 0;
            var loaded_count = 0;
            var filtered_nfts = [];
            
            jQuery.each(nfts, function(sn)
            {
                var nft = nfts[sn];
                var settings = {
                    "url": pandora_options.apis.png + nft + '/artist',
                    "method": "GET",
                    "timeout": 0,
                    "error": function(err)
                    {
                        pandora.ux.modal('Warning', 'Invalid NFT ID');
                        jQuery('.section.loading').removeClass('loading');
                    }
                };
                jQuery.ajax(settings).done(function (response) 
                {
                    if(typeof response.rdata == 'object')
                    {
                        filter_count++;
                        filtered_nfts.push(response.rdata);

                        if(filter_count == nfts.length)
                        {
                            pandora.html.gallery(filtered_nfts, slide_show);
                        }
                    }
                    else
                    {
                        pandora.ux.modal('Warning', 'Invalid NFT ID');
                        jQuery('.section.loading').removeClass('loading');
                    }
                });
            });
        },
        gallery: function(selected_nfts, slide_show = false, artists = false, is_single = false)
        {
            var html = '';
            if(slide_show)
            {
                html+= '<div id="random-gallery" class="carousel slide carousel-fade" data-bs-ride="carousel">';
                    if(selected_nfts.length > 1)
                    {
                        html+= '<div class="carousel-indicators">';
                            html+= '<p>&nbsp;</p>';
                            jQuery.each(selected_nfts, function(sn)
                            {
                                var active = '';
                                var current = 'true';
                                var name = selected_nfts[sn].name;
                                if(sn < 1) 
                                {
                                    active = 'active';
                                    current = 'false';
                                }
                                html+= '<button type="button" data-bs-target="#random-gallery" data-bs-slide-to="'+sn+'" class="'+active+'" aria-current="'+current+'" aria-label="'+name+'"></button>';
                            });
                            html+= '<p>&nbsp;</p>';
                        html+= '</div>';
                    }
                    html+= '<div class="carousel-inner">';
                        jQuery.each(selected_nfts, function(sn)
                        {
                            var active = '';
                            var nft = selected_nfts[sn];
                            var url = pandora_options.apis.png + nft.id + '.png';
                            var url_base = '' + jQuery('body').attr('data-base');
                            var art_url = url_base + 'art/?nft=' + nft.id;
                            var artist_url = url_base + 'artists/?artist=' + nft.artist.id;
                            var art_owner_url = url_base + 'owners/?address=' + nft.owner;
                            var artist_owner_url = url_base + 'owners/?address=' + nft.artist.owner;
                            var art_style = url_base + 'art/?style=' + nft.style;
                            var art_term = url_base + 'art/?term=' + nft.initial;
                            var artist_term = url_base + 'artists/?initial=' + nft.artist.name[0];
                            var artist_initial = url_base + 'artists/?initial=' + nft.artist.name[1];
                            
                            if(sn < 1) active = 'active';
                            html+= '<div class="carousel-item '+active+'" data-bs-interval="30000">';
                                html+= '<div class="section section-art-'+sn+'">';
                                    html+= '<div class="container">';
                                        html+= '<div class="artist-info">';
                                            html+= '<div class="row frames">';
                                                html+= '<div class="col-md-7 artistic loading relative">';
                                                    html+= '<img class="img img-responsive img-block pandora-image" src="' + url + '" />';
                                                html+= '</div>';
                                                html+= '<div class="col-md-5">';
                                                    html+= '<div class="mounded">';
                                                        html+= '<div class="description-art description-art-'+sn+'">';
                                                            html+= '<h2><a href="'+art_url+'">' + nft.name + '</a> <a href="'+art_style+'">' + nft.style.toUpperCase() + '</a></h2>';
                                                            html+= '<hr>';
                                                            html+= '<h6>Art #<a href="'+art_term+'">' + nft.initial + '</a> Owner</h6>';
                                                            html+= '<h4><a href="'+art_owner_url+'">' + nft.owner.substring(0, 5).toUpperCase() + '</a></h4>';
                                                            html+= '<hr>';
                                                            html+= '<div class="row">';
                                                                html+= '<div class="col-md-6">';
                                                                    html+= '<div id="avatar-' + nft.artist.id + '" class="pandora-avatar"></div>';
                                                                html+= '</div>';
                                                                html+= '<div class="col-md-6" style="text-align: left;">';
                                                                    html+= '<br />';
                                                                    html+= '<h6><a href="'+artist_url+'">Artist</a><br />#<a href="'+artist_term+'">' + nft.artist.name[0] + '</a> #<a href="'+artist_initial+'">' + nft.artist.name[1] + '</a> Owner</h6>';
                                                                    html+= '<h4><a href="'+artist_owner_url+'">' + nft.artist.owner.substring(0, 5).toUpperCase() + '</a></h4>';
                                                                html+= '</div>';
                                                            html+= '</div>';
                                                        html+= '</div>';
                                                    html+= '</div>';
                                                    html+= '<div class="actions">';
                                                        html+= '<a href="https://blockscout.cokeeps.com/address/'+pandora_options.contracts.art.address+'/write-contract" target="_blank" class="btn btn-outline-dark">';
                                                            html+= 'MINT NEW ARTWORK';
                                                        html+= '</a>';
                                                        html+= '<br />';
                                                        html+= '<a href="https://blockscout.cokeeps.com/address/'+pandora_options.contracts.artists.address+'/write-contract" target="_blank" class="btn btn-outline-dark">';
                                                            html+= 'GENERATE ARTIST';
                                                        html+= '</a>';
                                                    html+= '</div>';
                                                html+= '</div>';
                                            html+= '</div>';
                                        html+= '</div>';
                                    html+= '</div>';
                                html+= '</div>';
                            html+= '</div>';
                        });
                    html+= '</div>';
                    if(selected_nfts.length > 1)
                    {
                        html+= '<button class="carousel-control-prev" type="button" data-bs-target="#random-gallery" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#random-gallery" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button>';
                    }
                html+= '</div>';
                return html;
            }
            else
            {
                if(
                    typeof pandora.config.terms.style != 'undefined'
                    || typeof pandora.config.terms.term != 'undefined'
                    || 
                    (
                        typeof pandora.config.terms.address != 'undefined'
                        && selected_nfts
                    )
                )
                {
                    var html = '<div class="section">';
                        html+= '<div class="container">';
                            html+= '<div id="random-gallery">';
                                html+= '<div class="row">';
                                    jQuery.each(selected_nfts, function(sn)
                                    {
                                        var nft = selected_nfts[sn];
                                        var url_base = '' + jQuery('body').attr('data-base');
                                        var art_url = url_base + 'art/?nft=' + nft.id;
                                        var url = pandora_options.apis.png + nft.id + '.png';
                                        html+= '<div class="col-md-4">';
                                            html+= '<div class="pandora-frame" data-tag="' + nft.name + '">';
                                                html+= '<a href="'+art_url+'">';
                                                    html+= '<img class="img img-responsive img-block pandora-image framed" src="' + url + '" />';
                                                html+= '</a>';
                                            html+= '</div>';
                                        html+= '</div>';
                                    });
                                html+= '</div>';
                            html+= '</div>';
                        html+= '</div>';
                    html+= '</div>';
                    return html;
                }
                else if
                (
                    typeof pandora.config.terms.initial != 'undefined'
                    || typeof pandora.config.terms.artist != 'undefined'
                    || 
                    (
                        typeof pandora.config.terms.address != 'undefined'
                        && artists
                    )
                )
                {
                    var html = '<div class="section">';
                        html+= '<div class="container">';
                            html+= '<div id="random-artist-gallery">';
                                html+= '<div class="row">';
                                    jQuery.each(artists, function(sn)
                                    {
                                        var artist = artists[sn];
                                        var url_base = '' + jQuery('body').attr('data-base');
                                        var artist_url = url_base + 'artists/?artist=' + artist.id;
                                        
                                        if(is_single)
                                        {
                                            html+= '<div class="col-md-4"></div>';
                                        }
                                        
                                        html+= '<div class="col-md-4">';
                                            if(!is_single)
                                            {
                                                html+= '<a href="'+artist_url+'" class="pandora-avatar-frame">';
                                            }
                                                html+= '<div id="avatar-' + artist.id + '" class="pandora-avatar"></div>';
                                        
                                                var this_artist_name = '<a href="' + url_base + 'artists/?initial=' + artist.name[0] + '">' + artist.name[0] + '</a><a href="' + url_base + 'artists/?initial=' + artist.name[1] + '">' + artist.name[1] + '</a>';
                                        
                                                var this_artist_style = '<a href="' + url_base + 'art/?style=' + artist.style + '">' + artist.style + '</a>';
                                        
                                                var this_owner = '<a href="' + url_base + 'owners/?address=' + artist.owner + '">' + artist.owner.toUpperCase().substring(0, 5) + '</a>';
                                        
                                                if(is_single)
                                                {
                                                    html+= '<alert class="alert text-center"><h4 class="pstart smaller" style="line-height:3rem;">';
                                                
                                                    html+= '<small>Name: ' + this_artist_name + '</small>';
                                                    html+= '<br /><small>Style: ' + this_artist_style + '</small>';
                                                    html+= '<br /><small>Minted Art: ' + artist.artworks + ' of 26</small>';
                                                    html+= '<br /><small>Owner: ' + this_owner + '</small>';
                                                
                                                    html+= '<hr><small>See my artwork below!</small><hr><br />';
                                                    html+= '</h4></alert>';
                                                }
                                                else
                                                {
                                                    html+= '<small>Name: ' + artist.name + ' | Style: ' + artist.style + '</small>';
                                                }
                                            if(!is_single)
                                            {
                                                html+= '</a>';
                                            }
                                        html+= '</div>';
                                        
                                        if(is_single)
                                        {
                                            html+= '<div class="col-md-4"></div>';
                                        }
                                    });
                                html+= '</div>';
                                if(is_single)
                                {
                                    html+= '<div class="row">';
                                    jQuery.each(artists[0].art, function(a)
                                    {
                                        var nft = artists[0].art[a];
                                        var url_base = '' + jQuery('body').attr('data-base');
                                        var art_url = url_base + 'art/?nft=' + nft;
                                        var url = pandora_options.apis.png + nft + '.png';
                                        html+= '<div class="col-md-4">';
                                            html+= '<div class="pandora-frame unknown">';
                                                html+= '<a href="'+art_url+'">';
                                                    html+= '<img class="img img-responsive img-block pandora-image" src="' + url + '" />';
                                                html+= '</a>';
                                            html+= '</div>';
                                        html+= '</div>';
                                    });
                                    html+= '</div>';
                                }
                            html+= '</div>';
                        html+= '</div>';
                    html+= '</div>';
                    return html;
                }
            }
        }
    },
    ux: {
        modal: function(title, contents, display_footer = false, keyboard = true, backdrop = true, focus = true, footer_text = false, footer_click = false)
        {
            if(jQuery('.modal.show').length > 0)
            {
                jQuery('.modal.show').each(function(m)
                {
                    var id = jQuery(this).attr('id');
                    var this_modal = bootstrap.Modal.getInstance(
                        document.getElementById(id)
                    );
                    this_modal.hide();
                });
            }
            jQuery('#default-modal').find('.modal-title').text(title);
            jQuery('#default-modal').find('.modal-body').html(contents);
            if(display_footer)
            {
                jQuery('#default-modal').find('.modal-footer').show();
            }
            else
            {
                jQuery('#default-modal').find('.modal-footer').hide();
            }
            if(backdrop == 'static')
            {
                jQuery('#default-modal').find('.btn-close').hide();
            }
            else
            {
                jQuery('#default-modal').find('.btn-close').show();
            }
            if(footer_text)
            {
                jQuery('#default-modal').find('.btn-secondary').text(footer_text);
            }
            else
            {
                jQuery('#default-modal').find('.btn-secondary').text('CLOSE');
            }
            if(footer_click)
            {
                jQuery('#default-modal').find('.btn-secondary').attr('onclick', footer_click);
            }
            else
            {
                jQuery('#default-modal').find('.btn-secondary').attr('onclick', '');
            }
            var el = document.getElementById('default-modal');
            var modal = new bootstrap.Modal(el, {
                keyboard: keyboard,
                backdrop: backdrop,
                focus: focus
            });
            el.addEventListener('hidden.bs.modal', function (event)
            {
                
            });
            modal.show();
        }
    }
};

jQuery(document).ready(function()
{
    pandora.init();
});