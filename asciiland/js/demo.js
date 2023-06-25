var ascii_land = 
{
    convert:
    {
        arrayToTable: function(array)
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
        },
        tableToArray: function(table)
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
    },
    frame: function(array, padding = 1)
    {
        var w = array[0].length + (padding * 2);
        var frame = [
            ' ╔' + ascii_land.pattern.repeat('═', w + 2) + '╗ '
        ];
        for(p = 0; p < padding; p++)
        {
            frame.push(
                ' ║ ' + ascii_land.pattern.repeat(' ', w) + ' ║ '
            );
        }
        console.log('array', array);
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
                ' ║ ' + ascii_land.pattern.repeat(' ', w) + ' ║ '
            );
        }
        frame.push(
            ' ╚' + ascii_land.pattern.repeat('═', w + 2) + '╝ '
        );
        return frame;
    },
    hex:
    {
        build: function(size = 1, top_tex = '#', bottom_tex = '#')
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
                    line+= ascii_land.pattern.repeat(' ', size);
                    line+= ascii_land.pattern.repeat('_', (size) * 2);
                    line+= ascii_land.pattern.repeat(' ', size);
                }
                else if((h + 1) == height)
                {
                    line+= ascii_land.pattern.repeat(' ', bottom_pad);
                    line+= '!';
                    line+= ascii_land.pattern.repeat(bottom_tex, (size) * 2);
                    line+= '/';
                    line+= ascii_land.pattern.repeat(' ', bottom_pad);
                }
                else if(h < Math.ceil(height / 2))
                {
                    line+= ascii_land.pattern.repeat(' ', top_pad);
                    line+= '/';
                    line+= ascii_land.pattern.repeat(top_tex, (size) * 2);
                    line+= ascii_land.pattern.repeat(top_tex, top_fill);
                    line+= '!';
                    line+= ascii_land.pattern.repeat(' ', top_pad);
                }
                else
                {
                    line+= ascii_land.pattern.repeat(' ', bottom_pad);
                    line+= '!';
                    line+= ascii_land.pattern.repeat(bottom_tex, (size) * 2);
                    line+= ascii_land.pattern.repeat(bottom_tex, bottom_fill);
                    line+= '/';
                    line+= ascii_land.pattern.repeat(' ', bottom_pad);
                }
                hex_array.push(line);
            }
            var bottom = ascii_land.pattern.repeat(' ', size);
            bottom+= ascii_land.pattern.repeat('¯', (size * 2));
            bottom+= ascii_land.pattern.repeat(' ', size);
            hex_array.push(bottom);
            return hex_array;
        },
        biome: function(land)
        {
            var biome = 
            {
                RURAL: 0,
                URBAN: 0,
                FLORA: 0,
                WATER: 0,
                COAST: 0,
                ROADS: 0,
                MINES: 0,
                CAVERNS: 0,
                HIGHLANDS: 0,
                MOUNTAINS: 0,
                SNOW: 0
            };
            for(r = 0; r < land.length; r++)
            {
                for(c = 0; c < land[0].length; c++)
                {
                    var t = land[r][c];
                    var tb = land[r][c];
                    
                    if((r + 1) < land.length) tb = land[r + 1][c];
                    
                    // Functionalize by adding to a setup var ???
                    
                    if(t == '.')
                    {
                        biome.RURAL++;
                    }
                    else if(t == '~' || t == ';')
                    {
                        biome.WATER++;
                    }
                    else if(t == 'n' || t == 'u')
                    {
                        biome.COAST++;
                    }
                    else if(t == 'I' || t == '[' || t == ']' || t == '=')
                    {
                        biome.URBAN++;
                    }
                    else if(t == '%')
                    {
                        biome.ROADS++;
                    }
                    else if(t == '|' || t == 'o' || t == '(' || t == ')' || t == '-')
                    {
                        biome.FLORA++;
                    }
                    else if(t == '^')
                    {
                        biome.HIGHLANDS++;
                    }
                    else if(t == '7' || t == 'A')
                    {
                        biome.MOUNTAINS++;
                    }
                    else if(t == '*')
                    {
                        biome.SNOW++;
                    }
                    else if(t == '+' || t == '@')
                    {
                        biome.MINES++;
                    }
                    else if(t == '{' || t == '}')
                    {
                        biome.CAVERNS++;
                    }
                }
            }
            if(biome.unknown > 0)
            {
                console.log('UNKNOWN FOUND');
            }
            return biome;
        },
        locations: function(land)
        {
            var locations = 
            {
                PEAKS: 0,
                PORTS: 0,
                FORESTS: 0,
                ALLIES: 0,
                ENEMIES: 0,
                BRIDGES: 0,
                DUNGEONS: 0,
                STRONGHOLDS: 0,
            };
            for(r = 0; r < land.length; r++)
            {
                for(c = 0; c < land[0].length; c++)
                {
                    var t = land[r][c];
                    var tb = land[r][c];
                    var tr = land[r][c];
                    
                    if((r + 1) < land.length) tb = land[r + 1][c];
                    if((c + 1) < land[0].length) tr = land[r][c + 1];
                    
                    if(t == 'o' && tb == '|')
                    {
                        locations.FORESTS++;
                    }
                    else if(t == '+' && tb == ')')
                    {
                        locations.ENEMIES++;
                    }
                    else if(
                        (t == 'I' && tb == '~')
                        ||
                        (t == '~' && tb == 'I')
                        ||
                        (t == 'I' && tr == '~')
                        ||
                        (t == '~' && tr == 'I')
                    )
                    {
                        locations.PORTS++;
                    }
                    
                    if(t == '[' && tr == ']')
                    {
                        locations.STRONGHOLDS++;
                    }
                    else if(t == '|' && tr == '^')
                    {
                        locations.ALLIES++;
                    }
                    else if(t == '7' && tr == '^')
                    {
                        locations.DUNGEONS++;
                    }
                    else if(t == '7' && tr == 'A')
                    {
                        locations.PEAKS++;
                    }
                    else if(t == '|' && tr == '=')
                    {
                        locations.BRIDGES++;
                    }
                }
            }
            return locations;
        },
        attributes: function(biome)
        {
            var attributes = 
            {
                LAND_MASS: '0%',
                WILDERNESS: '0%',
                DEVELOPMENT: '0%',
                URBANIZATION: '0%',
                COMMERCIALIZATION: '0%',
                RESIDENT_CAPACITY: '0%',
                INFLUENCE: '0%',
            };
            
            var not_water = (biome.RURAL + biome.COAST + biome.URBAN + biome.ROADS + biome.FLORA + biome.HIGHLANDS + biome.MOUNTAINS + biome.MINES + biome.SNOW + biome.CAVERNS);
            var city_stuff = not_water - (biome.RURAL);
            var terra_total = not_water + biome.WATER;
            var terra_percent = parseInt((not_water / terra_total) * 100);
            var wild_percent = parseInt((biome.RURAL / not_water) * 100);
            var urban_percent = parseInt(((biome.URBAN + biome.ROADS + biome.HIGHLANDS) / city_stuff) * 100);
            var commerce_percent = parseInt(((biome.MOUNTAINS + biome.FLORA + biome.MINES + biome.CAVERNS) / city_stuff) * 100);
            var pop_percent = parseInt((urban_percent / city_stuff) * 100);
            var wealth_percent = parseInt((commerce_percent / city_stuff) * 100);
            
            attributes.LAND_MASS = terra_percent + '%';
            attributes.WILDERNESS = wild_percent + '%';
            attributes.DEVELOPMENT = (100 - wild_percent) + '%';
            attributes.URBANIZATION = urban_percent + '%';
            attributes.COMMERCIALIZATION = commerce_percent + '%';
            attributes.RESIDENT_CAPACITY = pop_percent + '%';
            attributes.INFLUENCE = wealth_percent + '%';
            
            return attributes;
        },
        card: function(land, labels = [], averages = false, locations = false)
        {
            var biome_label = 'BIOME';
            var attribute_label = 'ATTRIBUTES';
            var average_label = 'AVERAGES';
            var location_label = 'LOCATIONS';
            if(typeof labels[0] != 'undefined') biome_label = labels[0];
            if(typeof labels[1] != 'undefined') attribute_label = labels[1];
            if(typeof labels[2] != 'undefined') average_label = labels[2];
            if(typeof labels[3] != 'undefined') location_label = labels[3];
            
            var biome = ascii_land.hex.biome(land);
            console.log('biome', biome);
            var poi = ascii_land.hex.locations(land);
            console.log('poi', poi);
            var biomes = ascii_land.table.stats(biome, 20, 6, biome_label);
            console.log('biomes', biomes);
            var pois = ascii_land.table.stats(poi, 20, 6, location_label);
            console.log('pois', pois);
            var attribute = ascii_land.hex.attributes(biome);
            console.log('attribute', attribute);
            var attributes = ascii_land.table.stats(attribute, 20, 6, attribute_label);
            var average_attributes = ascii_land.table.stats(averages, 20, 6, average_label);
            console.log('attributes', attributes);
            var stats = ascii_land.table.continue(
                ascii_land.convert.tableToArray(biomes), 
                ascii_land.convert.tableToArray(attributes)
            );
            var list = ascii_land.convert.tableToArray(stats);
            var lands = ascii_land.convert.tableToArray(land);
            if(typeof averages == 'object')
            {
                lists = ascii_land.table.continue(stats, ascii_land.convert.tableToArray(average_attributes));
                list = ascii_land.convert.tableToArray(lists);
            }
            if(locations)
            {
                lists = ascii_land.table.continue(list, ascii_land.convert.tableToArray(pois));
                list = ascii_land.convert.tableToArray(lists);
            }
            var map = ascii_land.table.combine(lands, list);
            var frame = ascii_land.frame(map, 2);
            return frame;
        },
        attr: function(land)
        {   
            var biome = ascii_land.hex.biome(land);
            var biomes = ascii_land.table.stats(biome, 20, 6);
            var attribute = ascii_land.hex.attributes(biome);
            return attribute;
        },
        epic: function(terrain = false, epic = false, epic2 = false)
        {
            var y = 6;
            var x = y;
            var x2 = y;
            var land = [];
            var epic_height = epic.length;
            var epic_width = epic[0].length;
            var terrain_width = terrain[0].length;
            var terrain_height = terrain.length;
            var padding = (terrain_width / 2 - (epic_width / 2)) - epic_width;
            var padding2 = (terrain_width / 2 - (epic_width / 2)) - epic_width;
            var quarter = Math.ceil(Math.random() * 4);
            var quarter2 = Math.ceil(Math.random() * 4);
            if(quarter == 2 || quarter == 4)
            {
                padding = (terrain_width / 2) + (epic_width / 2);
            }
            if(quarter > 2)
            {
                x = (terrain_height / 2) + y;
            }
            if(quarter2 != quarter)
            {
                if(quarter2 == 2 || quarter2 == 4)
                {
                    padding2 = (terrain_width / 2) + (epic_width / 2);
                }
                if(quarter2 > 2)
                {
                    x2 = (terrain_height / 2) + y;
                }
            }
            
            // Add variance ...
            var variance1 = Math.ceil(Math.random() * 6) - 3;
            var variance2 = Math.ceil(Math.random() * 6) - 3;
            x+= variance1;
            padding+= variance2;
            x2+= variance2;
            padding2+= variance1;
            
            for(r = 0; r < terrain.length; r++)
            {
                land.push([]);
                for(c = 0; c < terrain[r].length; c++)
                {
                    var cell = terrain[r][c];
                    land[r].push(cell);
                    if(
                        (
                            cell == '.' 
                            || cell == '~'
                        )
                        &&
                        (
                            r > 0
                            && (r + 1) < terrain.length
                        )
                        &&
                        (
                            c > 0
                            && (c + 1) < terrain[r].length
                        )
                        &&
                        (
                            (
                                r == x
                                && c == padding
                            )
                            ||
                            (
                                r == x2
                                && c == padding2
                                && JSON.stringify(epic) != JSON.stringify(epic2)
                                && (quarter > 2 || quarter2 > 2)
                                && (quarter < 3 || quarter2 < 3)
                            )
                        )
                    )
                    {
                        for(eh = 0; eh < epic_height; eh++)
                        {
                            for(ew = 0; ew < epic_width; ew++)
                            {
                                if(
                                    r == x2
                                    && c == padding2
                                    && JSON.stringify(epic) != JSON.stringify(epic2)
                                    && (quarter > 2 || quarter2 > 2)
                                    && (quarter < 3 || quarter2 < 3)
                                ){
                                    var t2 = epic2[eh][ew];
                                    if(t2 == '!') t2 = 'A';
                                    if(eh == 0 && ew == 0 && t2 != ' ')
                                    {
                                        t2 = epic2[0][0];
                                        land[r][c] = t2;
                                    }
                                    if(t2 != ' ')
                                    {
                                        terrain[r + eh][c + ew] = t2;
                                    }
                                }
                                else
                                {
                                    var t = epic[eh][ew];
                                    if(eh == 0 && ew == 0 && t != ' ')
                                    {
                                        t = epic[0][0];
                                        land[r][c] = t;
                                    }
                                    if(t != ' ')
                                    {
                                        terrain[r + eh][c + ew] = t;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return land;
        },
        extend: function(table, hex)
        {
            var new_table = JSON.parse(JSON.stringify(table));
            var table_height = table.length;
            var table_width = table[0].length;
            var hex_height = hex.length;
            var hex_width = hex[0].length;
            if(table_height > (hex_height * 2) && table_width > (hex_width * 2))
            {
                var max_pad = (hex_height / 2);
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
            return new_table;
        },
        map: function(hex_size = 0, rings = 0, hexes = false, base_bg = '#', new_bg = '~')
        {
            // Useful vars
            var hex_height = (hex_size * 2) + 2;
            var hex_width = (hex_size * 4);
            var hexes_required = (rings * 6) + 1;
            var grid_width = (((rings * 2) + 1) * hex_width) - 10;
            var grid_height = ((rings * 2) + 1) * hex_height;
            var starting_point_x = (grid_height / 2) - (hex_height / 2);
            var starting_point_y = (grid_width / 2) - (hex_width / 2);
            
            starting_point_x = 2;
            
            // Build an empty grid first ...
            var grid = [];    
            for(row = 0; row < grid_height; row++)
            {
                grid.push([]);
                for(col = 0; col < grid_width; col++)
                {
                    grid[row].push(base_bg);
                }
            }
            
            var ring_count = 0;
            
            if(typeof hexes == 'object' && hexes.length >= hexes_required)
            {
                // Top central hex ...
                for(r = 0; r < hex_height; r++)
                {
                    for(c = 0; c < hex_width; c++)
                    {
                        var t = hexes[0][r][c];
                        grid[starting_point_x + r][starting_point_y + c] = t;
                    }
                }
                ring_count++;
                
                // Top left branches ...
                for(rl = 0; rl < rings; rl++)
                {
                    var x = (starting_point_x + (hex_height / 2)) - 1;
                    var y = (starting_point_y - ((hex_width / 4) * 3)) - 0;
                    for(r = 0; r < hex_height; r++)
                    {
                        for(c = 0; c < hex_width; c++)
                        {
                            var t = hexes[ring_count][r][c];
                            var g = grid[x + r][y + c];
                            if(g == base_bg || g == ' ')
                            {
                                grid[x + r][y + c] = t;
                            }
                        }
                    }
                }
                ring_count++
                
                // Top right branches ...
                for(rr = 0; rr < rings; rr++)
                {
                    var x = (starting_point_x + (hex_height / 2)) - 1;
                    var y = (starting_point_y + ((hex_width / 4) * 3)) - 0;
                    for(r = 0; r < hex_height; r++)
                    {
                        for(c = 0; c < hex_width; c++)
                        {
                            var t = hexes[ring_count][r][c];
                            var g = grid[x + r][y + c];
                            if(g == base_bg || g == ' ')
                            {
                                grid[x + r][y + c] = t;
                            }
                        }
                    }
                    ring_count++
                }
                
                // Central central hex
                var x = ((grid_height / 2) - (hex_height / 2));
                var y = (grid_width / 2) - (hex_width / 2);
                for(r = 0; r < hex_height; r++)
                {
                    for(c = 0; c < hex_width; c++)
                    {
                        var t = hexes[ring_count][r][c];
                        var g = grid[x + r][y + c];
                        if(g == base_bg || g == ' ')
                        {
                            grid[x + r][y + c] = t;
                        }
                    }
                }
                ring_count++;
                
                // Bottom central hex ...
                var x = ((grid_height - hex_height) - (rings * 4)) + 2;
                var y = (grid_width / 2) - (hex_width / 2);
                for(r = 0; r < hex_height; r++)
                {
                    for(c = 0; c < hex_width; c++)
                    {
                        var t = hexes[ring_count][r][c];
                        var g = grid[x + r][y + c];
                        if(g == base_bg || g == ' ')
                        {
                            grid[x + r][y + c] = t;
                        }
                    }
                }
                ring_count++;
                
                // Bottom left branches ...
                for(bl = 0; bl < rings; bl++)
                {
                    var x = (grid_height - (((hex_height / 2) + hex_height) + (rings * 3))) + 2;
                    var y = (starting_point_y - ((hex_width / 4) * 3));
                    for(r = 0; r < hex_height; r++)
                    {
                        for(c = 0; c < hex_width; c++)
                        {
                            var t = hexes[ring_count][r][c];
                            var g = grid[x + r][y + c];
                            if(g == base_bg || g == ' ')
                            {
                                grid[x + r][y + c] = t;
                            }
                        }
                    }
                    ring_count++
                }
                
                // Bottom right branches ...
                for(br = 0; br < rings; br++)
                {
                    var x = (grid_height - (((hex_height / 2) + hex_height) + (rings * 3))) + 2;
                    var y = (starting_point_y + ((hex_width / 4) * 3));
                    for(r = 0; r < hex_height; r++)
                    {
                        for(c = 0; c < hex_width; c++)
                        {
                            var t = hexes[ring_count][r][c];
                            var g = grid[x + r][y + c];
                            if(g == base_bg || g == ' ')
                            {
                                grid[x + r][y + c] = t;
                            }
                        }
                    }
                    ring_count++
                }
                
                // Loop new grid ...
                var merge_cells = true;
                if(merge_cells)
                {
                    for(gr = 0; gr < grid.length; gr++)
                    {
                        for(gc = 0; gc < grid[gr].length; gc++)
                        {
                            var cell = JSON.parse(JSON.stringify(grid[gr][gc]));
                            if(cell == base_bg || cell == ' ')
                            {
                                grid[gr][gc] = new_bg;
                            }
                        }
                    }
                    for(gr = 0; gr < grid.length; gr++)
                    {
                        for(gc = 0; gc < grid[gr].length; gc++)
                        {
                            var cell_above = false;
                            var cell_below = false;
                            var cell_left = false;
                            var cell_right = false;
                            var cell = JSON.parse(JSON.stringify(grid[gr][gc]));
                            var t = cell;

                            if(gr > 0)
                            {
                                cell_above = grid[gr - 1][gc];
                            }
                            else
                            {
                                cell_above = new_bg;
                            }
                            
                            if((gr + 1) < grid.length)
                            {
                                cell_below = grid[gr + 1][gc];
                            }
                            else
                            {
                                cell_below = new_bg;
                            }

                            if(gc > 0)
                            {
                                cell_left = grid[gr][gc - 1];
                            }
                            else
                            {
                                cell_left = new_bg;
                            }
                            
                            if((gc + 1) < grid[0].length)
                            {
                                cell_right = grid[gr][gc + 1];
                            }
                            else
                            {
                                cell_right = new_bg;
                            }

                            // Merge sides borders ... 
                            if(cell == '/' || cell == '!')
                            {
                                if(cell_left == cell_right)
                                {
                                    t = cell_right;
                                }
                                else if(cell_left == '~' && cell_right == '.')
                                {
                                    t = 'n';
                                }
                                else if(cell_left == '.' && cell_right == '~')
                                {
                                    t = 'u';
                                }
                                else if
                                (
                                    (cell_left == '%' && cell_right == '~')
                                    ||
                                    (cell_left == '~' && cell_right == '%')
                                    ||
                                    (cell_left == '%' && cell_right == '.')
                                    ||
                                    (cell_left == '.' && cell_right == '%')
                                )
                                {
                                    t = 'I';
                                }
                                else if
                                (
                                    (cell_left == 'n' && cell_right == '~')
                                    ||
                                    (cell_left == 'u' && cell_right == '~')
                                    ||
                                    (cell_left == '~' && cell_right == 'n')
                                    ||
                                    (cell_left == '~' && cell_right == 'u')
                                    ||
                                    (cell_left == 'u' && cell_right == 'n')
                                    ||
                                    (cell_left == 'n' && cell_right == 'u')
                                )
                                {
                                    t = '~';
                                }
                                else if
                                (
                                    (cell_left == 'n' && cell_right == '.')
                                    ||
                                    (cell_left == 'u' && cell_right == '.')
                                    ||
                                    (cell_left == '.' && cell_right == 'n')
                                    ||
                                    (cell_left == '.' && cell_right == 'u')
                                )
                                {
                                    t = '.';
                                }
                                grid[gr][gc] = t;
                            }
                            
                            cell = JSON.parse(JSON.stringify(grid[gr][gc]));

                            // Merge top borders ... 
                            if(cell == '_' || cell == '¯' || cell == '/' || cell == '!')
                            {
                                if(cell_above == cell_below)
                                {
                                    t = cell_below;
                                }
                                else if(cell_above == '~' && cell_below == '.')
                                {
                                    t = 'n';
                                }
                                else if(cell_above == '.' && cell_below == '~')
                                {
                                    t = 'u';
                                }
                                else if
                                (
                                    (cell_above == '%' && cell_below == '~')
                                    ||
                                    (cell_above == '~' && cell_below == '%')
                                    ||
                                    (cell_above == '%' && cell_below == '.')
                                    ||
                                    (cell_above == '.' && cell_below == '%')
                                )
                                {
                                    t = 'I';
                                }
                                else if
                                (
                                    (cell_above == 'n' && cell_below == '~')
                                    ||
                                    (cell_above == 'u' && cell_below == '~')
                                    ||
                                    (cell_above == '~' && cell_below == 'n')
                                    ||
                                    (cell_above == '~' && cell_below == 'u')
                                    ||
                                    (cell_above == 'u' && cell_below == 'n')
                                    ||
                                    (cell_above == 'n' && cell_below == 'u')
                                )
                                {
                                    t = '~';
                                }
                                else if
                                (
                                    (cell_above == 'n' && cell_below == '.')
                                    ||
                                    (cell_above == 'u' && cell_below == '.')
                                    ||
                                    (cell_above == '.' && cell_below == 'n')
                                    ||
                                    (cell_above == '.' && cell_below == 'u')
                                )
                                {
                                    t = '.';
                                }
                                grid[gr][gc] = t;
                            }
                            
                            cell = JSON.parse(JSON.stringify(grid[gr][gc]));
                            
                            if(cell == '_' || cell == '¯' || cell == '/' || cell == '!')
                            {
                                grid[gr][gc] = new_bg;
                            }
                        }
                    }
                }
            }
            return grid;
        },
        pad: function(slim_hex = false)
        {
            var hex = false;
            if(typeof slim_hex == 'object' && slim_hex.length > 0)
            {
                hex = [];
                var rows = slim_hex.length;
                for(r = 0; r < rows; r++)
                {
                    var this_row = '';
                    var p = ((rows / 2) - 1) - r;
                    if(r + 1 >= rows / 2)
                    {
                        p = r - (rows / 2);
                        this_row+= ascii_land.pattern.repeat(' ', p);
                        this_row+= slim_hex[r];
                        this_row+= ascii_land.pattern.repeat(' ', p);
                    }
                    else
                    {
                        this_row+= ascii_land.pattern.repeat(' ', p);
                        this_row+= slim_hex[r];
                        this_row+= ascii_land.pattern.repeat(' ', p);
                    }
                    hex.push(this_row);
                }
            }
            return hex;
        },
        random: function(hexes = false)
        {
            var hex = false;
            if(typeof hexes == 'object' && hexes.length > 0)
            {
                var index = Math.floor(Math.random() * hexes.length);
                hex = hexes[index];
            }
            return hex;
        }
    },
    init: function()
    {
        jQuery('.ascii-land').each(function()
        {
            var ascii = '';
            var pre = jQuery(this);
            var size = parseInt(jQuery(pre).attr('data-size'));
            var rings = parseInt(jQuery(pre).attr('data-rings'));
            var hexes_needed = (rings * 6) + 1;
            var all_hexes = [];
            var global_attributes = {};
            
            for(hn = 0; hn < hexes_needed; hn++)
            {
                var data = ascii_land.convert.arrayToTable(ascii_land.hex.build(size));
                var this_hex = ascii_land.hex.random(ascii_hexes);
                var hex = ascii_land.convert.arrayToTable(ascii_land.hex.pad(this_hex));
                var terrain = ascii_land.hex.extend(data, hex);
                
                // Add epic placeholders ...
                var e1 = ascii_land.hex.random(ascii_epics);
                var e2 = ascii_land.hex.random(ascii_epics);
                var epic = ascii_land.convert.arrayToTable(e1);
                var epic2 = ascii_land.convert.arrayToTable(e2);
                var land = ascii_land.hex.epic(terrain, epic, epic2);
                var card = ascii_land.hex.card(
                    land, 
                    ['REGIONAL BIOME', 'REGIONAL ATTRIBUTES', '', 'POINTS OF INTEREST'], 
                    false,
                    true
                );
                var attr = ascii_land.hex.attr(land);
                var carded = ascii_land.convert.arrayToTable(card);
                
                console.log('carded', carded);
                console.log('attr', attr);
                
                var regional_name_length = Math.floor(Math.random() * 6) + 3;
                var regional_name = ascii_word.build(regional_name_length, 'regions');
                console.log('regional_name', regional_name);
                var pad = (Math.floor((card[0].length - regional_name.length) / 2)) - 4;
                var pad2 = (Math.ceil((card[0].length - regional_name.length) / 2)) - 4;
                var arr = [];
                arr.push([]);
                for(p = 0; p < pad; p++)
                {
                    arr[0].push(' ')
                }
                for(p2 = 0; p2 < regional_name.length; p2++)
                {
                    var t = regional_name[p2];
                    console.log('t', t);
                    arr[0].push(t)
                }
                for(p3 = 0; p3 < pad2; p3++)
                {
                    arr[0].push(' ');
                }
                
                var framed = ascii_land.convert.tableToArray(arr);
                
                console.log('arr', arr);
                var frame = ascii_land.frame(framed, 1);
                console.log('frame', frame);
                
                //var framed = ascii_land.convert.tableToArray(frame);
                
                console.log('framed', framed);
                console.log('card', card);
                
                var this_card = ascii_land.table.continue(
                    frame, 
                    card,
                    '',
                    0
                )
                console.log('this_card', this_card);
                
                var these_cards = ascii_land.frame(this_card, 0);
                
                var cards = ascii_land.convert.arrayToTable(these_cards);
                console.log('cards', cards);
                
                jQuery.each(attr, function(k, v)
                {
                    var value = parseInt(v.split('%')[0]);
                    if(typeof global_attributes[k] == 'undefined')
                    {
                        global_attributes[k] = value + '%';
                    }
                    else
                    {
                        var tv = parseInt(global_attributes[k].split('%')[0]);
                        global_attributes[k] = (value + tv) + '%';
                    }
                })
                
                var colour_width = land[0].length + 9;
                
                all_hexes.push(land);
                ascii+= ascii_land.render(cards, ascii_colours, 5, 1, colour_width, colour_width);
            }
            
            var average_attributes = {};
            jQuery.each(global_attributes, function(k, v)
            {
                var value = parseInt(parseInt(v.split('%')[0]) / all_hexes.length);
                average_attributes[k] = value + '%';
            })
            
            console.log('global_attributes', global_attributes);
            console.log('average_attributes', average_attributes);
            
            jQuery(pre).html(ascii);
            
            var rows = (rings * 2) + 1;

            if(rings % 2 == 0)
            {

            }
            else
            {
                rows++;
            }

            var cols = Math.ceil((rows / 2));
            var lands = ascii_land.hex.map(size, rings, all_hexes);
            
            var card = ascii_land.hex.card(
                lands, 
                ['NATION BIOME', 'NATION ATTRIBUTES', 'AVERAGE REGIONAL ATTRIBUTES', 'POINTS OF INTEREST'], 
                average_attributes,
                true
            );
            var cards = ascii_land.convert.arrayToTable(card);
            
            var land = ascii_land.convert.tableToArray(lands);
            var map = ascii_land.frame(land, 0);
            
            console.log('cards', cards);
            
            var colour_width = lands[0].length + 6;
            
            jQuery('.pres').html('<pre>' + ascii_land.render(cards, ascii_colours, 1, 1, colour_width + 5, colour_width) + '</pre>');
            
        })
    },
    pattern:
    {
        repeat: function(sym, num)
        {
            var html = '';
            for(i = 0; i < num; i++) html+= sym;
            return html;
        }
    },
    render: function(data, colours = ascii_colours, colour_r_start = 0, colour_c_start = 0, colour_r_limit = 0, colour_c_limit = 0, convert_chars = true)
    {
        var text = '';
        console.log('data', data);
        console.log('colour_r_start', colour_r_start);
        console.log('colour_c_start', colour_c_start);
        console.log('colour_r_limit', colour_r_limit);
        console.log('colour_c_limit', colour_c_limit);
        console.log('colours', colours);
        for(rows = 0; rows < data.length; rows++)
        {
            var row = '';
            for(cols = 0; cols < data[rows].length; cols++)
            {
                var h = data[rows][cols];
                
                // Add colours ...?
                if(
                    typeof colours == 'object'
                    && rows + 1 < data.length
                    && 
                    (
                        (
                            (colour_r_start < 1 && colour_c_start < 1)
                            &&
                            (colour_r_limit < 1 && colour_c_limit < 1)
                        )
                        ||
                        (
                            (colour_r_start > 0 && rows >= colour_r_start)
                            &&
                            (colour_c_start > 0 && cols >= colour_c_start)
                            &&
                            (colour_r_limit > 0 && rows < colour_r_limit)
                            &&
                            (colour_c_limit > 0 && cols < colour_c_limit)
                        )
                    )
                )
                {
                    // Convert ! into \
                    if(convert_chars)
                    {
                        if(h == '!') h = '\\';
                        else if(h == '7') h = '/';
                        else if(h == 'A') h = '\\';
                    }
                    var got_symbol = false;
                    for(y = 0; y < colours.length; y++)
                    {
                        for(s = 0; s < colours[y].symbols.length; s++)
                        {
                            if(h == colours[y].symbols[s])
                            {
                                h = '\033[1;' + colours[y].fg.ansi + ';' + colours[y].bg.ansi + 'm' + h;
                                got_symbol = true;
                            }
                        }
                    }
                    if(!got_symbol)
                    {
                        h = '\033[1;' + colours[0].fg.ansi + ';' + colours[0].bg.ansi + 'm' + h;
                    }
                }
                else
                {
                    h = '\033[1;' + colours[0].fg.ansi + ';' + colours[0].bg.ansi + 'm' + h;
                }
                row+= h;
            }
            row+= "\n";
            text+= row;
        }
        if(typeof colours == 'object')
        {
            var ansi_up = new AnsiUp;
            results = ansi_up.ansi_to_html(text);
            return results;
        }
        else
        {
            return text;
        }
    },
    table:
    {
        combine: function(array1, array2, filler = ' ', space = 2)
        {
            var new_array = [];
            var max_length = array1.length;
            var array1_min = array1[0].length;
            var array2_min = array2[0].length;
            if(array2.length > array1.length) max_length = array2.length;
            for(a = 0; a < max_length; a++)
            {
                var ls = ascii_land.pattern.repeat(filler, array1_min);
                var rs = ascii_land.pattern.repeat(filler, array2_min);
                if(typeof array1[a] != 'undefined') ls = array1[a];
                if(typeof array2[a] != 'undefined') rs = array2[a];
                new_array.push(ls + ascii_land.pattern.repeat(filler, space) + rs);
            }
            return new_array;
        },
        continue: function(array1, array2, filler = ' ', space = 2)
        {
            var new_array = JSON.parse(JSON.stringify(array1));
            var max_width = array1[0].length;

            var array1_min = array1[0].length;
            var array2_min = array2[0].length;

            if(array2[0].length > array1[0].length) max_width = array2[0].length;

            for(s = 0; s < space; s++)
            {
                new_array.push(ascii_land.pattern.repeat(filler, max_width));
            }

            for(a = 0; a < array2.length; a++)
            {
                var line = array2[a];
                var fill = max_width - line.length;
                if(line.length <= max_width)
                {
                    new_array.push(line + ascii_land.pattern.repeat(filler, fill));
                }
            }
            
            return new_array;
        },
        stats: function(obj, left_width, right_width, title = false)
        {
            var table = [];
            if(title)
            {
                var total_width = (left_width + right_width) + 3;
                if(total_width >= title.length)
                {
                    var rowA = [];
                    for(tA = 0; tA < total_width; tA++)
                    {
                        rowA.push('-');
                    }
                    table.push(rowA);
                    
                    var lp = Math.ceil((total_width - title.length) / 2);
                    var rp = Math.floor((total_width - title.length) / 2);
                    var row = [];
                    for(lp1 = 0; lp1 < lp; lp1++)
                    {
                        row.push(' ');
                    }
                    for(t = 0; t < title.length; t++)
                    {
                        var txt = title[t];
                        if(txt == '_') txt = ' ';
                        row.push(txt);
                    }
                    for(rp1 = 0; rp1 < rp; rp1++)
                    {
                        row.push(' ');
                    }
                    table.push(row);
                    
                    var row2 = [];
                    for(t2 = 0; t2 < total_width; t2++)
                    {
                        row2.push('-');
                    }
                    table.push(row2);
                }
            }
            jQuery.each(obj, function(k, v)
            {
                var s = '' + v + '';
                if(left_width >= k.length && right_width >= s.length)
                {
                    var row3 = [];
                    
                    for(k1 = 0; k1 < k.length; k1++)
                    {
                        var txt = k[k1];
                        if(txt == '_') txt = ' ';
                        row3.push(txt);
                    }
                    for(k2 = 0; k2 < left_width - k.length; k2++)
                    {
                        row3.push(' ');
                    }
                    
                    row3.push(' | ');
                    
                    for(v2 = 0; v2 < right_width - s.length; v2++)
                    {
                        row3.push(' ');
                    }
                    for(v1 = 0; v1 < s.length; v1++)
                    {
                        row3.push(s[v1]);
                    }
                    
                    table.push(row3);
                }
            });
            return table;
        }
    }
}

ascii_land.init();