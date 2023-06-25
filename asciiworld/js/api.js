var ascii_labels = [
    'R', 'C', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

var ascii_checks = [
    [
        '//', '/\\', '/!', '!\\', 
    ],
    [
        '/', '/', '/', ' ',
    ],
    [
        'bright', 'bright', 'bright', 'bright'
    ],
    [
        ' ', '\\', '\\', '\\' 
    ],
    [
        false, false, false, '/!\\',
    ],
    [
        false, false, false, '\\',
    ]
];

var replacements = [
    [
        '~// \~'
    ],
    [
        '~/**\~'
    ]
]

var ascii_colours_bw = {
    frame: {
        symbols: ['¿'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#FFFFFF',
            ansi: 97
        }
    }
}
var ascii_colours = {
    frame: {
        symbols: ['*', 'T', 'P', '{', '}', '╗', '╝', '╚', '╔', '═', '║', '╬', '╠', '╣', '╦', '╩', 'Þ', 'þ', 'õ', 'Õ', 'Ô', 'Ï', 'Î', 'ı', 'ð', '©', '®', '¿', '†'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#FFFFFF',
            ansi: 97
        }
    },
    water: {
        symbols: ['~'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#5454fc',
            ansi: 94
        }
    },
    grass: {
        symbols: ['.', '&', 'o'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#00ff00',
            ansi: 92
        }
    },
    dense: {
        symbols: ['(', ')', '█', '¯', 'i', '%'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#00bb00',
            ansi: 32
        }
    },
    swamp: {
        symbols: ['O', '^', '"'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#000000',
            ansi: 36
        }
    },
    stone: {
        symbols: [':'],
        bg: {
            html: '#000000',
            ansi: 104
        },
        fg: {
            html: '#00af00',
            ansi: 93
        }
    },
    deep: {
        symbols: [';'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#00af00',
            ansi: 34
        }
    },
    sand: {
        symbols: ['W', 'u', 'n', 'Y', '$', 'x', 'H', '»', '«'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#a7a700',
            ansi: 33
        }
    },
    sandy: {
        symbols: ['┼'],
        bg: {
            html: '#000000',
            ansi: 43
        },
        fg: {
            html: '#a7a700',
            ansi: 34
        }
    },
    grim: {
        symbols: ['@', '?'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#bb00bb',
            ansi: 35
        }
    },
    wood: {
        symbols: ['A', 'I', '>', '<', '`', '¤', '░', '≡', '+', '-', '|'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#ff5555',
            ansi: 91
        }
    },
    rev: {
        symbols: ['#'],
        bg: {
            html: '#545454',
            ansi: 100
        },
        fg: {
            html: '#000000',
            ansi: 34
        }
    },
    bright: {
        symbols: ['X', '[', ']', '=', '▀', '▄', '¦'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#545454',
            ansi: 37
        }
    },
    border: {
        symbols: ['/', '\\', '_'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#545454',
            ansi: 90
        }
    }
};

var ascii_closeup_colours = {
    frame: {
        symbols: ['*', 'T', 'P', '{', '}', '╗', '╝', '╚', '╔', '═', '║', '╬', '╠', '╣', '╦', '╩', 'Þ', 'þ', 'õ', 'Õ', 'Ô', 'Ï', 'Î', 'ı', 'ð', '©', '®', '¿', '†'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#FFFFFF',
            ansi: 97
        }
    },
    water: {
        symbols: ['~'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#5454fc',
            ansi: 94
        }
    },
    grass: {
        symbols: ['.', '&', 'o'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#00ff00',
            ansi: 92
        }
    },
    dense: {
        symbols: ['(', ')', '█', 'i', '%'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#00bb00',
            ansi: 32
        }
    },
    swamp: {
        symbols: ['O', '^', '"'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#000000',
            ansi: 36
        }
    },
    stone: {
        symbols: [':'],
        bg: {
            html: '#000000',
            ansi: 104
        },
        fg: {
            html: '#00af00',
            ansi: 93
        }
    },
    deep: {
        symbols: [';'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#00af00',
            ansi: 34
        }
    },
    sand: {
        symbols: ['W', 'u', 'n', 'Y', '$', 'x', 'H', '»', '«'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#a7a700',
            ansi: 33
        }
    },
    sandy: {
        symbols: ['┼'],
        bg: {
            html: '#000000',
            ansi: 43
        },
        fg: {
            html: '#a7a700',
            ansi: 34
        }
    },
    grim: {
        symbols: ['@', '?'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#bb00bb',
            ansi: 35
        }
    },
    wood: {
        symbols: ['A', 'I', '>', '<', '`', '¤', '░', '≡', '+', '-', '|'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#ff5555',
            ansi: 91
        }
    },
    rev: {
        symbols: ['#'],
        bg: {
            html: '#545454',
            ansi: 100
        },
        fg: {
            html: '#000000',
            ansi: 34
        }
    },
    bright: {
        symbols: ['X', '[', ']', '=', '▀', '▄', '¦'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#545454',
            ansi: 37
        }
    },
    border: {
        symbols: ['/', '\\', '_', '¯'],
        bg: {
            html: '#000000',
            ansi: 40
        },
        fg: {
            html: '#545454',
            ansi: 90
        }
    }
};

var ansi_colours = {
    bgs: {
        black: 40,
        red: 41,
        green: 42,
        yellow: 43,
        blue: 44,
        magenta: 45,
        cyan: 46,
        white: 47,
        gray: 100,
        reder: 101,
        greener: 102,
        yellower: 103,
        bluer: 104,
        pink: 105,
        aqua: 106,
        whiter: 107
    },
    fgs: {}
};

// Automate the foreground colours ...
jQuery.each(ansi_colours.bgs, function(k, v)
{
    ansi_colours.fgs[k] = v - 10;
});

// Automate ascii colours array ...
var all_asccii_colours = [];
jQuery.each(ascii_colours, function(k, v)
{
    v.label = k;
    all_asccii_colours.push(v);
});

var needs_changing = function(chars, charsB, charsC, format)
{
    var results = false;
    for(a = 0; a < ascii_checks[0].length; a++)
    {
        if(chars == ascii_checks[0][a] || charsB == ascii_checks[0][a])
        {
            var s = ascii_checks[1][a];
            var type = ascii_checks[2][a];
            if(charsB == ascii_checks[0][a])
            {
                s = ascii_checks[3][a];
            }
            else
            {
                if(charsC == ascii_checks[4][a])
                {
                    s = ascii_checks[5][a]
                }
            }
            if(format == 'ansi')
            {
                results = '\033[1;'+ascii_colours[type].fg.ansi+';'+ascii_colours.border.bg.ansi+'m' + s;
            }
            else
            {
                results = '<b style="background:'+ascii_colours[type].bg.html+'; color:' + ascii_colours.border.fg.html + '">' + s + '</b>';
            }
        }
    }
    return results;
}

var temp_api = {
    colour: function(ascii = false, format = 'html', callback = false, colors = false, arrayed = false, x_limit = false, default_type = false, y_base = false)
    {
        var ansi = false;
        var html = false;
        var colours_selected = all_asccii_colours;
        
        if(!callback || typeof callback != 'function')
        {
            callback = function(results)
            {
                return results;
            }
        }
        if(format == 'ansi') ansi = true;
        else if(format != 'raw') html = true;
        if(typeof colors == 'object')
        {
            var new_colours = [];
            jQuery.each(colors, function(k, v)
            {
                new_colours.push(v);
            });
            colours_selected = new_colours;
        }
        
        if(ascii && (ansi === true || html === true) && typeof callback == 'function')
        {
            var output = '';
            
            if(arrayed && typeof arrayed == 'object' && arrayed.length > 0)
            {
                for(row = 0; row < arrayed.length; row++)
                {
                    output+= '\n';
                    var line = arrayed[row];
                    
                    if(
                        !y_base
                        ||
                        (
                            y_base
                            && row > y_base
                        )
                    ){
                    
                        for(x = 0; x < line.length; x++)
                        {
                            var a = false;
                            var c = line[x];

                            if(line[x] == '!') c = '\\';

                            if(
                                !x_limit
                                ||
                                (
                                    x_limit
                                    && x < x_limit
                                )
                                ||
                                (
                                    c == '╗'
                                    || c == '╝'
                                    || c == '╚'
                                    || c == '╔'
                                    || c == '═'
                                    || c == '║'
                                )
                            ){
                                var chars = 'QI';
                                var charsB = 'QI';
                                var charsC = 'QIQ';
                                if(x > 0) charsB = line[x - 1] + c;
                                if(x > 1) charsC = line[x - 2] + line[x - 1] + c;
                                if((x + 1) < line.length) chars = c + line[x + 1];
                                for(y = 0; y < colours_selected.length; y++)
                                {
                                    for(s = 0; s < colours_selected[y].symbols.length; s++)
                                    {
                                        if(c == colours_selected[y].symbols[s] && needs_changing(chars, charsB, charsC, format))
                                        {
                                            a = needs_changing(chars, charsB, charsC, format);
                                        }
                                        else if(c == colours_selected[y].symbols[s])
                                        {
                                            if(ansi)
                                            {
                                                a = '\033[1;'+colours_selected[y].fg.ansi+';'+colours_selected[y].bg.ansi+'m' + c;
                                            }
                                            else
                                            {
                                                a = '<b style="background:'+colours_selected[y].bg.html+'; color:' + colours_selected[y].fg.html + '">' + c + '</b>';
                                            }
                                        }
                                    }
                                }
                            }
                            if(!a)
                            {
                                var this_type = 'border';
                                if(default_type) this_type = default_type;

                                if(needs_changing(chars, charsB, charsC, format))
                                {
                                    a = needs_changing(chars, charsB, charsC, format);
                                }
                                else
                                {
                                    if(ansi)
                                    {
                                        a = '\033[1;'+ascii_colours[this_type].fg.ansi+';'+ascii_colours[this_type].bg.ansi+'m' + c;
                                    }
                                    else
                                    {
                                        a = '<b style="background:'+ascii_colours[this_type].bg.html+'; color:' + ascii_colours[this_type].fg.html + '">' + c + '</b>';
                                    }
                                }
                            }
                            output+= a;
                        }
                    }
                    else
                    {
                        for(x = 0; x < line.length; x++)
                        {
                            var a = false;
                            var c = line[x];
                            var this_type = 'border';
                            if(default_type) this_type = default_type;
                            
                            if(
                                c == '╗'
                                || c == '╝'
                                || c == '╚'
                                || c == '╔'
                                || c == '═'
                                || c == '║'
                            ){
                                this_type = 'frame';
                            }

                            if(ansi)
                            {
                                a = '\033[1;'+ascii_colours[this_type].fg.ansi+';'+ascii_colours[this_type].bg.ansi+'m' + c;
                            }
                            else
                            {
                                a = '<b style="background:'+ascii_colours[this_type].bg.html+'; color:' + ascii_colours[this_type].fg.html + '">' + c + '</b>';
                            }

                            output+= a;
                        }
                    }
                }
            }
            else
            {
                for(x = 0; x < ascii.length; x++)
                {
                    var a = false;
                    var c = ascii[x];
                    var chars = 'QI';
                    var charsB = 'QI';
                    var charsC = 'QIQ';
                    if(x > 0) charsB = ascii[x - 1] + c;
                    if(x > 1) charsC = ascii[x - 2] + ascii[x - 1] + c;
                    if((x + 1) < ascii.length) chars = c + ascii[x + 1];
                    for(y = 0; y < colours_selected.length; y++)
                    {
                        for(s = 0; s < colours_selected[y].symbols.length; s++)
                        {
                            if(c == colours_selected[y].symbols[s] && needs_changing(chars, charsB, charsC, format))
                            {
                                a = needs_changing(chars, charsB, charsC, format);
                            }
                            else if(c == colours_selected[y].symbols[s])
                            {
                                if(ansi)
                                {
                                    a = '\033[1;'+colours_selected[y].fg.ansi+';'+colours_selected[y].bg.ansi+'m' + c;
                                }
                                else
                                {
                                    a = '<b style="background:'+colours_selected[y].bg.html+'; color:' + colours_selected[y].fg.html + '">' + c + '</b>';
                                }
                            }
                        }
                    }
                    if(!a)
                    {
                        if(needs_changing(chars, charsB, charsC, format))
                        {
                            a = needs_changing(chars, charsB, charsC, format);
                        }
                        else
                        {
                            if(ansi)
                            {
                                a = '\033[1;'+ascii_colours.border.fg.ansi+';'+ascii_colours.border.bg.ansi+'m' + c;
                            }
                            else
                            {
                                a = '<b style="background:'+ascii_colours.border.bg.html+'; color:' + ascii_colours.border.fg.html + '">' + c + '</b>';
                            }
                        }
                    }

                    output+= a;
                }
            }
            
            var results = output;
            
            for(x = 0; x < replacements[0].length; x++)
            {
                results = results.replaceAll(replacements[0][x], replacements[1][x]);
            }
            
            // In order to test ANSI up - can later remove when used by terminal ...
            if(ansi)
            {
                var ansi_up = new AnsiUp;
                results = ansi_up.ansi_to_html(output);
            }
            
            callback(results);
        }
        else if(typeof callback == 'function')
        {
            callback(ascii);
        }
    }
};