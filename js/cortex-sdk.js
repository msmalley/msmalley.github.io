/*

DEPENDENCIES

-- config.js


OPTIONAL MODULES

-- cortex-evm.js
-- cortex-xrp.js
-- cortex-utxo.js

*/

cortex.sdk = 
{
    api: function(type = false, request = false, params = {})
    {
        return new Promise((resolve, reject) => 
        {
            if(typeof cortex[type].api[request] == 'function')
            {
                cortex[type].api[request](params, function(res)
                {
                    if(res.success)
                    {
                        resolve(res.data);
                    }
                    else
                    {
                        reject(res.message);
                    }
                });
            }
            else
            {
                reject('Invalid API request');
            }
        });
    },
    contracts: function(type = false, request = false, params = {})
    {
        return new Promise((resolve, reject) => 
        {
            if(typeof cortex[type].contracts[request] == 'function')
            {
                cortex[type].contracts[request](params, function(res)
                {
                    if(res.success)
                    {
                        resolve(res.data);
                    }
                    else
                    {
                        reject(res.message);
                    }
                });
            }
            else
            {
                reject('Invalid contract request');
            }
        });
    },
    multisig: function(type = false, request = false, params = {})
    {
        return new Promise((resolve, reject) => 
        {
            if(typeof cortex[type].multisig[request] == 'function')
            {
                cortex[type].multisig[request](params, function(res)
                {
                    if(res.success)
                    {
                        resolve(res.data);
                    }
                    else
                    {
                        reject(res.message);
                    }
                });
            }
            else
            {
                reject('Invalid multisig request');
            }
        });
    },
    prepare: function(type = false, request = false, params = {})
    {
        return new Promise((resolve, reject) => 
        {
            if(typeof cortex[type].prepare[request] == 'function')
            {
                cortex[type].prepare[request](params, function(res)
                {
                    if(res.success)
                    {
                        resolve(res.data);
                    }
                    else
                    {
                        reject(res.message);
                    }
                });
            }
            else
            {
                reject('Invalid prepare request');
            }
        });
    },
    sign: function(type = false, request = false, params = {})
    {
        return new Promise((resolve, reject) => 
        {
            if(typeof cortex[type].sign[request] == 'function')
            {
                cortex[type].sign[request](params, function(res)
                {
                    if(res.success)
                    {
                        resolve(res.data);
                    }
                    else
                    {
                        reject(res.message);
                    }
                });
            }
            else
            {
                reject('Invalid sign request');
            }
        });
    },
    utils: function(type = false, request = false, params = {})
    {
        return new Promise((resolve, reject) => 
        {
            if(typeof cortex[type].utils[request] == 'function')
            {
                cortex[type].utils[request](params, function(res)
                {
                    if(res.success)
                    {
                        resolve(res.data);
                    }
                    else
                    {
                        reject(res.message);
                    }
                });
            }
            else
            {
                reject('Invalid utils request');
            }
        });
    },
    verify: function(type = false, request = false, params = {})
    {
        return new Promise((resolve, reject) => 
        {
            if(typeof cortex[type].verify[request] == 'function')
            {
                cortex[type].verify[request](params, function(res)
                {
                    if(res.success)
                    {
                        resolve(res.data);
                    }
                    else
                    {
                        reject(res.message);
                    }
                });
            }
            else
            {
                reject('Invalid verify request');
            }
        });
    },
    apis: // RESERVED FOR GENERIC APIs - MODULE SPECIFIC APIs TAKE PRIORITY
    {
        rpc: function(params = {}, callback = false)
        {
            var options = 
            {
                method: false,
                data: false,
                key: false,
                key_name: false,
                request: false,
                token: false,
                endpoint: false
            };
            Object.assign(options, params);
            if
            (
                options.method 
                && options.data 
                && options.endpoint 
                && typeof callback == 'function'
            )
            { 
                try
                {
                    var uri = options.endpoint;
                    if(options.token) uri+= '/' + options.token;
                    
                    var key_name = 'API-KEY';
                    if(options.key_name) key_name = options.key_name;

                    var json_request = 
                    {
                        jsonrpc: "2.0",
                        method: options.method,
                        params: options.data,
                        id: 0
                    };
                    
                    if(options.request)
                    {
                        json_request = options.request;
                    }

                    var full_request = 
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(json_request)
                    }
                    
                    if(options.data === true && !options.request)
                    {
                        full_request = 
                        {
                            headers: 
                            {
                                'Content-Type': 'application/json'
                            }
                        }
                    }

                    if(options.key)
                    {
                        full_request.headers[key_name] = options.key;
                    }
                    
                    fetch
                    (
                        uri, 
                        full_request
                    )
                    .then(response => response.json())
                    .then(response => callback(response))
                    .catch(error => callback(false))
                    
                }
                catch(err)
                {
                    var error = err.message;
                    if(typeof err.data != 'undefined' && err.data)
                    {
                        error+= ': ' + err.data;
                    }
                    console.info('error', error);
                    callback({
                        success: false,
                        data: false,
                        message: error
                    });
                }
            }
            else if(typeof callback == 'function')
            {
                callback({
                    success: false,
                    data: options,
                    message: 'Invalid options for rpc'
                });
            }
        }
    },
    get: function(request = false, params = {})
    {
        return new Promise((resolve, reject) => 
        {
            if(typeof cortex.sdk[request].get == 'function')
            {
                cortex.sdk[request].get(params, function(res)
                {
                    if(res.success)
                    {
                        resolve(res.data);
                    }
                    else
                    {
                        reject(res.message);
                    }
                });
            }
            else
            {
                reject('Invalid get request');
            }
        });
    },
    addresses:
    {
        get: async function(params = {}, callback = false)
        {
            var options = 
            {
                seed: false,
                path: false,
                tag: false,
                balances: true,
                object: false,
                cache: false,
                currencies: [ // default is everything
                {
                    type: 'utxo',
                    format: 'all',
                    networks: 
                    [
                        //'bitcoin',
                        'bitcointestnet',
                        //'litecoin',
                        'litecointestnet',
                        //'btccash',
                        //'btccashtestnet',
                        //'dogecoin',
                        'dogecointestnet'
                    ]
                },
                {
                    type: 'evm',
                    format: 'all',
                    networks: 
                    [
                        //'eth',
                        'ckpoa',
                        'ethgoerli',
                        'ethsepolia',
                        //'polygonpos',
                        'polygonmumbai',
                        //'uni',
                        'unigoerli',
                        //'chainlink',
                        'chainlinkgoerli',
                        'usdtpoa'
                    ]
                },
                {
                    type: 'ripple',
                    format: 'all',
                    networks: 
                    [
                        //'xrp',
                        'xrptestnet'
                    ]
                },
                {
                    type: 'solana',
                    format: 'all',
                    networks: 
                    [
                        //'solana',
                        'solanatestnet',
                        'solanadevnet',
                        'usdcdevnet'
                    ]
                },
                {
                    type: 'tron',
                    format: 'all',
                    networks: 
                    [
                        //'tron',
                        //'shasta', // cannot find a working faucet :-( 
                        'nile',
                        'usdtnile'
                    ]
                },
                {
                    type: 'cardano',
                    format: 'all',
                    networks: 
                    [
                        //'cardano',
                        //'cardanopreprod', // API limited to one TEST network on FREE plan
                        'cardanopreview'
                    ]
                }]
            };
            Object.assign(options, params);
            
            var results = 
            {
                success: false,
                message: 'Invalid options for addresses.get',
                data: options
            }
            
            var cache = false;
            if(typeof cortex.ux == 'object' && typeof cortex.ux.cache == 'object')
            {
                cache = await cortex.ux.cache.get('cortex_addresses_get');
            }
            if(!options.cache) cache = false;
            
            if
            (
                (options.seed || options.key)
                && typeof cache != 'object'
                && typeof callback == 'function'
            )
            {
                var settings = [];
                var addresses = {};
                var all_addresses = [];
                
                //for(c = 0; c < options.currencies.length; c++)
                options.currencies.forEach(function(currency, c)
                {
                    var networks = options.currencies[c].networks;
                    for(n = 0; n < networks.length; n++)
                    {
                        var current = cortex.config.currencies[currency.type][networks[n]];
                        var this_currency = 
                        {
                            decimals: current.decimals,
                            symbol: current.symbol,
                            smallest: current.smallest,
                            parent: false,
                            parent_symbol: false,
                            id: false
                        };
                        if(typeof current.parent != 'undefined')
                        {
                            this_currency.parent = current.parent;
                        }
                        if(typeof current.parent_symbol != 'undefined')
                        {
                            this_currency.parent_symbol = current.parent_symbol;
                        }
                        if(typeof current.id != 'undefined')
                        {
                            this_currency.id = current.id;
                        }
                        if(currency.format == 'all')
                        {
                            for(ac = 0; ac < current.formats.length; ac++)
                            {
                                settings.push({
                                    type: currency.type,
                                    format: current.formats[ac],
                                    network: networks[n],
                                    currency: this_currency
                                })
                            }
                        }
                        else
                        {
                            settings.push({
                                type: currency.type,
                                format: currency.format,
                                network: networks[n],
                                currency: this_currency
                            })
                        }
                    }
                });
                
                var ready_to_return = async function()
                {
                    results.success = true;
                    results.message = 'Addresses attached to data';
                    results.data = all_addresses;
                    
                    if(options.object === true)
                    {
                        results.data = {};
                        for(a = 0; a < all_addresses.length; a++)
                        {
                            var t = all_addresses[a].settings.type;
                            var n = all_addresses[a].settings.network;
                            
                            if(typeof results.data[t] == 'undefined')
                            {
                                results.data[t] = {}
                            }
                            if
                            (
                                typeof results.data[t] != 'undefined'
                                && typeof results.data[t][n] == 'undefined'
                            )
                            {
                                results.data[t][n] = [];
                            }
                            results.data[t][n].push(all_addresses[a]);
                        }
                    }
                    
                    if(options.cache)
                    {
                        await cortex.ux.cache.set('cortex_addresses_get', results);
                    }
                    
                    callback(results);
                }
                
                var ready_for_lookup = function()
                {
                    if(options.balances === true)
                    {
                        var lookups = 0;
                        all_addresses.forEach(function(this_address, address_index)
                        {   
                            cortex[this_address.settings.type].api.balance({
                                address: this_address.account.address,
                                network: this_address.settings.network
                            },  function(balance)
                            {
                                if
                                (
                                    balance
                                    && typeof balance == 'object'
                                    && typeof balance.success != 'undefined'
                                    && balance.success === true
                                )
                                {
                                    all_addresses[address_index].balances = balance.data;
                                }
                                lookups++;
                                if(lookups == all_addresses.length)
                                {
                                    ready_to_return();
                                }
                            });
                        });
                    }
                    else
                    {
                        ready_to_return();
                    }
                }
                
                var address_count = 0;
                settings.forEach(function(setting, s)
                {
                    cortex[setting.type].wallet.get({
                        seed: options.seed,
                        key: options.key,
                        path: options.path,
                        tag: options.tag,
                        format: setting.format,
                        network: setting.network
                    },  function(wallet)
                    {
                        if
                        (
                            typeof wallet == 'object'
                            && typeof wallet.data == 'object'
                            && typeof wallet.data.addresses == 'object'
                            && wallet.data.addresses.length > 0
                        )
                        {
                            for(a = 0; a < wallet.data.addresses.length; a++)
                            {
                                all_addresses.push({
                                    account: wallet.data.addresses[a],
                                    settings: 
                                    {
                                        network: setting.network,
                                        type: setting.type,
                                        currency: setting.currency
                                    }
                                })
                            }
                        }
                        address_count++;
                        if(address_count == settings.length)
                        {
                            if(all_addresses.length > 0)
                            {
                                ready_for_lookup();
                            }
                            else
                            {
                                results.message = 'No addresses available';
                                callback(results);
                            }
                        }
                    });
                });
            }
            else if(typeof callback == 'function')
            {
                if(typeof cache == 'object')
                {
                    results = JSON.parse(JSON.stringify(cache));
                }
                callback(results);
            }
        }
    }
};

cortex.utils = 
{
    float: function(num, dec)
    {
        var big_number = BigNumber(num).dividedBy(10 ** dec).toFixed(dec).replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1');
        var nums = big_number.split('.');
        var this_num = parseFloat(nums[0]).toLocaleString('en-GB');
        var display = "" + this_num;
        if
        (
            typeof nums[1] == 'string'
            && nums[1] != '0'
        )
        {
            display+= '.' + nums[1];
        }
        return display;
    },
    keys: async function(seed, network, path)
    {
        var keys = false;
        var btc_network = cortex.utxo.network('bitcoin');
        var selected_network = cortex.utxo.network(network);
        if(selected_network) btc_network = selected_network;

        var hash = btc.crypto.sha256(Buffer.from(
            seed + network
        ), 'utf8').toString('hex');
        var bytes = btc.crypto.sha256(Buffer.from(hash), 'utf8').toString('hex');
        var words = bip39.entropyToMnemonic(Buffer.from(bytes, 'hex'), bip39.wordlists.english);
        var word_seed = await bip39.mnemonicToEntropy(words);
        var root = await bip32ecc.fromSeed
        (
            Buffer.from(word_seed, 'hex'),
            btc_network
        );  

        if(typeof path == 'object' && path.length > 0)
        {
            for(p = 0; p < path.length; p++)
            {
                root = root.derive(parseInt(path[p]));
            }
        }

        try
        {
            keys = 
            {
                raw: root,
                words: words
            }
        }
        catch(e){}

        return keys;
    },
    shorten: function(source = false, front = 4, back = 4, middle = '..')
    {
        var front_text = source.slice(0, front);
        var back_text = source.substr(source.length - back);
        return front_text + middle + back_text;
    }
}