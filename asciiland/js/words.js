var ascii_words =
{
    vowels: [
        'A', 'E', 'I', 'O', 'U', 'Y'
    ],
    cons: [
        'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W', 'Y'
    ],
    nations: [
        'ISLES OF $', '$ ISLES', 'ISLANDS OF $', '$ ISLANDS',
        'NATION OF $', 'COUNTRY OF $', 'FEDERATION OF $',
        '$ COLLECTIVE'
    ],
    regions: [
        'COUNTY OF $', '$ COUNTY', 'STATE OF $', '$ REGIONS', 'REALM OF $', '$ REALM'
    ],
    places: [
        'CITY OF $'
    ]
}

var ascii_word = 
{
    build: function(len = 0, type = false)
    {
        var phrase = '';
        if(len > 0 && type && typeof ascii_words[type] == 'object' && ascii_words[type].length > 0)
        {
            var word = '';
            var type_length = ascii_words[type].length;
            var index = Math.floor(Math.random() * type_length);
            var vowel = Math.floor(Math.random() * 1);
            console.log('type_length', type_length);
            console.log('index', index);
            console.log('vowel', vowel);
            phrase = ascii_words[type][index];
            for(c = 0; c < len; c++)
            {
                var ti = Math.floor(Math.random() * ascii_words.cons.length);
                var t = ascii_words.cons[ti];
                if(vowel)
                {
                    var ti2 = Math.floor(Math.random() * ascii_words.vowels.length);
                    t = ascii_words.vowels[ti2];
                    vowel = false;
                }
                else
                {
                    vowel = true;
                }
                console.log('t', t);
                word+= t;
            }
            console.log('phrase', phrase);
            phrase = phrase.replace('$', word);
        }
        return phrase;
    }
}