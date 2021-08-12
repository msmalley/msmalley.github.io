const colorThief = new ColorThief();

var pandora = {
    init: function()
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
            render(name, function(avatar = false)
            {
                var colours = getImageColours(avatar);
                console.log('colours', colours);
                var description = getArtistDescription(title, surname, colours);
                console.log('description', description);
                if(avatar)
                {
                    jQuery('.card-artist-' + a).prepend(avatar);
                    jQuery('.card-artist-' + a).find('.artist-name').text(name);
                    jQuery('.card-artist-' + a).find('.artist-description').text(description);
                }
            });
        });
    }
};

function getArtistDescription(title, surname, colours)
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
    console.log('firstname', firstname);
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
    console.log('commitment_type', commitment_type);
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
}

function getImageColours(img)
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

jQuery(document).ready(function()
{
    pandora.init();
});