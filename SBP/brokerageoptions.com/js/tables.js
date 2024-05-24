var data_table_options = 
{
    brokers:
    [
        { data: 'broker', render: function(value, type, entry)
        {
            if
            (
                type == 'display' 
                && typeof entry.avatar != 'undefined'
                && entry.avatar
            )
            {
                var title = JSON.parse(JSON.stringify(value));
                var value = '<img class="avatar" src="../../img/' + entry.avatar;
                value+= '" data-label="Interactive Broker" />' + title;
            }

            return value;
        }},
        { data: 'founded' },
        { data: { _: 'stock_fee', sort: 'stock_cents' }, type: 'num' },
        { data: 'eurusd_spread' },
        { data: { _: 'options_fee', sort: 'options_cents' }, type: 'num' },
        { data: 'sap500_spread' },
        { data: 'url', render: function(value, type, entry)
        {
            if(type == 'display')
            {
                var url = JSON.parse(JSON.stringify(value));
                value = '<a href="https://' + url + '" target="_blank">' + url + '</a>';
            }
            return value;
        }},
        { data: 'star_rating', render: function(value, type, entry)
        {
            if(type == 'display')
            {
                var label = JSON.parse(JSON.stringify(value));

                var value = '<small class="rating" data-label="' + label + '">';

                if(label == '5.0')
                {
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                }
                if(label == '4.5')
                {
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-regular fa-star-half-stroke"></i>';
                }
                if(label == '4.0')
                {
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                }
                if(label == '3.5')
                {
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-regular fa-star-half-stroke"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                }
                if(label == '3.0')
                {
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                }
                if(label == '2.5')
                {
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-regular fa-star-half-stroke"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                }
                if(label == '2.0')
                {
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                }
                if(label == '1.5')
                {
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-regular fa-star-half-stroke"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                }
                if(label == '1.0')
                {
                    value+= '<i class="fa-solid fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                }
                if(label == '0.5')
                {
                    value+= '<i class="fa-regular fa-star-half-stroke"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                }
                if(label == '0')
                {
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                    value+= '<i class="fa-regular fa-star"></i>';
                }
                value+= '</small>';
            }
            return value;

        }}
    ]
}