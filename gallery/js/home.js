const colorThief = new ColorThief();

var pandora = {
    init: function()
    {
        var artists = [
            'R',
            'G',
            'B'
        ];
        var now = new Date().getTime();
        var random = new XorShift128(now);
        var members = random.integer(2888888, 2999999);
        jQuery('.member-count').text(numberWithCommas(members));
        jQuery.each(artists, function(a)
        {
            var ts = '' + new Date().getTime() + '';
            var str = artists[a] + ts.split("").reverse().join("");
            var id = EthJS.Util.sha256(str).toString('hex');
            
            var seed = stringToSeed(id);
            var title = getRelevantRandomWord('title', 'all', false, seed);
            var surname = getRelevantRandomWord('surname', 'all', false, seed);
            var name = title + ' ' + surname;
            render(name, function(avatar = false)
            {
                var colours = getImageColours(avatar);
                getArtistDescription(title, surname, colours, function(description)
                {
                    if(avatar && name && description)
                    {
                        jQuery('.card-artist-' + a).prepend(avatar);
                        jQuery('.card-artist-' + a).find('.artist-name').text(name);
                        jQuery('.card-artist-' + a).find('.artist-description').text(description);
                    }
                });
            });
        });
    }
};

function getArtistDescription(title, surname, colours, callback)
{
    var gender = 'all';
    var gender_term = 'their';
    var gender_termed = 'It';
    var name = title + ' ' + surname;
    const digest = async ({ algorithm = "SHA-256", message }) =>
      Array.prototype.map
        .call(
          new Uint8Array(
            await crypto.subtle.digest(algorithm, new TextEncoder().encode(message))
          ),
          (x) => ("0" + x.toString(16)).slice(-2)
        )
        .join("");

    digest({message: name}).then(function(id)
    {
        var seed = stringToSeed(id);
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
        var time = getRelevantRandomWord('timeadv', 'past', false, seed);
        var relative = getRelevantRandomWord('rel', 'all', false, seed);
        
        var random = new XorShift128(seed);
        
        var commitments = [
            'is a professional',
            'is an amateur',
            'is a retired',
            'is an ex',
        ];
        var commitment_index = random.integer(0, (commitments.length - 1));
        
        var however = ' who is now working on';
        if(commitment_index < 2) however = ', but would rather work on';
        
        var colour1 = colours[0].name.toLowerCase();
        var colour2 = colours[1].name.toLowerCase();
        var colour3 = colours[2].name.toLowerCase();
        var number_of_children = random.integer(0, 3);
        var commitment_type = commitments[commitment_index];
        var child_status_intro = 'Although it';
        if(gender == 'male') child_status_intro = 'Athough he';
        else if(gender == 'female') child_status_intro = 'Athough she';
        
        var child_job = getRelevantRandomWord('noun', 'job', false, parseInt(reverseString('' + number_of_children + seed + '')));
        
        var child_status = child_status_intro + ' has no ' + colour3 + ' children, ' + firstname + ' plans to marry'; // 51 * 
        
        var conclusions = ' to ' + gender_term + ' ' + relative + '\'s favourite ' + child_job + '.';
        
        if(number_of_children == 1)
        {
            child_status = 'Married ' + time + ' and having recently given birth to ' + gender_term + ' first ' + colour3 + ' child';
            conclusions = '; ' + firstname + ' is eager for change.';
        }
        else if(number_of_children > 2)
        {
            
            var verbage = 'a';
            if(startsWithVowel(colour3)) verbage = 'an';
            
            child_status = 'Married with ' + number_of_children + ' children; one of which is eager to become ' + verbage + ' ' + colour3 + ' ' + child_job;
            conclusions = ' like ' + firstname + '\'s ' + relative +' was.';
        }
        
        var description = firstname + ' ' + surname + ' ' + commitment_type + ' ' + colour1 + ' ' + job + '' + however + ' ' + gender_term + ' ' + colour2 + ' art instead. ' + child_status + '' + conclusions;
        callback(description);
    });
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

function startsWithVowel(word){
   var vowels = ("aeiouAEIOU"); 
   return vowels.indexOf(word[0]) !== -1;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

jQuery(document).ready(function()
{
    pandora.init();
});