/*

DEPENDENCIES

-- ISOTOPE

*/

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
        iso.layout();
        
        var grid_items = document.querySelectorAll('.grid');
        	
        grid_items.forEach(function(grid_item, index)
        {
            grid_item.addEventListener("click", async function(e)
            {
                grid_item.classList.add('animate');
                if(grid_item.classList.contains('full-width'))
                {
                    grid_item.classList.remove('full-width');
                }
                else
                {
                    grid_item.classList.add('full-width');
                }
                setTimeout(function()
                {
                    grid_item.classList.remove('animate');
                    iso.layout();
                }, 600);
            });
        });
    }
}

window.onload = function()
{
    smalley.init();
}