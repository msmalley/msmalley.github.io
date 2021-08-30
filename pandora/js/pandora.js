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
        description: function(title, surname, colours, forced_first_name)
        {
            var gender = 'all';
            var gender_term = 'it\'s';
            var gender_termed = 'It';
            var name = title + ' ' + surname;
            var seed = stringToSeed(name);
            var random = new XorShift128(seed);
            var percent = random.integer(0, 99);
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
                || percent > 49
            ){
                gender = 'female';
                gender_term = 'her';
                gender_termed = 'She';
            }
            else if(percent < 50)
            {
                gender = 'male';
                gender_term = 'his';
                gender_termed = 'He';
            }
            else if(percent > 49)
            {
                gender = 'female';
                gender_term = 'her';
                gender_termed = 'She';
            }

            var job = getRelevantRandomWord('noun', 'job', false, seed);
            var firstname = getRelevantRandomWord('firstname', gender, false, seed);
            
            if(forced_first_name) firstname = forced_first_name;
            
            var commitments = [
                'a professional',
                'an amateur'
            ];
            var colour1 = colours[0].name.toLowerCase();
            var colour2 = colours[1].name.toLowerCase();
            var colour3 = colours[2].name.toLowerCase();
            var number_of_children = random.integer(0, 4);
            var commitment_type = commitments[random.integer(0, (commitments.length - 1))];
            var child_status_intro = 'Although it';
            if(gender == 'male') child_status_intro = 'Athough he';
            else if(gender == 'female') child_status_intro = 'Athough she';
            
            var child_job = getRelevantRandomWord('noun', 'job', false, parseInt('' + number_of_children + seed + ''));
            
            var this_verb = 'a';
            if(child_job.match('^[aieouAIEOU].*'))
            {
               this_verb = 'an';
            }
            
            var child_status = child_status_intro + ' has no ' + colour3 + ' children, ' + firstname + ' does plan to get married to ' + this_verb + ' ' + child_job + ' soon';
            
            
            if(number_of_children == 1)
            {
                child_status = 'Married to ' + this_verb + ' ' + child_job + ' last year; they recently gave birth to their first ' + colour3 + ' child';
            }
            else if(number_of_children > 1)
            {
                var this_verb = 'a';
                if(colour3.match('^[aieouAIEOU].*'))
                {
                   this_verb = 'an';
                }
                child_status = 'Married with ' + number_of_children + ' children, one of which is studying to become ' + this_verb + ' ' + colour3 + ' ' + child_job;
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
                        var btn = '<hr><a href="' + url + '" class="btn btn-outline-dark btn-sm">VIEW PROFILE</a>';
                        jQuery('.card-artist-' + a).prepend(avatar);
                        jQuery('.card-artist-' + a).find('.artist-name').html(link);
                        jQuery('.card-artist-' + a).find('.artist-description').html(description + btn);
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
        convert: function(title_of_artist = false, surname_of_artist = false, generate_artist = false)
        {
            if(title_of_artist && surname_of_artist)
            {
                jQuery('canvas.art').each(function(i)
                {
                    jQuery(this).attr('id', 'new-art-' + i);
                    var wrapper = jQuery(this).parent();
                    var big_wrapper = jQuery(this).parent().parent().parent();
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
                        
                        if(generate_artist)
                        {
                            var story_params = jQuery('canvas#new-art-' + i).attr('data-story');
                            if(story_params) story_params = JSON.parse(story_params);
                            
                            pandora.images.description(acolours, function(description, avatar, acolours)
                            {
                                jQuery(big_wrapper).find('.description-art-' + i).html(description);
                                setTimeout(function()
                                {
                                    jQuery(big_wrapper).find('.description-art-' + i + ' h6.inline b').prepend(avatar);
                                    jQuery('.section-art-' + i).find('.mounded').show();
                                }, 50);
                            }, false, false, false, story_params);
                        }

                        setTimeout(function()
                        {
                            jQuery(canvas).css({background: matt_colour});
                            //jQuery('.frame img').css({'border-color': insert_colour});
                            jQuery(canvas).css({'border-left-color': frame_colour});
                            jQuery(canvas).css({'border-right-color': frame_colour});
                            jQuery(canvas).css({'border-top-color': frame_colour_darker});
                            jQuery(canvas).css({'border-bottom-color': frame_colour_darker});
                            
                            jQuery('.section.section-art-' + i).css({'background-image': 'linear-gradient('+gradient_top+', '+gradient_bottom+')'});
                            jQuery('.section.section-art-' + i).css({borderBottom: '3px double #757575'})
                            
                            jQuery(wrapper).removeClass('loading');
                        }, 300);
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
        description: function(colours, callback, homepage = true, title_of_artist = false, surname_of_artist = false, story_params = false)
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
            var place2 = getRelevantRandomWord('place', 'all', false, seed3);

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
            
            var abstract1 = getRelevantRandomWord('abstract', 'all', false, seed1);
            var abstract1p = getRelevantRandomWord('abstract', 'all', true, seed1);
            var name2 = getRelevantRandomWord('firstname', 'all', false, seed2);
            var profession2 = getRelevantRandomWord('noun', 'job', false, seed3);
            var profession2p = getRelevantRandomWord('noun', 'job', true, seed3);
            
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
                actions+= '<a href="#" class="btn btn-outline-dark" style="flex: 1">GENERATE</a>';
                actions+= '<a href="#" class="btn btn-outline-dark" style="flex: 1">SPAWN</a>';
                actions+= '</div>';

                var html = '<h4 class="inline">' + name_of_image + '</h4> <h6 class="inline">by <b><a href="' + url + '">' + name_of_artist + '</a></b></h6><hr class="card-line">' + intro + actions;
                
                if(story_params && typeof story_params == 'object')
                {
                    var got_tree = false;
                    var got_object = false;
                    var got_objects = false;
                    if(typeof story_params.sun == 'object')
                    {
                        got_object = true;
                        got_objects = true;
                    }
                    if(typeof story_params.tree_leaves == 'object' && typeof story_params.tree_branch == 'object')
                    {
                        got_tree = true;
                        got_objects = true;
                    }
                    
                    var tree = false;
                    var sun_color = false;
                    var sun_glow = false;
                    var tree_colour = false;
                    
                    var white = ntc.name(story_params.colors1[4])[1].toLowerCase();
                    var base_colour = ntc.name(story_params.colors1[0])[1].toLowerCase();
                    var mountain_color = ntc.name(story_params.colors1[0])[1].toLowerCase();
                    if(typeof story_params.mountains == 'object')
                    {
                        mountain_color = ntc.name(story_params.mountains.color)[1].toLowerCase();
                    }
                    var object_type = 'sun';
                    var object_intro = 'rising';
                    var mountain_type = 'hills are';
                    
                    var landscape_type = 'Planet';
                    
                    if(typeof story_params.mountains == 'object' && story_params.mountains.height > 20 && story_params.mountains.roughness > 0.5)
                    {   
                        mountain_type = 'landscape is';
                        if(story_params.mountains.height > 40 || story_params.mountains.roughness > 0.6)
                        {
                            mountain_type = 'mountains are';
                            if(got_tree && !got_object && story_params.tree_leaves.got)
                            {
                                landscape_type = 'Flower';
                            }
                            else
                            {
                                if(got_tree && !got_object) landscape_type = 'Forest';
                                else landscape_type = 'Mountains';
                            }
                        }
                        else
                        {
                            if(got_tree && !got_object && story_params.tree_leaves.got)
                            {
                                landscape_type = 'Tree';
                            }
                            else
                            {
                                if(got_tree && !got_object) landscape_type = 'Wood';
                                else landscape_type = 'Hills';
                            }
                        }
                    }
                    else
                    {
                        if(story_params.mountains.height > 40 || story_params.mountains.roughness > 0.6)
                        {
                            if(got_tree && !got_object && story_params.tree_leaves.got)
                            {
                                landscape_type = 'Swamp';
                            }
                            else
                            {
                                if(got_tree && !got_object) landscape_type = 'Park';
                                else landscape_type = 'Ridge';
                            }
                        }
                        else
                        {
                            if(got_tree && !got_object && story_params.tree_leaves.got)
                            {
                                landscape_type = 'Garden';
                            }
                            else
                            {
                                if(got_tree && !got_object) landscape_type = 'Timberland';
                                else landscape_type = 'Dunes';
                            }
                        }
                    }
                    var this_substance = substance1.split(' ')[0];
                    var sub1 = this_substance.split('-')[0];
                    if(got_object && got_tree && story_params.tree_leaves.got)
                    {
                        //landscape_name = 'Scenic ' + ntc.name(story_params.colors2[4])[1].split(' ')[0] + ' ' + sub1[0].toUpperCase() + sub1.substring(1);
                        landscape_type = 'Planet';
                    }
                    else
                    {
                        //landscape_name+= ' ' + sub1[0].toUpperCase() + sub1.substring(1);
                    }
                    
                    abstract1 = abstract1.split(' ')[0];
                    abstract1p = abstract1p.split(' ')[0];
                    abstract1 = abstract1[0].toUpperCase() + abstract1.substring(1);
                    abstract1p = abstract1p[0].toUpperCase() + abstract1p.substring(1);
                    profession2 = profession2.split(' ')[0];
                    profession2p = profession2p.split(' ')[0];
                    profession2 = profession2[0].toUpperCase() + profession2.substring(1);
                    profession2p = profession2p[0].toUpperCase() + profession2p.substring(1);
                    
                    if(got_object)
                    {
                        sun_color = ntc.name(story_params.sun.color)[1].toLowerCase();
                        sun_glow = ntc.name(story_params.sun.glow)[1].toLowerCase();
                        if(story_params.sun.y > (story_params.canvas.height /2))
                        {
                            object_type = 'sun';
                            object_intro = 'setting';
                        }
                        if(story_params.sun.radius > 70) 
                        {
                            object_type = 'moon';
                            object_intro = 'small';
                        }
                        if(story_params.sun.radius > 85) object_intro = 'large';
                        
                        if(story_params.sun.y > story_params.canvas.height)
                        {
                            object_intro = 'hidden';
                        }
                    }
                    
                    if(got_tree)
                    {
                        var leaves = ntc.name(story_params.tree_leaves.color)[1].toLowerCase();
                        tree_colour = ntc.name(story_params.tree_branch.color)[1].toLowerCase();
                        
                        tree = 'dead tree';
                        if(story_params.tree_leaves.got)
                        {
                            tree = tree_colour + ' tree';
                        }
                        
                        if(got_tree && got_object)
                        {
                            tree = tree_colour + ' tree whiltering away';
                            if(story_params.tree_leaves.got)
                            {
                                tree = tree_colour + ' tree with ' + leaves + ' leaves';
                            }
                        }
                    }
                    
                    // Default is the best - PLANET
                    var this_rand = new XorShift128(stringToSeed(name_of_colour + abstract1));
                    var planet_wording = [
                        'Planet',
                        'Thoughts',
                        'Dreams',
                        object_type.toUpperCase()[0] + object_type.substring(1)
                    ];
                    var planet_selection = planet_wording[this_rand.integer(0, (planet_wording.length - 1))];
                    
                    var landscape_name = planet_selection + ' of ' + name_of_colour + ' ' + abstract1p;
                    
                    if(landscape_type == 'Flower' || landscape_type == 'Tree' || landscape_type == 'Garden')
                    {
                        landscape_name = name2 + '\'s ' + landscape_type + ' of ' + abstract1p;
                    }
                    else if(landscape_type == 'Ridge')
                    {
                        landscape_name = name2 + ' ' + abstract1 + ' ' + landscape_type;
                    }
                    else if(landscape_type == 'Hills' || landscape_type == 'Dunes' || landscape_type == 'Mountains')
                    {
                        landscape_name = profession2 + ' ' + abstract1 + ' ' + landscape_type;
                    }
                    else if(landscape_type != 'Planet')
                    {
                        landscape_name = profession2 + ' ' + landscape_type + ' of ' + abstract1p;
                    }
                    
                    intro = 'An empty ' + mountain_color + ' wasteland once inhabited by ' + colour5 + ' ' + job1;
                    if(story_params.mountains.height > 40 || story_params.mountains.roughness > 0.6)
                    {
                        intro = 'A desolate ' + mountain_color + ' mountain range home to several ' + colour5 + ' ' + job1;
                    }
                    
                    if(got_tree && !got_object)
                    {
                        intro = 'The dark ' + mountain_color + ' ' + mountain_type + ' decorated by a single ' + tree + ' that sits in solitude under the ' + colour1 + ' sky at dusk during ' + time2 + '.';
                    }
                    else if(!got_tree && got_object)
                    {
                        intro = 'The ' + mountain_color + ' ' + mountain_type + ' illuminated by the ' + sun_glow + ' glow of the ' + object_intro + ' ' + object_type + ' seen behind the ' + job1 + ' ' + place2 + ' during ' + time2 + '.';
                    }
                    else if(got_tree && got_object)
                    {
                        var shine = 'mid-day haze';
                        var this_part = 'behind the';
                        if(got_object)
                        {
                            this_part = 'beneath the';
                        }
                        if(story_params.sun.radius > 70)
                        {
                            shine = 'moonlight';
                        }
                        intro = 'The picturesque ' + mountain_color + ' ' + mountain_type + ' framed by the ' + sun_color + ' ' + object_type + ' and a single ' + tree + ' ' + this_part + ' ' + sun_glow.split(' ')[0] + ' ' + shine + '.';
                    }
                    else
                    {
                        if(got_object)
                        {
                            var shine = 'mid-day haze';
                            if(story_params.sun.radius > 70)
                            {
                                shine = 'moonlight';
                            }
                            intro+= ' is now illuminated by the ' + sun_glow + ' ' + shine + '.';
                        }
                        else
                        {
                            intro+= ' is now filled by the solitude of the ' + colour2 + ' sky during ' + time2 + '.';
                        }
                    }
                    
                    html = '<h4 class="inline">' + landscape_name + '</h4> <h6 class="inline">by <b><a href="' + url + '">' + name_of_artist + '</a></b></h6><hr class="card-line">' + intro + actions;
                }

                callback(html, avatar, colours);
            });
        },
        draw: function(seed, element_id, style = false)
        {
            if(seed && seed > 0 && jQuery('#' + element_id).length == 1)
            {
                var rand1 = new XorShift128(stringToSeed(element_id + seed));
                var rand2 = new XorShift128(stringToSeed(pandora.strings.rev('' + seed + '') + element_id));
                var styles = [
                    'lines',
                    'circles',
                    'squares',
                    'triangles',
                    'wired',
                    'crosses'
                ];
                if(
                    !style
                    || 
                    (
                        style
                        &&
                        (
                            style != 'lines'
                            && style != 'circles'
                            && style != 'squares'
                            && style != 'triangles'
                            && style != 'wired'
                            && style != 'crosses'
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
                    '#' + ntc.randomColour(stringToSeed('F7' + seed)),
                    '#' + ntc.randomColour(stringToSeed('C' + seed)),
                    '#' + ntc.randomColour(stringToSeed('M' + seed))
                ];
                
                if(rand1.integer(0, 1))
                {
                    colors[3] = colors[rand1.integer(0, (colors.length - 1))];
                }
                if(rand1.integer(0, 1) && rand2.integer(0, 1))
                {
                    colors[4] = colors[rand2.integer(0, (colors.length - 1))];
                }
                
                //style = 'crosses';
                
                if(style == 'crosses')
                {
                    class Point {
                      constructor (x, y) {
                        this.x = x
                        this.y = y
                      }
                    }

                    class Square {
                      constructor (origin, length, colour) {
                        this.origin = origin
                        this.length = length
                        this.colour = colour
                      }

                      draw (ctx) {
                        // Draw clockwise
                        ctx.beginPath()
                        ctx.moveTo(this.origin.x, this.origin.y)
                        ctx.lineTo(this.origin.x + this.length, this.origin.y)
                        ctx.lineTo(this.origin.x + this.length, this.origin.y + this.length)
                        ctx.lineTo(this.origin.x, this.origin.y + this.length)
                        ctx.lineTo(this.origin.x, this.origin.y)
                        // We want the border color and the fill color to match
                        ctx.strokeStyle = this.colour;
                        ctx.lineWidth = 0;
                        ctx.fillStyle = this.colour;
                        // Color the border and the body
                        ctx.stroke();
                        ctx.fill();
                        ctx.closePath();
                      }
                    }

                    class Cross {
                      constructor (left, top, right, bottom, center) {
                        this.left = left
                        this.top = top
                        this.right = right
                        this.bottom = bottom
                        this.center = center
                      }

                      draw (ctx) {
                        this.left.draw(ctx);
                        this.top.draw(ctx);
                        this.right.draw(ctx);
                        this.bottom.draw(ctx);
                        this.center.draw(ctx);
                      }
                    }

                    function makeCross(center, squareLength, color) {
                      // For convenience
                      var l = squareLength
                      var x = center.x
                      var y = center.y
                      // The position of each square can be guessed from the center of the cross
                      var left   = new Square(new Point(x - 1.5 * l, y - 0.5 * l), l, color)
                      var top    = new Square(new Point(x - 0.5 * l, y - 1.5 * l), l, color)
                      var right  = new Square(new Point(x + 0.5 * l, y - 0.5 * l), l, color)
                      var bottom = new Square(new Point(x - 0.5 * l, y + 0.5 * l), l, color)
                      var center = new Square(new Point(x - 0.5 * l, y - 0.5 * l), l, color)
                      // Assemble the squares and return the resulting cross
                      return new Cross(left, top, right, bottom, center)
                    }

                    function drawRow(start, squareLength, color1, color2, ctx) {
                      var x = start.x
                      var y = start.y
                      var i = 0
                      while (true) {
                        var color = [color1, color2][i % 2]
                        makeCross(new Point(x, y), squareLength, color).draw(ctx)
                        if (x > 800) { break }
                        x = x + 5 * squareLength
                        i = i + 1
                      }
                    }

                    //var squareLength = 800 / 16
                    var squareLength = rand1.integer(20, 2000) / rand1.integer(10, 100);

                    var blue = '#006597'
                    var orange = '#ff5c30'
                    var yellow = '#ffd652'
                    var purple =  '#562b42'
                    var red = '#df2933'
                    var green = '#177b4b'
                    
                    var blue = white
                    var orange = colors[0]
                    var yellow = colors[1]
                    var purple =  colors[3]
                    var red = colors[4]
                    var green = colors[5]

                    //var canvas = document.getElementById('doodle')
                    var ctx = context;

                    var x = 1.5 * squareLength
                    var y = -0.5 * squareLength
                    var i = 0
                    var j = 5
                    var rc = 0
                    var colors = [purple, blue, green, yellow, orange, red]
                    var mirror = [yellow, orange, red, purple, blue, green]

                    while (true) {
                      if (rc % 2 == 0) {
                        var idx = i
                        i = (i + 1) % 6
                      } else {
                        var idx = j
                        j = (j + 1) % 6
                      }
                      var color1 = colors[idx]
                      var color2 = mirror[idx]
                      drawRow(new Point(x, y), squareLength, color1, color2, ctx)
                      // Stop if we've gone past the bottom of the canvas
                      if (y > 800) { break }
                      // Update the first cross coordinates and the row counter
                      if (rc % 2 == 0) {
                        x = x - 3 * squareLength
                      } else {
                        x = x + 2 * squareLength
                      }
                      y = y + 1 * squareLength
                      rc = rc + 1
                    }
                }
                else if(style == 'wired')
                {
                    var displayCanvas = canvas;
                    //var context = displayCanvas.getContext("2d");
                    
                    var displayWidth = displayCanvas.width;
                    var displayHeight = displayCanvas.height;

                    var rowHeight;
                    var stringSpacing;
                    var stringThickness;
                    var margin;
                    var bgColor;
                    var numStrings;
                    var crossingProbability;
                    var positiveProbability;
                    var crossingAngle;
                    var controlYFactor;
                    var spacerGap;
                    var generatorsInLastRow;
                    var colors;
                    var gradDX, gradDY;
                    var timer;
                    
                    var rand3 = new XorShift128(stringToSeed('' + seed + seed + ''));
                    
                    var ch = canvas.height;
                    var cw = canvas.width;
                    
                    var myImageData, rotating = false;   
                    var rotate = function (canva, cont) {
                        if (!rotating) {
                            rotating = true;            
                            // store current data to an image
                            myImageData = new Image();
                            myImageData.src = canva.toDataURL();

                           myImageData.onload = function () {
                                // reset the canvas with new dimensions
                                canva.width = ch;
                                canva.height = cw;
                                cw = canva.width;
                                ch = canva.height;

                                cont.save();
                                // translate and rotate
                                cont.translate(cw, ch / cw);
                                cont.rotate(Math.PI / 2);
                                // draw the previows image, now rotated
                                cont.drawImage(myImageData, 0, 0);               
                                cont.restore();

                                // clear the temporary image
                                myImageData = null;

                                rotating = false;               
                            }
                        }
                    }

                    init();

                    function init() {
                        rowHeight = canvas.height / rand1.integer(2, 8);
                        stringSpacing = 32;
                        stringThickness = 12;
                        stringThickness = rand2.integer(2, 30);
                        stringSpacing = stringThickness * rand2.integer(1, 3);
                        bgColor = 'transparent';
                        
                        if(rand2.integer(0, 1))
                        {
                            bgColor = white;
                        }
                        
                        numStrings = 1 + Math.floor((displayWidth-stringThickness)/stringSpacing);
                        margin = (displayWidth - (numStrings-1)*stringSpacing)/2;
                        crossingProbability = 0.67;
                        positiveProbability = 0.5;
                        spacerGap = 0.5;

                        crossingAngle = 42*Math.PI/180;
                        controlYFactor = (1 - stringSpacing/rowHeight*Math.tan(crossingAngle));

                        /*
                        controlYFactor = 0.5;
                        crossingAngle = Math.atan(rowHeight*(1-controlYFactor)/stringSpacing);
                        */

                        var gradDist = 2*stringThickness;
                        gradDX = gradDist*Math.cos(crossingAngle);
                        gradDY = gradDist*Math.sin(crossingAngle);

                        context.fillStyle = bgColor;
                        context.fillRect(0,0,displayWidth,canvas.height);		

                        setInitialColors();

                        //initialize generatorsInLastRow - an array which records which braid generators appeared in the previous row.
                        //I want to know this in order to avoid a braid crossing followed by its inverse.
                        generatorsInLastRow = [];
                        for (var k = 0; k < numStrings-1; k++) {
                            generatorsInLastRow.push(0);
                        }

                        //timer = setInterval(onTimer,1000/10);
                        var i = Math.floor(displayHeight/rowHeight);
                        while (--i > -1) {
                            fillRow(i*rowHeight);	
                        }

                        if(rand3.integer(0, 1))
                        {
                            setTimeout(function()
                            {
                                rotate(canvas, context);
                            }, 150);
                        }
                    }

                    function onTimer() {
                        //scroll down
                        context.drawImage(displayCanvas, 0, 0, displayWidth, displayHeight-rowHeight, 0, rowHeight, displayWidth, displayHeight-rowHeight);
                        //clear top row
                        context.fillStyle = bgColor;
                        context.fillRect(0,0,displayWidth,rowHeight);		
                        //draw new top row
                        fillRow(0);
                    }


                    function fillRow(y0) {
                        var stringNumber = 0;
                        var x0;
                        var temp;
                        var positiveSwitch;
                        var doPositive;
                        var prob = 0.5; //first crossing probability at 50%, rest will be set to desired crossingProbability set above.
                        while (stringNumber < numStrings - 1) {
                            x0 = margin + stringNumber*stringSpacing;
                            var this_r = new XorShift128(stringToSeed('m' + stringNumber + seed));
                            var this_r2 = new XorShift128(stringToSeed('s' + stringNumber + seed));
                            if (parseFloat('0.' + rand1.integer(1, 99)) < prob) {
                                positiveSwitch = (parseFloat('0.' + this_r2.integer(1, 99)) < positiveProbability);
                                doPositive = (positiveSwitch && (generatorsInLastRow[stringNumber] != -1)) ||
                                              ((!positiveSwitch) && (generatorsInLastRow[stringNumber] == 1));
                                if (doPositive) {
                                    drawCrossing(x0, y0, colors[stringNumber], colors[stringNumber+1], true);
                                    generatorsInLastRow[stringNumber] = 1;
                                    generatorsInLastRow[stringNumber+1] = 0;
                                }
                                else {
                                    drawCrossing(x0, y0, colors[stringNumber], colors[stringNumber+1], false);
                                    generatorsInLastRow[stringNumber] = -1;
                                    generatorsInLastRow[stringNumber+1] = 0;
                                }
                                //permute colors
                                temp = colors[stringNumber];
                                colors[stringNumber] = colors[stringNumber+1];
                                colors[stringNumber+1] = temp;

                                //advance
                                stringNumber += 2;
                            }
                            else {
                                drawString(x0, y0, colors[stringNumber]);
                                stringNumber += 1;
                            }
                        }
                        if (stringNumber == numStrings - 1) {
                            drawString(margin + stringNumber*stringSpacing, y0, colors[stringNumber]);
                        }

                        //after first crossing probability of 50%, remaining crossing probabilities set to desired amount.
                        prob = crossingProbability;
                    }

                    function setInitialColors() {
                        var i;
                        var r,g,b;
                        var darkR, darkG, darkB;
                        var lightR, lightG, lightB;
                        var param;

                        colors = [];

                        var darkFactor = 0.33;
                        var lightAdd = 20;

                        for (i = 0; i < numStrings; i++) {
                            r = 64+rand1.integer(1, 180);
                            g = 64+rand2.integer(1, 180);
                            b = 64+rand3.integer(1, 180);

                            darkR = Math.floor(darkFactor*r);
                            darkG = Math.floor(darkFactor*g);
                            darkB = Math.floor(darkFactor*b);

                            lightR = Math.min(Math.floor(r + lightAdd),255);
                            lightG = Math.min(Math.floor(g + lightAdd),255);
                            lightB = Math.min(Math.floor(b + lightAdd),255);

                            var colorObj = {
                                base: "rgb("+r+","+g+","+b+")",
                                dark: "rgb("+darkR+","+darkG+","+darkB+")",
                                light: "rgb("+lightR+","+lightG+","+lightB+")"
                            }
                            colors.push(colorObj);
                        }

                    }

                    function drawString(x0,y0,color) {
                        context.strokeStyle = color.base;
                        context.lineWidth = stringThickness;
                        context.lineCap = "butt";
                        context.beginPath();
                        context.moveTo(x0,y0);
                        context.lineTo(x0,y0+rowHeight);
                        context.stroke();
                    }

                    function drawCrossing(x0,y0,color1,color2,positive) {
                        var grad;	
                        var midX = x0 + stringSpacing/2;
                        var midY = y0 + rowHeight/2;
                        context.lineCap = "butt";
                        if (positive) {
                            grad = context.createLinearGradient(midX+gradDX, midY-gradDY, midX-gradDX, midY+gradDY);
                            grad.addColorStop(0, color1.base);
                            grad.addColorStop(0.5, color1.dark);
                            grad.addColorStop(1, color1.base);
                            context.strokeStyle = grad;
                            drawLine1();

                            //drawSpacer2();

                            grad = context.createLinearGradient(midX+gradDX, midY+gradDY, midX-gradDX, midY-gradDY);
                            grad.addColorStop(0, color2.base);
                            grad.addColorStop(0.5, color2.light);
                            grad.addColorStop(1, color2.base);
                            context.strokeStyle = grad;
                            drawLine2();
                        }
                        else {
                            grad = context.createLinearGradient(midX+gradDX, midY+gradDY, midX-gradDX, midY-gradDY);
                            grad.addColorStop(0, color2.base);
                            grad.addColorStop(0.5, color2.dark);
                            grad.addColorStop(1, color2.base);
                            context.strokeStyle = grad;
                            drawLine2();

                            //drawSpacer1();

                            grad = context.createLinearGradient(midX+gradDX, midY-gradDY, midX-gradDX, midY+gradDY);
                            grad.addColorStop(0, color1.base);
                            grad.addColorStop(0.5, color1.light);
                            grad.addColorStop(1, color1.base);
                            context.strokeStyle = grad;
                            drawLine1();
                        }

                        function drawLine1() {
                            context.lineWidth = stringThickness;
                            context.beginPath();
                            context.moveTo(x0+stringSpacing,y0);
                            context.bezierCurveTo(x0+stringSpacing, y0+rowHeight*controlYFactor, 
                                                    x0, y0+rowHeight*(1-controlYFactor), 
                                                    x0, y0+rowHeight);
                            context.stroke();
                        }

                        function drawSpacer1() {
                            context.strokeStyle = bgColor;
                            context.lineWidth = stringThickness + spacerGap*2;
                            context.beginPath();
                            context.moveTo(x0+stringSpacing,y0);
                            context.bezierCurveTo(x0+stringSpacing, y0+rowHeight*controlYFactor, 
                                                    x0, y0+rowHeight*(1-controlYFactor), 
                                                    x0, y0+rowHeight);
                            context.stroke();
                        }

                        function drawSpacer2() {
                            context.strokeStyle = bgColor;
                            context.lineWidth = stringThickness+2*spacerGap;
                            context.beginPath();
                            context.moveTo(x0,y0);
                            context.bezierCurveTo(x0, y0+rowHeight*controlYFactor, 
                                                    x0+stringSpacing, y0+rowHeight*(1-controlYFactor), 
                                                    x0+stringSpacing, y0+rowHeight);
                            context.stroke();
                        }


                        function drawLine2() {
                            context.lineWidth = stringThickness;
                            context.beginPath();
                            context.moveTo(x0,y0);
                            context.bezierCurveTo(x0, y0+rowHeight*controlYFactor, 
                                                    x0+stringSpacing, y0+rowHeight*(1-controlYFactor), 
                                                    x0+stringSpacing, y0+rowHeight);
                            context.stroke();
                        }
                    }
                }
                else if(style == 'triangles')
                {   
                    if(rand2.integer(0, 1))
                    {
                        // Mesh
                        var fill_type = true;
                        var stroke_width = 0;

                        var colour_types = [
                            'rgb', 'hsv', 'hsl', 'hsi', 'lab', 'hcl'
                        ];
                        var colour_type = colour_types[rand1.integer(0, (colour_types.length - 1))];

                        if(rand1.integer(0, 1))
                        {
                            fill_type = false;
                            stroke_width = rand2.integer(50, 100);
                            if(rand2.integer(0, 1))
                            {
                                stroke_width = rand2.integer(1, 10);
                            }
                        }

                        const randomizedOptions = {
                          width: 600,
                          height: 420,
                          cellSize: rand2.integer(25, 250),
                          variance: parseFloat('0.' + rand1.integer(1, 99)),
                          seed: colour_type+seed,
                          xColors: 'random',
                          yColors: 'match',
                          fill: fill_type,
                          //palette: trianglify.colorbrewer,
                          colorSpace: colour_type,
                          colorFunction: trianglify.colorFunctions.interpolateLinear(parseFloat('0.' + rand2.integer(1, 99))),
                          strokeWidth: stroke_width,
                          points: null
                        };
                        const pattern = trianglify(randomizedOptions);
                        jQuery('#' + element_id).parent().attr('id', 'wrapper-' + element_id);
                        jQuery('#' + element_id).remove();
                        jQuery('#wrapper-' + element_id).prepend(pattern.toCanvas());
                        jQuery('#wrapper-' + element_id).find('canvas').attr('id', element_id);
                        jQuery('#wrapper-' + element_id).find('canvas').attr('class', 'art');
                    }
                    else
                    {
                        // Symetrical ...
                        var c = context

                        //var centerX = canvas.width / 2;
                        var centerX = rand1.integer(0, canvas.width / 2);

                        // Custom = bottom left = 0, max | top right = max, 0
                        var x11 = 0;
                        var x12 = canvas.width;
                        var y31 = canvas.height;
                        var y32 = 0;

                        var y1 = 0;

                        var y11 = 0;
                        var y12 = canvas.height;

                        var x2 = canvas.width;
                        var y2 = canvas.height;
                        var x3 = 0;
                        var y3 = canvas.height;

                        var ch = canvas.height;
                        var cw = canvas.width;

                        var depth = 6;
                        var depth1 = rand1.integer(1, 9);
                        var depth2 = rand2.integer(1, 9);

                        c.strokeStyle = white;
                        c.lineWidth = rand1.integer(0, 10);

                        function sierpinski(x1, y1, x2, y2, x3, y3, depth, color, r = false){
                          if(depth == 0)
                          {
                            drawTriangle(x1, y1, x2, y2, x3, y3, color, r);
                          }
                          else{
                            var x12 = (x1 + x2) / 2;
                            var y12 = (y1 + y2) / 2;
                            var x13 = (x1 + x3) / 2;
                            var y13 = (y1 + y3) / 2;
                            var x23 = (x2 + x3) / 2;
                            var y23 = (y2 + y3) / 2;

                            sierpinski(x1, y1, x12, y12, x13, y13, depth - 1, color, r);
                            sierpinski(x12, y12, x2, y2, x23, y23, depth - 1, color, r);
                            sierpinski(x13, y13, x23, y23, x3, y3, depth - 1, color, r);
                          }
                        }

                        function drawTriangle(x1, y1, x2, y2, x3, y3, color){
                          c.beginPath();
                          c.moveTo(x1, y1);
                          c.lineTo(x2, y2);
                          c.lineTo(x3, y3);
                          c.closePath();
                          c.fillStyle = color;
                          c.fill();
                        }

                        var tri_types = [
                            'tlbr-even',
                            'tlbr-odd',
                            'trbl-even',
                            'trbl-odd'
                        ];
                        var this_tri_type = tri_types[rand1.integer(0, (tri_types.length -1))];

                        var myImageData, rotating = false;   
                        var rotate = function () {
                            if (!rotating) {
                                rotating = true;            
                                // store current data to an image
                                myImageData = new Image();
                                myImageData.src = canvas.toDataURL();

                               myImageData.onload = function () {
                                    // reset the canvas with new dimensions
                                    canvas.width = ch;
                                    canvas.height = cw;
                                    cw = canvas.width;
                                    ch = canvas.height;

                                    context.save();
                                    // translate and rotate
                                    context.translate(cw, ch / cw);
                                    context.rotate(Math.PI / 2);
                                    // draw the previows image, now rotated
                                    context.drawImage(myImageData, 0, 0);               
                                    context.restore();

                                    // clear the temporary image
                                    myImageData = null;

                                    rotating = false;               
                                }
                            }
                        }

                        context.rect(
                          0,
                          0,
                          canvas.width,
                          canvas.height
                        );
                        context.fillStyle = white;
                        context.fill();

                        if(this_tri_type == 'tlbr-even')
                        {
                            sierpinski(0, 0, cw, ch, 0, ch, depth1, colors[rand1.integer(0, (colors.length - 1))]);
                            if(depth1 == 1)
                            {
                                sierpinski(cw, 0, cw, ch, 0, 0, depth2, colors[rand1.integer(0, (colors.length - 1))]);
                            }
                            else
                            {
                                sierpinski(cw, 0, cw, ch, 0, 0, depth1, colors[rand1.integer(0, (colors.length - 1))]);
                            }
                        }
                        else if(this_tri_type == 'tlbr-odd')
                        {
                            sierpinski(0, 0, cw, ch, 0, ch, depth1, colors[rand1.integer(0, (colors.length - 1))]);
                            sierpinski(cw, 0, cw, ch, 0, 0, depth2, colors[rand2.integer(0, (colors.length - 1))]);
                        }
                        else if(this_tri_type == 'trbl-even')
                        {
                            sierpinski(0, 0, cw, ch, 0, ch, depth1, colors[rand1.integer(0, (colors.length - 1))]);
                            if(depth1 == 1)
                            {
                                sierpinski(cw, 0, cw, ch, 0, 0, depth2, colors[rand2.integer(0, (colors.length - 1))]);
                            rotate();
                            }
                            else
                            {
                                sierpinski(cw, 0, cw, ch, 0, 0, depth1, colors[rand2.integer(0, (colors.length - 1))]);
                            rotate();
                            }
                        }
                        else if(this_tri_type == 'trbl-odd')
                        {
                            sierpinski(0, 0, cw, ch, 0, ch, depth1, colors[rand1.integer(0, (colors.length - 1))]);
                            sierpinski(cw, 0, cw, ch, 0, 0, depth2, colors[rand1.integer(0, (colors.length - 1))]);
                            rotate();
                        }
                    }
                }
                else if(style == 'lines')
                {
                    if(rand1.integer(0, 1) && rand2.integer(0, 1))
                    {
                        // Chips
                        var WIDTH = canvas.width;
                        var HEIGHT = canvas.height;
                        //var size = 30;
                        var size = rand1.integer(1, 50);

                        var x_sections = WIDTH / size;
                        var y_sections = HEIGHT / size;

                        line_cap = 'round';
                        if(rand1.integer(0, 1))
                        {
                            line_cap = 'square';
                        }

                        line_width_1 = rand1.integer(5, 25);
                        line_width_2 = rand1.integer(5, 25);

                        function createLine(x, y, n) {
                            //context.beginPath();
                            context.beginPath(rand1.integer(0, canvas.width), rand2.integer(0, canvas.height));
                            //context.lineWidth = 15;
                            //context.lineWidth = rand1.integer(5, 25);
                            // context.lineWidth += .015;
                            context.lineCap = line_cap;
                            context.strokeStyle = colors[rand1.integer(0, 2)];
                            if (n >= Math.random() / rand1.integer(1, 4)) {
                                context.lineWidth = line_width_1;
                                context.moveTo(x, y);
                                context.lineTo(x + size, y + size);
                            }
                            else {
                                context.lineWidth = line_width_2;
                                context.moveTo(x + size, y);
                                context.lineTo(x, y + size);
                                if(rand2.integer(0, 1))
                                {
                                    context.strokeStyle = colors[rand2.integer(0, 2)];
                                }
                            }
                            context.stroke();
                        }

                        function draw() {
                            context.clearRect(0, 0, WIDTH, HEIGHT);

                            for (var x = 0; x < x_sections; x++) {
                                for (var y = 0; y < y_sections; y++) {
                                    createLine(x * size, y * size, rand1.integer(0, 1));
                                }
                            }
                        }

                        draw();
                    }
                    else
                    {
                        // Original lines ...

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

                        for(var x = 0; x < size; x += step) {

                          for(var y = 0; y < size; y+= step) {
                            draw(x, y, step, step);    
                          }
                        }
                    }
                }
                else if(style == 'circles')
                {
                    
                    
                    context.lineWidth = rand1.integer(0, 5);
  
                    var circles = [];
                    var minRadius = rand1.integer(1, 50);
                    var maxRadius = rand2.integer(100, 1000);
                    var totalCircles = rand1.integer(5, 2000);
                    var createCircleAttempts = rand2.integer(1, 1000);

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
                      if(!rand1.integer(0, 1) || !rand2.integer(0, 1))
                      {
                          context.strokeStyle = colors[rand1.integer(0, (colors.length - 1))];
                      }
                      else
                      {
                          //context.strokeStyle = white;
                      }
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
                    var rand3 = new XorShift128(stringToSeed('' + seed + seed + ''));
                    if(rand3.integer(0, 1))
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
                    else if(rand2.integer(0, 1))
                    {
                        var c = context;
                        var sideLength = canvas.width / 2;
                        var depth = rand2.integer(1, 5);

                        var rand3 = new XorShift128(stringToSeed('' + seed + seed + ''));

                        if(rand3.integer(0, 1))
                        {
                            context.rect(
                              0,
                              0,
                              canvas.width,
                              canvas.height
                            );
                            context.fillStyle = colors[rand3.integer(0, (colors.length - 1))];
                            context.fill();
                        }

                        function sierpinskiCarpet(x1, y1, sideLength, depth){
                          if (depth === 0){
                            drawSquare(x1, y1, sideLength);}
                          else{
                            sideLength *= (1/3);
                            var x2 = x1 + sideLength;
                            var y2 = y1 + sideLength;
                            var x3 = x1 + sideLength * 2;
                            var y3 = y1 + sideLength * 2;

                            sierpinskiCarpet(x1, y1, sideLength, depth - 1);
                            sierpinskiCarpet(x1, y2, sideLength, depth - 1);
                            sierpinskiCarpet(x1, y3, sideLength, depth - 1);
                            sierpinskiCarpet(x2, y1, sideLength, depth - 1);
                            sierpinskiCarpet(x2, y3, sideLength, depth - 1);
                            sierpinskiCarpet(x3, y1, sideLength, depth - 1);
                            sierpinskiCarpet(x3, y2, sideLength, depth - 1);
                            sierpinskiCarpet(x3, y3, sideLength, depth - 1);
                          }
                        }

                        function drawSquare(x1, y1, sideLength){
                          c.beginPath();
                          c.moveTo(x1, y1);


                          c.lineWidth = rand3.integer(0, 5);
                          c.strokeStyle = colors[rand2.integer(0, (colors.length - 1))];

                          c.lineTo(x1 + sideLength, y1);
                          c.lineTo(x1 + sideLength, y1 + sideLength);
                          c.lineTo(x1, y1 + sideLength);
                          c.closePath();
                          c.fillStyle = white;


                          c.fill();
                        }

                        sierpinskiCarpet(0, 0, sideLength, depth);
                    }
                    else
                    {
                        // Hypno squares

                        context.lineWidth = 2;
                        context.lineWidth = rand1.integer(1, 4);

                        var finalSize = 3;
                        var finalSize = rand1.integer(4, 8);
                        var startSteps;
                        var offset = 2;
                        var offset = rand2.integer(1, 4);
                        var tileStep = (size - offset * 2) / 7;
                        var tileStep = (size - offset * 2) / rand1.integer(1, 20);
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
            }
        },
        fetch: function(title_of_artist = false, surname_of_artist = false, get_new_image = true)
        {
            if(title_of_artist && surname_of_artist)
            {
                jQuery('.section.iframe').show();
            }
            if(
                typeof params == 'object'
                && typeof params.term != 'undefined'
                && params.term
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
                        if(get_new_image)
                        {
                            jQuery('.nft-image').attr('src', response.hits[index].webformatURL);
                        }
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
                if(get_new_image)
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
                else
                {
                    pandora.images.generate(
                        jQuery('.nft-image').attr('src'),
                        title_of_artist,
                        surname_of_artist
                    );
                }
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

                        jQuery('.section.iframe .paper').html(description);
                        jQuery('.section.iframe h6.inline b').prepend(avatar);

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
                        
                        jQuery('.section.iframe').show();

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

                        jQuery('.section.iframe .paper').html(description);
                        jQuery('.section.iframe h6.inline b').prepend(avatar);

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
                            jQuery('.section.iframe').show();
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
                && params.name
            ){
                var forced_first_name = false;
                var names = params.name.split('+');
                var title = names[0][0].toUpperCase() + names[0].substring(1);
                var surname = getRelevantRandomWord('surname', 'all', false, stringToSeed(title));
                if(names.length > 1)
                {
                    surname = names[1][0].toUpperCase() + names[1].substring(1);
                }
                else
                {
                    forced_first_name = title;
                }
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
                    var description = pandora.artists.description(title, surname, colours, forced_first_name);
                    description+= '<hr><div class="btn-group" role="group">';
                        description+= '<a href="#" class="btn btn-outline-dark">INFO</a>';
                        description+= '<a href="#" class="btn btn-outline-dark">GENERATE</a>';
                        description+= '<a href="#" class="btn btn-outline-dark">SPAWN</a>';
                    description+= '</div>';
                    if(avatar)
                    {
                        jQuery('.section.sub-header').addClass('altered');
                        jQuery('.section.sub-header .amatic').css({marginTop: 100});
                        jQuery('.section.sub-header .amatic').text(name);
                        jQuery('.section.sub-header .orb').html(description);
                        jQuery('.section.sub-header .orb').addClass('orbed');
                        jQuery('.section.sub-header .orb').removeClass('orb');
                        jQuery('.section.sub-header .artist').prepend(avatar);
                        jQuery('.section.sub-header .artist').css({background: 'transparent'});
                        setTimeout(function()
                        {
                            jQuery('.section.sub-header.loading').removeClass('loading');
                        }, 350);
                    }
                }, forced_first_name);
                
                var temp_seed = stringToSeed(name);
                var styles = [
                    'lines',
                    'circles',
                    'squares',
                    'triangles',
                    'wired',
                    'crosses'
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
                var artists = [
                    'R',
                    'G',
                    'B',
                    'X',
                    'Z',
                    'C',
                    'M',
                    'Y',
                    'K'
                ];
                jQuery.each(artists, function(a)
                {
                    var ts = '' + new Date().getTime() + '';
                    var seed = stringToSeed(artists[a] + ts.split("").reverse().join(""));
                    var title = getRelevantRandomWord('title', 'all', false, seed);
                    var surname = getRelevantRandomWord('surname', 'all', false, seed);
                    var name = title + ' ' + surname;
                    var url = '../artists/?name=' + title + '+' + surname;
                    render(name, function(avatar = false)
                    {
                        var colours = pandora.images.colours(avatar);
                        var description = pandora.artists.description(title, surname, colours);
                        if(avatar)
                        {
                            var link = '<a href="' + url + '">' + name + '</a>';
                            var btn = '<hr><a href="' + url + '" class="btn btn-outline-dark btn-sm">VIEW PROFILE</a>';
                            jQuery('.card-artist-' + a).prepend(avatar);
                            jQuery('.card-artist-' + a).find('.artist-name').html(link);
                            jQuery('.card-artist-' + a).find('.artist-description').html(description + btn);
                        }
                    });
                });
                jQuery('.artist-info').hide();
                jQuery('.artists-placeholder').show();
                jQuery('.artist-intro-intro').text('There are');
                jQuery('.artist-intro-intro').parent().append(' We can almost guarantee you will find who you are looking for!');
                jQuery('.section.sub-header .container.relative').removeClass('relative');
                jQuery('.section.sub-header.loading').removeClass('loading');
            }
        },
        gallery: function()
        {
            pandora.images.fetch();
            if(
                typeof params == 'object'
                && typeof params.style != 'undefined'
                && params.style
            ){
                var ts = new Date().getTime();
                var style = params.style;
                if(
                    params.style != 'lines'
                    && params.style != 'circles'
                    && params.style != 'squares'
                    && params.style != 'triangles'
                    && params.style != 'wired'
                    && params.style != 'crosses'
                ){
                    ts = params.style;
                }
                
                var arts = [
                    'R'+ts,
                    'G'+ts,
                    'B'+ts,
                    'r'+ts,
                    'g'+ts,
                    'b'+ts,
                    'C'+ts,
                    'M'+ts,
                    'Y'+ts
                ];
                jQuery.each(arts, function(a)
                {
                    
                    var seed = stringToSeed(params.style + ts + a);
                    
                    if(
                        params.style != 'lines'
                        && params.style != 'circles'
                        && params.style != 'squares'
                        && params.style != 'triangles'
                        && params.style != 'wired'
                        && params.style != 'crosses'
                    ){
                        var styles = [
                            'lines',
                            'circles',
                            'squares',
                            'triangles',
                            'wired',
                            'crosses'
                        ];
                        var random = new XorShift128(seed);
                        style = styles[random.integer(0, (styles.length - 1))];
                        ts = params.style;
                    }
                    
                    pandora.images.draw(seed, 'artist-art-' + a, style);
                });
                pandora.images.convert(params.style, arts[0]);
                jQuery('.art-filters .btn.active').removeClass('active');
                jQuery('.btn-' + params.style).addClass('active');
            }
            else
            {
                jQuery('.artist-info').hide();
                //jQuery('.alert-filter').html('<p>&nbsp;</p><h6 class="pstart" style="line-height: 2rem;">Our latest artwork can be seen below!</h6><p>&nbsp;</p>');
            }
        },
        home: function()
        {
            pandora.images.fetch();
            pandora.artists.home();
        },
        landscapes: function()
        {
            pandora.images.fetch();
            
            // Temporary - until got more styles ...
            if(
                typeof params != 'object'
                || typeof params.style == 'undefined'
            ){
                params = {
                    style: 'sky'
                };
            }
            
            if(
                typeof params == 'object'
                && typeof params.style != 'undefined'
                && params.style
            ){
                var ts = new Date().getTime();
                var style = params.style;
                if(
                    params.style != 'sky'
                ){
                    ts = params.style;
                }
                
                var arts = [
                    'R'+ts,
                    'G'+ts,
                    'B'+ts,
                    'C'+ts,
                    'M'+ts,
                    'Y'+ts,
                    'K'+ts,
                    'T'+ts,
                    'S'+ts
                ];
                jQuery.each(arts, function(a)
                {
                    
                    var seed = stringToSeed(params.style + ts + a);
                    
                    if(
                        params.style != 'sky'
                    ){
                        var styles = [
                            'sky'
                        ];
                        var random = new XorShift128(seed);
                        style = styles[random.integer(0, (styles.length - 1))];
                        ts = params.style;
                    }
                    pandora.landscapes.draw(seed, 'artist-art-' + a, style);
                });
                setTimeout(function()
                {
                    pandora.images.convert(params.style, arts[0], true);
                    jQuery('.art-filters .btn.active').removeClass('active');
                    jQuery('.btn-' + params.style).addClass('active');
                    jQuery('#alt-text-footer').css({marginTop: 60});
                }, 1200);
            }
            else
            {
                jQuery('.artist-info').hide();
                //jQuery('.alert-filter').html('<p>&nbsp;</p><h6 class="pstart" style="line-height: 2rem;">Our latest artwork can be seen below!</h6><p>&nbsp;</p>');
            }
        },
        studio: function()
        {
            pandora.images.fetch();
            jQuery('body').on('change', '#uploaded-image', function(e)
            {
                jQuery('.section.iframe.loaded').addClass('loading');
                jQuery('.section.iframe.loaded').removeClass('loaded');
                
                jQuery('.section.iframe .frame canvas').remove();
                var file = document.querySelector('#uploaded-image').files[0];
                var reader = new FileReader();
                
                reader.readAsDataURL(file);
                reader.onload = function () {
                    jQuery('#this-nft-image').css({display: 'block'});
                    jQuery('#this-nft-image').attr('src', reader.result);
                    jQuery('.section.text').remove();
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            });
        },
        about: function()
        {
            pandora.images.fetch();
        }
    },
    landscapes: {
        draw: function(seed, element_id, style = false)
        {
            if(seed && seed > 0 && jQuery('#' + element_id).length == 1)
            {
                var story_params = {};
                var rand1 = new XorShift128(stringToSeed(element_id + seed));
                var rand2 = new XorShift128(stringToSeed(pandora.strings.rev('' + seed + '') + element_id));
                var styles = [
                    'sky'
                ];
                if(
                    !style
                    || 
                    (
                        style
                        &&
                        (
                            style != 'sky'
                        )
                    )
                ){
                    style = styles[rand1.integer(0, (styles.length - 1))];
                }
                var canvas = document.getElementById(element_id);
                var context = canvas.getContext('2d');
                
                var white = '#' + ntc.randomColour(stringToSeed('FFF' + seed));
                var white2 = '#' + ntc.randomColour(stringToSeed('EEE' + seed));
                var colors = [
                    '#' + ntc.randomColour(stringToSeed('C' + seed)),
                    '#' + ntc.randomColour(stringToSeed('M' + seed)),
                    '#' + ntc.randomColour(stringToSeed('Y' + seed)),
                    '#' + ntc.randomColour(stringToSeed('K' + seed)),
                    white
                ];
                var colors2 = [
                    '#' + ntc.randomColour(stringToSeed('C2' + seed)),
                    '#' + ntc.randomColour(stringToSeed('M2' + seed)),
                    '#' + ntc.randomColour(stringToSeed('Y2' + seed)),
                    '#' + ntc.randomColour(stringToSeed('K2' + seed)),
                    white2
                ];
                
                story_params.colors1 = colors;
                story_params.colors2 = colors2;
                story_params.style = style;
                story_params.canvas = {
                    width: canvas.width,
                    height: canvas.height
                }
                
                if(style == 'sky')
                {   
                    var img = new Image();
                    
                    img.onload = function() {
                    
                    var img2 = new Image();
                        
                    img2.onload = function() {
                        
                    var img3 = new Image();
                        
                    img3.onload = function() {
                        
                    img2.width = canvas.width + (rand2.integer(0, 10) * canvas.width);
                    img2.height = canvas.height + (rand1.integer(0, 10) * canvas.height);
                        
                    img3.width = canvas.width + (rand2.integer(0, 10) * canvas.width);
                    img3.height = canvas.height + (rand1.integer(0, 10) * canvas.height);
                    
                    var tree = {
                        canvas:     canvas,
                        ctx:        context,
                        height:     canvas.height,
                        width:      canvas.width,
                        spread:     parseFloat('0.' + rand1.integer(3, 99)),
                        drawLeaves: rand2.integer(0, 1),
                        leavesColor: white,
                        leaveType:  rand1.integer(1, 999),

                        //MAX_BRANCH_WIDTH:   20,
                        MAX_BRANCH_WIDTH:   rand2.integer(5, 10),
                        SMALL_LEAVES:       10,
                        MEDIUM_LEAVES:      200,
                        BIG_LEAVES:         500,
                        THIN_LEAVES:        900,

                        /**
                         * @member draw
                         *
                         * @param {object} ctx      the canvas context
                         * @param {integer} h       height of the canvas
                         * @param {integer} w       width of the canvas
                         * @param {float} spread    how much the tree branches are spread
                         *                          Ranges from 0.3 - 1.
                         * @param {boolean} leaves  draw leaves if set to true    
                         *
                         */
                        draw : function(ctx, h, w, spread, leaves, leaveType, index = 0) {
                            // Set how much the tree branches are spread
                            if(spread >= 0.3 && spread <= 1) {
                                this.spread = spread;
                            }

                            if(leaves === true || leaves === false) {
                                this.drawLeaves = leaves;
                            }

                            if(leaveType == this.SMALL_LEAVES || 
                               leaveType == this.MEDIUM_LEAVES || 
                               leaveType == this.BIG_LEAVES || 
                               leaveType == this.THIN_LEAVES) {
                                this.leaveType = leaveType;
                            }

                            this.ctx = ctx;
                            this.height = h;
                            this.width = w;
                            //this.ctx.clearRect(0,0,this.width,this.height);
                            // Center the tree in the window
                            var tree_width = (this.width / 10) + rand1.integer(0, this.width - (this.width / 20));
                            
                            if(index > 0)
                            {
                                var tree_width = (this.width / 10) + rand2.integer(0, this.width - (this.width / 20));
                            }
                            this.ctx.translate(tree_width,this.height);
                            // Set the leaves to a random color
                            this.leavesColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
                            // Set branch thickness
                            this.ctx.lineWidth = 1 + (Math.random() * this.MAX_BRANCH_WIDTH);
                            this.ctx.lineJoin = 'round';

                            story_params.tree_leaves = {
                                got: this.drawLeaves,
                                color: this.leavesColor
                            };
                            
                            story_params.tree_branch = {
                                color: this.ctx.strokeStyle,
                                width: this.ctx.lineWidth
                            };
                            
                            jQuery('#' + element_id).attr('data-story', JSON.stringify(story_params));
                            
                            this.branch(0);
                        },

                        /**
                         * @member branch
                         * tree.branch() main tree drawing function
                         *
                         * @param {String} depth the maimum depth the tree can branch,
                         *        Keep this value near 12, larger value take linger to render.
                         *
                         */
                        branch : function(depth) {
                            if (depth < 12) 
                            {
                                this.ctx.beginPath();
                                this.ctx.moveTo(0,0);
                                this.ctx.lineTo(0,-(this.height)/10);
                                this.ctx.stroke();

                                this.ctx.translate(0,-this.height/10);
                                // Random integer from -0.1 to 0.1
                                var randomN = -(Math.random() * 0.2) + 0.1;

                                this.ctx.rotate(randomN); 

                                if ((Math.random() * 1) < this.spread)
                                {
                                    // Draw the left branches
                                    this.ctx.rotate(-0.3);
                                    this.ctx.scale(0.7,0.7);
                                    this.ctx.save();
                                    this.branch(depth + 1);
                                    // Draw the right branches
                                    this.ctx.restore();  
                                    this.ctx.rotate(0.6);
                                    this.ctx.save();
                                    this.branch(depth + 1);   
                                    this.ctx.restore();        
                                }
                                else 
                                { 
                                    this.branch(depth);
                                }

                            }
                            else
                            {   
                                // Now that we have done drawing branches, draw the leaves
                                if(this.drawLeaves) {
                                    var lengthFactor = 200;
                                    var lengthFactor = rand1.integer(1, 99);
                                    if(this.leaveType >= this.THIN_LEAVES) {
                                        lengthFactor = 10;
                                    }
                                    this.ctx.fillStyle = this.leavesColor;
                                    this.ctx.fillStyle = colors[0];
                                    this.ctx.fillRect(0, 0, this.leaveType, lengthFactor);
                                    this.ctx.stroke();
                                }
                            }
                        }
                    };
                    
                    function setBackgroundLayer(can)
                    {
                        var displayCanvas = can;
                        var displayWidth = displayCanvas.width;
                        var displayHeight = displayCanvas.height;

                        function initB() {
                            generateB();
                        }

                        function generateB() 
                        {
                            var x0, y0, w, h;
                            var numRects = 12;
                            var alphaVariation;
                            var angleVariation = Math.PI/32;
                            var r,g,b,baseAlpha;
                            var gradRad;
                            var xMid,yMid;
                            var gradIterates;

                            bgColor = "#ffffff";

                            //rectangle to fill:
                            x0 = 0;
                            y0 = 0;
                            w = displayWidth;
                            h = displayHeight;

                            xMid = x0 + w/2;
                            yMid = y0 + h/2;

                            for (var i = 0; i < numRects; i++) 
                            {

                                //random color
                                r = Math.floor(Math.random()*255);
                                g = Math.floor(Math.random()*255);
                                b = Math.floor(Math.random()*255);			
                                baseAlpha = 0;
                                alphaVariation = 2/numRects;

                                context.globalCompositeOperation = "lighter";

                                gradRad = 1.1*h/2;
                                gradIterates = 8;
                                context.fillStyle = createLinearFractalGradient(
                                    context,
                                    xMid, 
                                    yMid - gradRad, 
                                    xMid, 
                                    yMid + gradRad,                                             
                                    angleVariation,
                                    r,
                                    g,
                                    b,
                                    baseAlpha,
                                    alphaVariation,
                                    gradIterates
                                );

                                //draw
                                context.fillRect(x0,y0,w,h);
                            }
                            
                            //background color
                            context.globalCompositeOperation = "destination-over";
                            context.fillStyle = bgColor;
                            context.fillRect(x0,y0,w,h);
                            context.globalCompositeOperation = "source-over";
                            context.fill();
                            
                            if(rand1.integer(1, 99) > 33)
                            {
                            
                            // Draw sun / moon
                            const radius = rand1.integer(50, 100);
                            const margin = canvas.width / 10;
                            const centerX = rand1.integer(0 - (radius / 2), canvas.width + (radius / 2));
                            const centerY = rand2.integer(0 - (radius / 2), canvas.height + (radius / 2));

                            // Plain version
                            context.globalAlpha = 0.95;
                            context.beginPath();
                            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                            context.shadowBlur = rand2.integer(radius / 1.5, radius * rand1.integer(1, 3));
                            context.shadowColor = white2;
                            context.shadowOffsetX = 0;
                            context.shadowOffsetY = 0;
                            context.lineWidth = rand2.integer(1, 3);
                            context.strokeStyle = white2;
                            context.stroke();                                    
                            context.fillStyle = colors2[0];
                            context.fill();
                                
                            story_params.sun = {
                                radius: radius,
                                color: colors2[0],
                                glow: white2,
                                x: centerX,
                                y: centerY
                            };
                                
                            jQuery('#' + element_id).attr('data-story', JSON.stringify(story_params));

                            // Sun Texture
                            context.globalAlpha = 0.4;
                            context.beginPath();
                            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                            var pFill3 = context.createPattern(img2, "repeat");
                            
                            // Moon Texture
                            if(story_params.sun.radius > 70) 
                            {
                                context.globalAlpha = 0.2;
                                pFill3 = context.createPattern(img3, "repeat");
                            }
                                
                            context.fillStyle = pFill3;
                            context.fill();

                            // Gradient version
                            context.globalAlpha = 0.4;
                                
                            if(story_params.sun.radius > 70) 
                            {
                                context.globalAlpha = 0.6;
                            }
                                
                            context.beginPath();
                            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                            var rad = context.createRadialGradient(
                                rand1.integer(- (centerX * 2), centerX * 2), 
                                rand2.integer(- (centerY * 2), centerY * 2), 
                                1, 
                                centerX, 
                                centerY, 
                                radius
                            );
                            rad.addColorStop(0, colors2[0]);
                            rad.addColorStop(1, 'transparent');
                            context.fillStyle = rad;
                            context.fill();

                            // Resets
                            context.shadowBlur = 0;
                            context.globalAlpha = 1;
                            context.strokeStyle = colors2[2];
                                
                            }
                            
                            // Mountains ...
                            generateMountains(canvas, context);
                        };
                        
                        // Background ...
                        initB();
                    };
                        
                    function generateMountains(can, con) 
                    {
                        var canvas = can,
                        ctx = con,
                        dWidth = document.body.clientWidth,
                        dHeight = Math.max(document.documentElement["clientHeight"], document.body["scrollHeight"], document.documentElement["scrollHeight"], document.body["offsetHeight"], document.documentElement["offsetHeight"]),
                        config = {
                          roughness: parseFloat('0.' + rand1.integer(3, 9)),
                          segments: rand1.integer(8, 12),
                          height: rand2.integer(2, 10) * 6,
                          instant: true
                        },
                        roughness = config.roughness,
                        points = [],
                        stepCounter = 0,
                        scroll = 0,
                        generated = false,
                        generating = false,
                        offscreen = 0

                        function init() 
                        {
                            offscreen = (canvas.width / Math.pow(2, config.segments)) * 1.25 | 0
                            points.push({x: -offscreen, y: (canvas.height/1.25 | 0)})
                            points.push({x: canvas.width + offscreen, y: (canvas.height/1.25 | 0)})
                            requestAnimationFrame(step);
                        }

                        function step() 
                        {
                            if(!generated && stepCounter < config.segments) 
                            {
                                stepCounter++
                                requestAnimationFrame(step);
                            } 
                            else 
                            {
                                generated = true;
                                if(!generating && generated)
                                {   
                                    if(rand2.integer(1, 99) > 33)
                                    {
                                        tree.draw(
                                            context,
                                            canvas.height,
                                            canvas.width,
                                            parseFloat('0.' + rand1.integer(3, 8)),
                                            rand1.integer(0, 1)
                                        );
                                    }
                                }
                            }
                            update();
                            draw();
                        }

                        function update() 
                        {
                          if(!generated) {
                          var newpoints = []
                          _.each(points, function(p, i) {
                            newpoints.push(p)
                              if((i + 1) < points.length) {
                                var np = points[i+1],
                                    heightrange = (config.height * canvas.height)/100

                                newpoints.push({
                                  x: (((p.x + np.x)/2) | 0),
                                  y: (((p.y + np.y)/2) + ((Math.random() * ((heightrange * 2) + 1) - heightrange)) * roughness | 0)
                                })
                              }
                            })
                            roughness *= roughness
                            points = newpoints
                          } else {
                            if(!generating) {
                              _.each(points, function(p, i) {
                                  p.x -= scroll
                                  if(p.x < -offscreen) {
                                      var point = points.shift()
                                      point.x = canvas.width + offscreen
                                      points.push(point)
                                  }
                              })
                            }
                          }
                        }

                        function draw() 
                        {
                            
                            // Add rock texture
                            ctx.globalAlpha = 0.25;
                            
                            if(rand1.integer(0, 1))
                            {
                                ctx.translate(canvas.width, 0);
                                ctx.scale(-1, 1);
                            }
                            
                            var pFill = ctx.createPattern(img, "repeat");
                            ctx.fillStyle = pFill;
                            ctx.beginPath()
                            ctx.moveTo(-offscreen, canvas.height)
                            _.each(points, function(p, i) {
                                ctx.lineTo(p.x, p.y)
                            })
                            ctx.lineTo(canvas.width + offscreen, canvas.height)
                            ctx.closePath()
                            ctx.fill();
                            
                            // Draw solid color
                            ctx.globalAlpha = 0.65;
                            var grd = ctx.createLinearGradient(0,canvas.height / 2,0,canvas.height);
                            grd.addColorStop(0,"black");
                            grd.addColorStop(1,white);
                            ctx.fillStyle = white;
                            ctx.fillStyle = grd;
                            ctx.beginPath()
                            ctx.moveTo(-offscreen, canvas.height)
                            _.each(points, function(p, i) {
                                ctx.lineTo(p.x, p.y)
                            })
                            ctx.lineTo(canvas.width + offscreen, canvas.height)
                            ctx.closePath()
                            ctx.fill();
                            
                            story_params.mountains = {
                                color: white,
                                height: config.height,
                                roughness: config.roughness
                            };
                            
                            jQuery('#' + element_id).attr('data-story', JSON.stringify(story_params));
                            
                            // Add darker spots
                            ctx.globalAlpha = 0.4;
                            var pFill2 = ctx.createPattern(img2, "repeat");
                            ctx.fillStyle = pFill2;
                            ctx.beginPath()
                            ctx.moveTo(-offscreen, canvas.height)
                            _.each(points, function(p, i) {
                                ctx.lineTo(p.x, p.y)
                            })
                            ctx.lineTo(canvas.width + offscreen, canvas.height)
                            ctx.closePath()
                            ctx.fill()    ;
                            
                            // Reset alpha
                            ctx.globalAlpha = 1;
                        }

                        function reset() {
                          if(!generating) {
                            generating = true
                            points = []

                            offscreen = (canvas.width / Math.pow(2, config.segments)) * 2 | 0

                            points.push({x: -offscreen, y: (canvas.height/2 | 0)})
                            points.push({x: canvas.width + offscreen, y: (canvas.height/2 | 0)})

                            roughness = config.roughness

                            generating = false
                            stepCounter = 0
                            generated = false
                          }
                        }
                        init();
                    };

                    function createLinearFractalGradient(whichContext,x0,y0,x1,y1,angleVariation,r,g,b,a,alphaVariation,gradIterates) {
                        //gradient - constant rgb values, but changes alpha according to subdivision control points.
                        var numGradSteps = Math.pow(2,gradIterates);
                        var stopNumber = 0;
                        var gradRGB = "rgba(" + r + "," + g + "," + b + ","; //must complete with alpha
                        var alpha;
                        var zeroAlpha = 0.5/255;		
                        var angle = (1 - 2*Math.random())*angleVariation;
                        var xm = 0.5*(x0 + x1);
                        var ym = 0.5*(y0 + y1);
                        var ux = x0 - xm;
                        var uy = y0 - ym;
                        var sinAngle = Math.sin(angle);
                        var cosAngle = Math.cos(angle);
                        var vx = cosAngle*ux - sinAngle*uy;
                        var vy = sinAngle*ux + cosAngle*uy;
                        var driftX0 = xm + vx;
                        var driftY0 = ym + vy;
                        var driftX1 = xm - vx;
                        var driftY1 = ym - vy;

                        var grad = whichContext.createLinearGradient(driftX0, driftY0, driftX1, driftY1);

                        var gradPoints = createRandomData(gradIterates);
                        var gradFunctionPoint = gradPoints.first;
                        while (gradFunctionPoint != null) {
                            alpha = a + gradFunctionPoint.y*alphaVariation;

                            //avoids scientific notation for small numbers screwing up rgba string:
                            if (alpha < zeroAlpha) {
                                alpha = 0;
                            }
                            else if (alpha > 1) {
                                alpha = 1;
                            }

                            grad.addColorStop(stopNumber/numGradSteps,gradRGB+alpha+")");

                            stopNumber++;
                            gradFunctionPoint = gradFunctionPoint.next;
                        }

                        return grad;
                    }

                    //The following function uses a subdivision process to create a random variation without abrupt changes.
                    //The "pointList" which is returned contains a linked list of data points with x value increasing from 0 to 1 through
                    //the beginning to the end of the list, and the y value of each point defined by the noisy function.
                    function createRandomData(iterations) {
                        var pointList = {};
                        pointList.first = {x:0, y:1};
                        var lastPoint = {x:1, y:1}
                        var minY = 1;
                        var maxY = 1;
                        var point;
                        var nextPoint;
                        var dx, newX, newY;
                        var ratio;

                        var minRatio = 0.33;

                        pointList.first.next = lastPoint;
                        for (var i = 0; i < iterations; i++) {
                            point = pointList.first;
                            while (point.next != null) {
                                nextPoint = point.next;

                                ratio = minRatio + Math.random()*(1 - 2*minRatio);
                                newX = point.x + ratio*(nextPoint.x - point.x);

                                //find the smaller interval
                                if (ratio < 0.5) {
                                    dx = newX - point.x;
                                }
                                else {
                                    dx = nextPoint.x - newX;
                                }

                                newY = point.y + ratio*(nextPoint.y - point.y);
                                newY += dx*(Math.random()*2 - 1);

                                var newPoint = {x:newX, y:newY};

                                //min, max
                                if (newY < minY) {
                                    minY = newY;
                                }
                                else if (newY > maxY) {
                                    maxY = newY;
                                }

                                //put between points
                                newPoint.next = nextPoint;
                                point.next = newPoint;

                                point = nextPoint;
                            }
                        }

                        //normalize to values between 0 and 1
                        if (maxY != minY) {
                            var normalizeRate = 1/(maxY - minY);
                            point = pointList.first;
                            while (point != null) {
                                point.y = normalizeRate*(point.y - minY);
                                point = point.next;
                            }
                        }

                        //unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
                        else {
                            point = pointList.first;
                            while (point != null) {
                                point.y = 1;
                                point = point.next;
                            }
                        }

                        return pointList;		
                    };
                    
                    setBackgroundLayer(canvas);
                    
                    };
                    img3.src = jQuery('#moon-texture1').attr('src');  
                        
                    };
                    img2.src = jQuery('#rock-texture2').attr('src');  
                        
                    };
                    img.src = jQuery('#rock-texture').attr('src');
                }
            }
            else
            {
                
            }
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
    else if(id == 'body-about')
    {
        pandora.init.about();
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
    else if(id == 'body-landscapes')
    {
        pandora.init.landscapes();
    }
    
    // Random (ish) member count ...
    var ts = new Date().getTime();
    var random = new XorShift128(ts);
    var x = random.integer(100, 499);
    var y = random.integer(500, 999);
    var millions = random.integer(2, 3);
    var thousands = x;
    var hundreds = y;
    if(random.integer(0, 1))
    {
        thousands = y;
        hundreds = x;
    }
    jQuery('.member-count').text('' + millions + ',' + thousands + ',' + hundreds);
});