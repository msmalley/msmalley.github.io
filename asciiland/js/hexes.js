var ascii_hexes = [];

var ascii_originals = 
[
    [
           '~~~~~~~~~~~~',
          '~XXXX~~~~~~~~n',
         '~~XXXX~~~~~~~n..',
        '~~~XXXX~~~~nnn....',
        '~~~~~~~~~uuu......',
         '~~uuIuuuu.......',
          'u..%..........',
           '..%.........',
    ],
    [
           '...nnn~~~~~~',
          '..nn~~~~~~~~~n',
         '..n~~~~~~~~~~n..',
        'nnn~~~~~~~~~nn....',
        '~~~~~~~~~~uu......',
         '~~~~~~~uuu..X...',
          'uuuIuuu....X..',
           '..%.........',
    ],
    [
           '~~~~~~~~~~~~',
          'nn~~XXX~~~~~~~',
         '..n~~XXX~~~~~~~~',
        'nnn~~~~~~~~nnnnnnn',
        '~~~~~~~~~uu.......',
         '~~~~~~~uu.......',
          'uuuIuuu.......',
           '..%.........',
    ],
    [
           '.....%......',
          '......%.......',
         '%%%%%%%Innn.....',
        '~~~~~|==|~~~nnnnnn',
        '~~XX~|==|~~~~~~~~~',
         '~~~~|==|~~~~~~~~',
          'uuuI%%%%%%%%%%',
           '..%.........',
    ],
    [
           '...%%.......',
          '....%%........',
         'nnnn|II|nnn.....',
        '~~~~~|==|~~~nnnnnn',
        '~~XX~|==|~~~~~~~~~',
         '~~~~|==|~~~~~~~~',
          'uuu|II|uuuuuuu',
           '...%%.......',
    ],
    [
           '~~~~~~~~nn..',
          'n~~~~XXX~~~nnn',
         '.nn~~~XXX~~~~~~~',
        '...nnn~~~~~~~~~~~~',
        '.....uuIuuIuuu~~~~',
         '......%..%..uu~~',
          '%%%%%%%%%...uu',
           '....%.......',
    ],
    [
           '~~~~~~~~nn..',
          'n~~~~~~~~~~nnn',
         '.nn~~~~~~~~~~~~~',
        '...nnn~~~XXX~~~~~~',
        '%%%%%%I~~XXX~~~uuu',
         '..uuu~~~~~~~~u..',
          'uu~~~~~~~~~u..',
           '~~~~~~~uuu..',
    ],
    [
           '~~~~~~~~~~~~',
          'n~~~~~~~~~~~~n',
         '.nn~~~~~~~~~~nn.',
        '...nnnInnnnnnnn...',
        '......%...........',
         '%%%%%%.XXXXXX...',
          '....%.XXXXXX..',
           '...%........',
    ],
    [
           '...%........',
          'n...%........n',
         '~nn..%.......nn~',
        '~~~nnnInnnnnnnn~~~',
        '~~~~~~~~~~~~~~~~~~',
         '~~~~~~~XXXXXX~~~',
          '~~~~~~XXXXXX~~',
           '~~~~~~~~~~~~',
    ],
    [
           '~~~~~~~~~~~~',
          'nn~~~~~~~~~~nn',
         '...nnnInnnnnn...',
        '.......%..........',
        '.......%.XXXX.....',
         '%%%%%%%.XXXX....',
          '.....%.XXXX...',
           '....%.......',
    ],
    [
           '....%.......',
          'nn...%......nn',
         '~~~nnnInnnnnn~~~',
        '~~~~~~~~~~~~~~~~~~',
        '~~~~~~~~~XXXX~~~~~',
         '~~~~~~~~XXXX~~~~',
          '~~~~~~~XXXX~~~',
           '~~~~~~~~~~~~',
    ],
    [
           '~~~~~~~~~~~~',
          'nn~~~~~~~~~~~~',
         '...nInnnnnnnnn~~',
        '.....%.........nn~',
        '.....%...........n',
         '....%.XXXXXX....',
          '%%%%.XXXXXX...',
           '..%.........',
    ],
    [
           '..%.........',
          'nn.%..........',
         '~~~nInnnnnnnnn..',
        '~~~~~~~~~~~~~~~nn.',
        '~~~~~~~~~~~~~~~~~n',
         '~~~~~~XXXXXX~~~~',
          '~~~~~XXXXXX~~~',
           '~~~~~~~~~~~~',
    ],
    [
           '..%..u~~~~~~',
          '..uIuu~~~~~~~~',
         'uuu~~~~~~~~~~~~~',
        '~~~~~~~~~~~~~~~~~~',
        '~~~~~~~~XXXXXX~~~~',
         '~~~~~~~XXXXXX~~~',
          '~~~~~~~~~~~~~~',
           '~~~~~~~~~~~~',
    ],
    [
           '~~~~~n......',
          '~~nInn........',
         'nnn.%...........',
        '.....%%%%%%%%%%%%%',
        '.....%............',
         '....%..XXXXXX...',
          '...%..XXXXXX..',
           '..%.........',
    ],
    [
           '..%..u~~~~~~',
          '.uuIuu~~~~~~~~',
         'uuu~~~~~~~~~~~~~',
        '~~~~~~~~~XXXX~~~~~',
        '~~~~~~~~~XXXX~~~~~',
         '~~~~~~~~XXXX~~~~',
          '~~~~~~~~~~~~~~',
           '~~~~~~~~~~~~',
    ],
    [
           '~~~~~n......',
          '~~nnIn........',
         'nnn..%..........',
        '......%..XXXX.....',
        '%%%%%%%..XXXX.....',
         '.....%..XXXX....',
          '....%.........',
           '...%........',
    ],
    [
           '~~~~~~~~~~~~',
          '~nIn~~~~~~~~~~',
         '~n.%.n~~~~~~~~~~',
        '~~u.%.u~~~~~~~~~~~',
        '~~~uIu~~~~XXXX~~~~',
         '~~~~~~~~~XXXX~~~',
          '~~~~~~~~XXXX~~',
           '~~~~~~~~~~~~',
    ],
    [
           '.%..........',
          '.nIn..........',
         '.n~~~n..........',
        '..u~~~u...........',
        '...uIu....XXXX....',
         '...%.....XXXX...',
          '..%.....XXXX..',
           '.%..........',
    ],
    [
           '...%........',
          '%%%III%%%%%%%%',
         '.....%..........',
        '......%...........',
        '......%..XXXX.....',
         '.....%..XXXX....',
          '....%..XXXX...',
           '...%........',
    ],
    [
           '..%.........',
          '...%..........',
         '....%...........',
        '.....%............',
        '.....%...XXX......',
         '...III..XXX.....',
          '..............',
           '............',
    ],
    [
           '............',
          '.XXXXXXXXXXXX.',
         '..XXXXXXXXXXXX..',
        '...XXXXXXXXXXXX.I%',
        '...XXXXXXXXXXXX.I%',
         '..XXXXXXXXXXXX..',
          '.XXXXXXXXXXXX.',
           '............',
    ],
    [
           '..n~~~~~~n..',
          '....uuuuuu....',
         '................',
        '........XXXXXX.I%%',
        '%%%%%%I.XXXXXX....',
         '................',
          '....nnnnnn....',
           '..n~~~~~~n..',
    ],
    [
           '.n~~~~~~n...',
          '..n~~~~~~n....',
         '...n~~~~~~~n....',
        '.....n~~~~~~n..X..',
        '%%%%%I~~~~~~u..X..',
         '....u~~~~~~~u...',
          '....u~~~~~~u...',
           '...u~~~~~~u.',
    ],
    [
           '...%........',
          'nnn.%.....nnnn',
         '~~~~nInnnnn~~~~~',
        '~~~~~~~~~~~~~~~~~~',
        '~~~XX~~~~~~~~~uuuu',
         '~~~~~~~~~~uIu...',
          'uuuuuuuuu.%...',
           '.........%..',
    ],
    [
           '.....%%.....',
          '.XXXXXXXXXXXX.',
         '..XXXXXXXXXXXX.n',
        '...XXXXXXXXXXXXn~~',
        '...XXXXXXXXXXXXu~~',
         '..XXXXXXXXXXXX.u',
          '.XXXXXXXXXXXX.',
           '.....%%.....',
    ],
    [
           '............',
          '.XXXXXXXXXXXX.',
         'n.XXXXXXXXXXXX..',
        '~n.XXXXXXXXXXXX..n',
        'u..XXXXXXXXXXXX.I~',
         '..XXXXXXXXXXXX.u',
          '.XXXXXXXXXXXX.',
           '.....%%.....',
    ],
    [
           '~~~~~~~~~~~~',
          '~~~~~~~~~~~~~~',
         '~~XXXXXX~~~~~~~~',
        '~~~XXXXXX~~~~~~~~~',
        '~~~~~~~~~~~~~~~~~~',
         '~~~~~~~~~~~~~~~~',
          '~~~~~~~~~~~~~~',
           '~~~~~~~~~~~~',
    ],
    [
           '~~~~~~~~~~~~',
          '~~~~~~~~~~~~~~',
         '~~~~~~~~~~~~~~~~',
        '~~~~~~~~~~~~~~~~~~',
        '~~~~~~~~~~XXXX~~~~',
         '~~~~~~~~~XXXX~~~',
          '~~~~~~~~XXXX~~',
           '~~~~~~~~~~~~',
    ],
];

var ascii_art =
[
    // 6 X 2
    [
        [
            '(o)(o)',
            '.|..|.',
        ],
        [
            ' 7A7A ',
            '......',
        ],
        [
            ' 7A7A ',
            '~~~~~~',
        ],
        [
            '..7A..',
            '.7..A.',
        ],
        [
            '~~7A~~',
            '~7~~A~',
        ],
        [
            'o (oo)',
            '|..||.',
        ],
        [
            ' 77AA ',
            '.|[]|.',
        ]
    ],
    // 4 X 3
    [
        [
            '(oo)',
            '-||-',
            '.||.',
        ],
        [
            ' 7A ',
            '77AA',
            '~~~~',
        ],
        [
            ' 7A ',
            '77AA',
            '....',
        ],
        [
            '7A7A',
            '....',
            '7A7A',
        ],
        [
            '7A7A',
            '~~~~',
            '7A7A',
        ],
        [
            'o  o',
            '|oo|',
            '||||',
        ],
        [
            ' |^ ',
            '77AA',
            '|[]|',
        ],
    ],
    // 3 X 2
    [
        [
            '(o)',
            '.|.',
        ],
        [
            '7^A',
            '...',
        ],
        [
            '7^A',
            '~~~',
        ],
        [
            'ooo',
            '|||',
        ],
        [
            ' |^',
            '...',
        ],
    ],
    // 2 X 1
    [
        [
            '7A'
        ],
        [
            '^^'
        ]
    ],
    // 1 X 2
    [
        [
            'o',
            '|',
        ],
        [
            '^',
            '^',
        ]
    ]
]

var empty_ascii_epic = 
[
    'XXXXXXXXXXXX',
    'XXXXXXXXXXXX',
    'XXXXXXXXXXXX',
    'XXXXXXXXXXXX',
    'XXXXXXXXXXXX',
    'XXXXXXXXXXXX',
];

var ascii_epics = 
[
    [
        '    (oo)    ',
        '(oo)-||-(oo)',
        '-||-....-||-',
        '-||-(oo)-||-',
        '....-||-....',
        '    ....    ',
    ],
    [
        '     |^     ',
        '  7A |  7A  ',
        ' [{}]| [{}] ',
        '  || 7A ||  ',
        ' .||=[]=||. ',
        '............',
    ],
    [
        '[==]    [==]',
        ' ||      || ',
        ' ===+==+=== ',
        ' ||======|| ',
        '.||..[]..||.',
        '............',
    ],
    [
        '[**]    [**]',
        ' ||      || ',
        ' ||======|| ',
        '77AA    77AA',
        '|[]|....|[]|',
        '............',
    ],
    
    [
        '     |^     ',
        '     7A     ',
        '     []     ',
        '     []     ',
        ' ....[].... ',
        '............',
    ],
    [
        '            ',
        ' [==]  [==] ',
        '  ||    ||  ',
        '  ||====||  ',
        ' .||.[].||. ',
        '............',
    ],
    [
        '       77AA ',
        '       |[]| ',
        '      ......',
        ' 77AA       ',
        ' |[]|       ',
        '......      ',
    ],
    [
        ' 77AA       ',
        ' |[]|       ',
        '......      ',
        '       77AA ',
        '       |[]| ',
        '      ......',
    ],
    [
        '            ',
        '    77AA    ',
        '    |[]|    ',
        '   ......   ',
        '            ',
        '            ',
    ],
    
    [
        '    +  +    ',
        '   ((  ))   ',
        '   )AA77(   ',
        '  ( @  @ )  ',
        '   ^^^^^^   ',
        '   ^^^^^^   ',
    ],
    [
        '7A   7A  7A ',
        '....77AA....',
        ' 7A77**AA7A ',
        '7 AA    AA7A',
        ' 7AAA 7A AA ',
        '............',
    ],
    [
        '     7A     ',
        '    77AA    ',
        '   77  AA   ',
        '  77    AA  ',
        ' 77      AA ',
        '............',
    ],
    [
        '     7A     ',
        '    77AA    ',
        '   77  AA   ',
        '  77    AA  ',
        ' 77      AA ',
        '~~~~~~~~~~~~',
    ],
    [
        '     7A     ',
        '    77AA    ',
        '   77**AA   ',
        '  77    AA  ',
        ' 77  7A  AA ',
        '77  77AA  AA',
    ],
    [
        '    (oo)    ',
        '   (oooo)   ',
        '    (oo)    ',
        '    -||-    ',
        '    -||-    ',
        ' .......... ',
    ],
    [
        '(oo)    (oo)',
        '-||-(oo)-||-',
        '....-||-....',
        '(oo)-||-(oo)',
        '-||-....-||-',
        '....    ....',
    ],
    [
        '    nnnn    ',
        '   n%%%%n   ',
        '  n%%%%%%n  ',
        '  u%%%%%%u  ',
        '   u%%%%u   ',
        '    uuuu    ',
    ],
    [
        '    nnnn    ',
        '   n;;;;n   ',
        '  n;;;;;;n  ',
        '  u;;;;;;u  ',
        '   u;;;;u   ',
        '    uuuu    ',
    ],
];

// The code to create more versions from originals ...

var flip_vertical = function(array)
{
    var new_array = JSON.parse(JSON.stringify(array));
    new_array.reverse();
    return new_array;
}

var flip_horizontal = function(array)
{
    var new_array = [];
    for(a = 0; a < array.length; a++)
    {
        var str = "";
        for(var i = array[a].length - 1; i >= 0; i--) 
        {
            var c = array[a][i];
            if(c == '!') str += '/';
            else if(c == '/') str+= '!';
            else if(c == '(') str+= ')';
            else if(c == ')') str+= '(';
            else if(c == '{') str+= '}';
            else if(c == '}') str+= '{';
            else str+= c;
        }
        new_array.push(str);
    }
    return new_array;
}

var generate_multiple_versions_of_ascii_hexes = function(hexes, fill_placeholders = true)
{
    ascii_hexes = [];
    if(typeof hexes == 'object' && hexes.length > 0)
    {
        // Four versions from each original ...
        for(h = 0; h < hexes.length; h++)
        {
            var hex = hexes[h];
            var original = JSON.parse(JSON.stringify(hex));
            var original2 = JSON.parse(JSON.stringify(original));
            var version1 = flip_vertical(original);
            var version1b = JSON.parse(JSON.stringify(version1));
            var version2 = flip_horizontal(version1b);
            var version3 = flip_horizontal(original2);
            ascii_hexes.push(original);
            ascii_hexes.push(version1);
            ascii_hexes.push(version2);
            ascii_hexes.push(version3);
        }
        
        // Fill in the placeholders ...
        if(fill_placeholders)
        {
            for(a = 0; a < ascii_hexes.length; a++)
            {
                var rc = 0;
                var new_hex = [];
                var hex = JSON.parse(JSON.stringify(ascii_hexes[a]));
                var index = Math.floor(Math.random() * ascii_epics.length);
                var art = ascii_epics[index];
                var jhex = JSON.stringify(hex);

                if(jhex.indexOf('XXXXXXXXXXXX') > 0)
                {
                    index = Math.floor(Math.random() * ascii_epics.length);
                }
                else if(jhex.indexOf('XXXXXX') > 0)
                {
                    index = Math.floor(Math.random() * ascii_art[0].length);
                }
                else if(jhex.indexOf('XXXX') > 0)
                {
                    index = Math.floor(Math.random() * ascii_art[1].length);
                }
                else if(jhex.indexOf('XXX') > 0)
                {
                    index = Math.floor(Math.random() * ascii_art[2].length);
                }
                else if(jhex.indexOf('XX') > 0)
                {
                    index = Math.floor(Math.random() * ascii_art[3].length);
                }
                else if(jhex.indexOf('X') > 0)
                {
                    index = Math.floor(Math.random() * ascii_art[4].length);
                }

                for(r = 0; r < hex.length; r++)
                {
                    var row = hex[r];
                    if(row.indexOf('XXXXXXXXXXXX') > 0)
                    {
                        art = ascii_epics[index];
                        row = row.replace('XXXXXXXXXXXX', art[rc].replace(/ /g, "."));
                        rc++;
                    }
                    else if(row.indexOf('XXXXXX') > 0)
                    {
                        art = ascii_art[0][index];
                        row = row.replace('XXXXXX', art[rc]);
                        rc++;
                    }
                    else if(row.indexOf('XXXX') > 0)
                    {
                        art = ascii_art[1][index];
                        row = row.replace('XXXX', art[rc]);
                        rc++;
                    }
                    else if(row.indexOf('XXX') > 0)
                    {
                        art = ascii_art[2][index];
                        row = row.replace('XXX', art[rc]);
                        rc++;
                    }
                    else if(row.indexOf('XX') > 0)
                    {
                        art = ascii_art[3][index];
                        row = row.replace('XX', art[rc]);
                        rc++;
                    }
                    else if(row.indexOf('X') > 0)
                    {
                        art = ascii_art[4][index];
                        row = row.replace('X', art[rc]);
                        rc++;
                    }
                    new_hex.push(row);
                }
                ascii_hexes[a] = new_hex;
            }
        }
    }
}

generate_multiple_versions_of_ascii_hexes(ascii_originals);