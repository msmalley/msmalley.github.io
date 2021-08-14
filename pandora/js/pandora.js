const colorThief = new ColorThief();

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

var pandora = {
    artists: {
        description: function(title, surname, colours)
        {
            var gender = 'all';
            var gender_term = 'it\'s';
            var gender_termed = 'It';
            var name = title + ' ' + surname;
            var seed = stringToSeed(name);
            if(
                title == 'Daddy'
                || title == 'King'
                || title == 'Master'
                || title == 'Mr.'
                || title == 'Papa'
                || title == 'Prince'
                || title == 'Sir'
            ){
                gender = 'male';
                gender_term = 'his';
                gender_termed = 'He';
            }
            else if(
                title == 'Granny'
                || title == 'Madam'
                || title == 'Mama'
                || title == 'Mistress'
                || title == 'Mrs.'
                || title == 'Ms'
                || title == 'Queen'
            ){
                gender = 'female';
                gender_term = 'her';
                gender_termed = 'She';
            }
            var job = getRelevantRandomWord('noun', 'job', false, seed);
            var firstname = getRelevantRandomWord('firstname', gender, false, seed);
            var commitments = [
                'a professional',
                'an amateur'
            ];
            var colour1 = colours[0].name.toLowerCase();
            var colour2 = colours[1].name.toLowerCase();
            var colour3 = colours[2].name.toLowerCase();
            var random = new XorShift128(seed);
            var number_of_children = random.integer(0, 5);
            var commitment_type = commitments[random.integer(0, (commitments.length - 1))];
            var child_status_intro = 'Although it';
            if(gender == 'male') child_status_intro = 'Athough he';
            else if(gender == 'female') child_status_intro = 'Athough she';
            var child_status = child_status_intro + ' has no ' + colour3 + ' children, ' + firstname + ' does plan to get married soon';
            if(number_of_children == 1)
            {
                child_status = 'Married last year and recently giving birth to ' + gender_term + ' first ' + colour3 + ' child';
            }
            else if(number_of_children > 1)
            {
                var child_job = getRelevantRandomWord('noun', 'job', false, parseInt('' + number_of_children + seed + ''));
                child_status = 'Married with ' + number_of_children + ' children, one of which is studying to become a ' + colour3 + ' ' + child_job;
            }
            var description = firstname + ' ' + surname + ' is currently ' + commitment_type + ' ' + colour1 + ' ' + job + ', but would rather work on ' + gender_term + ' ' + colour2 + ' art instead. ' + child_status + '.';
            return description;
        },
        home: function()
        {
            var artists = [
                'R',
                'G',
                'B'
            ];
            jQuery.each(artists, function(a)
            {
                var ts = '' + new Date().getTime() + '';
                var seed = stringToSeed(artists[a] + ts.split("").reverse().join(""));
                var title = getRelevantRandomWord('title', 'all', false, seed);
                var surname = getRelevantRandomWord('surname', 'all', false, seed);
                var name = title + ' ' + surname;
                var url = 'artists/?name=' + title + '+' + surname;
                render(name, function(avatar = false)
                {
                    var colours = pandora.images.colours(avatar);
                    var description = pandora.artists.description(title, surname, colours);
                    if(avatar)
                    {
                        var link = '<a href="' + url + '">' + name + '</a>';
                        jQuery('.card-artist-' + a).prepend(avatar);
                        jQuery('.card-artist-' + a).find('.artist-name').html(link);
                        jQuery('.card-artist-' + a).find('.artist-description').text(description);
                    }
                });
            });
        }
    },
    images: {
        colours: function(img)
        {
            var colours = [];
            var p = colorThief.getPalette(img, 3);
            colours.push({
                hex: rgbToHex(p[0][0], p[0][1], p[0][2]),
                name: ntc.name(rgbToHex(p[0][0], p[0][1], p[0][2]))[1]
            });
            colours.push({
                hex: rgbToHex(p[1][0], p[1][1], p[1][2]),
                name: ntc.name(rgbToHex(p[1][0], p[1][1], p[1][2]))[1]
            });
            colours.push({
                hex: rgbToHex(p[2][0], p[2][1], p[2][2]),
                name: ntc.name(rgbToHex(p[2][0], p[2][1], p[2][2]))[1]
            });
            return colours;
        },
        convert: function(title_of_artist = false, surname_of_artist = false)
        {
            if(title_of_artist && surname_of_artist)
            {
                jQuery('canvas.art').each(function(i)
                {
                    jQuery(this).attr('id', 'new-art-' + i);
                    var canvas = document.getElementById('new-art-' + i);
                    var data = canvas.toDataURL();
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

                        jQuery(canvas).css({background: matt_colour});
                        //jQuery('.frame img').css({'border-color': insert_colour});
                        jQuery(canvas).css({'border-left-color': frame_colour});
                        jQuery(canvas).css({'border-right-color': frame_colour});
                        jQuery(canvas).css({'border-top-color': frame_colour_darker});
                        jQuery(canvas).css({'border-bottom-color': frame_colour_darker});
                    });
                    img.crossOrigin = 'Anonymous';
                    img.src = data;
                    img.width = canvas.width;
                    img.height = canvas.height;
                });
            }
            else
            {
                jQuery('.nft-image').attr('src', 'https://picsum.photos/200/300');
                jQuery('.nft-image').load(function()
                {
                    pandora.images.generate(
                        jQuery('.nft-image').attr('src'),
                        title_of_artist,
                        surname_of_artist
                    );
                });
            }
        },
        description: function(colours, callback, homepage = true, title_of_artist = false, surname_of_artist = false)
        {
            var words = en_US();
    
            var seed1 = stringToSeed(colours[0].name);
            var seed2 = stringToSeed(colours[4].name);
            var seed3 = stringToSeed(colours[1].name);
            var seed4 = stringToSeed(colours[3].name);
            var seed5 = stringToSeed(colours[2].name);

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
            
            if(title_of_artist && surname_of_artist)
            {
                title1 = title_of_artist;
                name1 = surname_of_artist;
            }
            
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
            
            var url = '../artists/?name=' + title1 + '+' + name1;
            if(homepage) url = 'artists/?name=' + title1 + '+' + name1;

            render(name_of_artist, function(got_canvas = false)
            {
                var avatar = '';
                if(got_canvas) avatar = got_canvas;

                var intro = 'Prominent ' + colour1 + ' ' + job1 + ' framed by ' + colour2 + ' upon a ' + colour3 + ' canvas invoke memories of ' + colour4 + ' ' + substance1 + ' during ' + time2 + '.';
                
                var actions = '<hr><div class="btn-group btn-block art-actions" role="group" style="display: flex;">';
                actions+= '<a href="#" class="btn btn-outline-dark" style="flex: 1">INFO</a>';
                actions+= '<a href="#" class="btn btn-outline-dark" style="flex: 1">MINT</a>';
                actions+= '<a href="#" class="btn btn-outline-dark" style="flex: 1">NEW</a>';
                actions+= '</div>';

                var html = '<h4 class="inline">' + name_of_image + '</h4> <h6 class="inline">by <b><a href="' + url + '">' + name_of_artist + '</a></b></h6><hr class="card-line">' + intro + actions;

                callback(html, avatar, colours);
            });
        },
        draw: function(seed, element_id, style = false)
        {
            if(seed && seed > 0 && jQuery('#' + element_id).length == 1)
            {
                var rand1 = new XorShift128(seed);
                var rand2 = new XorShift128(parseInt(pandora.strings.rev('' + seed + '')));
                var styles = [
                    'mondrian',
                    'lines',
                    'circles',
                    'squares'
                ];
                if(
                    !style
                    || 
                    (
                        style
                        &&
                        (
                            style != 'mondrian'
                            && style != 'lines'
                            && style != 'circles'
                            && style != 'squares'
                        )
                    )
                ){
                    style = styles[rand1.integer(0, (styles.length - 1))];
                }
                var canvas = document.getElementById(element_id);
                var context = canvas.getContext('2d');

                var size = jQuery('#' + element_id).innerWidth();
                var dpr = window.devicePixelRatio;
                
                canvas.width = size * dpr;
                canvas.height = size * dpr;
                context.scale(dpr, dpr);
                
                var white = '#' + ntc.randomColour(stringToSeed('F2' + seed));
                var colors = [
                    '#' + ntc.randomColour(stringToSeed('D4' + seed)),
                    '#' + ntc.randomColour(stringToSeed('13' + seed)),
                    '#' + ntc.randomColour(stringToSeed('F7' + seed))
                ];
                
                if(style == 'mondrian')
                {
                    
                    context.lineWidth = 8;
                    context.lineWidth = rand1.integer(2, 16);
                    var step = size / 7;
                    var step = size / rand2.integer(3, 14);

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
                          if(rand1.integer(0, 1) > 0) {
                            squares.splice(i, 1);
                            splitOnX(square, x); 
                          }
                      }

                      if (y && y > square.y && y < square.y + square.height) {
                          if(rand2.integer(0, 1) > 0) {
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
                        squares[Math.floor(Math.random() * squares.length)].color = colors[i];
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
                    }

                    draw();
                }
                else if(style == 'lines')
                {

                    context.lineCap = 'square';
                    context.lineWidth = rand1.integer(1, 5);
                    
                    var step = rand1.integer(20, 100);

                    function draw(x, y, width, height) 
                    {
                      var leftToRight = rand1.integer(0, 1) > 0;
                      if(leftToRight) {
                        context.moveTo(x, y);
                        context.lineTo(x + width, y + height); 
                        context.strokeStyle = colors[rand1.integer(0, 2)];
                      } else {
                        context.moveTo(x + width, y);
                        context.lineTo(x, y + height);
                        context.strokeStyle = colors[rand2.integer(0, 2)];
                      }
                      context.fillStyle = white;
                      context.fill();
                      context.stroke();
                    }
                    
                    context.rect(
                      0,
                      0,
                      canvas.width,
                      canvas.height
                    );
                    context.fillStyle = white;
                    context.fill();

                    for(var x = 0; x < size; x += step) {
                      for(var y = 0; y < size; y+= step) {
                        draw(x, y, step, step);    
                      }
                    }
                }
                else if(style == 'circles')
                {
                    
                    context.lineWidth = rand1.integer(1, 5);
  
                    var circles = [];
                    var minRadius = rand2.integer(1, 5);
                    var maxRadius = rand1.integer(5, 100) + rand2.integer(5, 100);
                    var totalCircles = rand1.integer(10, 1000);
                    var createCircleAttempts = rand2.integer(10, 1000);

                    function createAndDrawCircle() {

                      var newCircle;
                      var circleSafeToDraw = false;
                      for(var tries = 0; tries < createCircleAttempts; tries++) {
                        newCircle = {
                          x: Math.floor(rand1.integer(0, size)),
                          y: Math.floor(rand2.integer(0, size)),
                          radius: minRadius
                        }

                        if(doesCircleHaveACollision(newCircle)) {
                          continue;
                        } else {
                          circleSafeToDraw = true;
                          break;
                        }
                      }

                      if(!circleSafeToDraw) {
                        return;
                      }

                      for(var radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
                        newCircle.radius = radiusSize;
                        if(doesCircleHaveACollision(newCircle)){
                          newCircle.radius--;
                          break;
                        } 
                      }

                      circles.push(newCircle);
                      context.beginPath();
                      context.arc(newCircle.x, newCircle.y, newCircle.radius, 0, 2*Math.PI);
                      context.fillStyle = colors[rand1.integer(0, (colors.length - 1))];
                      context.strokeStyle = white;
                      context.fill(); 
                      context.stroke(); 
                    }

                    function doesCircleHaveACollision(circle) {
                      for(var i = 0; i < circles.length; i++) {
                        var otherCircle = circles[i];
                        var a = circle.radius + otherCircle.radius;
                        var x = circle.x - otherCircle.x;
                        var y = circle.y - otherCircle.y;

                        if (a >= Math.sqrt((x*x) + (y*y))) {
                          return true;
                        }
                      }

                      if(circle.x + circle.radius >= size ||
                         circle.x - circle.radius <= 0) {
                        return true;
                      }

                      if(circle.y + circle.radius >= size ||
                          circle.y - circle.radius <= 0) {
                        return true;
                      }

                      return false;
                    }

                    for( var i = 0; i < totalCircles; i++ ) {  
                      createAndDrawCircle();
                    }
                }
                else if(style == 'squares')
                {
                    
                    context.lineWidth = 2;
                    context.lineWidth = rand1.integer(1, 4);
                    
                    var finalSize = 3;
                    var finalSize = rand1.integer(4, 8);
                    var startSteps;
                    var offset = 2;
                    var tileStep = (size - offset * 2) / 7;
                    var tileStep = (size - offset * 2) / rand1.integer(3, 14);
                    var startSize = tileStep;
                    var directions = [-1, 0, 1];

                    function draw(x, y, width, height, xMovement, yMovement, steps) {
                      context.beginPath();
                      context.rect(x, y, width, height);
                      context.fillStyle = white;
                      if(rand1.integer(0, 2))
                      {
                          context.fillStyle = colors[rand2.integer(0, 2)];
                      }
                      context.strokeStyle = colors[rand1.integer(0, 2)];
                      context.stroke();
                      context.fill();

                      if(steps >= 0) {
                        var newSize = (startSize) * (steps / startSteps) + finalSize;
                        var newX = x + (width - newSize) / 2
                        var newY = y + (height - newSize) / 2
                        newX = newX - ((x - newX) / (steps + 2)) * xMovement
                        newY = newY - ((y - newY) / (steps + 2)) * yMovement
                        draw(newX, newY, newSize, newSize, xMovement, yMovement, steps - 1);
                      }
                    }

                    for( var x = offset; x < size - offset; x += tileStep) {
                      for( var y = offset; y < size - offset; y += tileStep) {
                        startSteps = 2 + Math.ceil(rand1.integer(0, 3))
                        var xDirection = directions[Math.floor(rand1.integer(0, (directions.length -1)))]
                        var yDirection = directions[Math.floor(rand1.integer(0, (directions.length -1)))]
                        draw(x, y, startSize, startSize, xDirection, yDirection, startSteps - 1);
                      }
                    }
                }
            }
        },
        fetch: function(title_of_artist = false, surname_of_artist = false)
        {
            if(title_of_artist && surname_of_artist)
            {
                jQuery('.section.iframe').show();
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
                            pandora.images.generate(
                                jQuery('.nft-image').attr('src'), 
                                title_of_artist, 
                                surname_of_artist
                            );
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
                    pandora.images.generate(
                        jQuery('.nft-image').attr('src'),
                        title_of_artist,
                        surname_of_artist
                    );
                });
            }
        },
        generate: function(source, title_of_artist = false, surname_of_artist = false)
        {
            var acolours = [];
            var img = new Image();
            var is_homepage = false;
            var page_id = jQuery('body').attr('id');
            if(page_id == 'body-index')
            {
                is_homepage = true;
            }
            function resizeMound()
            {
                pandora.resizes.home();
            }
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

                    pandora.images.description(acolours, function(description, avatar, acolours)
                    {

                        jQuery('.paper').html(description);
                        jQuery('h6.inline b').prepend(avatar);

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

                            jQuery('.section.iframe').css({'background-image': 'linear-gradient('+gradient_top+', '+gradient_bottom+')'});

                            // Display art ...
                            resizeMound();
                            setTimeout(function()
                            {
                                jQuery('.section.iframe.loading').addClass('loaded');
                                jQuery('.section.iframe.loading').removeClass('loading');
                            }, 150);
                        }

                        draw();

                        // Set resize event ...
                        jQuery(window).resize(function()
                        {
                            resizeMound();
                        });

                    }, is_homepage, title_of_artist, surname_of_artist);
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

                    pandora.images.description(acolours, function(description, avatar)
                    {

                        jQuery('.paper').html(description);
                        jQuery('h6.inline b').prepend(avatar);

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

                        jQuery('.section.iframe').css({'background-image': 'linear-gradient('+gradient_top+', '+gradient_bottom+')'});

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

                        //console.log('defaults', defaults);

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
                                    jQuery('.section.iframe.loading').addClass('loaded');
                                    jQuery('.section.iframe.loading').removeClass('loading');
                                }, 150);
                            }, fake_delay);
                        }
                        else
                        {
                            resizeMound();
                            jQuery('.section.iframe.loading').addClass('loaded');
                            jQuery('.section.iframe.loading').removeClass('loading');
                        }

                        jQuery(window).resize(function()
                        {
                            resizeMound();
                        });

                    }, is_homepage, title_of_artist, surname_of_artist);
                }
            });
            img.crossOrigin = 'Anonymous';
            img.src = source;
        }
    },
    init: {
        artists: function()
        {
            if(
                typeof params == 'object'
                && typeof params.name != 'undefined'
            ){
                var names = params.name.split('+');
                var title = names[0];
                var surname = names[1];
                var name = title + ' ' + surname;
                var url = 'artists/?name=' + title + '+' + surname;
                pandora.images.fetch(title, surname);
                
                var arts = [
                    'R',
                    'G',
                    'B',
                    'r',
                    'g',
                    'b',
                    'C',
                    'M',
                    'Y'
                ];
                
                render(name, function(avatar = false)
                {
                    var colours = pandora.images.colours(avatar);
                    var description = pandora.artists.description(title, surname, colours);
                    if(avatar)
                    {
                        jQuery('.section.sub-header').addClass('altered');
                        jQuery('.section.sub-header .amatic').css({marginTop: 100});
                        jQuery('.section.sub-header .amatic').text(name);
                        jQuery('.section.sub-header .orb').text(description);
                        jQuery('.section.sub-header .orb').addClass('orbed');
                        jQuery('.section.sub-header .orb').removeClass('orb');
                        jQuery('.section.sub-header .artist').prepend(avatar);
                        jQuery('.section.sub-header .artist').css({background: 'transparent'});
                        setTimeout(function()
                        {
                            jQuery('.section.sub-header.loading').removeClass('loading');
                        }, 350);
                    }
                });
                
                var temp_seed = stringToSeed(name);
                var styles = [
                    'mondrian',
                    'lines',
                    'circles',
                    'squares'
                ];
                var random = new XorShift128(temp_seed);
                var style = styles[random.integer(0, (styles.length - 1))];
                
                jQuery.each(arts, function(a)
                {
                    var seed = stringToSeed(name + a);
                    pandora.images.draw(seed, 'artist-art-' + a, style);
                });
                
                pandora.images.convert(title, surname);
            }
            else
            {
                jQuery('.artist-info').hide();
                jQuery('.artist-intro-intro').text('There are');
                jQuery('.section.sub-header .container.relative').removeClass('relative');
                jQuery('.section.sub-header.loading').removeClass('loading');
            }
        },
        gallery: function()
        {
            pandora.images.fetch();
        },
        home: function()
        {
            pandora.images.fetch();
            pandora.artists.home();
        },
        studio: function()
        {
            pandora.images.fetch();
        }
    },
    resizes: {
        home: function()
        {
            jQuery('html').removeClass('full');
            jQuery('.mound').removeClass('fullsize');
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
    },
    strings: {
        rev: function(str)
        {
            var splitString = str.split("");
            var reverseArray = splitString.reverse();
            var joinArray = reverseArray.join("");
            return joinArray;
        }
    }
};

jQuery(document).ready(function()
{
    var id = jQuery('body').attr('id');
    if(id == 'body-index')
    {
        pandora.init.home();
    }
    else if(id == 'body-gallery')
    {
        pandora.init.gallery();
    }
    else if(id == 'body-studio')
    {
        pandora.init.studio();
    }
    else if(id == 'body-artists')
    {
        pandora.init.artists();
    }
});