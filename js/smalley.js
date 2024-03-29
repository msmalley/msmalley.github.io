/*

DEPENDENCIES

-- MUSTACHE - http://github.com/janl/mustache.js

*/

var smalley_intervals = [];

var smalley =
{
    button:
    {
        beat: function()
        {
            var beaters = document.querySelectorAll('.fa-beater');

            beaters.forEach(f => f.addEventListener('mouseover', function() {
                var _this = this;
                beaters.forEach(e => {
                    var icon = e.querySelector('i');
                    console.log('icon', icon);
                    icon.classList.remove('fa-beat');
                });
                _this.querySelector('i').classList.add('fa-beat');
                setTimeout(function()
                {
                    _this.querySelector('i').classList.remove('fa-beat');
                }, 1000);
            }));
        },
        toggle: function(el, e)
        {
            e.preventDefault();
            var value = 'false';
            var node = el.parentNode.parentNode;
            var wrappers = node.querySelectorAll('div[aria-disabled="true"]');
            if(wrappers.length < 1)
            {
                wrappers = node.querySelectorAll('div[aria-disabled="false"]');
                value = 'true';
            }
            if(wrappers.length > 0)
            {
                wrappers.forEach(function(div, i)
                {
                    div.setAttribute('aria-disabled', value);
                })
            }
        }
    },
    init: function()
    {
        smalley.ux.setup();
        smalley.ux.buttons();
    },
    hero:
    {
        get: function()
        {
            var wrapper = document.querySelectorAll('section[aria-selected="true"]')[0];
            var figure = wrapper.querySelectorAll('figure')[0];
            return figure;
        },
        speech: function(html, direction, footer)
        {
            var wrapper = document.querySelectorAll('section[aria-selected="true"]')[0];
            var bubble = wrapper.querySelectorAll('blockquote')[0];
            var ground = wrapper.querySelectorAll('span')[0];
            
            var hero_direction = 'right';
            var ground_direction = 'moveLeft';
            
            if(direction == 'left')
            {
                hero_direction = 'left';
                ground_direction = 'moveRight';
            }
            
            bubble.classList.add('speak');
            
            setTimeout(function()
            {
                bubble.innerHTML = html;
                
                // Move hero / scene ...
                smalley.hero.walk(hero_direction);
                
                setTimeout(function()
                {
                    wrapper.querySelectorAll('footer')[0].innerHTML = '';
                    
                }, 600);
                
                ground.classList.add(ground_direction);
                
                setTimeout(function()
                {
                    smalley.hero.walk('stop');
                    
                    bubble.classList.remove('speak');
                    
                    ground.classList.remove(ground_direction);
                    
                    wrapper.querySelectorAll('footer')[0].innerHTML = footer;
                    
                    smalley.button.beat();
                    
                }, 3000);
                
            }, 300);
        },
        walk: function(direction)
        {
            var speed = 300;
            var hero = smalley.hero.get();
            
            if(direction == 'stop')
            {
                smalley_intervals.forEach(function(int, id)
                {
                    clearInterval(int);
                });
                setTimeout(function()
                {
                    hero.setAttribute('style', 'background-position: -24px -48px');
                    
                }, speed);
            }
            else if(direction == 'right')
            {
                hero.setAttribute('style', 'background-position: -24px -250px');
                
                var walk_right = function()
                {
                    setTimeout(function()
                    {

                        hero.setAttribute('style', 'background-position: -122px -250px');

                        setTimeout(function()
                        {

                            hero.setAttribute('style', 'background-position: -224px -250px');

                        }, speed);

                    }, speed);
                }
                
                walk_right();
                
                var interval_id = setInterval(function()
                {
                    walk_right();
                    
                }, speed * 2);
                
                smalley_intervals.push(interval_id);
            }
            else if(direction == 'left')
            {
                hero.setAttribute('style', 'background-position: -24px -150px');
                
                var walk_left = function()
                {
                    setTimeout(function()
                    {

                        hero.setAttribute('style', 'background-position: -122px -150px');

                        setTimeout(function()
                        {

                            hero.setAttribute('style', 'background-position: -224px -150px');

                        }, speed);

                    }, speed);
                }
                
                walk_left();
                
                var interval_id = setInterval(function()
                {
                    walk_left();
                    
                }, speed * 2);
                
                smalley_intervals.push(interval_id);
            }
        }
    },
    ux:
    {
        buttons: function()
        {
            var nav = document.querySelectorAll('nav');
            var body = document.querySelectorAll('body')[0];
            var navs = nav[0].querySelectorAll('a');
            
            var wrapper = document.querySelectorAll('section[aria-selected="true"]')[0];
            var bubble = wrapper.querySelectorAll('blockquote')[0];
            
            bubble.setAttribute('height', bubble.offsetHeight);
            
            // Determine direction ???
            
            var current_index = 0;
            
            navs.forEach(function(button, i)
            {
                button.addEventListener("click", async function(e)
                {
                    navs.forEach(function(b, eye)
                    {
                        if(b.getAttribute('aria-selected') == 'true')
                        {
                            current_index = eye;
                        }
                        b.setAttribute("aria-selected", "false");
                    });
                    
                    e.preventDefault();
                    
                    var direction = 'right';
                    
                    if(current_index != i)
                    {
                        if(i < current_index)
                        {
                            direction = 'left';
                        }
                        
                        var hash = button.hash.split('#')[1];
                        var section = document.querySelectorAll('section[aria-label="' + hash + '"]')[0];
                        var quote = section.querySelectorAll('blockquote')[0].innerHTML;
                        var footer = section.querySelectorAll('footer')[0].innerHTML;

                        button.setAttribute("aria-selected", "true");
                        
                        wrapper.querySelectorAll('footer')[0].classList.add('hide');
                        
                        smalley.hero.speech(quote, direction, footer);
                        
                        setTimeout(function()
                        {
                            body.setAttribute("role", hash);
                            wrapper.querySelectorAll('footer')[0].classList.remove('hide');
                            
                        }, 600);
                    }
                });
            });
        },
        setup: function()
        {
            var introductions = document.querySelectorAll('section[aria-selected="true"]')[0];
            var backup = document.querySelectorAll('section[aria-label="introduction"]')[0];
            backup.innerHTML = introductions.innerHTML;
            
            smalley.button.beat();
        }
    }
}

window.onload = function()
{
    smalley.init();
}