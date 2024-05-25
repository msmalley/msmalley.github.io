var brokers = 
{
    init: function()
    {
        brokers.ux.init();
    },
    ux:
    {
        init: function()
        {
            brokers.ux.maps();
            brokers.ux.tables();
        },
        maps: function()
        {
            var stored_maps = [];
            var geo_maps = document.querySelectorAll('.sbp-map');
        	
            geo_maps.forEach(function(geo_map, index)
            {
                var width = $(geo_map).width();
                var height = $(geo_map).height();
                var lat = $(geo_map).attr('data-lat');
                var lng = $(geo_map).attr('data-lng');
                var zoom = $(geo_map).attr('data-zoom');
                
                var mlat = $(geo_map).attr('data-marker-lat');
                var mlng = $(geo_map).attr('data-marker-lng');
                var mhtml = $(geo_map).attr('data-marker-html');
                
                var map_options = 
                {
                    center: [lat, lng],
                    zoom: zoom
                }
                 
                // Creating a map object
                var map = new L.map(geo_map, map_options);
                 
                // Creating a Layer object
                var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
                 
                // Adding layer to the map
                map.addLayer(layer);
                
                if(mlat && mlng && mhtml)
                {
                    L.marker([mlat, mlng]).addTo(map)
                        .bindPopup(mhtml)
                        .openPopup();
                }
                
                //$(google_map).html(map);
            });
        },
        tables: function()
        {
            var stored_tables = [];
            var data_tables = document.querySelectorAll('table.data-table');
            
            /*
                            
            SCROLL FUNCTION

            USED AFTER FILTER, SEARCH, ETC

            */

            var scroll_table = function(this_table)
            {    
                var header_height = $('.dtfh-floatingparent').height();
                if(typeof header_height == 'undefined')
                {
                    header_height = $(this_table).find('thead').height();
                }
                var position = $(this_table).offset().top - header_height;
                $([document.documentElement, document.body]).animate({
                    scrollTop: position
                }, 200);
            }
        	
            data_tables.forEach(async function(data_table, index)
            {
                // Default ordering ...
                var order = [];
                var ajax_source = false;
                var ajax_options = false;
                var table_wrapper = $(data_table).parent();
                
                // Dynamic ordering based on HTML data attributes ...
                if(data_table.getAttribute('data-col'))
                {
                    var direction = 'desc';
                    var col = parseInt(data_table.getAttribute('data-col'));
                    if(data_table.getAttribute('data-direction'))
                    {
                        direction = data_table.getAttribute('data-direction');
                    }
                    order = [[col, direction]];
                }
                
                // AJAX data source based on HTML data attributes ...
                if(data_table.getAttribute('data-ajax') && data_table.getAttribute('data-options'))
                {
                    ajax_source = data_table.getAttribute('data-ajax');
                    ajax_options = data_table.getAttribute('data-options');
                }
                
                /*
                
                SET DEFAULT TABLE OPTIONS
                
                */
                
                var table_options = 
                {
                    autoWidth: false,
                    fixedHeader: 
                    {
                        header: true,
                        headerOffset: $('.navbar.fixed-top').height()
                    },
                    order: order,
                    responsive: true,
                    layout:
                    {
                        topStart: 'info',
                        topEnd: 'search',
                        bottomStart: 'pageLength',
                        bottomEnd: 'paging'
                    },
                    initComplete: function(this_obj, this_data) 
                    {
                        
                        var this_table = this;
                        var ajax_table = true;
                        
                        if(typeof this_data == 'undefined')
                        {
                            ajax_table = false;
                        }
                        
                        this.api().columns().every(function() 
                        {
                            var column = this;
                            var title = column.header().textContent;
                            
                            if(ajax_table)
                            {
                                title = column.footer().textContent;
                            }
                            
                            var titles = title.split(' ');
                            var this_title = titles[titles.length - 1];
                            
                            if($(this_table).find('thead tr').length > 1)
                            {
                         
                                /*

                                SELECT FILTERS

                                */  

                                var select = $('<select><option value="">No Filter</option></select>')
                                    .appendTo($(this_table).find("thead tr:eq(1) th").eq(column.index()).empty())
                                    .on('change', function() 
                                    {
                                        var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                        column
                                            .search( val ? '^'+val+'$' : '', true, false )
                                            .draw();
                                        scroll_table(this_table);
                                    }); 

                                /*

                                SELECT DISPLAY

                                */

                                column.data().unique().sort().each(function(d, j)
                                {
                                    var value = d;
                                    var label = d;

                                    if (d.indexOf('class="avatar"') > -1) 
                                    {
                                        value = $($(this)[j]).attr('data-label');   
                                        label = value;
                                    }
                                    else if (d.indexOf('class="rating"') > -1) 
                                    {
                                        label = $($(this)[j]).attr('data-label');   
                                        value = parseFloat(label).toFixed(1);
                                    }

                                    select.append('<option value="' + value + '">' + label + '</option>');
                                });
                                
                            }
                            
                            /*

                            FOOTER SEARCH COLUMNS
                            
                            */
 
                            if($(this_table).find('tfoot').length > 0)
                            {
                                $('<input type="text" class="form-control" placeholder="Search ' + this_title + '" />')
                                    .appendTo($(column.footer()).empty())
                                    .on('keyup change clear', function()
                                    {
                                        if (column.search() !== this.value) 
                                        {
                                            column.search(this.value).draw();
                                            scroll_table(this_table);
                                        }
                                    });
                            }
                        });
                        
                        // Not sure why this is required :-(
                        
                        setTimeout(function()
                        {
                            this_obj.api.responsive.recalc();
                            this_obj.api.fixedHeader.headerOffset($('.navbar.fixed-top').height());
                        }, 350);
                    }
                }
                
                if($(data_table).hasClass('simple-options'))
                {
                    table_options.layout = false;
                }
                
                /*
                
                GET JSON ???
                
                */
                
                if
                (
                    ajax_source 
                    && ajax_options
                    && typeof data_table_options == 'object'
                    && typeof data_table_options[ajax_options] == 'object'
                )
                {
                    table_options.ajax = ajax_source;
                    table_options.columns = data_table_options[ajax_options];
                }
                
                /*
                
                INITIALIZE TABLE
                
                */
                
                var table = await new DataTable(data_table, table_options);
                stored_tables.push(table);
                
                table.on('page', function() 
                {
                    scroll_table(data_table);
                });
                
                /*
                
                TABLE RESIZE
                
                */
                
                $(window).on("resize", function () 
                {
                    table.responsive.recalc();
                    table.fixedHeader.headerOffset($('.navbar.fixed-top').height());
                })
            });
            
            /*
                
            CUSTOM SORT ACTIONS

            */

            $('body').on('click', '.sorter', async function () 
            {   
                var $this = this;
                var tab = parseInt($(this).attr('data-tab'));
                var column = parseInt($(this).attr('data-col'));
                var direction = $(this).attr('data-direction');

                // TODO - Why does this not work?
                // stored_tables[tab].search("");
                // Must instead loop manually ...
                var cols = stored_tables[tab].columns()[0].length;
                for(i = 0; i < cols; i++)
                {
                    stored_tables[tab].column(i).search("");
                }
                // End of hack :-(

                console.log('direction', direction);


                if(direction == 'asc')
                {
                    var val = 'N/A';
                    stored_tables[tab].column(column).search('^((?!'+val+').)*$', true, false);

                    $($this).attr('data-direction', 'desc');
                }
                else if(direction == 'desc')
                {
                    var val = 'N/A';
                    stored_tables[tab].column(column).search('^((?!'+val+').)*$', true, false);

                    $($this).attr('data-direction', '');
                }
                else
                {
                    stored_tables[tab].column(column).search("");
                    $($this).attr('data-direction', 'asc');
                }
                stored_tables[tab].order([[column, direction]]).draw();
                scroll_table(data_tables[tab]);
            });
        }
    }
}

window.onload = function()
{
    brokers.init();
}