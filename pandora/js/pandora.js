/*

UTILS

*/

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
            abi: '[{"inputs":[{"internalType":"string","name":"assetName","type":"string"},{"internalType":"string","name":"assetSymbol","type":"string"},{"internalType":"string","name":"metaBase","type":"string"},{"internalType":"address","name":"artistAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"_paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"artBase","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"creatorAddress","type":"address"},{"internalType":"uint256","name":"artist","type":"uint256"},{"internalType":"string","name":"initial","type":"string"}],"name":"artID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"artistsAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nft_id","type":"uint256"}],"name":"displayArt","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"},{"internalType":"string","name":"initial","type":"string"}],"name":"generateArt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nft_id","type":"uint256"}],"name":"getArt","outputs":[{"internalType":"string","name":"initial","type":"string"},{"internalType":"string","name":"style","type":"string"},{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"artistId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nft_id","type":"uint256"}],"name":"getArtist","outputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"name":"getArtistMintCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"styleAddress","type":"address"}],"name":"setStyles","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stylesAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbolBytes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
            address: '0xf8467ccbf112929cd7de9a548fd6967da26340ae'
        },
        artists: {
            abi: '[{"inputs":[{"internalType":"string","name":"assetName","type":"string"},{"internalType":"string","name":"assetSymbol","type":"string"},{"internalType":"string","name":"metaBase","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"_paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"artistBase","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"artistAddress","type":"address"},{"internalType":"string","name":"firstInitial","type":"string"},{"internalType":"string","name":"secondInitial","type":"string"}],"name":"artistId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"firstInitial","type":"string"},{"internalType":"string","name":"secondInitial","type":"string"}],"name":"generateArtist","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"name":"getArtist","outputs":[{"internalType":"string","name":"firstInitial","type":"string"},{"internalType":"string","name":"secondInitial","type":"string"},{"internalType":"string","name":"style","type":"string"},{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"name":"getArtistBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"name":"getArtisticStyle","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"name":"getArtisticStyleBytes","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"artist","type":"uint256"}],"name":"getAttributes","outputs":[{"internalType":"uint256","name":"bodyStyle","type":"uint256"},{"internalType":"uint256","name":"headStyle","type":"uint256"},{"internalType":"uint256","name":"eyeStyle","type":"uint256"},{"internalType":"uint256","name":"mouthStyle","type":"uint256"},{"internalType":"uint256","name":"accessoriesStyle","type":"uint256"},{"internalType":"uint256","name":"bodyAndHeadColour","type":"uint256"},{"internalType":"uint256","name":"eyeAndMouthColour","type":"uint256"},{"internalType":"uint256","name":"accessoriesColour","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbolBytes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
            address: '0x34e9654b0677b6bf174b780e5d78fdad34409827'
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
        
        var filter_count = 0;
        var filtered_nfts = [];
        
        jQuery.each(selected_nfts, function(sn)
        {
            var nft = selected_nfts[sn];
            var settings = {
                "url": pandora_options.apis.png + nft + '/artist',
                "method": "GET",
                "timeout": 0
            };
            jQuery.ajax(settings).done(function (response) 
            {
                if(typeof response.rdata == 'object')
                {
                    filter_count++;
                    filtered_nfts.push(response.rdata);
                    
                    if(filter_count == selected_nfts.length)
                    {
                        var html = pandora.nfts.gallery(filtered_nfts, true);
                        jQuery('#random-nfts').html(html);
                        jQuery('.pandora-image').each(function(i)
                        {
                            var this_img = jQuery(this);
                            jQuery(this).load(function()
                            {
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

                                    jQuery(this_img).parent().removeClass('loading');

                                    jQuery(this_img).css({background: matt_colour});
                                    jQuery(this_img).css({'border-color': insert_colour});

                                    jQuery(this_img).css({'border-left-color': frame_colour});
                                    jQuery(this_img).css({'border-right-color': frame_colour});
                                    jQuery(this_img).css({'border-top-color': frame_colour_darker});
                                    jQuery(this_img).css({'border-bottom-color': frame_colour_darker});

                                    jQuery(this_img).parent().parent().parent().parent().parent().css({'background-image': 'linear-gradient('+gradient_top+', '+gradient_bottom+')'});

                                });
                                img.crossOrigin = 'Anonymous';
                                img.src = jQuery(this).attr('src');
                            })
                        });
                        jQuery.each(filtered_nfts, function(fn)
                        {
                            renderArtist(
                                filtered_nfts[fn].artist.attributes, 
                                function(avatar = false)
                                {   
                                    if(avatar)
                                    {
                                        jQuery('#avatar-' + filtered_nfts[fn].id).html(avatar);
                                    }
                                }
                            );
                        });
                    }
                }
            });
        });
    },
    nfts: 
    {
        gallery: function(selected_nfts, slide_show = false)
        {
            var html = '';
            if(slide_show)
            {
                html+= '<div id="random-gallery" class="carousel slide carousel-fade" data-bs-ride="carousel">';
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
                    html+= '<div class="carousel-inner">';
                        jQuery.each(selected_nfts, function(sn)
                        {
                            var active = '';
                            var nft = selected_nfts[sn];
                            var url = pandora_options.apis.png + nft.id + '.png';
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
                                                            html+= '<h2>' + nft.name + ' ' + nft.style.toUpperCase() + '</h2>';
                                                            html+= '<hr>';
                                                            html+= '<h6>Art #<a href="#">' + nft.initial + '</a> Owner</h6>';
                                                            html+= '<h4><a href="#">' + nft.owner.substring(0, 5).toUpperCase() + '</a></h4>';
                                                            html+= '<hr>';
                                                            html+= '<div class="row">';
                                                                html+= '<div class="col-md-6">';
                                                                    html+= '<div id="avatar-' + nft.id + '" class="pandora-avatar"></div>';
                                                                html+= '</div>';
                                                                html+= '<div class="col-md-6" style="text-align: left;">';
                                                                    html+= '<br />';
                                                                    html+= '<h6>Artist<br />#<a href="#">' + nft.artist.name + '</a> Owner</h6>';
                                                                    html+= '<h4><a href="#">' + nft.artist.owner.substring(0, 5).toUpperCase() + '</a></h4>';
                                                                html+= '</div>';
                                                            html+= '</div>';
                                                        html+= '</div>';
                                                    html+= '</div>';
                                                    html+= '<div class="actions">';
                                                        html+= '<a href="#" class="btn btn-outline-dark">';
                                                            html+= 'MINT NEW ARTWORK';
                                                        html+= '</a>';
                                                        html+= '<br />';
                                                        html+= '<a href="#" class="btn btn-outline-dark">';
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
                    html+= '<button class="carousel-control-prev" type="button" data-bs-target="#random-gallery" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#random-gallery" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button>';
                html+= '</div>';
                return html;
            }
            else
            {
                jQuery.each(selected_nfts, function(sn)
                {
                    var nft = selected_nfts[sn];
                    var url = pandora_options.apis.png + nft + '.png';
                    html+= '<div class="col-md-4">';
                        html+= '<div class="pandora-frame">';
                            html+= '<img class="img img-responsive img-block pandora-image" src="' + url + '" />';
                        html+= '</div>';
                    html+= '</div>';
                });
                return html;
            }
        }
    }
};

jQuery(document).ready(function()
{
    pandora.init();
});