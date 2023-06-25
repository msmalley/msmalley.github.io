var repeat = function(sym, num)
{
    var html = '';
    for(i = 0; i < num; i++) html+= sym;
    return html;
};

var repeat_pattern = function(pattern, rows, cols)
{
    var new_row = [];
    var new_pattern = [];
    var r = parseInt(rows);
    var c = parseInt(cols);
    if(r < 1) r = 1;
    if(c < 1) c = 1;
    for(p = 0; p < pattern.length; p++)
    {
        var line = '';
        for(c1 = 0; c1 < c; c1++)
        {
            line+= pattern[p];
        }
        new_row.push(line);
    }
    for(r1 = 0; r1 < rows; r1++)
    {
        for(r2 = 0; r2 < new_row.length; r2++)
        {
            new_pattern.push(new_row[r2]);
        }
    }
    return new_pattern;
}

var combine_arrays = function(array1, array2, filler = ' ', space = 2)
{
    var new_array = [];
    var max_length = array1.length;
    var array1_min = array1[0].length;
    var array2_min = array2[0].length;
    if(array2.length > array1.length) max_length = array2.length;
    for(a = 0; a < max_length; a++)
    {
        var ls = repeat(filler, array1_min);
        var rs = repeat(filler, array2_min);
        if(typeof array1[a] != 'undefined') ls = array1[a];
        if(typeof array2[a] != 'undefined') rs = array2[a];
        new_array.push(ls + repeat(filler, space) + rs);
    }
    return new_array;
}

var continue_arrays = function(array1, array2, filler = ' ', space = 2)
{
    var new_array = JSON.parse(JSON.stringify(array1));
    
    var max_width = array1[0].length;
    
    var array1_min = array1[0].length;
    var array2_min = array2[0].length;
    
    if(array2[0].length > array1[0].length) max_width = array2[0].length;
    
    for(s = 0; s < space; s++)
    {
        new_array.push(repeat(filler, max_width));
    }
    
    for(a = 0; a < array2.length; a++)
    {
        var line = array2[a];
        var fill = max_width - line.length;
        if(line.length <= max_width)
        {
            new_array.push(line + repeat(filler, fill));
        }
    }
    
        /*
    for(a = 0; a < max_length; a++)
    {
        var ls = repeat(filler, array1_min);
        var rs = repeat(filler, array2_min);
        if(typeof array1[a] != 'undefined') ls = array1[a];
        if(typeof array2[a] != 'undefined') rs = array2[a];
        new_array.push(ls + repeat(filler, space) + rs);
    }
    */
        
    return new_array;
}

var render_line = function(line)
{
    var s = '';
    for(l = 0; l < line.length; l++)
    {
        s+= filter_slants(line[l]);
    }
    return s;
}

var render_array = function(obj)
{
    var s = '';
    for(o = 0; o < obj.length; o++)
    {
        s+= '\n';
        s+= render_line(obj[o]);
    }
    return s;
}

var frame_array = function(array, padding = 1)
{
    var w = array[0].length + (padding * 2);
    var frame = [
        ' ╔' + repeat('═', w + 2) + '╗ '
    ];
    for(p = 0; p < padding; p++)
    {
        frame.push(
            ' ║ ' + repeat(' ', w) + ' ║ '
        );
    }
    for(a1 = 0; a1 < array.length; a1++)
    {
        var this_frame = ' ║ ';
        for(p = 0; p < padding; p++)
        {
            this_frame+= ' ';
        }
        this_frame+= array[a1];
        for(p = 0; p < padding; p++)
        {
            this_frame+= ' ';
        }
        this_frame+= ' ║ ';
        frame.push(this_frame);
    }
    for(p = 0; p < padding; p++)
    {
        frame.push(
            ' ║ ' + repeat(' ', w) + ' ║ '
        );
    }
    frame.push(
        ' ╚' + repeat('═', w + 2) + '╝ '
    );
    return frame;
}

var get_random_item = function(items)
{
    return items[Math.floor(Math.random() * items.length)];
}

var get_random_int = function(max)
{
    return Math.floor(Math.random() * max);
}

var filter_slants = function(s)
{
    if(s == '!') return '\\';
    else if(s.length > 1)
    {
        return s.replaceAll('!', '\\');
    }
    else return s;
}

var get_random_people = function(pax = 1, padding = 0, names = false, stats = false)
{
    var group = [];
    var people = [];
    for(p = 0; p < pax; p++)
    {
        people.push(get_random_person(names, stats));
    }
    for(p2 = 0; p2 < people[0].length; p2++)
    {
        var these_people ='';
        for(p3 = 0; p3 < people.length; p3++)
        {
            if(p3 > 0)
            {
                these_people+= repeat(' ', padding);
            }
            these_people+= people[p3][p2];
        }
        group.push(these_people);
    }
    return group;
}

var get_random_name = function(included_vowels = false, included_consta = false, min = 3, max = 7)
{
    var start = ['c', 'v'];
    var choices = [3, 5, 7];
    if(min == 5) choices.shift();
    else if(max == 5) choices.pop();
    var choice = get_random_item(choices);
    var starting = get_random_item(start);
    var pad = (7 - choice) / 2;
    var vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
    var consta = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'];
    var all = vowels.concat(consta);
    
    if(included_vowels) vowels = included_vowels;
    if(included_consta) consta = included_consta;
    
    var start = get_random_item(all);
    
    var is_vowel = function(str)
    {
        var vow = false;
        for(v = 0; v < vowels; v++)
        {
            if(vowels[v] == str) 
            {
                vow = true;
            }
        }
        return vow;
    }
    
    var name = '';
    var chars = [];
    
    var order = 'vcvcvcv';
    if(starting == 'c') order = 'cvcvcvc';
    
    for(c = 0; c < choice; c++)
    {
        var k = order[c];
        chars.push({
            v: get_random_item(vowels),
            c: get_random_item(consta),
        });
        name+= chars[c][k];
    };
    if(included_consta && included_vowels)
    {
        return name;
    }
    else
    {
        return repeat(' ', pad) + name + repeat(' ', pad);
    }
}

var get_body_stats = function(the_body)
{
    var mass = '';
    var level = get_random_int(9) + 1;
    var energy = get_random_int(999) + 1;
    var nrg = energy;
    if(energy < 10) nrg = '00' + energy;
    else if(energy < 100) nrg = '0' + energy;
    for(b = 0; b < the_body.length; b++)
    {
        mass+= the_body[b];
    }
    
    var magic = (mass.match(/\*/g) || []).length;
    magic = magic + (mass.match(/=/g) || []).length;
    magic = magic + (mass.match(/~/g) || []).length;
    
    var might = (mass.match(/┼/g) || []).length;
    might = might + (mass.match(/\?/g) || []).length;
    might = might + (mass.match(/T/g) || []).length;
    might = might + (mass.match(/O/g) || []).length;
    
    var craft = (mass.match(/W/g) || []).length;
    craft = craft + (mass.match(/≡/g) || []).length;
    craft = craft + (mass.match(/$/g) || []).length;
    craft = craft + (mass.match(/†/g) || []).length;

    if(magic > 9) magic = 9;
    if(might > 9) might = 9;
    if(craft > 9) craft = 9;
    
    var stats = [
        '_______',
        'LEVEL:'+level,
        '¯¯¯¯¯¯¯',
        '_______',
        'MIGHT:'+might,
        'MAGIC:'+magic,
        'CRAFT:'+craft,
        '¯¯¯¯¯¯¯',
        '_______',
        'NRG:'+nrg,
        '¯¯¯¯¯¯¯'
    ];
    return stats;
}

var get_random_person = function(names = false, stats = false, hometown = false)
{
    var ascii_groin = get_random_item(ascii_groins);
    var ascii_head = get_random_item(ascii_heads);
    var ascii_side = get_random_item(ascii_face_side);
    var ascii_eye = get_random_item(ascii_eyes);
    var ascii_nose = get_random_item(ascii_noses);
    var ascii_face = ' ' + ascii_side[0] + ascii_eye[0] + ascii_nose + ascii_eye[1] + ascii_side[1] + ' ';
    var ascii_arm = get_random_item(ascii_arms);
    var ascii_leeg = get_random_item(ascii_legs);
    var ascii_foot = get_random_item(ascii_feet);
    var ascii_bod = get_random_item(ascii_bodies);
    var bod_left = filter_slants(ascii_bod[0]); 
    var bod_right = filter_slants(ascii_bod[1]);
    var leg_left = filter_slants(ascii_leeg[0]); 
    var leg_right = filter_slants(ascii_leeg[1]);

    var ascii_leg = ' ' + ascii_foot + leg_left + ascii_groin + leg_right + ascii_foot + ' ';
    var ascii_body = get_random_item(ascii_hands) + ascii_arm;
    ascii_body+= bod_left + get_random_item(ascii_belts) + bod_right + ascii_arm;
    ascii_body+= get_random_item(ascii_hands);
    
    var body = [
        ascii_head,
        ascii_face,
        ascii_body,
        ascii_leg
    ];
    
    if(names)
    {
        var min = 5;
        var max = 7;
        if(ascii_foot == ' ')
        {
            min = 3;
            max = 5;
        }
        var name = get_random_name(false, false, min, max);
        body.push(name);        
    }
    if(stats)
    {
        var stats_array = get_body_stats(body);
        body = body.concat(stats_array);
    }
    
    if(names && stats) hometown = true;
    
    if(hometown)
    {
        var landscape = get_random_landscape(1);
        var city_mass = landscape.concat(body);
        var home_name = 'BORN: ' + get_place_name(city_mass);
        var pad_left = Math.floor((landscape[0].length - home_name.length) / 2);
        var pad_right = Math.ceil((landscape[0].length - home_name.length) / 2);
        var header = [
            '                  OWNER:                  ',
            '                 ¯¯¯¯¯¯¯¯                 ',
            '0x88d052f10f6245deac4179b3373667c8eac8cfbf',
            '__________________________________________'
        ];
        var footer = [
            '______________________________',
            repeat(' ', pad_left) + home_name + repeat(' ', pad_right),
            '¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯'
        ];
        var cityscape = continue_arrays(landscape, footer, ' ', 1);
        body = combine_arrays(body, cityscape, ' ', 4);
        body = continue_arrays(header, body);
    }

    return body;
};

var get_random_object = function(obj)
{
    var array = [];
    jQuery.each(obj, function(o)
    {
        array.push(obj[o]);
    });
    return get_random_item(array);
}

var get_random_landscape = function(lands = 2)
{
    var landscape = [];
    var landscapes = [];
    
    for(l = 0; l < lands; l++)
    {
        landscapes.push(get_random_object(ascii_art.landscapes));
    }
    
    for(l = 0; l < landscapes[0].length; l++)
    {
        var land = '';
        for(l2 = 0; l2 < landscapes.length; l2++)
        {
            land+= landscapes[l2][l];
        }
        landscape.push(land);
    }
    return landscape;
}

var get_random_terrain = function(size)
{
    return get_random_item(ascii_terrains[size - 1]);
}

var get_random_hex = function(style)
{
    return get_random_item(ascii_hexes[style]);
}

var terrain_to_hex = function(terrain)
{
    var hex = [];
    var height = terrain.length;
    var max_pad = Math.ceil(height / 2);
    for(h = 0; h < (height - 1); h++)
    {
        var line = '';
        var bottom_pad = (0 - max_pad) + (h + 1);
        var top_pad = (max_pad - (h + 1)) - 1;
        var pad = bottom_pad;
        if(h < ((height - 1) / 2))
        {
            pad = top_pad;
        }
        line+= repeat(' ', pad);
        line+= terrain[h];
        line+= repeat(' ', pad);
        hex.push(line);
    }
    return hex;
}

var get_terrain_type = function(terrain)
{
    var biome = {
        rivers: 0,
        plains: 0,
        oceans: 0,
        beaches: 0,
        mountains: 0,
        forests: 0,
        buildings: 0,
        snow: 0,
        mystery: 0,
        enemies: 0,
        allies: 0,
        unknown: 0,
        top: '.',
        bottom: '.',
    };
    var top = {
        grass: 0,
        water: 0
    }
    var bottom = {
        grass: 0,
        water: 0
    }
    for(r = 0; r < terrain.length; r++)
    {
        var row_grass = 0;
        var row_water = 0;
        for(c = 0; c < terrain[r].length; c++)
        {   
            var s = terrain[r][c];
            if(s == '~') biome.rivers++;
            else if(s == '.') biome.plains++;
            else if(s == ';') biome.oceans++;
            else if(s == '*') biome.snow++;
            else if(s == '}' || s == '{') biome.allies++;
            else if(s == '^' || s == '+') biome.enemies++;
            else if(s == 'n' || s == 'u') biome.beaches++;
            else if(s == '@' || s == '$' || s == '▄') biome.mystery++;
            else if(s == '/' || s == '!') biome.mountains++;
            else if(s == 'o' || s == '(' || s == ')' || s == '|' || s == '¯') biome.forests++;
            else if(s == '[' || s == ']' || s == '=' || s == '¦' || s == '»' || s == '>' || s == '_' || s == '┼' || s == '░') biome.buildings++;
            else
            {
                //if(s != ' ') console.log('MISSED MAPPING OF ', s);
                biome.unknown++;
            }
            
            if(s == '.' || s == 'n' || s == 'u') row_grass++;
            if(s == '~' || s == ';') row_water++;
        }
        if(r < (terrain.length / 2))
        {
            top.grass = top.grass + row_grass;
            top.water = top.water + row_water;
        }
        else
        {
            bottom.grass = bottom.grass + row_grass;
            bottom.water = bottom.water + row_water;
        }
    }
    if(top.water > top.grass) biome.top = '~';
    if(bottom.water > bottom.grass) biome.bottom = '~';
    return biome;
}

var generate_hex_array = function(size = 0, rings = 0, these_rows = 0, these_cols = 0, trim_only = false, mega = false)
{
    var map = [];
    var s = parseInt(size);
    var r = parseInt(rings);
    if(size < 1) s = 1;
    if(rings < 1) r = 1;
    var height = s * 2;
    var width = s * 4;
    
    var footer_sym = '_';
    var border_sym_left = '/';
    var border_sym_right = '!';
    
    if(typeof mega == 'object')
    {
        footer_sym = 'F';
        border_sym_left = 'L';
        border_sym_right = 'R';
    }
    
    var top_line = border_sym_left + repeat('L', height) + border_sym_right;
    var bottom_line = border_sym_right + repeat(footer_sym, height) + border_sym_left;
    
    var textures_data = [];
    var textured_data = [];
    
    for(r2 = 0; r2 < these_rows; r2++)
    {
        textures_data.push([]);
        for(c2 = 0; c2 < (these_cols * 2); c2++)
        {
            var col = c2;
            var this_r = JSON.parse(JSON.stringify(r2));
            var this_c = JSON.parse(JSON.stringify(col));
            var this_label = '00';
            if(s > 4)
            {
                if(this_r < 10) this_r = '000' + this_r;
                else if(this_r < 100) this_r = '00' + this_r;
                if(this_c < 10) this_c = '000' + this_c;
                else if(this_c < 100) this_c = '00' + this_c;
                
                this_label = 'R' + this_r + 'C' + this_c;
            }
            else if(s > 3)
            {
                if(this_r < 10) this_r = '00' + this_r;
                else if(this_r < 100) this_r = '0' + this_r;
                if(this_c < 10) this_c = '00' + this_c;
                else if(this_c < 100) this_c = '0' + this_c;
                
                this_label = 'R' + this_r + 'C' + this_c;
            }
            else if(s > 2)
            {
                if(this_r < 10) this_r = '0' + this_r;
                if(this_c < 10) this_c = '0' + this_c;
                this_label = 'R' + this_r + 'C' + this_c;
            }
            else if(s > 1)
            {
                if(this_r < 10) this_r = '0' + this_r;
                if(this_c < 10) this_c = '0' + this_c;
                this_label = '' + this_r + '' + this_c;
            }
            
            var footer = false;
            var this_terrain = false;
            var this_biome = get_terrain_type(this_terrain);
            
            if(typeof mega == 'object')
            {
                var new_label = false;
                var got_terrain = false;
                for(m2 = 0; m2 < mega.length; m2++)
                {
                    if(mega[m2].label == this_label)
                    {
                        got_terrain = true;
                        this_terrain = mega[m2].terrain;
                        new_label = mega[m2].new_label;
                        footer = mega[m2].footer;
                        new_label = repeat('F', 26 + this_label.length);
                    }
                }
                if(!got_terrain)
                {
                    this_terrain = mega[0].terrain;
                }
                this_label = this_label + repeat('0', 26);
                if(!new_label)
                {
                    new_label = this_label;
                }
            }
            else
            {
                this_terrain = get_random_terrain(size);
            }
            
            textures_data[r2].push({
                label: this_label,
                new_label: new_label,
                terrain: this_terrain,
                biome: get_terrain_type(this_terrain),
                footer: footer
            });
        }
    }
    
    var si = size;
    if(size < 3) si = 1;
    
    for(r2 = 0; r2 < these_rows; r2++)
    {
        textured_data.push([]);
        for(c2 = 0; c2 < these_cols; c2++)
        {
            var footer = bottom_line;
            var rfooter = repeat(footer_sym, height);
            var num = (c2 * 2) - 1;
            var num2 = r2 - 1;
            var num3 = (c2 * 2) + 1;
            var this_texture = textures_data[r2][c2 * 2].terrain;
            var this_label = textures_data[r2][(c2 * 2)].label;
            
            if(typeof mega == 'object')
            {
                this_label = textures_data[r2][(c2 * 2)].new_label;
                
                if(typeof textures_data[r2][(c2 * 2)].footer != 'undefined')
                {
                    footer = textures_data[r2][(c2 * 2)].footer;
                    if(footer)
                    {
                        bottom_line = border_sym_right + footer + border_sym_left;
                    }
                }
                if(
                    typeof textures_data[r2 - 1] == 'object'
                    && typeof textures_data[r2 - 1][(c2 * 2) + 1].footer != 'undefined')
                {
                    rfooter = textures_data[r2 - 1][(c2 * 2) + 1].footer;
                }
            }
            if(!rfooter)
            {
                rfooter = repeat(footer_sym, height);
            }
            if(!footer)
            {
                footer = bottom_line;
            }
            
            var this_label_r = false;
            
            var this_texture_b = false;
            if(typeof textures_data[r2][num] == 'object')
            {
                this_texture_b = textures_data[r2][num].terrain;
            }
            
            var this_texture_a = false;
            if(typeof textures_data[num2] == 'object' && typeof textures_data[num2][num] == 'object')
            {
                this_texture_a = textures_data[num2][num].terrain;
            }
            
            var this_texture_y = false;
            var this_texture_x = false;
            
            if(typeof textures_data[r2][num3] == 'object')
            {
                this_texture_y = textures_data[r2][num3].terrain;
            }
            
            if(typeof textures_data[num2] == 'object' && typeof textures_data[num2][num3] == 'object')
            {
                this_texture_x = textures_data[num2][num3].terrain;
            }
            
            if(trim_only && (r2 + 1) == these_rows)
            {
                this_texture_y = false;
                this_texture_b = false;
                this_label_r = false;
            }
            
            
            if((c2 + 1) < these_cols)
            {   
                var e_row = 0;
                var e_col = 0;
                
                if(this_label.length < 3)
                {
                    e_row = parseInt('' + this_label[0] + '');
                    e_col = parseInt('' + this_label[1] + '');
                }
                else if(this_label.length < 5)
                {
                    e_row = parseInt('' + this_label[0] + this_label[1] + '');
                    e_col = parseInt('' + this_label[2] + this_label[3] + '');
                }
                else if(this_label.length < 7)
                {
                    e_row = parseInt('' + this_label[1] + this_label[2] + '');
                    e_col = parseInt('' + this_label[4] + this_label[5] + '');
                }
                else if(this_label.length < 9)
                {
                    e_row = parseInt('' + this_label[1] + this_label[2] + this_label[3] + '');
                    e_col = parseInt('' + this_label[5] + this_label[6] + this_label[7] + '');
                }
                else if(this_label.length < 11)
                {
                    e_row = parseInt('' + this_label[1] + this_label[2] + this_label[3] + this_label[4] + '');
                    e_col = parseInt('' + this_label[6] + this_label[7] + this_label[8] + this_label[9] + '');
                }
                else if(this_label.length > 3)
                {
                    e_row = parseInt('' + this_label[1] + this_label[2] + this_label[3] + this_label[4] + '');
                    e_col = parseInt('' + this_label[6] + this_label[7] + this_label[8] + this_label[9] + '');
                }
                
                var this_c = JSON.parse(JSON.stringify(e_col));
                var this_label = '' + e_row + e_col + '';
                
                if(s > 4)
                {
                    if(e_row < 10) e_row = '000' + e_row;
                    else if(e_row < 100) e_row = '00' + e_row;
                    if(e_col < 10) e_col = '000' + e_col;
                    else if(e_col < 100) e_col = '00' + e_col;

                    this_label = 'R' + e_row + 'C' + e_col;
                }
                else if(s > 3)
                {
                    if(e_row < 10) e_row = '00' + e_row;
                    else if(e_row < 100) e_row = '0' + e_row;
                    if(e_col < 10) e_col = '00' + e_col;
                    else if(e_col < 100) e_col = '0' + e_col;

                    this_label = 'R' + e_row + 'C' + e_col;
                }
                else if(s > 2)
                {
                    if(e_row < 10) e_row = '0' + e_row;
                    if(e_col < 10) e_col = '0' + e_col;
                    this_label = 'R' + e_row + 'C' + e_col;
                }
                else if(s > 1)
                {
                    if(e_row < 10) e_row = '0' + e_row;
                    if(e_col < 10) e_col = '0' + e_col;
                    this_label = '' + e_row + e_col + '';
                }
                
                if(typeof mega == 'object')
                {
                    this_label = this_label + repeat('0', 26);
                    this_label = textures_data[r2][(c2 * 2)].new_label;
                }
                
                this_label_r = textures_data[r2][(c2 * 2) + 1].label;
                if(typeof mega == 'object')
                {
                    this_label_r = textures_data[r2][(c2 * 2) + 1].new_label;
                }
                
                if(trim_only && (r2 + 1) == these_rows)
                {
                    this_label_r = repeat(' ', (size * 2));
                }
            }
            textured_data[r2][c2] = [];
            
            for(h = 0; h < height; h++)
            {
                var tpad = s - (h + 1);
                var bpad = (0 - (height / 2)) + h;
                
                var bre = false;
                var tre = false;
                
                var line = '';
                
                if(h == 0)
                {
                    for(x = 0; x < tpad; x++)
                    {
                        if(typeof this_texture_a == 'object')
                        {
                            var i = h + (size - 1);
                            line+= this_texture_a[i][x + ((size * 3)-1)];
                        }
                        else
                        {
                            line+= ' ';
                        }
                    }
                    
                    line+= border_sym_left;
                    
                    for(x = 0; x < height; x++)
                    {
                        if(s > 1)
                        {
                            line+= this_label[x];
                        }
                        else
                        {
                            line+= this_texture[0][x];
                        }
                    }
                    
                    line+= border_sym_right;
                    
                    if(s > 1)
                    {
                        for(x = 0; x < (tpad + height); x++)
                        {
                            if(typeof this_texture_x == 'object')
                            {
                                if((c2 + 1) == these_cols)
                                {
                                    line+= ' ';
                                }
                                else
                                {
                                    // TODO - fix this section !!!
                                    
                                    // Works on size 4
                                    var i = h + parseInt((si / 2) + 1); // h + 3
                                    
                                    // Works on size 6
                                    // I without SI ...?
                                    var i = h + parseInt(size / 2) + 2; // h + 5
                                    
                                    var i = h + (size - 1);
                                    
                                    if(size < 2) i = 0;
                                    line+= this_texture_x[i][x];
                                }
                            }
                            else
                            {
                                line+= ' ';
                            }
                        }
                    }
                    else
                    {
                        line+= bottom_line;
                    }
                }
                else if((h + 1) == height)
                {
                    if(s > 1)
                    {
                        for(x = 0; x < bpad; x++)
                        {
                            if(typeof this_texture_b == 'object')
                            {
                                line+= this_texture_b[h - (size + 1)][x + ((size * 3)-1)];
                            }
                            else
                            {
                                line+= ' ';
                            }
                        }
                    }
                    
                    line+= bottom_line;
                    
                    for(x = 0; x < (bpad + height); x++)
                    {
                        if(typeof this_texture_y == 'object')
                        {
                            if((c2 + 1) == these_cols)
                            {
                                line+= ' ';
                            }
                            else
                            {
                                var i = h - (size + 1);
                                if(size < 2) i = 0;
                                line+= this_texture_y[i][x];
                            }
                        }
                        else
                        {
                            line+= ' ';
                        }
                    }
                }
                else
                {
                    if((h + 1) == (height / 2))
                    {
                        tre = rfooter;
                    }
                    else if((h + 1) == ((height / 2) + 1))
                    {
                        bre = '';
                        
                        for(x = 0; x < height; x++)
                        {
                            bre+= this_label_r[x];
                        }
                    }
                    if(h < (height / 2))
                    {
                        for(x = 0; x < tpad; x++)
                        {
                            if(typeof this_texture_a == 'object')
                            {
                                // TODO - Fix this section
                                // Works for sizes 1 to 4
                                var i = h + parseInt((si / 2)+1);
                                
                                // Size 6
                                var i = h + parseInt((size / 2) + 2);
                                
                                var i = h + (size - 1);
                                
                                line+= this_texture_a[i][x + ((size * 3) - (h + 1))];
                            }
                            else
                            {
                                line+= ' ';
                            }
                        }
                        
                        line+= border_sym_left;

                        for(x = 0; x < width - height + (h * 2); x++)
                        {
                            line+= textures_data[r2][(c2 * 2)].terrain[h - 1][x];
                        }

                        line+= border_sym_right;
                        
                        for(x = 0; x < tpad; x++)
                        {
                            if(typeof this_texture_x == 'object')
                            {
                                if((c2 + 1) == these_cols)
                                {
                                    line+= ' ';
                                }
                                else
                                {
                                    // TODO - fix this section
                                    // Works for sizes 1 to 4
                                    var i = h + parseInt((si / 2) + 1);
                                    
                                    // Size 6
                                    var i = h + parseInt((size / 2) + 2);
                                    
                                    var i = h + (size - 1);
                                    
                                    line+= this_texture_x[i][x];
                                }
                            }
                            else
                            {
                                line+= ' ';
                            }
                        }
                        
                        if(tre)
                        {
                            line+= tre;
                        }
                        else
                        {
                            for(x = 0; x < height; x++)
                            {
                                if(typeof this_texture_x == 'object')
                                {
                                    var i1 = h + (size - 1);
                                    
                                    var y = size - 2;
                                    var y2 = (y + 1) - h;
                                    var i2 = x + y2;
                                    
                                    line+= this_texture_x[i1][i2];
                                }
                                else
                                {
                                    line+= ' ';
                                }
                            }
                        }
                    }
                    else
                    {
                        for(x = 0; x < bpad; x++)
                        {
                            if(typeof this_texture_b == 'object')
                            {
                                line+= this_texture_b[h - (size + 1)][x + (h+size)];
                            }
                            else
                            {
                                line+= ' ';
                            }
                        }
                        
                        line+= border_sym_right;
                        
                        for(x = 0; x < width - ((bpad * 2) + 2); x++)
                        {
                            line+= textures_data[r2][(c2*2)].terrain[h - 1][x];
                        }
                        
                        line+= border_sym_left;
                        
                        for(x = 0; x < bpad; x++)
                        {
                            if(typeof this_texture_y == 'object')
                            {
                                if((c2 + 1) == these_cols)
                                {
                                    line+= ' ';
                                }
                                else
                                {
                                    line+= this_texture_y[h - (size + 1)][x];
                                }
                            }
                            else
                            {
                                line+= ' ';
                            }
                        }
                        
                        if(bre)
                        {
                            line+= bre;
                        }
                        else
                        {
                            for(x = 0; x < height; x++)
                            {
                                if(typeof this_texture_y == 'object')
                                {
                                    line+= this_texture_y[h - (size + 1)][x + (h - size)];
                                }
                                else
                                {
                                    line+= ' ';
                                }
                            }
                        }
                    }
                }
                textured_data[r2][c2].push(line);
            }
        }
    }
    return [
        textured_data,
        textures_data
    ];
}

var cut_corners = function(map)
{
    var new_map = [];
    for(r = 0; r < map.length; r++)
    {
        var new_line = '';
        var this_row = JSON.parse(JSON.stringify(map[r]));
        for(c = 0; c < map[0].length; c++)
        {
            var s = this_row[c];
           
            new_line+= s;
        }
        new_map.push(new_line);
    }
    return new_map;
}

var top_gap = 0;
var bottom_gap = 0;
var bottomr_gap = 0;
var row_count = 0;
var brow_count = -1;
var bra_count = -1;

var filter_hexes = function(line, rings, size, r, this_row)
{
    row_count++;
    var new_line = '';
    var width = size * 6;
    var height = size * 2;
    var rows = (rings * 2) + 1;
    var cols = Math.ceil((rows / 2));
    var corners = Math.ceil(rings / 2);
    
    var this_width = line.length;
    
    var blank = ' ';
    //var blank = ';';
    //var blank = '~';
    
    var midway = ((rings / 2) + (rings + 1)) * height;
    var mid = (size * 2) + 2;
    
    var tl = ((line.length - mid) - ((this_row + size) * 2)) - 0;
    var tr = ((line.length - mid) + ((this_row + size) * 2)) + 2; // TODO - back to 2?
    var bl = width - 2;
    var br = (line.length * 2) - (size * 4);
    
    var even = true;
    if(rings % 2 == 0)
    {
        
    }
    else
    {
        even = false;
        var tl = (line.length + (size * 4) - 2) - ((this_row + size) * 2);
        //var tl = (line.length / 2) - (this_row * 2);
        
        var tr = (line.length - (size * 4) - 0) + ((this_row - size) * 2);
        var midway = (((rings / 2) + (rings + 2)) * height) - size;
    }
    
    var bla = (this_row > (midway - 1));
    var bra = ((this_row + size) > (midway - 1));
    
    if(row_count == size)
    {
        top_gap = top_gap + (size * 4);
        row_count = 0;
    }
    
    if(bla)
    {   
        brow_count++;
        if(brow_count == size)
        {
            bottom_gap = (bottom_gap + (size * 4)) + 2;
            brow_count = 0;
        }
        else
        {
            bottom_gap = bottom_gap + 2;
        }
        
    }
    if(bra)
    {   
        bra_count++;
        if(bra_count == size)
        {
            bottomr_gap = (bottomr_gap + (size * 4)) + 2;
            bra_count = 0;
        }
        else
        {
            bottomr_gap = bottomr_gap + 2;
        }
        
    }
    
    tl = tl - top_gap;
    bl = bl + bottom_gap;
    tr = tr + top_gap;
    br = br - bottomr_gap;
    
    for(w = 0; w < line.length; w++)
    {
        var c = parseInt(w / width);
        var s = line[w];
        
        var t = tl - w;
        var b = bl - w;
        var t2 = parseInt(tr - w);
        var b2 = parseInt(br - w);
    
        // Cleans edges ...
        if(c < 1)
        {
            if(s == 'A' || s == 'B') s = blank;
        }
        if((c + 1) == cols)
        {
            if(s == 'Y' || s == 'X') s = blank;
            
            var this_col = parseInt(w - (c * width))
            if(this_col >= (size * 4))
            {
                s = '';
            }
        }
        if(r < 1)
        {
            if(s == 'A' || s == 'X') s = blank;
        }
        if((r + even) == rows)
        {
            if(s == 'Y' || s == 'B') s = blank;
            
            var this_col = parseInt(w - (c * width))
            if(this_col >= (size * 4))
            {
                if(s == 'I') s = blank;
            }
        }
        
        if(w < t) s = blank;
        if(w > t2 && s) s = blank;
        
        if(bla)
        {   
            if(w < b) s = blank;
        }
        if(bra)
        {   
            if(w > b2 && s) s = blank;
            if(w > b2 && s) s = blank;
        }
        
        new_line+= s;
    }
    return new_line;
}

var trim_hexes = function(line, rings, size, r, this_row)
{
    row_count++;
    var new_line = '';
    var width = size * 6;
    var height = size * 2;
    var rows = (rings * 2) + 1;
    
    var cols = Math.ceil((rows / 2));
    var corners = Math.ceil(rings / 2);
    
    var even = true;
    if(rings % 2 == 0)
    {
        
    }
    else
    {
        even = false;
    }
    
    for(w = 0; w < line.length; w++)
    {
        var c = parseInt(w / width);
        var s = line[w];
    
        // Cleans edges ...
        if(c < 1)
        {
            if(s == 'A' || s == 'B') s = ' ';
        }
        if((c + 1) == cols)
        {
            if(s == 'Y' || s == 'X') s = ' ';
            
            var this_col = parseInt(w - (c * width))
            if(this_col >= (size * 4))
            {
                s = '';
            }
        }
        if(r < 1)
        {
            if(s == 'A' || s == 'X') s = ' ';
        }
        if((r + even) == rows)
        {
            if(s == 'Y' || s == 'B') s = ' ';
            
            var this_col = parseInt(w - (c * width))
            if(this_col >= (size * 4))
            {
                if(s == 'I') s = ' ';
            }
        }
        
        new_line+= s;
    }
    return new_line;
}

var remove_corners = function(map, rings, size, trim_only = false, give_top_hats = true)
{
    var new_map = [];
    var width = size * 6;
    var height = size * 2;
    var rows = (rings * 2) + 1;
    var even = true; 
    
    if(rings % 2 == 0)
    {
        
    }
    else
    {
        even = false;
        rows++;
    }
    
    var cols = Math.ceil((rows / 2));
    
    if(rings && rings % 2)
    {
        
    }

    for(r = 0; r < (rows * height); r++)
    {
        var line = '';
        var this_row = parseInt(r / height);
        for(c = 0; c < cols; c++)
        {
            for(w = 0; w < width; w++)
            {
                var col = (width * c) + w;
                var row = (height * r) + h;
                line+= map[r][col];
            }
        }
        if(trim_only)
        {
            new_map.push(trim_hexes(line, rings, size, this_row, r));
        }
        else
        {
            new_map.push(filter_hexes(line, rings, size, this_row, r));
        }
    }
    
    var cutted_corners = cut_corners(new_map, (size * 4));
    var top_hat = false;
    var hat_sym = '_';
    
    if(!give_top_hats) hat_sym = ' ';
    
    if(trim_only)
    {
        top_hat = '';
        for(c1 = 0; c1 < cols; c1++)
        {
            var last = (size * 3);
            if((c1 + 1) == cols)
            {
                last = (size * 1);
            }
            top_hat+= repeat(' ', size) + repeat(hat_sym, (size * 2)) + repeat(' ', last);
        }
    }
    else if(even)
    {
        var x = (cutted_corners[0].length - (size * 2)) / 2;
        top_hat = repeat(' ', x) + repeat(hat_sym, (size * 2)) + repeat(' ', x);
    }
    
    if(top_hat)
    {
        cutted_corners.unshift(top_hat);
    }
    
    return cutted_corners
}

var color_wrapper = function(array, format = 'raw', callback = false, colours = false, x_limit = false, xy_type = 'bright', y_base = false, framed = false)
{
    var ascii = render_array(array);
    var arrayed = array;
    if(framed)
    {
        ascii = render_array(frame_array(array));
        arrayed = frame_array(array);
    }
    
    var c = eval(colours);
    if(typeof c == 'object') colours = c;
    
    temp_api.colour(ascii, format, function(results)
    {
        callback(results);
    }, colours, arrayed, x_limit, xy_type, y_base);
}

var generate_hex = function(size = 1, top_tex = '#', bottom_tex = '#')
{
    if(!size || parseInt(size) < 1) size = 1;
    var height = (size * 2) + 1;
    var width = size * 4;
    var hex_array = [];
    for(h = 0; h < height; h++)
    {
        var line = '';
        var max_pad = Math.ceil(height / 2);
        var bottom_pad = (0 - max_pad) + h;
        var top_pad = (max_pad - h) - 1;
        var top_fill = (h - 1) * 2;
        var bottom_fill = ((height - h) * 2) - 2;
        
        var tex = bottom_tex;
        if(h < (height / 2))
        {
            tex = top_tex;
        }
        if(h == 0)
        {
            line+= repeat(' ', size);
            line+= repeat('_', (size) * 2);
            line+= repeat(' ', size);
        }
        else if((h + 1) == height)
        {
            line+= repeat(' ', bottom_pad);
            line+= '!';
            line+= repeat(bottom_tex, (size) * 2);
            line+= '/';
            line+= repeat(' ', bottom_pad);
        }
        else if(h < Math.ceil(height / 2))
        {
            line+= repeat(' ', top_pad);
            line+= '/';
            line+= repeat(top_tex, (size) * 2);
            line+= repeat(top_tex, top_fill);
            line+= '!';
            line+= repeat(' ', top_pad);
        }
        else
        {
            line+= repeat(' ', bottom_pad);
            line+= '!';
            line+= repeat(bottom_tex, (size) * 2);
            line+= repeat(bottom_tex, bottom_fill);
            line+= '/';
            line+= repeat(' ', bottom_pad);
        }
        hex_array.push(line);
    }
    var bottom = repeat(' ', size);
    bottom+= repeat('¯', (size * 2));
    bottom+= repeat(' ', size);
    hex_array.push(bottom);
    return hex_array;
}

var array_to_table = function(array)
{
    var table = [];
    for(r = 0; r < array.length; r++)
    {
        table.push([]);
        for(c = 0; c < array[r].length; c++)
        {
            table[r].push(array[r][c]);
        }
    }
    return table;
}

var table_to_array = function(table)
{
    var array = [];
    for(r = 0; r < table.length; r++)
    {
        var line = '';
        for(c = 0; c < table[r].length; c++)
        {
            var s = table[r][c];
            line+= s;
        }
        array.push(line);
    }
    return array;
}

var all_central_hexes = [];

var add_mega_epics = function(mega_table)
{
    var epic_width = 24;
    var epic_height = 12;
    for(r = 0; r < mega_table.length; r++)
    {
        for(c = 0; c < mega_table[r].length; c++)
        {
            var rs = false;
            var bs = false;
            var got_rs_grass = true;
            var got_bs_grass = true;
            var got_rs_river = true;
            var got_bs_river = true;
            var got_rs_ocean = true;
            var got_bs_ocean = true;

            for(w = 0; w < epic_width; w++)
            {
                if(
                    typeof mega_table[r] == 'object'
                    && typeof mega_table[r][c + w] != 'undefined'
                    && mega_table[r][c + w] == '.'
                ){
                    //rs = table[r][c + w];
                }
                else
                {
                    got_rs_grass = false;
                }
                if(
                    typeof mega_table[r] == 'object'
                    && typeof mega_table[r][c + w] != 'undefined'
                    && mega_table[r][c + w] == ';'
                ){
                    //rs = table[r][c + w];
                }
                else
                {
                    got_rs_ocean = false;
                }
                if(
                    typeof mega_table[r] == 'object'
                    && typeof mega_table[r][c + w] != 'undefined'
                    && mega_table[r][c + w] == '~'
                ){
                    //rs = table[r][c + w];
                }
                else
                {
                    got_rs_river = false;
                }
            }

            for(h = 0; h < epic_height; h++)
            {
                if(
                    typeof mega_table[r + h] == 'object'
                    && typeof mega_table[r + h][c] != 'undefined'
                    && mega_table[r + h][c] == '.'
                ){
                    //bs = table[r + h][c];
                }
                else
                {
                    got_bs_grass = false;
                }
                if(
                    typeof mega_table[r + h] == 'object'
                    && typeof mega_table[r + h][c] != 'undefined'
                    && mega_table[r + h][c] == ';'
                ){
                    //bs = table[r + h][c];
                }
                else
                {
                    got_bs_ocean = false;
                }
                if(
                    typeof mega_table[r + h] == 'object'
                    && typeof mega_table[r + h][c] != 'undefined'
                    && mega_table[r + h][c] == '~'
                ){
                    //bs = table[r + h][c];
                }
                else
                {
                    got_bs_river = false;
                }
            }
            if(
                (
                    got_rs_grass && got_bs_grass
                )
                ||
                (
                    got_rs_river && got_bs_river
                )   
                ||
                (
                    got_rs_ocean && got_bs_ocean
                )
            )
            {
                var epic = get_random_item(ascii_epics);
                var starting_r = r + parseInt((epic_height / 2) - (epic.length / 2));
                var starting_c = c + parseInt((epic_width / 2) - (epic[0].length / 2));
                for(er = 0; er < epic.length; er++)
                {
                    for(ec = 0; ec < epic[er].length; ec++)
                    {
                        var x = epic[er][ec];
                        if(
                            typeof mega_table[starting_r + er] == 'object'
                            && typeof mega_table[starting_r + er][starting_c + ec] != 'undefined'
                            &&
                            (
                                (mega_table[starting_r + er][starting_c + ec] == '.' && got_rs_grass)
                                || (mega_table[starting_r + er][starting_c + ec] == ';' && got_rs_ocean)
                                || (mega_table[starting_r + er][starting_c + ec] == '~' && got_rs_river)
                            )
                        ){
                            if(x != ' ')
                            {
                                mega_table[starting_r + er][starting_c + ec] = x;
                            }
                        }
                    }
                }

                if((r + (epic.length * 1)) < mega_table.length)
                {
                    r = r + (epic.length);
                }
                if((c + (epic[0].length * 1)) < mega_table[r].length)
                {
                    c = c + (epic[0].length);
                }
            }
        }
    }
    return mega_table;
}

var add_central_hex = function(table, hex, city_row1 = false, city_col1 = false, city_row2 = false, city_col2 = false, city_row3 = false, city_col3 = false, city_row4 = false, city_col4 = false, plot)
{
    var table_height = table.length;
    var table_width = table[0].length;
    var hex_height = hex.length;
    var hex_width = hex[0].length;
    if(table_height > (hex_height * 2) && table_width > (hex_width * 2))
    {
        var max_pad = (hex_height / 2);
        var new_table = table;
        var starting_row = (table_height / 2) - (hex_height / 2);
        var starting_col = (table_width / 2) - (hex_width / 2);
        for(r = 0; r < hex.length; r++)
        {
            var top_pad = (max_pad - r);
            var bottom_pad = (0 - max_pad) + r;
            var row = (r + starting_row);
            
            var pad = bottom_pad;
            
            if(r < (hex_height / 2))
            {
                pad = top_pad - 1;
            }
            
            // Extend the sides ...
            var padded_left_col = 0;
            var padded_right_col = 0;
            var ls = hex[r][pad];
            var rs = hex[r][(hex_width - pad) - 1];
            
            for(x = 0; x < ((table_width / 2) - (hex_width / 2)) + pad; x++)
            {
                var o = new_table[row][x];
                if(o != ' ' && o != '/' && o != '!')
                {
                    new_table[row][x] = ls;
                }
            }
            for(y = 0; y < ((table_width / 2) - (hex_width / 2)) + 0; y++)
            {
                var x = y + (((table_width / 2) + (hex_width / 2)) - pad);
                var o = new_table[row][x];
                if(o != ' ' && o != '/' && o != '!')
                {
                    new_table[row][x] = rs;
                }
            }
            
            // Place the tile in the middle ...
            for(c = 0; c < hex[r].length; c++)
            {
                var s = hex[r][c];
                var col = c + starting_col;
                if(s != ' ') new_table[row][col] = s;
            }
        }
        for(w = 0; w < table_width; w++)
        {   
            // Extend the tops and bottoms ...
            var ts = new_table[starting_row][w];
            var bs = new_table[(starting_row + hex_height) - 1][w];
            
            if(ts != ' ' && ts != '/' && ts != '!')
            {
                for(x = 0; x < (table_height / 2) - (hex_height / 2); x++)
                {
                    var o = new_table[x][w];
                    if(o != ' ' && o != '/' && o != '!' && o != '_' && o != '¯')
                    {
                        new_table[x][w] = ts;
                    }
                }
            }
            if(bs != ' ' && bs != '/' && bs != '!')
            {
                for(x = 0; x < (table_height / 2) - (hex_height / 2); x++)
                {
                    var o = new_table[(x + (starting_row + hex_height)) - 1][w];
                    if(o != ' ' && o != '/' && o != '!' && o != '_' && o != '¯')
                    {
                        new_table[(x + (starting_row + hex_height)) - 1][w] = bs;
                    }
                }
            }
        }
        
        var include_epics = true;
        var epics_to_include = 0;
        var included_epics = 0;
        
        var add_epics = function()
        {
            var temp_epic = get_random_item(ascii_epics);
            var x = get_random_int(new_table.length - temp_epic.length);
            var y = get_random_int(new_table[0].length - temp_epic[0].length);
            var epic_width = 24;
            var epic_height = 12;
            for(r = 0; r < new_table.length; r++)
            {
                for(c = 0; c < new_table[r].length; c++)
                {
                    if(r >= x && c >= y)
                    {
                        var rs = false;
                        var bs = false;
                        var got_rs_grass = true;
                        var got_bs_grass = true;
                        var got_rs_river = true;
                        var got_bs_river = true;
                        var got_rs_ocean = true;
                        var got_bs_ocean = true;

                        for(w = 0; w < epic_width; w++)
                        {
                            if(
                                typeof new_table[r] == 'object'
                                && typeof new_table[r][c + w] != 'undefined'
                                && new_table[r][c + w] == '.'
                            ){
                                //rs = table[r][c + w];
                            }
                            else
                            {
                                got_rs_grass = false;
                            }
                            if(
                                typeof new_table[r] == 'object'
                                && typeof new_table[r][c + w] != 'undefined'
                                && new_table[r][c + w] == ';'
                            ){
                                //rs = table[r][c + w];
                            }
                            else
                            {
                                got_rs_ocean = false;
                            }
                            if(
                                typeof new_table[r] == 'object'
                                && typeof new_table[r][c + w] != 'undefined'
                                && new_table[r][c + w] == '~'
                            ){
                                //rs = table[r][c + w];
                            }
                            else
                            {
                                got_rs_river = false;
                            }
                        }

                        for(h = 0; h < epic_height; h++)
                        {
                            if(
                                typeof new_table[r + h] == 'object'
                                && typeof new_table[r + h][c] != 'undefined'
                                && new_table[r + h][c] == '.'
                            ){
                                //bs = table[r + h][c];
                            }
                            else
                            {
                                got_bs_grass = false;
                            }
                            if(
                                typeof new_table[r + h] == 'object'
                                && typeof new_table[r + h][c] != 'undefined'
                                && new_table[r + h][c] == ';'
                            ){
                                //bs = table[r + h][c];
                            }
                            else
                            {
                                got_bs_ocean = false;
                            }
                            if(
                                typeof new_table[r + h] == 'object'
                                && typeof new_table[r + h][c] != 'undefined'
                                && new_table[r + h][c] == '~'
                            ){
                                //bs = table[r + h][c];
                            }
                            else
                            {
                                got_bs_river = false;
                            }
                        }
                        if(
                            (
                                (
                                    got_rs_grass && got_bs_grass
                                )
                                ||
                                (
                                    got_rs_river && got_bs_river
                                )   
                                ||
                                (
                                    got_rs_ocean && got_bs_ocean
                                )
                            )
                            &&
                            included_epics < epics_to_include
                        )
                        {
                            included_epics++;
                            var epic = get_random_item(ascii_epics);
                            var starting_r = r + parseInt((epic_height / 2) - (epic.length / 2));
                            var starting_c = c + parseInt((epic_width / 2) - (epic[0].length / 2));
                            for(er = 0; er < epic.length; er++)
                            {
                                for(ec = 0; ec < epic[er].length; ec++)
                                {
                                    var x = epic[er][ec];
                                    if(
                                        typeof new_table[starting_r + er] == 'object'
                                        && typeof new_table[starting_r + er][starting_c + ec] != 'undefined'
                                        &&
                                        (
                                            (new_table[starting_r + er][starting_c + ec] == '.' && got_rs_grass)
                                            || (new_table[starting_r + er][starting_c + ec] == ';' && got_rs_ocean)
                                            || (new_table[starting_r + er][starting_c + ec] == '~' && got_rs_river)
                                        )
                                    ){
                                        if(x != ' ')
                                        {
                                            new_table[starting_r + er][starting_c + ec] = x;
                                        }
                                    }
                                }
                            }

                            if(
                                (r + (epic.length * 1)) < new_table.length)
                            {
                                r = r + (epic.length);
                            }
                            if(
                                typeof new_table[r] == 'object'
                                &&
                                ((c + (epic[0].length * 1)) < new_table[r].length)
                            )
                            {
                                c = c + (epic[0].length);
                            }
                        }
                    }
                }
            }
        }
        
        var city1_symbol = 'X';
        var city2_symbol = 'Y';
        if(city_row2 < city_row1)
        {
            city1_symbol = 'Y';
            city2_symbol = 'X';
        }
        
        var cities_count = [
            2, 2, 3, 2, 2, 3, 4
        ];
        var city_count = get_random_item(cities_count);
        
        epics_to_include = 4 - city_count;
        
        var is_in_ocean = false;
        
        var place_building = function(city_row, city_col, cs)
        {
        //if(city_row && city_col)
        //{

            var pad = (table_height / 2) - city_row;
            
            if((city_row + 1) >= (table_height / 2))
            {
                pad = (0 - (table_height / 2)) + city_row;
            }
            
            new_table[city_row][city_col + (pad - 1)] = '[';
            new_table[city_row][city_col + pad] = 'O';
            new_table[city_row][city_col + (pad + 1)] = cs;
            new_table[city_row][city_col + (pad + 2)] = 'O';
            new_table[city_row][city_col + (pad + 3)] = ']';
            
            new_table[city_row - 1][city_col + (pad - 1)] = '/';
            new_table[city_row - 1][city_col + pad] = '/';
            new_table[city_row - 1][city_col + (pad + 1)] = '=';
            new_table[city_row - 1][city_col + (pad + 2)] = '!';
            new_table[city_row - 1][city_col + (pad + 3)] = '!';
            
            new_table[city_row + 1][city_col + (pad - 1)] = '.';
            new_table[city_row + 1][city_col + pad] = '.';
            new_table[city_row + 1][city_col + (pad + 1)] = '.';
            new_table[city_row + 1][city_col + (pad + 2)] = '.';
            new_table[city_row + 1][city_col + (pad + 3)] = '.';
            
            var straights = [
                4, 6, 8, 10, 12
            ];
            var dturns = [
                'left', 'right', 'straight', 'fork'
            ];
            var uturns = [
                'left', 'right', 'straight', 'fork'
            ];
            
            var straight = get_random_item(straights);
            var dcounter = 0;
            var ucounter = 0;
            var sand_height = 4;
            var island = false;
            var got_sand = false;
            
            var max_sand_height = 4 + get_random_int(8);
            
            var filt = function(r2, c2, s2)
            {
                if(
                    typeof new_table[r2] == 'object'
                    && typeof new_table[r2][c2] != 'undefined'
                    && new_table[r2][c2] != '\\'
                    && new_table[r2][c2] != '/'
                    && new_table[r2][c2] != '!'
                    && new_table[r2][c2] != ' '
                    && new_table[r2][c2] != '_'
                    && new_table[r2][c2] != '¯'
                    && new_table[r2][c2] != ']'
                    && new_table[r2][c2] != '['
                    && new_table[r2][c2] != 'O'
                    && new_table[r2][c2] != 'X'
                    && new_table[r2][c2] != 'Y'
                ){
                    new_table[r2][c2] = s2;
                }
            }
            
            var spawn_sand = function(r, c, island)
            {
                got_sand = true;
                var hit_ground = false;
                for(s = 0; s < sand_height; s++)
                {
                    if(
                        (
                            new_table[r - (s + 0)][c-5] != '~'
                            && new_table[r - (s + 0)][c-5] != ';'
                            && new_table[r - (s + 0)][c-5] != '/'
                            && new_table[r - (s + 0)][c-5] != '!'
                            && new_table[r - (s + 0)][c-5] != ' '
                        )
                        ||
                        (
                            new_table[r - (s + 0)][c+5] != '~'
                            && new_table[r - (s + 0)][c+5] != ';'
                            && new_table[r - (s + 0)][c+5] != '/'
                            && new_table[r - (s + 0)][c+5] != '!'
                            && new_table[r - (s + 0)][c+5] != ' '
                        )
                    ){
                        hit_ground = true;
                        
                        if((s + 1) == sand_height)
                        {
                            filt((r - s), (c - 4), '.');
                            filt((r - s), (c - 3), '.');
                            filt((r - s), (c - 2), '.');
                            filt((r - s), (c - 1), '.');
                            filt((r - s), (c - 0), '.');
                            filt((r - s), (c + 1), '.');
                            filt((r - s), (c + 2), '.');
                            filt((r - s), (c + 3), '.');
                            filt((r - s), (c + 4), '.');
                            
                            /*
                            //new_table[r - s][c-5] = '.';
                            new_table[r - s][c-4] = '.';
                            new_table[r - s][c-3] = '.';
                            new_table[r - s][c-2] = '.';
                            new_table[r - s][c-1] = '.';
                            new_table[r - s][c] = '.';
                            new_table[r - s][c+1] = '.';
                            new_table[r - s][c+2] = '.';
                            new_table[r - s][c+3] = '.';
                            new_table[r - s][c+4] = '.';
                            //new_table[r - s][c+5] = '.';
                            */
                        }
                        else if((s + 2) == sand_height)
                        {
                            filt((r - s), (c - 4), '.');
                            filt((r - s), (c - 3), '.');
                            filt((r - s), (c - 2), '.');
                            filt((r - s), (c - 1), '.');
                            filt((r - s), (c - 0), '.');
                            filt((r - s), (c + 1), '.');
                            filt((r - s), (c + 2), '.');
                            filt((r - s), (c + 3), '.');
                            filt((r - s), (c + 4), '.');
                            
                            /*
                            //new_table[r - s][c-5] = '.';
                            new_table[r - s][c-4] = '.';
                            new_table[r - s][c-3] = '.';
                            new_table[r - s][c-2] = '.';
                            new_table[r - s][c-1] = '.';
                            new_table[r - s][c] = '.';
                            new_table[r - s][c+1] = '.';
                            new_table[r - s][c+2] = '.';
                            new_table[r - s][c+3] = '.';
                            new_table[r - s][c+4] = '.';
                            //new_table[r - s][c+5] = '.';
                            */
                        }
                        else if((s + 3) == sand_height || (s + 4) == sand_height)
                        {
                            var sm2 = 'n';
                            if(hit_ground) sm2 = '.';
                            
                            filt((r - s), (c - 5), sm2);
                            filt((r - s), (c - 4), '.');
                            filt((r - s), (c - 3), '.');
                            filt((r - s), (c + 3), '.');
                            filt((r - s), (c + 4), '.');
                            filt((r - s), (c + 5), sm2);
                            
                            /*
                            new_table[r - s][c-5] = 'n';
                            new_table[r - s][c-4] = '.';
                            new_table[r - s][c-3] = '.';
                            new_table[r - s][c+3] = '.';
                            new_table[r - s][c+4] = '.';
                            new_table[r - s][c+5] = 'n';
                            */
                        }
                    }
                    else
                    {
                        if((((s + 1) < sand_height) && s > 0) || !island)
                        {
                            var sym = 'n';
                            if((s + 1) >= (sand_height / 2))
                            {
                                sym = 'u';
                            }
                            
                            filt((r - s), (c - 5), sym);
                            filt((r - s), (c + 5), sym);
                            
                            /*
                            new_table[r - s][c-5] = sym;
                            new_table[r - s][c+5] = sym;
                            */
                        }
                    
                        // Tops
                        if((s + 1) == sand_height)
                        {
                            filt((r - s), (c - 4), 'n');
                            filt((r - s), (c - 3), 'n');
                            filt((r - s), (c - 2), 'n');
                            filt((r - s), (c - 1), 'n');
                            
                            //new_table[r - s][c-4] = 'n';
                            //new_table[r - s][c-3] = 'n';
                            //new_table[r - s][c-2] = 'n';
                            //new_table[r - s][c-1] = 'n';
                            
                            if(island)
                            {
                                filt((r - s), (c - 0), 'n');
                                //new_table[r - s][c] = 'n';
                            }
                            else 
                            {
                                filt((r - s), (c - 0), '┼');
                                //new_table[r - s][c] = '┼';
                            }
                            
                            filt((r - s), (c + 1), 'u');
                            filt((r - s), (c + 2), 'u');
                            filt((r - s), (c + 3), 'u');
                            filt((r - s), (c + 4), 'u');
                            
                            //new_table[r - s][c+1] = 'u';
                            //new_table[r - s][c+2] = 'u';
                            //new_table[r - s][c+3] = 'u';
                            //new_table[r - s][c+4] = 'u';
                        }
                        else if((s + 2) == sand_height)
                        {
                            filt((r - s), (c - 4), '.');
                            filt((r - s), (c - 3), '.');
                            filt((r - s), (c - 2), '.');
                            filt((r - s), (c - 1), '.');
                            filt((r - s), (c - 0), '.');
                            filt((r - s), (c + 1), '.');
                            filt((r - s), (c + 2), '.');
                            filt((r - s), (c + 3), '.');
                            filt((r - s), (c + 4), '.');
                            
                            /*
                            new_table[r - s][c-4] = '.';
                            new_table[r - s][c-3] = '.';
                            new_table[r - s][c-2] = '.';
                            new_table[r - s][c-1] = '.';
                            new_table[r - s][c] = '.';
                            new_table[r - s][c+1] = '.';
                            new_table[r - s][c+2] = '.';
                            new_table[r - s][c+3] = '.';
                            new_table[r - s][c+4] = '.';
                            */
                        }
                        else if((s + 3) == sand_height || (s + 4) == sand_height)
                        {
                            filt((r - s), (c - 4), '.');
                            filt((r - s), (c - 3), '.');
                            
                            filt((r - s), (c + 3), '.');
                            filt((r - s), (c + 4), '.');
                            
                            /*
                            new_table[r - s][c-4] = '.';
                            new_table[r - s][c-3] = '.';
                            new_table[r - s][c+3] = '.';
                            new_table[r - s][c+4] = '.';
                            */
                        }
                        
                    }
                }
            }
            
            var spawn_ground = function(r, c, last_one = false, island = false)
            {
                sand_height++;
                var s = '.';
                if(island) s = 'u';
                
                filt((r + 1), (c - 4), s);
                filt((r + 1), (c - 3), s);
                filt((r + 1), (c - 2), s);
                filt((r + 1), (c - 1), s);
                
                if(island)
                {
                    filt((r + 1), (c + 0), '┼');
                }
                else
                {
                    filt((r + 1), (c + 0), s);
                }
                
                filt((r + 1), (c + 1), s);
                filt((r + 1), (c + 2), s);
                filt((r + 1), (c + 3), s);
                filt((r + 1), (c + 4), s);
                
                /*
                
                new_table[r + 1][c-4] = s;
                new_table[r + 1][c-3] = s;
                new_table[r + 1][c-2] = s;
                new_table[r + 1][c-1] = s;
                
                if(island) new_table[r + 1][c] = '┼';
                else new_table[r + 1][c] = s;
                
                new_table[r + 1][c+1] = s;
                new_table[r + 1][c+2] = s;
                new_table[r + 1][c+3] = s;
                new_table[r + 1][c+4] = s;
                
                */
                
                if(!last_one)
                {
                    spawn_path((r + 1), c, 'water');
                }
                else
                {
                    /*
                    new_table[r + 2][c-4] = s;
                    new_table[r + 2][c-3] = s;
                    new_table[r + 2][c-2] = s;
                    new_table[r + 2][c-1] = s;
                    new_table[r + 2][c-0] = s;
                    new_table[r + 2][c+1] = s;
                    new_table[r + 2][c+2] = s;
                    new_table[r + 2][c+3] = s;
                    new_table[r + 2][c+4] = s;
                    */
                    
                    spawn_sand((r + 1), c, island);
                }
            }
            
            var dturn = get_random_item(dturns);
            var uturn = get_random_item(uturns);
            
            var form_mountain = function(r, c)
            {
                var got_left_space = true;
                var got_right_space = true;
                var mount_heights = [0, 0, 0, 1];
                var mount_widths = [
                    0, 1, 0, 1, 0, 1, 0, 2, 0, 0, 0, 1, 0, 2, 0, 1, 2, 4, 0, 0, 0, 1, 0, 4, 2, 0, 0, 1, 0, 1, 0, 1, 2, 0, 1, 2, 2, 0
                ];
                var left_mount_width = get_random_item(mount_widths) * 4;
                var right_mount_width = get_random_item(mount_widths) * 4;
                var left_mount_height = get_random_item(mount_heights);
                var right_mount_height = get_random_item(mount_heights);
                
                var mount_types = [
                    'base', 'peak', 'peak', 'peak', 'base'
                ];
                
                for(h = 0; h < left_mount_height; h++)
                {
                    for(m = 0; m < (left_mount_width + 1); m++)
                    {
                        if(
                            new_table[r + h][c - (1 + m)] != '.'
                            && new_table[r + h][c - (1 + m)] != '~'
                            && new_table[r + h][c - (1 + m)] != ';'

                            && new_table[r + h][c - (2 + m)] != '.'
                            && new_table[r + h][c - (2 + m)] != '~'
                            && new_table[r + h][c - (2 + m)] != ';'

                        ){
                            got_left_space = false;
                        }
                    }
                }
                for(h = 0; h < right_mount_height; h++)
                {
                    for(m = 0; m < (right_mount_width + 1); m++)
                    {           
                        if(
                            new_table[r + h][c + (1 + m)] != '.'
                            && new_table[r + h][c + (1 + m)] != '~'
                            && new_table[r + h][c + (1 + m)] != ';'

                            && new_table[r + h][c + (2 + m)] != '.'
                            && new_table[r + h][c + (2 + m)] != '~'
                            && new_table[r + h][c + (2 + m)] != ';'
                        ){
                            got_right_space = false;
                        }
                    }
                }
                if(got_left_space)
                {
                    var mount_type = get_random_item(mount_types);
                    for(m = 0; m < left_mount_width; m++)
                    {
                        for(h = 0; h < left_mount_height; h++)
                        {
                            var sym = ' ';
                            if(mount_type == 'base')
                            {
                                sym = '!';
                            }
                            if(m > 0)
                            {
                                if(m % 2)
                                {
                                    sym = '!';
                                }
                                else
                                {
                                    sym = '/';
                                }
                            }
                            if((m +1) == left_mount_width)
                            {
                                sym = ' ';
                                if(mount_type == 'base')
                                {
                                    sym = '/';
                                }
                            }
                            filt((r + h), (c - (1 + m)), sym);
                            
                            if(
                                m > 0
                                && (m + 1) < left_mount_width
                            ){
                                plant_tree(r, (c - (1 + m)));
                            }
                            //new_table[r + h][c - (1 + m)] = sym;
                        }
                    }
                }
                if(got_right_space)
                {
                    var mount_type = get_random_item(mount_types);
                    for(m = 0; m < right_mount_width; m++)
                    {
                        for(h = 0; h < right_mount_height; h++)
                        {
                            var sym = ' ';
                            if(mount_type == 'base')
                            {
                                sym = '/';
                            }
                            if(m > 0)
                            {
                                if(m % 2)
                                {
                                    sym = '/';
                                }
                                else
                                {
                                    sym = '!';
                                }
                            }
                            if((m +1) == right_mount_width)
                            {
                                sym = ' ';
                                if(mount_type == 'base')
                                {
                                    sym = '!';
                                }
                            }
                            filt((r + h), (c + (1 + m)), sym);
                            //new_table[r + h][c + (1 + m)] = sym;
                            
                            if(
                                m > 0
                                && (m + 1) < right_mount_width
                            ){
                                plant_tree(r, (c + (1 + m)));
                            }
                        }
                    }
                }
            }
            
            var plant_tree = function(r, c)
            {
                var trees = [
                    0, 1, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 2, 0, 1, 0, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1
                ];
                var tree = get_random_item(trees);
                
                var plant_top = false;
                var plant_bottom = false;
                
                for(t = 0; t < tree; t++)
                {
                    if(
                        typeof new_table[r - (1 + t)] == 'object'
                        && typeof new_table[r - (2 + t)] == 'object'
                        && new_table[r - (1 + t)][c] == '.'
                        && new_table[r - (2 + t)][c] == '.'
                    ){
                        plant_top = true;
                    }
                    else if(
                        typeof new_table[r + (1 + t)] == 'object'
                        && typeof new_table[r + (2 + t)] == 'object'
                        && new_table[r + (1 + t)][c] == '.'
                        && new_table[r + (2 + t)][c] == '.'
                    ){
                        plant_bottom = true;
                    }
                }
                
                if(plant_top)
                {
                    filt((r - (tree + 1)), c, 'o');
                    //new_table[r - (tree + 1)][c] = 'o';
                    for(t = 0; t < tree; t++)
                    {
                        filt((r - (t + 1)), c, '|');
                        //new_table[r - (t + 1)][c] = '|';
                    }
                }
                if(plant_bottom)
                {
                    filt((r + 1), c, 'o');
                    //new_table[r + 1][c] = 'o';
                    for(t = 0; t < tree; t++)
                    {
                        filt((r + (t + 2)), c, '|');
                        //new_table[r + (t + 2)][c] = '|';
                    }
                }
            }
            
            var spawn_road = function(r, c, last_one = false, direction = 'down', sand = 0)
            {
                var this_row = r + 1;
                var this_row2 = r + 2;
                if(direction == 'up')
                {
                    this_row = r - 1;
                    this_row2 = r - 2;
                }
                if(direction == 'left' || direction == 'right')
                {
                    this_row = r;
                    this_row2 = r;
                    if(direction == 'left')
                    {
                        c--;
                    }
                    else
                    {
                        c++;
                    }
                }
                if(
                    typeof new_table[this_row] == 'object'
                    && typeof new_table[this_row][c] != 'undefined'
                )
                {
                    if(direction == 'down') dcounter++;
                    if(direction == 'up') ucounter++;
                    var saved_straight = JSON.parse(JSON.stringify((straight + sand)));
                    straight = straight + sand;
                    if(direction == 'left' || direction == 'right')
                    {
                        straight = 0;
                    }
                    if(
                        (
                            direction == 'down'
                            && dcounter == straight
                        )
                        ||
                        (
                            direction == 'up'
                            && ucounter == straight
                        )
                        ||
                        (
                            direction == 'left'
                            || direction == 'right'
                        )
                    )
                    {
                        if(direction == 'down' || direction == 'left')
                        {
                            dcounter = 0;
                            dturn = get_random_item(dturns);
                        }
                        if(direction == 'up' || direction == 'right')
                        {
                            ucounter = 0;
                            uturn = get_random_item(uturns);
                        }
                        if(direction == 'left' || direction == 'right')
                        {
                            straight = saved_straight;
                        }
                        if(dturn == 'right' || uturn == 'right')
                        {
                            if(direction == 'down')
                            {
                                delete dturns[0];
                                dturn = 'straight';
                            }
                            if(direction == 'up')
                            {
                                delete uturns[0];
                                uturn = 'straight';
                            }
                            
                            if(direction == 'right')
                            {
                                direction = 'up';
                            }
                            else if(direction == 'left')
                            {
                                direction = 'down';
                            }
                            
                            var y = 0;
                            new_table[this_row][c] = 'i';
                            for(x = 0; x < (straight * 3); x++)
                            {
                                var s = '%';
                                var a = new_table[this_row][c + x];
                                if(x == 0) s = 'i';
                                //if(a != '\\' && a != '!' && a != '/' && a != ' ')
                                if(
                                    a == '.' 
                                    || a == 'u' 
                                    || a == 'n'
                                )
                                {
                                    y++;
                                    new_table[this_row][c + x] = s;
                                    plant_tree(this_row, (c + x));
                                }
                                else
                                {
                                    last_one = true;
                                    x = (straight * 3);
                                }
                            }
                            for(x = 0; x < y; x++)
                            {
                                c++;
                            }
                        }
                        else if(dturn == 'left' || uturn == 'left')
                        {
                            if(direction == 'down')
                            {
                                delete dturns[1];
                                dturn = 'straight';
                            }
                            if(direction == 'up')
                            {
                                delete uturns[1];
                                uturn = 'straight';
                            }
                            
                            if(direction == 'right')
                            {
                                direction = 'up';
                            }
                            else if(direction == 'left')
                            {
                                direction = 'down';
                            }
                            
                            var y = 0;
                            new_table[this_row][c] = 'i';
                            for(x = 0; x < (straight * 3); x++)
                            {
                                var a = new_table[this_row][c - (x + 1)];
                                var s = '%';
                                //if(a != '\\' && a != '!' && a != '/' && a != ' ')
                                if(
                                    a == '.' 
                                    || a == 'u' 
                                    || a == 'n' 
                                )
                                {
                                    y++;
                                    new_table[this_row][c - (x + 1)] = s;
                                    plant_tree(this_row, (c - (x+1)));
                                }
                                else
                                {
                                    last_one = true;
                                    x = (straight * 3);
                                }
                            }
                            for(x = 0; x < y; x++)
                            {
                                c--;
                            }
                        }
                        else if(dturn == 'fork' || uturn == 'fork')
                        {
                            if(direction == 'down')
                            {
                                dturns.pop();
                                dturn = 'straight';
                            }
                            if(direction == 'up')
                            {
                                uturns.pop();
                                uturn = 'straight';
                            }
                            
                            if(direction == 'right')
                            {
                                direction = 'up';
                            }
                            else if(direction == 'left')
                            {
                                direction = 'down';
                            }
                            
                            var y = 0;
                            new_table[this_row][c] = 'i';
                            for(x = 0; x < (straight * 3); x++)
                            {
                                var a = new_table[this_row][c - (x + 1)];
                                var s = '%';
                                //if(a != '\\' && a != '!' && a != '/' && a != ' ')
                                if(
                                    a == '.' 
                                    || a == 'u' 
                                    || a == 'n' 
                                )
                                {
                                    y++;
                                    new_table[this_row][c - (x + 1)] = s;
                                    plant_tree(this_row, (c - (x+1)));
                                }
                                else
                                {
                                    last_one = true;
                                    x = (straight * 3);
                                }
                            }
                            
                            new_table[this_row][c] = 'i';
                            for(x = 0; x < (straight * 3); x++)
                            {
                                var s = '%';
                                var a = new_table[this_row][c + x];
                                if(x == 0) s = 'i';
                                //if(a != '\\' && a != '!' && a != '/' && a != ' ')
                                if(
                                    a == '.' 
                                    || a == 'u' 
                                    || a == 'n'
                                )
                                {
                                    y++;
                                    new_table[this_row][c + x] = s;
                                    plant_tree(this_row, (c + x));
                                }
                                else
                                {
                                    last_one = true;
                                    x = (straight * 3);
                                }
                            }
                            
                            var second_choices = [
                                'left', 'right'
                            ];
                            var second_choice = get_random_item(second_choices);
                            
                            if(second_choice == 'left')
                            {
                                for(x = 0; x < y; x++)
                                {
                                    c--;
                                }
                            }
                            else
                            {
                                for(x = 0; x < y; x++)
                                {
                                    c++;
                                }
                            }
                        }
                        straight = get_random_item(straights);
                    }
                    if(
                        new_table[this_row][c] == '.' 
                        || new_table[this_row][c] == 'u' 
                        || new_table[this_row][c] == 'n'
                    )
                    {
                        new_table[this_row][c] = 'i';
                        if(direction == 'down')
                        {
                            form_mountain((this_row + 1), c);
                        }
                        else
                        {
                            form_mountain((this_row - 1), c);
                        }
                    }
                    if(!last_one)
                    {
                        spawn_path(this_row, c, 'ground', direction);
                    }
                    else
                    {
                        if(
                            new_table[this_row2][c] == '.' 
                            || new_table[this_row2][c] == 'u' 
                            || new_table[this_row2][c] == 'n'
                        )
                        {
                            new_table[this_row2][c] = 'i';
                        }
                    }
                }
            }
            var spawn_path = function(r, c, place = false, direction = false)
            {
                //var turn = get_random_item(turns);
                
                var last_one = false;
                var is_in_water = false;
                var passed = false;
                
                var this_row = r + 1;
                var this_row2 = r + 2;
                if(direction == 'up')
                {
                    this_row = r - 1;
                    this_row2 = r - 2;
                }
                
                try
                {
                    // Should do column by column ?
                    // That will make it smoother when on an edge ...
                    if(
                        new_table[this_row2][c] == ';'
                        && new_table[this_row2][c - 3] == ';'
                        && new_table[this_row2][c - 2] == ';'
                        && new_table[this_row2][c - 1] == ';'
                        && new_table[this_row2][c + 1] == ';'
                        && new_table[this_row2][c + 2] == ';'
                    ){
                        is_in_ocean = true;
                    }
                    if(
                        (new_table[this_row2][c] == '~' || new_table[this_row2][c] == ';' || new_table[this_row2][c] == 'n' || new_table[this_row2][c] == 'u')
                        && (new_table[this_row2][c - 3] == '~' || new_table[this_row2][c - 3] == ';' || new_table[this_row2][c - 3] == 'n' || new_table[this_row2][c - 3] == 'u')
                        && (new_table[this_row2][c - 2] == '~' || new_table[this_row2][c - 2] == ';' || new_table[this_row2][c - 2] == 'n' || new_table[this_row2][c - 2] == 'u')
                        && (new_table[this_row2][c - 1] == '~' || new_table[this_row2][c - 1] == ';' || new_table[this_row2][c - 1] == 'n' || new_table[this_row2][c - 1] == 'u')
                        && (new_table[this_row2][c + 1] == '~' || new_table[this_row2][c + 1] == ';' || new_table[this_row2][c + 1] == 'n' || new_table[this_row2][c + 1] == 'u')
                        && (new_table[this_row2][c + 2] == '~' || new_table[this_row2][c + 2] == ';' || new_table[this_row2][c + 2] == 'n' || new_table[this_row2][c + 2] == 'u')
                        && (new_table[this_row2][c + 3] == '~' || new_table[this_row2][c + 3] == ';' || new_table[this_row2][c + 3] == 'n' || new_table[this_row2][c + 3] == 'u')
                    )
                    {
                        is_in_water = true;
                        
                        if(
                            !place 
                            ||
                            (
                                place
                                && place == 'water'
                            )
                        ){
                            passed = true;
                        }
                    }
                    else
                    {
                        if(
                            place
                            && place == 'water'
                            &&
                            (new_table[this_row][c] == '~' || new_table[this_row][c] == 'n' || new_table[this_row][c] == 'u'|| new_table[this_row][c] == ';')
                            && (new_table[this_row][c - 5] == '~' || new_table[this_row][c - 5] == 'n' || new_table[this_row][c - 5] == 'u' || new_table[this_row][c - 5] == ';')
                            && (new_table[this_row][c - 4] == '~' || new_table[this_row][c - 4] == 'n' || new_table[this_row][c - 4] == 'u' || new_table[this_row][c - 4] == ';')
                            && (new_table[this_row][c - 3] == '~' || new_table[this_row][c - 3] == 'n' || new_table[this_row][c - 3] == 'u' || new_table[this_row][c - 3] == ';')
                            && (new_table[this_row][c - 2] == '~' || new_table[this_row][c - 2] == 'n' || new_table[this_row][c - 2] == 'u' || new_table[this_row][c - 2] == ';')
                            && (new_table[this_row][c - 1] == '~' || new_table[this_row][c - 1] == 'n' || new_table[this_row][c - 1] == 'u' || new_table[this_row][c - 1] == ';')
                            && (new_table[this_row][c + 1] == '~' || new_table[this_row][c + 1] == 'n' || new_table[this_row][c + 1] == 'u' || new_table[this_row][c + 1] == ';')
                            && (new_table[this_row][c + 2] == '~' || new_table[this_row][c + 2] == 'n' || new_table[this_row][c + 2] == 'u' || new_table[this_row][c + 2] == ';')
                            && (new_table[this_row][c + 3] == '~' || new_table[this_row][c + 3] == 'n' || new_table[this_row][c + 3] == 'u' || new_table[this_row][c + 3] == ';')
                            && (new_table[this_row][c + 4] == '~' || new_table[this_row][c + 4] == 'n' || new_table[this_row][c + 4] == 'u' || new_table[this_row][c + 4] == ';')
                            && (new_table[this_row][c + 5] == '~' || new_table[this_row][c + 5] == 'n' || new_table[this_row][c + 5] == 'u' || new_table[this_row][c + 5] == ';')
                        ){
                            is_in_water = true;
                            passed = true;
                            last_one = true;
                        }
                        else if(place && place == 'water')
                        {
                            spawn_ground(this_row - 1, c, true, true, direction);
                        }
                        else if(
                            new_table[this_row][c] == '.' 
                            || new_table[this_row][c] == 'u' 
                            || new_table[this_row][c] == 'n'
                        )
                        {
                            is_in_water = false;
                            
                            if(
                                !place 
                                ||
                                (
                                    place
                                    && place == 'ground'
                                )
                            ){
                                passed = true;
                            }
                        }
                    }
                }
                catch(err)
                {
                    if(
                        (new_table[this_row][c] == ';')
                        && (new_table[this_row][c - 3] == ';')
                        && (new_table[this_row][c - 2] == ';')
                        && (new_table[this_row][c - 1] == ';')
                        && (new_table[this_row][c + 1] == ';')
                        && (new_table[this_row][c + 2] == ';')
                    ){
                        is_in_ocean = true;
                    }
                    if(
                        place
                        && place == 'water'
                        &&
                        (new_table[this_row][c] == '~' || new_table[this_row][c] == 'n' || new_table[this_row][c] == 'u' || new_table[this_row][c] == ';')
                        && (new_table[this_row][c - 5] == '~' || new_table[this_row][c - 5] == 'n' || new_table[this_row][c - 5] == 'u' || new_table[this_row][c - 5] == ';')
                        && (new_table[this_row][c - 4] == '~' || new_table[this_row][c - 4] == 'n' || new_table[this_row][c - 4] == 'u' || new_table[this_row][c - 4] == ';')
                        && (new_table[this_row][c - 3] == '~' || new_table[this_row][c - 3] == 'n' || new_table[this_row][c - 3] == 'u' || new_table[this_row][c - 3] == ';')
                        && (new_table[this_row][c - 2] == '~' || new_table[this_row][c - 2] == 'n' || new_table[this_row][c - 2] == 'u' || new_table[this_row][c - 2] == ';')
                        && (new_table[this_row][c - 1] == '~' || new_table[this_row][c - 1] == 'n' || new_table[this_row][c - 1] == 'u' || new_table[this_row][c - 1] == ';')
                        && (new_table[this_row][c + 1] == '~' || new_table[this_row][c + 1] == 'n' || new_table[this_row][c + 1] == 'u' || new_table[this_row][c + 1] == ';')
                        && (new_table[this_row][c + 2] == '~' || new_table[this_row][c + 2] == 'n' || new_table[this_row][c + 2] == 'u' || new_table[this_row][c + 2] == ';')
                        && (new_table[this_row][c + 3] == '~' || new_table[this_row][c + 3] == 'n' || new_table[this_row][c + 3] == 'u' || new_table[this_row][c + 3] == ';')  
                        && (new_table[this_row][c + 4] == '~' || new_table[this_row][c + 4] == 'n' || new_table[this_row][c + 4] == 'u' || new_table[this_row][c + 4] == ';')  
                        && (new_table[this_row][c + 5] == '~' || new_table[this_row][c + 5] == 'n' || new_table[this_row][c + 5] == 'u' || new_table[this_row][c + 5] == ';')  
                    ){
                        passed = true;
                        last_one = true;
                    }
                    else if(place && place == 'water')
                    {
                        spawn_ground(this_row - 1, c, true, true, direction);
                    }
                    else if(
                        new_table[this_row][c] == '.' 
                        || new_table[this_row][c] == 'u' 
                        || new_table[this_row][c] == 'n'
                    )
                    {
                        is_in_water = false;

                        if(
                            !place 
                            ||
                            (
                                place
                                && place == 'ground'
                            )
                        ){
                            passed = true;
                        }
                    }
                }
                
                if(passed && is_in_water)
                {
                    if((is_in_ocean && sand_height == 5) || sand_height > max_sand_height)
                    {
                        island = true;
                        last_one = true;
                    }
                    spawn_ground(r, c, last_one, island, direction);
                    if(!place) 
                    {
                        spawn_road(r, c - 2, last_one, 'left');
                        spawn_road(r, c, last_one, direction);
                        spawn_road(r, c + 2, last_one, 'right');
                    }
                }
                else if(passed)
                {
                    if(!place) spawn_road(r, c - 2, last_one, 'left');
                    if(!direction)
                    {
                        spawn_road((r - 1), c, last_one, 'up');
                        spawn_road(r, c, last_one, 'down', sand_height);
                    }
                    else
                    {
                        spawn_road(r, c, last_one, direction);
                    }
                    if(!place) spawn_road(r, c + 2, last_one, 'right');
                }
            }
            
            spawn_path(city_row, (city_col + (pad + 1)));
        }
        
        if(include_epics === true)
        {
            add_epics();
        }
        
        place_building(city_row1, city_col1, city1_symbol);
        place_building(city_row2, city_col2, city2_symbol);
        
        if(!is_in_ocean)
        {
            if(city_count > 3)
            {
                place_building(city_row4, city_col4, '?');
            }
            if(city_count > 2)
            {
                place_building(city_row3, city_col3, '?');
            }
        }
        
        all_central_hexes.push({
            plot: plot,
            table: new_table
        });
        return new_table;
    }
    else
    {
        return table;
    }
}

var generate_closeup = function(plot, name, size, row, col, row2, col2, row3, col3, row4, col4)
{
    var hex = generate_hex(size, plot.biome.top, plot.biome.bottom);
    var hex_table = array_to_table(hex);
    var this_tile = terrain_to_hex(plot.terrain);
    var base = add_central_hex(hex_table, this_tile, row, col, row2, col2, row3, col3, row4, col4, plot);
    var new_hex = table_to_array(base);
    return new_hex;
}

var get_visible_hexes = function(data, map)
{
    var array = [];
    var labels = [];
    var label_length = data[0][0].label.length;
    for(r = 0; r < map.length; r++)
    {
        for(c = 0; c < map[r].length; c++)
        {
            var s = map[r][c];
            if(s == 'R' && c < (map[r].length - label_length))
            {
                var label = '';
                for(l = 0; l < label_length; l++)
                {
                    label+= map[r][c + l];
                }
                labels.push(label);
            }
        }
    }
    for(row = 0; row < data.length; row++)
    {
        for(col = 0; col < data[row].length; col++)
        {
            var hex = data[row][col];
            for(lab = 0; lab < labels.length; lab++)
            {
                if(hex.label == labels[lab])
                {
                    if(typeof array[row] != 'object') array.push([]);
                    if(typeof array[row][col] != 'object') array[row].push(hex);
                }
            }
        }
    }
    return array;
}

var get_plot_name = function(plot)
{
    var name = '';
    var type = 'WILDERNESS';
    if(plot.biome.buildings == 10 && plot.biome.beaches == 27)
    {
        type = 'BRIDGE'
    }
    else if(plot.biome.unknown > 10 && plot.biome.rivers != 38 && plot.biome.rivers != 48)
    {
        type = 'CHASM';
        if(plot.biome.plains < 1)
        {
            type = 'OCEANIC ' + type;
        }
    }
    else if(plot.biome.top == '~' && plot.biome.bottom == '~')
    {
        type = 'OCEAN';
        if(plot.biome.beaches < 1 && plot.biome.plains > 1)
        {
            type = 'RIVER';
        }
        else if(plot.biome.plains > 10 && plot.biome.plains < 20)
        {
            type = 'GULF';
        }
        else if((plot.biome.rivers == 12 && plot.biome.oceans == 108) || (plot.biome.rivers == 6 && plot.biome.oceans == 114))
        {
            type = 'PERILOUS ' + type;
        }
        else if(plot.biome.oceans >= 100 && (plot.biome.rivers == 4 && plot.biome.mountains == 6) || (plot.biome.rivers == 8 && plot.biome.mountains == 12))
        {
            type = type + ' PINNACLES';
        }
    }
    else if((plot.biome.top == '~' && plot.biome.bottom == '.') || (plot.biome.top == '.' && plot.biome.bottom == '~'))
    {
        type = 'BAY';
        if(plot.biome.beaches < 1)
        {
            type = 'RIVER';
        }
        else if(plot.biome.rivers > 60)
        {
            type = 'BEACH';
        }
        if(plot.biome.top == '~' && plot.biome.beaches > 0)
        {
            type = 'SOUTH ' + type;
        }
        else if(plot.biome.beaches > 0 && plot.biome.top != plot.biome.bottom)
        {
            type = 'NORTH ' + type;
        }
    }
    else
    {
        if(plot.biome.rivers > 20)
        {
            type = 'COAST';
        }
        if(plot.biome.top == '~' && plot.biome.beaches > 0)
        {
            type = 'SOUTHERN ' + type;
        }
        else if(plot.biome.beaches > 0 && plot.biome.top != plot.biome.bottom)
        {
            type = 'NORTHERN ' + type;
        }
    }
    if(plot.biome.oceans == 120 || plot.biome.plains == 120)
    {
        type = 'VAST ' + type;
    }
    if(plot.biome.mountains > 20)
    {
        type = 'MOUNTANOUS ' + type;
    }
    else if(plot.biome.mountains >= 2)
    {
        if(
            (
                plot.biome.mountains > 1
                && plot.biome.mountains == plot.biome.rivers
            )
            || 
            (
                plot.biome.oceans > 100
                && plot.biome.rivers + plot.biome.mountains > 13
            )
        ){
            type = 'CRAGGY ' + type;
        }
        else if(type != 'OCEAN' && type != 'RIVER' && type != 'OCEAN PINNACLES')
        {
            type = 'HILLY ' + type;
        }
    }
    if(plot.biome.forests > 20)
    {
        type = 'FOREST ' + type;
    }
    else if(plot.biome.forests >= 6)
    {
        if(type == 'COAST') type = 'COASTAL';
        type = type + ' WOODLAND';
    }
    if(plot.biome.buildings > 25)
    {
        type = type + ' CITY';
    }
    else if(plot.biome.buildings > 4)
    {
        if(type == 'HILLY WILDERNESS')
        {
            type = 'HILL';
        }
        if(type == 'BRIDGE WOODLAND')
        {
            type = 'BRIDGE';
        }
        type = type + ' TOWN';
        if(plot.biome.snow == 2 && plot.biome.plains < 1)
        {
            type = 'LIGHTHOUSE'
        }
    }
    else if(plot.biome.buildings > 3)
    {
        if(type == 'HILLY WILDERNESS')
        {
            type = 'HILLY';
        }
        if(type == 'HILLY WILDERNESS WOODLAND')
        {
            type = 'HILLY WOODLAND';
        }
        type = type + ' SETTLEMENT';
    }
    if(plot.biome.enemies > 10)
    {
        type = 'GUARDED ' + type;
    };
    if(plot.biome.mystery > 1)
    {
        type = 'MYSTERIOUS ' + type;
    }
    if(type == 'WILDERNESS WOODLAND')
    {
        type = 'WILD WOODLAND';
    }
    if(type == 'MOUNTANOUS CHASM WOODLAND')
    {
        type = 'MOUNTAINOUS WOODLAND CHASM';
    }
    if(type == 'HILLY WILDERNESS WOODLAND')
    {
        type = 'HILLY WOODS';
    }
    if(type == 'FOREST WILDERNESS')
    {
        type = 'DENSE FORESTS';
    }
    if(type == 'COAST')
    {
        var coasts = ['GOLDEN COAST', 'COASTAL DUNES', 'SEASIDE CLIFFS'];
        var type = get_random_item(coasts);
    }
    if(type == 'GULF')
    {
        var coasts = ['GOLDEN GULF', 'BEACHES', 'CANAL'];
        var type = get_random_item(coasts);
    }
    if(type == 'NORTH BAY' || type == 'SOUTH BAY' || type == 'NORTH BEACH' || type == 'SOUTH BEACH' || type == 'RIVER CITY' || type == 'BEACHES' || type == 'CANAL' || type == 'BRIDGE TOWN' || type == 'LIGHTHOUSE' || type == 'VAST WILDERNESS' || type == 'VAST OCEANS' || type == 'RIVER WOODLAND TOWN' || type == 'HILLY WOODLAND SETTLEMENT' || type == 'HILLY SETTLEMENT' || type == 'DENSE FORESTS')
    {
        var bays = ['', 'PROTECTED ', 'INFAMOUS ', 'OVERGROWN ', 'UNKNOWN ', 'LESS KNOWN ', 'PRISTINE ', 'UNTOUCHED ', '', 'HAUNTED ', 'WAR TORN ', 'WELL KNOWN ', 'HIDDEN ', 'ANCIENT ', 'NEWLY DISCOVERED ', 'UNDISCOVERED ', 'MYSTERIOUS ', 'GUARDED '];
        var bay = get_random_item(bays);
        var type = bay + type;
    }
    name+= 'PLOT #' + plot.label + ' - ' + type;
    return name;
}

var get_construction = function(array)
{
    var types = [];
    for(row = 0; row < array.length; row++)
    {
        for(col = 0; col < array[row].length; col++)
        {   
            var got_type = 0;
            for(t = 0; t < types.length; t++)
            {
                if(types[t].v == array[row][col]) got_type = t;
            }
            if(types.length < 1 || !got_type)
            {
                types.push({
                    v: array[row][col],
                    c: 1
                });
            }
            else
            {
                types[got_type].c++;
            }
        }
    }
    var breakdown = {
        vowels: [],
        consta: [],
        snow: 0,
    };
    for(t = 0; t < types.length; t++)
    {
        var v = types[t].v;
        var c = types[t].c;
        if(v == '*')
        {
            breakdown.snow = c;
        }
        else if(v == 'A' || v == 'E' || v == 'I' || v == 'O' || v == 'U' || v == 'Y')
        {
            breakdown.vowels.push(v);
        }
        else if(v == 'B' || v == 'C' || v == 'D' || v == 'F' || v == 'G' || v == 'H' || v == 'J' || v == 'K' || v == 'L' || v == 'M' || v == 'N' || v == 'P' || v == 'Q' || v == 'R' || v == 'S' || v == 'T' || v == 'V' || v == 'W' || v == 'X' || v == 'Y' || v == 'Z')
        {
            breakdown.consta.push(v);
        }
    }
    breakdown.name = get_random_name(breakdown.vowels, breakdown.consta);
    return breakdown;
}

var get_place_name = function(city)
{
    var choices = [
        'tn', 'nt', 'nv', 'ns', 'ni', 'tn'
    ]
    var choice = get_random_item(choices);
    var construction = get_construction(city);
    var temp_name = JSON.parse(JSON.stringify(construction.name));
    var last_letter = temp_name[construction.name.length - 1];
    var vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
    var is_vowel = false;
    for(v = 0; v < vowels; v++)
    {
        if(vowels[v] == last_letter) is_vowel = true;
    }
    
    var towns = [
        'CITY', 'CITADEL', 'TOWN', 'LANDS',
    ]
    var type = get_random_item(towns);
    if(construction.snow > 10)
    {
        var peaks = [
            'PEAKS', 'RANGE', 'HIGHLANDS', 'MOUNTAINS'
        ]
        type = get_random_item(peaks);
    }
    if(choice == 'tn')
    {
        return 'THE ' + type + ' OF ' + construction.name;
    }
    else if(choice == 'nt')
    {
        return construction.name + ' ' + type;
    }
    else if(choice == 'nv')
    {
        var end = 'ILLE';
        if(is_vowel) end = 'VILLE';
        return construction.name + end;
    }
    else if(choice == 'ns')
    {
        var end = 'IRE';
        if(is_vowel) end = 'SHIRE';
        return construction.name + end;
    }
    else if(choice == 'ni')
    {
        var end = 'INGTON';
        if(is_vowel) end = 'TON';
        return construction.name + end;
    }
    else
    {
        return name;
    }
}

var generate_label = function(word, width)
{
    var label = [];
    if(word.length < width)
    {
        var p1 = Math.floor((width - word.length)/2);
        var p2 = Math.ceil((width - word.length)/2);
        var pad1 = repeat(' ', p1);
        var pad2 = repeat(' ', p2);
        var line = pad1 + word + pad2;
        var underline = pad1 + repeat('¯', word.length) + pad2;
        label.push(line);
        label.push(underline);
    }
    return label;
}

var generate_landscape = function(size, name)
{
    var types = [
        'grass', 'towns', 'grass'
    ];
    
    if(name.indexOf('OCEAN') > -1)
    {
        types[0] = 'water';
        types[1] = 'water';
        types[2] = 'water';
    }
    else if(name.indexOf('BRIDGE') > -1 || name.indexOf('RIVER') > -1)
    {
        types[0] = 'water';
    }
        
    if(name.indexOf('HILLY') > -1)
    {
        types[0] = 'hills';
        types[2] = 'hills';
    }
    if(name.indexOf('MOUNTANOUS') > -1 || name.indexOf('CRAGGY') > -1 || name.indexOf('MOUNTAINOUS') > -1)
    {
        if(name.indexOf('CRAGGY') > -1 || name.indexOf('OCEAN') > -1)
        {
            types[1] = 'mountains';
        }
        else
        {
            types[0] = 'mountains';
            types[2] = 'mountains';
        }
    }
    if(name.indexOf('GUARDED') > -1 || name.indexOf('ANCIENT') > -1)
    {
        types[1] = 'beasts';
    }
    
    // BUILDINGS
    if(name.indexOf('LIGHTHOUSE') > -1)
    {
        types[0] = 'water';
        types[1] = 'towns';
        types[2] = 'water';
    }
    else if(name.indexOf('SETTLEMENT') > -1)
    {
        types[1] = 'towns';
    }
    else if(name.indexOf('TOWN') > -1 || name.indexOf('CITY') > -1)
    {
        types[1] = 'towns';
        types[2] = 'towns';
    }
    
    var land1 = get_random_item(ascii_landscapes[types[0]]);
    var land2 = get_random_item(ascii_landscapes[types[1]]);
    var land3 = get_random_item(ascii_landscapes[types[2]]);
    
    var this_landscape = combine_arrays(land1, land2, ' ', 0);
    var landscape = combine_arrays(this_landscape, land3, ' ', 0);
    return landscape;
}

var remap_hexes = function(hexes)
{
    var new_hexes = [];
    for(h = 0; h < hexes.length; h++)
    {
        var plot = JSON.parse(JSON.stringify(hexes[h].plot));
        var table = JSON.parse(JSON.stringify(hexes[h].table));
        table.shift();
        var new_label = table.shift();
        table.pop();
        var footer_table = table.pop();
        
        var new_title = '';
        for(nl = 0; nl < new_label.length; nl++)
        {
            var pad = (new_label.length / 4);
            if(nl >= pad && nl < (new_label.length - pad))
            {
                new_title+= new_label[nl];
            }
        }
        
        var footer = '';
        for(nl = 0; nl < footer_table.length; nl++)
        {
            var pad = (footer_table.length / 4);
            if(nl >= pad && nl < (footer_table.length - pad))
            {
                footer+= footer_table[nl];
            }
        }
        
        var hex = table_to_array(table);
        
        var new_hex = [];
        var hex_height = table.length;
        var hex_width = table[0].length;
        var hex_size = (hex_height / 2);
        
        for(r = 0; r < hex_height; r++)
        {
            var line = '';
            var pad = hex_size - (r + 1);
            if((r - 0) >= (hex_height / 2))
            {
                pad = (0 - hex_size) + r;
            }
            for(c = 0; c < hex_width; c++)
            {
                if(c > pad && c < ((hex_width + 2) - pad))
                {
                    line+= table[r][c];
                }
            }
            new_hex.push(line);
        }
        new_hex.push(0);
        new_hexes.push({
            label: plot.label,
            new_label: new_title,
            terrain: new_hex,
            footer: footer
        });
    }
    return new_hexes;
}

var merge_horizontally = function(table, r, c)
{
    var s = table[r][c];
    var ls = '';
    var rs = '';
    if(typeof table[r][(c - 1)] != 'undefined')
    {
        ls = table[r][(c - 1)];
    }
    if(typeof table[r][(c + 1)] != 'undefined')
    {
        rs = table[r][(c + 1)];
    }
    if(ls == rs)
    {
        s = ls;
    }
    else if(
        (
            ls == '.' && rs == '~'
        )
        ||
        (
            ls == '.' && rs == ';'
        )
        ||
        (
            ls == ';' && rs == '.'
        )
        ||
        (
            ls == '~' && rs == '.'
        )
    )
    {
        s = 'u';
    }
    else if(ls || rs)
    {
        if(ls && ls != ' ') s = ls;
        else if(rs != ' ') s = rs;
    }
    return s;
}

var merge_vertically = function(table, r, c)
{
    var new_table = table;
    var s = new_table[r + 1][c];
    var ts = '';
    var bs = '';
    if(typeof table[r + 1][c] != 'undefined')
    {
        bs = table[r + 1][c];
    }
    if(typeof table[r - 1][c] != 'undefined')
    {
        ts = table[r - 1][c];
    }
    if(ts == bs && ts != 'F' && ts != '' && ts && bs != 'F' && bs != '')
    {
        s = ts;
    }
    else if(
        (
            ts == '.' && bs == '~'
        )
        ||
        (
            ts == '.' && bs == ';'
        )
        ||
        (
            ts == '~' && bs == '.'
        )
        ||
        (
            ts == ';' && bs == '.'
        )
    ){
        s = 'n';
    }
    if(s == 'F')
    {
        if(new_table[r + 2][c] != s)
        {
            s = new_table[r + 2][c];
        }
        else
        {
            s = new_table[r][c + 1]
        }
    }
    return s;
}

var merge_mega_map = function(map)
{
    var table = array_to_table(map);
    for(r = 0; r < table.length; r++)
    {
        for(c = 0; c < table[r].length; c++)
        {
            var s = table[r][c];
            var variance = get_random_int(3);
            var directions = ['left', 'right'];
            var direction = get_random_item(directions);
            
            if(s == 'F')
            {
                s = merge_vertically(table, r, c);
                table[r][c] = s;
                /*
                for(v = 0; v < variance; v++)
                {
                    if(direction == 'left')
                    {
                        if(table[r - v][c] != ' ')
                        {
                            table[r - v][c] = s;
                        }
                    }
                    else
                    {
                        if(table[r + v][c] != ' ')
                        {
                            table[r + v][c] = s;
                        }
                    }
                }
                */
            }
            if(s == 'L' || s == 'R')
            {
                if(s == 'L') direction = 'right';
                else direction = 'left';
                s = merge_horizontally(table, r, c);
                table[r][c] = s;
                for(v = 0; v < variance; v++)
                {
                    if(direction == 'left' && table[r][c - v] != ' ')
                    {
                        table[r][c - v] = s;
                    }
                    else if(table[r][c + v] != ' ')
                    {
                        table[r][c + v] = s;
                    }
                }
            }
            else
            {
                table[r][c] = s;
            }
        }
    }
    var merged_map = table_to_array(table);
    return merged_map;
}

jQuery('.asciipeople').each(function(i)
{
    var pre = jQuery(this);
    var blocks = parseInt(jQuery(this).attr('data-blocks'));
    var padding = parseInt(jQuery(this).attr('data-padding'));
    var names = parseInt(jQuery(this).attr('data-name'));
    var stats = parseInt(jQuery(this).attr('data-stats'));
    var frame = parseInt(jQuery(this).attr('data-frame'));
    var format = jQuery(this).attr('data-format');
    var colours = jQuery(this).attr('data-colours');
    
    if(location.search.indexOf('?') > -1)
    {
        var params = {};
        var p = location.search.split('?')[1].split('&');
        for(p2 = 0; p2 < p.length; p2++)
        {
            var obj = p[p2].split('=');
            params[obj[0]] = obj[1];
        }
        if(typeof params.blocks != 'undefined')
        {
            blocks = parseInt(params.blocks);
        }
        if(typeof params.names != 'undefined')
        {
            names = parseInt(params.names);
        }
        if(typeof params.stats != 'undefined')
        {
            stats = parseInt(params.stats);
        }
        if(typeof params.frame != 'undefined')
        {
            frame = parseInt(params.frame);
        }
    }
    var people = get_random_people(blocks, padding, names, stats);
    var group = people;
    if(frame)
    {
        group = frame_array(people);
    }
    color_wrapper(group, format, function(results)
    {
        jQuery(pre).html(results);
    }, colours);
});

jQuery('.asciilandscape').each(function(i)
{
    var pre = jQuery(this);
    var name = jQuery(this).attr('data-name');
    var blocks = parseInt(jQuery(this).attr('data-blocks'));
    var format = jQuery(this).attr('data-format');
    var colours = jQuery(this).attr('data-colours');
    
    if(location.search.indexOf('?') > -1)
    {
        var params = {};
        var p = location.search.split('?')[1].split('&');
        for(p2 = 0; p2 < p.length; p2++)
        {
            var obj = p[p2].split('=');
            params[obj[0]] = obj[1];
        }
        if(typeof params.blocks != 'undefined')
        {
            blocks = parseInt(params.blocks);
        }
    }
    
    color_wrapper(get_random_landscape(blocks), format, function(results)
    {
        jQuery(pre).html(results);
    }, colours);
});

jQuery('.asciimap').each(function(i)
{
    var pre = jQuery(this);
    var name = jQuery(this).attr('data-name');
    var format = jQuery(this).attr('data-format');
    var rings = parseInt(jQuery(this).attr('data-rings'));
    var size = parseInt(jQuery(this).attr('data-size'));
    var closeup_size = parseInt(jQuery(this).attr('data-closeup'));
    var landscape_size = parseInt(jQuery(this).attr('data-landscapes'));
    var trim = parseInt(jQuery(this).attr('data-trim'));
    var show_progress = parseInt(jQuery(this).attr('data-show'));
    var framed = false;
    
    if(parseInt(jQuery(this).attr('data-frame')))
    {
        framed = true;
    }
    
    if(location.search.indexOf('?') > -1)
    {
        var params = {};
        var p = location.search.split('?')[1].split('&');
        for(p2 = 0; p2 < p.length; p2++)
        {
            var obj = p[p2].split('=');
            params[obj[0]] = obj[1];
        }
        if(typeof params.rings != 'undefined')
        {
            rings = parseInt(params.rings);
        }
        if(typeof params.trim != 'undefined')
        {
            trim = parseInt(params.trim);
        }
    }
    
    var rows = (rings * 2) + 1;
    
    // Test procedurally generated terrains ...
    generate_versions(size - 1);
    
    var cut_the_corners = true;
    if(trim) cut_the_corners = false;
    
    if(rings % 2 == 0)
    {
        
    }
    else
    {
        rows++;
    }
    
    var cols = Math.ceil((rows / 2));
    
    var r = parseInt(rows);
    var c = parseInt(cols);
    if(r < 1) r = 1;
    if(c < 1) c = 1;
    
    var res = generate_hex_array(size, rings, rows, cols, cut_the_corners);
    
    var hex_map = res[0];
    var hex_data = res[1];
    
    var textured_map = [];
    for(m = 0; m < hex_map.length; m++)
    {
        for(x = 0; x < hex_map[m][0].length; x++)
        {
            var line = '';
            for(b = 0; b < hex_map[m].length; b++)
            {
                line+= hex_map[m][b][x];
            }
            textured_map.push(line);
        }
        
    }
    
    var the_map = remove_corners(textured_map, rings, size, cut_the_corners);
    var map_title = generate_label(name, the_map[0].length);
    var this_map = continue_arrays(map_title, the_map);
    
    if(closeup_size > size)
    {
        var these_closeups = [];

        var visible_hexes = get_visible_hexes(hex_data, this_map);
        var closeup_width = 0;

        for(th = 0; th < visible_hexes.length; th++)    
        {
            for(j = 0; j < visible_hexes[th].length; j++)    
            {
                var inner_plot = JSON.parse(JSON.stringify(visible_hexes[th][j]));

                var closeup_height = (closeup_size * 2);
                var closeup_width = (closeup_height * 2);
                var hex_width = (inner_plot.label.length * 2);

                var city_sides = [
                    'left', 'right'
                ];
                var city_places = [
                    'top', 'bottom'
                ];
                var city_place = get_random_item(city_places);
                var city_place2 = 'top';
                if(city_place == 'top') city_place2 = 'bottom';

                var city_side = get_random_item(city_sides);
                var city_side2 = 'left';
                if(city_side == 'left') city_side2 = 'right';

                var base_width = (closeup_height - 2) / 2;

                var city_row = get_random_int((closeup_height / 2) - 12) + 6;
                var city_row2 = get_random_int((closeup_height / 2) - 12) + 6;

                var city_row3 = get_random_int((closeup_height / 2) - 12) + 6;
                var city_row4 = get_random_int((closeup_height / 2) - 12) + 6;

                if(city_place == 'bottom')
                {
                    city_row = city_row + (closeup_height / 2);
                    city_row3 = city_row3 + (closeup_height / 2);
                }
                if(city_place2 == 'bottom')
                {
                    city_row2 = city_row2 + (closeup_height / 2);
                    city_row4 = city_row4 + (closeup_height / 2);
                }

                var w = (base_width * 2) + (city_row * 2);
                if(city_row >= (closeup_height / 2))
                {
                    w = (base_width * 2) + ((closeup_height * 2) - ((city_row - 1) * 2));
                }

                var w2 = (base_width * 2) + (city_row2 * 2);
                if(city_row2 >= (closeup_height / 2))
                {
                    w2 = (base_width * 2) + ((closeup_height * 2) - ((city_row2 - 1) * 2));
                }

                var w3 = (base_width * 2) + (city_row3 * 2);
                if(city_row3 >= (closeup_height / 2))
                {
                    w3 = (base_width * 2) + ((closeup_height * 2) - ((city_row3 - 1) * 2));
                }

                var w4 = (base_width * 2) + (city_row4 * 2);
                if(city_row4 >= (closeup_height / 2))
                {
                    w4 = (base_width * 2) + ((closeup_height * 2) - ((city_row4 - 1) * 2));
                }

                var max_width = (w - hex_width) / 2;
                var max_width2 = (w2 - hex_width) / 2;
                var max_width3 = (w3 - hex_width) / 2;
                var max_width4 = (w4 - hex_width) / 2;

                var n = max_width - 12;
                var n2 = max_width2 - 12;
                var n3 = max_width3 - 12;
                var n4 = max_width4 - 12;

                var v = get_random_int(n) + 6;
                var v2 = get_random_int(n2) + 6;
                var v3 = get_random_int(n3) + 6;
                var v4 = get_random_int(n4) + 6;

                var city_col = v + 6;
                var city_col2 = v2 + 6;
                var city_col3 = v3 + 6;
                var city_col4 = v4 + 6;

                if(city_side == 'right')
                {
                    city_col = w - v;
                    city_col4 = w4 - v4;
                }
                if(city_side2 == 'right')
                {
                    city_col2 = w2 - v2;
                    city_col3 = w3 - v3;
                }

                var labelled_col = (city_col + 1);
                var labelled_col2 = (city_col2 + 1);

                if((city_row + 1) >= (closeup_height / 2))
                {
                    labelled_col = city_col;
                }
                if((city_row2 + 1) >= (closeup_height / 2))
                {
                    labelled_col2 = city_col2;
                }

                var closeup = generate_closeup(inner_plot, 'Test', closeup_size, (city_row - 0), (city_col - 0), city_row2, city_col2, city_row3, city_col3, city_row4, city_col4);
                
                if(show_progress)
                {
                    
                    closeup_width = (closeup[0].length) + 4;

                    var plot_name = get_plot_name(inner_plot);
                    var plot_title = generate_label(plot_name, closeup[0].length);

                    var this_plot = continue_arrays(plot_title, closeup);

                    var capital = generate_landscape(landscape_size, plot_name);
                    var capital2 = generate_landscape(landscape_size, plot_name);

                    var padding = 9;
                    var people = get_random_people(landscape_size, 23, false);
                    var people2 = get_random_people(landscape_size, 23, true);
                    var padded_array = [];
                    for(p = 0; p < people.length; p++)
                    {
                        padded_array.push(repeat(' ', padding));
                    }
                    var padded_people = combine_arrays(padded_array, people);
                    var padded_people2 = combine_arrays(padded_array, people2);
                    var this_city = continue_arrays(capital, padded_people);
                    var this_city2 = continue_arrays(capital2, padded_people2);

                    var place_name = get_place_name(this_city) + ' - LOCATION: R'+city_row+'C'+labelled_col + ' [OXO]';
                    var place_name2 = get_place_name(this_city2) + ' - LOCATION: R'+city_row2+'C'+labelled_col2 + ' [OYO]';
                    
                    if(city_place == 'bottom')
                    {
                        place_name2 = get_place_name(this_city) + ' - LOCATION: R'+city_row+'C'+labelled_col + ' [OYO]';
                        place_name = get_place_name(this_city2) + ' - LOCATION: R'+city_row2+'C'+labelled_col2 + ' [OXO]';
                    }

                    var place_title = generate_label(place_name, this_city[0].length);
                    var place_title2 = generate_label(place_name2, this_city2[0].length);
                    var cityscape1 = continue_arrays(place_title, capital);
                    var cityscape2 = continue_arrays(place_title2, capital2);
                    var cityscape = continue_arrays(cityscape1, cityscape2, ' ', 7);

                    var this_closeup = combine_arrays(this_plot, cityscape, ' ', 8);

                    color_wrapper(this_closeup, format, function(coloured_plot)
                    {
                        jQuery('#ascii-closeups').append('<pre>' + coloured_plot + '</pre>');
                    },
                    ascii_closeup_colours, closeup_width, 'bright', 3, framed);
                    
                }
            }
        }

        top_gap = 0;
        bottom_gap = 0;
        bottomr_gap = 0;
        row_count = 0;
        brow_count = -1;
        bra_count = -1;

        var mega_hexes = remap_hexes(all_central_hexes);

        var mega_size = parseInt((mega_hexes[0].terrain.length + 2) / 2);
        var mega_res = generate_hex_array(mega_size, rings, rows, cols, cut_the_corners, mega_hexes);

        var mega_hex_map = mega_res[0];
        var mega_hex_data = mega_res[1];

        var mega_textured_map = [];
        for(m = 0; m < mega_hex_map.length; m++)
        {
            for(x = 0; x < mega_hex_map[m][0].length; x++)
            {
                var line = '';
                for(b = 0; b < mega_hex_map[m].length; b++)
                {
                    line+= mega_hex_map[m][b][x];
                }
                mega_textured_map.push(line);
            }

        }

        var mega_map = remove_corners(mega_textured_map, rings, mega_size, cut_the_corners, false);
        
        var pre_merged_map = merge_mega_map(mega_map);
        var frozen_map = JSON.parse(JSON.stringify(pre_merged_map));
        
        var frozen_table = array_to_table(frozen_map);
        var epic_mega = add_mega_epics(frozen_table);
        var unfrozen_map = table_to_array(epic_mega);
        
        //var merged_map = merge_mega_map(unfrozen_map);
        var merged_map = merge_mega_map(frozen_map);
        
        var mega_map_title = generate_label(name, merged_map[0].length);
        var this_mega_map = continue_arrays(mega_map_title, merged_map);

        color_wrapper(this_mega_map, format, function(mega_ascii)
        {
            jQuery('#ascii-closeups').append('<pre class="mega">' + mega_ascii + '</pre>');
        }, false, false, 'bright', 3, framed);
    }
    
    if(show_progress)
    {
        color_wrapper(this_map, format, function(ascii)
        {
            jQuery(pre).html(ascii);
        }, false, false, 'bright', 3, framed);
    }
});