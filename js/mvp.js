/*

DEPENDENCIES

-- MUSTACHE - http://github.com/janl/mustache.js

*/

var mvpjs =
{
    init: function()
    {
        mvpjs.mustache();
        mvpjs.scroll();
        mvpjs.state();
    },
    md: function(callback = false)
    {
        var body = document.querySelectorAll('body');
        var elements = document.querySelectorAll('[data-md]');
        for(e = 0; e < elements.length; e++)
        {
            var element = elements[e];
            var source = element.getAttribute('data-md');   
            var render = function(md)
            {
                if(typeof md == 'string')
                {
                    var html = marked.parse(md);
                    element.innerHTML = html;
                }
                
                if(typeof callback == 'function')
                {
                    callback();
                }
            }
            
            fetch
            (
                source
            )
            .then(response => response.text())
            .then(response => render(response))
            .catch(error => render(false))
        }
    },
    mustache: function()
    {
        var body = document.querySelectorAll('body');
        var elements = document.querySelectorAll('[data-mustache]');
        for(e = 0; e < elements.length; e++)
        {
            var content = elements[e].innerHTML;
            var source = elements[e].getAttribute('data-mustache');
            var sources = source.split('.');
            var data = false;
            for(s = 0; s < sources.length; s++)
            {
                if(s < 1) data = eval(sources[s]);
                else
                {
                    data = data[sources[s]];
                }
            }
            console.info('mustache.data', data);
            var html = Mustache.render(content, data);
            elements[e].innerHTML = html;
            body[0].setAttribute('data-loading', 'false');
        }
    },
    scroll: function()
    {
        var sections = document.querySelectorAll(".section");
        var navLi = document.querySelectorAll("nav li");
        
        window.addEventListener("scroll", () => 
        {
            var current = "";
            sections.forEach((section, index, arr) => 
            {
                var sectionTop = section.offsetTop;
                var sectionHeight = section.clientHeight;
                var current_y = sectionTop - (sectionHeight / 2);

                if(pageYOffset >= current_y && (pageYOffset + 10) >= sectionTop) 
                {
                    current = section.getAttribute("id");
                }
            });
            
            if(!current) current = 'about';

            navLi.forEach((li) => 
            {
                li.classList.remove("active");
                if(li.classList.contains(current)) 
                {
                    li.classList.add("active");
                }
            });
        });
    },
    state: function()
    {
        const hash = window.location.hash;
        if(typeof hash != 'undefined' && hash != '#' && hash != '' && hash)
        {
            document.querySelector('a[href="' + hash + '"]').click();
        }
    }
}

window.onload = function()
{
    if(typeof cortex == 'object' && typeof cortex.ux == 'object')
    {
        cortex.ux.init();
    }
    else
    {
        mvpjs.init();
    }
}