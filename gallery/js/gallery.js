var acolours = [];
const colorThief = new ColorThief();
const img = new Image();

var pixakey = '22857621-88c3c4645e81eeae7cb74f9c4';
var pixaurl = 'https://pixabay.com/api/';

var p = false;
var params = {};
var param = window.location.search;
if(param && param.indexOf('?') > -1) p = param.split('?')[1].split('&');
if(p)
{
    jQuery.each(p, function(i)
    {
        var kv = p[i].split('=');
        params[kv[0]] = kv[1];
    })
}

function resizeMound()
{
    var frame_width = jQuery('.frame').outerWidth();
    var screen_width = jQuery(document).width();
    var marge = (frame_width + ((screen_width/10)*2));
    var card_width = screen_width - marge - ((screen_width/10)*1);
    var carded_width = screen_width - frame_width;
    var marg = ((screen_width/10)*1);
    if(frame_width < (screen_width / 2))
    {                
        jQuery('html').removeClass('full');
        jQuery('.mound').removeClass('fullsize');
        jQuery('.frame').css({marginLeft: (screen_width/10)});
        jQuery('.mound').css({left: marge});
    }
    else
    {
        jQuery('html').addClass('full');
        jQuery('.mound').addClass('fullsize');
        setTimeout(function()
        {
            var frame_width = jQuery('.frame').outerWidth();
            var screen_width = jQuery(document).width();
            var carded_width = screen_width - frame_width;
            jQuery('.frame').css({marginLeft: (carded_width / 2)});
            jQuery('.mound').css({left: ((screen_width/10)*1)});
        }, 150);
    }
}

function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

function getDescription(colours, callback)
{
    var words = en_US();
    
    var seed1 = stringToSeed(acolours[0].name);
    var seed2 = stringToSeed(acolours[4].name);
    var seed3 = stringToSeed(acolours[1].name);
    var seed4 = stringToSeed(acolours[3].name);
    var seed5 = stringToSeed(acolours[2].name);
    
    var quality_physical = getRelevantRandomWord('quality', 'all', false, seed1);
    var physical_quality = getRelevantRandomWord('quality', 'all', false, seed1);
    var colour1 = colours[0].name.toLowerCase();
    var colour2 = colours[1].name.toLowerCase();
    var colour3 = colours[2].name.toLowerCase();
    var colour4 = colours[3].name.toLowerCase();
    var colour5 = colours[4].name.toLowerCase();
    var verb1 = getRelevantRandomWord('verb', 'all', true, seed2);
    var place1 = getRelevantRandomWord('place', 'all', true, seed3);
    
    var noun1 = getRelevantRandomWord('noun', 'all', true, seed4);
    var this_noun = noun1[0].toUpperCase() + noun1.substring(1);
    
    var time1 = getRelevantRandomWord('timenoun', 'unit', true, seed5);
    var time2 = getRelevantRandomWord('timenoun', 'holiday', false, seed1);
    var this_time = time1[0].toUpperCase() + time1.substring(1);
    var adj1 = getRelevantRandomWord('adj', 'appearance', false, seed2);
    
    var substance1 = getRelevantRandomWord('substance', 'all', false, seed3);
    var said1 = getRelevantRandomWord('say', 'all', 2, seed4);
    
    var job1 = getRelevantRandomWord('noun', 'job', true, seed5);
    var profession1 = getRelevantRandomWord('noun', 'job', false, seed1);
    var title1 = getRelevantRandomWord('title', 'all', false, seed2);
    var name1 = getRelevantRandomWord('surname', 'all', false, seed3);
    var person1 = profession1 + ' ' + title1 + ' ' + name1;
    
    var name_of_colour = colours[4].name;
    if(name_of_colour.indexOf('/') > 0)
    {
        var names_of_colour = name_of_colour.split('/');
        name_of_colour = names_of_colour[0][0].toUpperCase() + names_of_colour[0].substring(1);
    }
    else if(name_of_colour.indexOf(' ') > 0)
    {
        var names_of_colour = name_of_colour.split(' ');
        name_of_colour = names_of_colour[0][0].toUpperCase() + names_of_colour[0].substring(1);
    }
    
    var noun_to_use = this_noun;
    if(noun_to_use.indexOf(' ') > 0)
    {
        var nouns_to_use = noun_to_use.split(' ');
        noun_to_use = nouns_to_use[1][0].toUpperCase() + nouns_to_use[1].substring(1);
    }
    
    var name_of_image = name_of_colour + ' ' + noun_to_use;
    var name_of_artist = title1 + ' ' + name1;
    
	  //canvas = document.getElementById('canvas');
	  //context = canvas.getContext('2d');

    render(name_of_artist, function(got_canvas = false)
    {
        var avatar = '';
        if(got_canvas) avatar = got_canvas;
        
        var intro = 'Prominent ' + colour1 + ' ' + job1 + ' framed by ' + colour2 + ' upon a ' + colour3 + ' canvas invoke memories of ' + colour4 + ' ' + substance1 + ' during ' + time2 + '.';
    
        var html = '<h3 class="inline">' + name_of_image + '</h3> <h5 class="inline">by <b><a href="#">' + name_of_artist + '</a></b></h5><hr class="card-line">' + intro;
        
        callback(html, avatar, colours);
    });
    
    var introduction = this_time + ' ago, when asked about the ' + quality_physical + ' of the ' + colour1 + ' strokes prominently seen throughout this piece, the infamous ' + person1 + ' ' + said1 + '; "The ' + colour2 + ' brush marks ' + verb1 + ' upon the canvas with ' + colour3 + ' is reminiscent of ' + adj1 + ' ' + colour4 + ' ' + place1 + ' and ' + colour5 + ' ' + substance1 + ' during ' + time2 + '."';
}

function startImageProcessing()
{
    img.addEventListener('load', function() 
    {
        // Check if image has transaparent layer ...
        var canvas1=document.getElementById("this-nft-canvas");
        var ctx1=canvas1.getContext("2d");
        canvas1.width=img.width;
        canvas1.height=img.height;
        ctx1.drawImage(img,0,0);
        var imgData=ctx1.getImageData(0,0,canvas1.width,canvas1.height);
        var data=imgData.data;
        var transparent=false;
        for(var i=0;i<data.length;i+=4){
            if(data[i+3]<255){
                transparent=true; 
            }
        }
        
        if(transparent)
        {
            
            var seed = params.term;
            if(typeof params.index != 'undefined') seed = params.index + '' + params.term;
            
            var seed1 = stringToSeed(seed);
            var rand1 = new XorShift128(seed1);
            
            var bool2 = false;
            var bool3 = false;
            var bool4 = false;
            var bool5 = false;
            var bool1 = rand1.integer(0, 1);
            var booler2 = rand1.integer(1, 4);
            var booler3 = rand1.integer(1, 6);
            var booler4 = rand1.integer(1, 8);
            var booler5 = rand1.integer(1, 10);
            if(booler2 > 2) bool2 = true;
            if(booler3 > 3) bool3 = true;
            if(booler4 > 4) bool4 = true;
            if(booler5 > 5) bool5 = true;
            
            var canvas = document.createElement("CANVAS");
            var context = canvas.getContext('2d');

            var size = 320;
            var dpr = window.devicePixelRatio;

            canvas.width = img.width + 16;
            canvas.height = img.height + 16;
            context.scale(dpr, dpr);
            context.lineWidth = 8;
            var step = size / 7;
            var white = '#F2F5F1';
            var colors = ['#D40920', '#1356A2', '#F7D842'];
            
            if(bool2) white = '#' + ntc.randomColour(parseInt('' + booler2 + stringToSeed('white')));
            if(bool3) colors[0] = '#' + ntc.randomColour(parseInt('' + booler3 + stringToSeed('red')));
            if(bool4) colors[1] = '#' + ntc.randomColour(parseInt('' + booler4 + stringToSeed('blue')));
            if(bool5) colors[2] = '#' + ntc.randomColour(parseInt('' + booler5 + stringToSeed('yellow')));
            
            var names = [];
            names.push(ntc.name(white)[1]);
            names.push(ntc.name(colors[0])[1]);
            names.push(ntc.name(colors[1])[1]);
            names.push(ntc.name(colors[2])[1]);
            
            acolours.push({
                hex: ntc.name(white)[0],
                name: ntc.name(white)[1]
            });
            acolours.push({
                hex: ntc.name(colors[0])[0],
                name: ntc.name(colors[0])[1]
            });
            acolours.push({
                hex: ntc.name(colors[1])[0],
                name: ntc.name(colors[1])[1]
            });
            acolours.push({
                hex: ntc.name(colors[2])[0],
                name: ntc.name(colors[2])[1]
            });
            acolours.push({
                hex: ntc.name(colors[0])[0],
                name: ntc.name(colors[0])[1]
            });

            var description = getDescription(acolours, function(description, avatar, acolours)
            {
               
                jQuery('.paper').html(description);
                jQuery('h5.inline b').prepend(avatar);

                var squares = [{
                    x: 0,
                    y: 0,
                    width: size,
                    height: size
                  }];

                function splitSquaresWith(coordinates) {
                  const { x, y } = coordinates;

                  for (var i = squares.length - 1; i >= 0; i--) {
                  const square = squares[i];

                  if (x && x > square.x && x < square.x + square.width) {
                      var randx = new XorShift128(parseInt('' + parseInt(x) + seed1));
                      var xrand = randx.integer(0, 1);
                      if(xrand) {
                        squares.splice(i, 1);
                        splitOnX(square, x); 
                      }
                  }

                  if (y && y > square.y && y < square.y + square.height) {
                      var randy = new XorShift128(parseInt('' + parseInt(y) + seed1));
                      var yrand = randy.integer(0, 1);
                      if(yrand) {
                        squares.splice(i, 1);
                        splitOnY(square, y); 
                      }
                  }
                  }
                }

                function splitOnX(square, splitAt) {
                  var squareA = {
                    x: square.x,
                    y: square.y,
                    width: square.width - (square.width - splitAt + square.x),
                    height: square.height
                  };

                  var squareB = {
                  x: splitAt,
                  y: square.y,
                  width: square.width - splitAt + square.x,
                  height: square.height
                  };

                  squares.push(squareA);
                  squares.push(squareB);
                }

                function splitOnY(square, splitAt) {
                  var squareA = {
                    x: square.x,
                    y: square.y,
                    width: square.width,
                    height: square.height - (square.height - splitAt + square.y)
                  };

                  var squareB = {
                  x: square.x,
                  y: splitAt,
                  width: square.width,
                  height: square.height - splitAt + square.y
                  };

                  squares.push(squareA);
                  squares.push(squareB);
                }

                for (var i = 0; i < size; i += step) {
                  splitSquaresWith({ y: i });
                  splitSquaresWith({ x: i });
                }

                function draw() {
                  for (var i = 0; i < colors.length; i++) {
                      var randi = new XorShift128(parseInt('' + i + seed1));
                    var this_rand = randi.integer(0, (squares.length - 1));
                    squares[this_rand].color = colors[i];
                  }
                  for (var i = 0; i < squares.length; i++) {
                    context.beginPath();
                    context.rect(
                      squares[i].x,
                      squares[i].y,
                      squares[i].width,
                      squares[i].height
                    );
                    if(squares[i].color) {
                      context.fillStyle = squares[i].color;
                    } else {
                      context.fillStyle = white
                    }
                    context.fill()
                    context.stroke();
                  }
                    jQuery('.frame').find('img').hide();
                    jQuery('.frame').append(canvas);
                    
                    var matt_colour = jQuery.xcolor.opacity('#eee', acolours[1].hex, 0.15);
                    var frame_colour = jQuery.xcolor.opacity('#eee', acolours[0].hex, 0.15);
                    var frame_colour_darker = jQuery.xcolor.opacity('#eee', acolours[0].hex, 0.2);
                    var insert_colour = jQuery.xcolor.opacity('#eee', acolours[2].hex, 0.15);
                    var gradient_top = jQuery.xcolor.opacity('#eee', acolours[3].hex, 0.15);
                    var gradient_bottom = jQuery.xcolor.opacity('#aaa', acolours[4].hex, 0.15);

                    jQuery('.frame').css({background: matt_colour});
                    jQuery('.frame canvas').css({'border-color': insert_colour});
                    jQuery('.frame').css({'border-left-color': frame_colour});
                    jQuery('.frame').css({'border-right-color': frame_colour});
                    jQuery('.frame').css({'border-top-color': frame_colour_darker});
                    jQuery('.frame').css({'border-bottom-color': frame_colour_darker});
                    
                    jQuery('html').css({'background-image': 'linear-gradient('+gradient_top+', '+gradient_bottom+')'});

                    // Display art ...
                    resizeMound();
                    setTimeout(function()
                    {
                        jQuery('body.loading').addClass('loaded');
                        jQuery('body.loading').removeClass('loading');
                    }, 150);
                }

                draw();

                // Set resize event ...
                jQuery(window).resize(function()
                {
                    resizeMound();
                });
                
            });
        }
        else
        {
        
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

            var description = getDescription(acolours, function(description, avatar)
            {
            
                jQuery('.paper').html(description);
                jQuery('h5.inline b').prepend(avatar);

                var matt_colour = jQuery.xcolor.opacity('#eee', acolours[1].hex, 0.15);
                var frame_colour = jQuery.xcolor.opacity('#eee', acolours[0].hex, 0.15);
                var frame_colour_darker = jQuery.xcolor.opacity('#eee', acolours[0].hex, 0.2);
                var insert_colour = jQuery.xcolor.opacity('#eee', acolours[2].hex, 0.15);
                var gradient_top = jQuery.xcolor.opacity('#eee', acolours[3].hex, 0.15);
                var gradient_bottom = jQuery.xcolor.opacity('#aaa', acolours[4].hex, 0.15);

                jQuery('.frame').css({background: matt_colour});
                jQuery('.frame img').css({'border-color': insert_colour});
                jQuery('.frame').css({'border-left-color': frame_colour});
                jQuery('.frame').css({'border-right-color': frame_colour});
                jQuery('.frame').css({'border-top-color': frame_colour_darker});
                jQuery('.frame').css({'border-bottom-color': frame_colour_darker});

                jQuery('html').css({'background-image': 'linear-gradient('+gradient_top+', '+gradient_bottom+')'});

                var imageElement = document.querySelector('.nft-image');

                var seed1 = stringToSeed(acolours[0].name);
                var seed2 = stringToSeed(acolours[4].name);
                var seed3 = stringToSeed(acolours[1].name);
                var seed4 = stringToSeed(acolours[3].name);
                var seed5 = stringToSeed(acolours[2].name);

                var rand1 = new XorShift128(seed1);
                var rand2 = new XorShift128(seed2);
                var rand3 = new XorShift128(seed3);
                var rand4 = new XorShift128(seed4);
                var rand5 = new XorShift128(seed5);

                var bool1 = rand1.integer(0, 1);
                var bool2 = rand2.integer(0, 1);
                var bool3 = rand3.integer(0, 1);
                var bool4 = rand4.integer(0, 1);
                var bool5 = rand5.integer(0, 1);

                var line_mode = 'smooth';
                if(bool1) line_mode = 'square';

                var key = 'low';
                if(bool2) key = 'high';;

                var colour_mode = 'color';
                if(bool3) colour_mode = 'greyscale';

                var line_width = rand1.integer(1, 5);
                if(bool4) 
                {
                    line_width = rand1.integer(10, 100);
                }

                var colour_types = [
                    'lighten',
                    'difference',
                    'color',
                    'luminosity',
                    'xor'
                ];
                var colour_type = colour_types[rand1.integer(0, (colour_types.length - 1))];
                if(colour_type == 'lighten' || colour_type == 'xor')
                {
                    colour_mode = 'color';
                }
                
                var animated_speed = rand1.integer(1, 100);
                var fake_delay = 150;

                var iteration = rand1.integer(2, 8);
                if(bool5) 
                {
                    iteration = rand1.integer(15, 100);
                    fake_delay = 1800;
                    if(bool4)
                    {
                        line_mode = 'point';
                        fake_delay = 3000;
                    }
                    if(bool3)
                    {
                        iteration = rand1.integer(250, 500);
                        colour_type = 'lighten';
                        line_width = rand1.integer(1, 10);
                        fake_delay = 9000;
                        if(line_mode == 'point')
                        {
                            fake_delay = 12000;
                            animated_speed = 999;
                            line_width = rand1.integer(5, 10);
                        }
                    }
                }

                var origins = [rand3.integer(1, 100)+'% '+rand4.integer(1, 100)+'%'];
                var origin_count = rand1.integer(1, 4);
                if(origin_count == 2)
                {
                    origins.push(rand1.integer(1, 100)+'% '+rand2.integer(1, 100)+'%');
                }
                else if(origin_count == 3)
                {
                    origins.push(rand1.integer(1, 100)+'% '+rand2.integer(1, 100)+'%');
                    origins.push(rand2.integer(1, 100)+'% '+rand3.integer(1, 100)+'%');
                }
                else if(origin_count == 4)
                {
                    origins.push(rand1.integer(1, 100)+'% '+rand2.integer(1, 100)+'%');
                    origins.push(rand2.integer(1, 100)+'% '+rand3.integer(1, 100)+'%');
                    origins.push(rand4.integer(1, 100)+'% '+rand5.integer(1, 100)+'%');
                }

                var defaults = {
                    colorMode: colour_mode,
                    compositeOperation: colour_type, // select from colour_types
                    iterationLimit: iteration, // between 2 to 2000
                    key: key, // low, high
                    lineWidth: line_width,
                    lineMode: line_mode, // smooth or square
                    origin: origins,
                    outputSize: 'original',
                    pathFinderCount: rand2.integer(5, 500), // between 2 to 2000
                    speed: animated_speed,
                    turningAngle: rand1.integer(3, 9)
                };

                console.log('defaults', defaults);

                var chromata = false;

                try
                {
                    chromata = new Chromata(imageElement, defaults);
                }
                catch(err)
                {
                    if(err)
                    {
                        console.log('err1', err)
                    }
                }

                if(chromata)
                {
                    try
                    {
                        var bg = ntc.randomColour(seed1);
                        chromata.start();
                        setTimeout(function()
                        {
                            jQuery('.frame canvas').css({borderColor: insert_colour});
                        }, 350);
                    }
                    catch(err)
                    {
                        if(err)
                        {
                            console.log('err2', err)
                        }
                    }
                    setTimeout(function()
                    {
                        resizeMound();
                        setTimeout(function()
                        {
                            jQuery('body.loading').addClass('loaded');
                            jQuery('body.loading').removeClass('loading');
                        }, 150);
                    }, fake_delay);
                }
                else
                {
                    resizeMound();
                    jQuery('body.loading').addClass('loaded');
                    jQuery('body.loading').removeClass('loading');
                }

                jQuery(window).resize(function()
                {
                    resizeMound();
                });
                
            });
        }
    });
    img.crossOrigin = 'Anonymous';
    img.src = jQuery('.nft-image').attr('src');
}

if(
    typeof params == 'object'
    && typeof params.term != 'undefined'
){
    
    var index = 0;
    var orientation = 'all';
    
    if(typeof params.index != 'undefined') index = parseInt(params.index);
    if(typeof params.orientation != 'undefined') orientation = params.orientation;
    
    var settings = {
        "url": pixaurl,
        "method": "GET",
        "timeout": 0,
        "data": {
            q: params.term,
            key: pixakey,
            orientation: orientation,
            order: 'latest'
        }
    };
    jQuery.ajax(settings).done(function (response) 
    {
        if(typeof response.hits == 'object' && response.hits.length > index)
        {
            jQuery('.nft-image').attr('src', response.hits[index].webformatURL);
            jQuery('.nft-image').load(function()
            {
                startImageProcessing();
            });
        }
        else
        {
            window.location.href = window.location.origin + window.location.pathname;
        }
    });
}
else
{
    jQuery('.nft-image').attr('src', 'https://picsum.photos/200/300');
    jQuery('.nft-image').load(function()
    {
        startImageProcessing();
    });
}