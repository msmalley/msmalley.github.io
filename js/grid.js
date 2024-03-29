/*

DEPENDENCIES

-- ISOTOPE

*/

var smalley_intervals = [];

var smalley =
{
    init: function()
    {
        console.log('smalley.init');
        smalley.isotope();
    },
    isotope: function()
    {
        var iso = new Isotope('.row');
        //container.appendChild( elem );
        //iso.appended( elem );
        iso.layout();
    }
}

window.onload = function()
{
    smalley.init();
}