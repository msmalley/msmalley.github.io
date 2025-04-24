/*

DEPENDENICES
    
-- config.js
-- bitcoin.js (FOR HD)

-- solana.js - https://unpkg.com/@solana/web3.js@1.87.4/lib/index.iife.min.js


FAUCETS | CNMzZREjag7hFZFqU5TjNv2KUR1CykWtBsnJGqaoMaYt

-- https://faucet.quicknode.com/solana/devnet/
-- https://solfaucet.com/
-- https://faucet.triangleplatform.com/solana/testnet
-- https://faucet.triangleplatform.com/solana/devnet

*/

cortex.solana = 
{
    api:
    {
        balance: async function(params = {}, callback = false)
        {
            var options = 
            {
                address: false,
                network: 'testnet',
                seed: false,
                memos: true,
                program: false // if seed and program included token balance added
            };
            Object.assign(options, params);
            if
            (
                options.address && options.network
                && typeof cortex.config.currencies.solana[options.network] == 'object'
                && typeof cortex.config.currencies.solana[options.network].api != 'undefined'
                && cortex.config.currencies.solana[options.network].api
                && typeof callback == 'function'
            )
            {
                var results =
                {
                    success: false,
                    message: 'Invalid network for getting Solana balance',
                    data: false
                };
                var node = cortex.solana.network(options.network);
                var debug = false;

                if
                (
                    node
                    && typeof cortex.config.currencies.solana[options.network] == 'object'
                )
                {
                    var endpoint = false;
                    var connection = false;
                    var pk = false;
                    var balance = 0;
                    var nonce = 0;
                    var decimals = cortex.config.currencies.solana[options.network].decimals;
                    
                    if(typeof cortex.config.currencies.solana[options.network].id != 'undefined')
                    {
                        var id = cortex.config.currencies.solana[options.network].id;
                        decimals = cortex.config.currencies.solana[id].decimals;
                    }
                    
                    try
                    {
                        pk = await new solanaWeb3.PublicKey(options.address);
                        endpoint = 'https://corsproxy.io/?' + encodeURIComponent(node);
                        connection = new solanaWeb3.Connection(endpoint);
                        balance = await connection.getBalance(pk); 
                        nonce = await connection.getNonce(pk); 
                    }
                    catch(e){ if(debug){ console.info('solana.balance.error', e) } }
                    
                    results.success = true;
                    results.message = 'Solana balance attached to data';
                    results.data = 
                    {
                        int: parseInt(balance),
                        str: cortex.utils.float(parseInt(balance), decimals),
                        nonce: nonce
                    };
                    
                    var tokens = false;
                    
                    var ata_address = false;
                    var mint_address = false;
                    var token_address = false;

                    try // TODO - remove this quick fix for eden demo
                    {
                        ata_address = cortex.config.currencies.solana[options.network].contracts.ata;
                        token_address = cortex.config.currencies.solana[options.network].contracts.tp;
                        if(typeof cortex.config.currencies.solana[options.network].parent_mint != 'undefined')
                        {
                            mint_address = cortex.config.currencies.solana[options.network].parent_mint;
                        }
                        else
                        {
                            mint_address = cortex.config.currencies.solana[options.network].parent;
                        }
                    }
                    catch(e){}
                    
                    if(mint_address && ata_address && token_address)
                    {
                        try
                        {
                            var ck = new solanaWeb3.PublicKey(mint_address);
                            var ta = await connection.getTokenAccountsByOwner(pk, {mint: ck});
                            var tak = ta.value[0].pubkey;
                            var tpk = await connection.getTokenAccountBalance(tak);
                            tokens = {
                                int: BigNumber(tpk.value.amount).toNumber(),
                                decimals: parseInt(tpk.value.decimals)
                            };
                        }
                        catch(e){ }
                    }
                    
                    if(typeof tokens == 'object')
                    {
                        results.data.tokens = tokens.int;
                        results.data.token = cortex.utils.float(
                            results.data.tokens, 
                            parseInt(tokens.decimals)
                        );
                    }
                    
                    if(options.memos)
                    {
                        if(options.network == 'solanadevnet')
                        {
                            endpoint = 'https://docs-demo.solana-devnet.quiknode.pro/';
                            connection = new solanaWeb3.Connection(endpoint);
                        }
                        var signatures = await connection.getSignaturesForAddress(pk, {limit:100});
                        var memos = [];
                        signatures.forEach(function(memo, i)
                        {
                            if(typeof memo.memo != 'undefined' && memo.memo)
                            {
                                var m = memo.memo.split('] ')[1];
                                var md = marked.parse(m);
                                memos.push({
                                    ago: cortex.utils.ago(memo.blockTime * 1000),
                                    id: cortex.utils.shorten(memo.signature),
                                    ts: memo.blockTime,
                                    txid: memo.signature,
                                    memo: m,
                                    md: md
                                })
                            }
                        });
                        results.data.memos = memos;
                        results.data.counts = 
                        {
                            memos: memos.length
                        };
                    }

                    callback(results);
                }
                else
                {
                    callback(results);
                }
            }
            else if(typeof callback == 'function')
            {
                callback(results);
            }
        },
        relay: async function(params = {}, callback = false)
        {
            var options = 
            {
                tx: false,
                network: false
            };
            Object.assign(options, params);
            var results =
            {
                success: false,
                message: 'Invalid options for relaying solana transaction',
                data: options
            };
            if
            (
                options.tx && options.network
                && typeof cortex.config.currencies.solana[options.network] == 'object'
                && typeof cortex.config.currencies.solana[options.network].api != 'undefined'
                && cortex.config.currencies.solana[options.network].api
                && typeof callback == 'function'
            )
            {
                results.message = 'Invalid network for relaying solana transaction';
                
                var net = cortex.solana.network(options.network);

                if
                (
                    net
                    && typeof cortex.config.currencies.solana[options.network] == 'object'
                )
                {
                    var txid = false;
                    var error = false;

                    try
                    {
                        txid = false;
                        var endpoint = 'https://corsproxy.io/?' + encodeURIComponent(net);
                        var connection = new solanaWeb3.Connection(endpoint);
                        var raw_tx = Buffer.from(options.tx, 'hex');
                        txid = await connection.sendRawTransaction(raw_tx);
                    }
                    catch(e){ error = e; console.info('solana.relay.error', e) }

                    if(txid)
                    {
                        results.success = true;
                        results.message = 'Solana transaction ID attached to data';
                        results.data = 
                        {
                            txid: txid
                        };
                    }
                    else
                    {
                        results.message = 'Unable to relay solana transaction';
                        if(error)
                        {
                            results.message+= ':<hr>' + error;
                        }
                    }
                    callback(results);
                }
                else
                {
                    callback(results);
                }
            }
            else if(typeof callback == 'function')
            {
                callback(results);
            }
        }
    },
    network: function(network)
    {
        let node = false;
        
        try
        {
            node = cortex.config.currencies.solana[network].api;
        }
        catch(e){}
        
        return node;
    },
    keys:
    {
        get: function(params = {}, callback = false)
        {
            var options = 
            {
                seed: false,
                path: false,
                format: 'all',
                network: 'testnet',
                private: false
            };
            Object.assign(options, params);
            if
            (
                options.seed && options.network && options.format 
                && typeof callback == 'function'
            )
            {
                var results =
                {
                    success: false,
                    message: 'Invalid network for getting Solana keys',
                    data: false
                };
                var net_obj = cortex.solana.network(options.network);

                if(net_obj)
                {
                    var s = false;
                    var seeds = false;
                    var msg = false;

                    async function get_seed()
                    {
                        var hd_keys = await cortex.utils.keys
                        (
                            options.seed, 
                            options.network, 
                            options.path
                        );
                        
                        if(typeof hd_keys == 'object')
                        {
                            var kp = solanaWeb3.Keypair.fromSeed(hd_keys.raw.privateKey);   
                            var pk = new solanaWeb3.PublicKey(kp._keypair.publicKey);
                            
                            var keys = 
                            {
                                pub: pk.toString()
                            }
                            
                            if(!options.private)
                            {
                                keys.key = Buffer.from(kp._keypair.secretKey).toString('hex');
                                keys.words = hd_keys.words;
                            }
                            
                            results.success = true;
                            results.message = 'Solana keys attached to data';
                            results.data = keys;
                            callback(results);
                        }
                        else
                        {
                            results.message = 'Unable to construct Solana seed';
                            if(msg)
                            {
                                results.message+= ': ' + msg;
                            }
                            callback(results);
                        }
                    };
                    get_seed();
                }
                else
                {
                    callback(results);
                }
            }
        }
    },
    addresses:
    {
        get: function(params = {}, callback = false)
        {
            var options = 
            {
                key: false,
                seed: false,
                path: false,
                tag: false,
                network: 'testnet',
                format: 'all'
            };
            Object.assign(options, params);
            if
            (
                (options.seed || options.key) 
                && options.network && options.format 
                && typeof callback == 'function'
            )
            {
                var results =
                {
                    success: false,
                    message: 'Invalid network for getting Solana address',
                    data: false
                };
                var net_obj = cortex.solana.network(options.network);
                
                if(net_obj)
                {
                    var getAddresses = async function(key, private = false, words = false)
                    {
                        var addresses = [];
                        var error = false;
                        var wallet = false;
                        var cortex_address = false;

                        try
                        {
                            
                            wallet = true;
                        }
                        catch(e){}
                        
                        if(wallet && (options.format == 'all' || options.format == 'pk') && cortex.solana.addresses.supported(options.network, 'pk'))
                        {
                            try
                            {   
                                cortex_address = {
                                    address: key,
                                    short: cortex.utils.shorten(key),
                                    format: 'pk',
                                    pub: key
                                };
                            }
                            catch(e){ error = e; }
                            
                            if(typeof cortex_address == 'object')
                            {
                                if(!options.private)
                                {
                                    cortex_address.key = private;
                                    cortex_address.words = words;
                                }
                                addresses.push(cortex_address);
                            }
                            
                            cortex_address = false;
                        }
                        
                        if(wallet && (options.format == 'all' || options.format == 'stp') && cortex.solana.addresses.supported(options.network, 'stp'))
                        {
                            try
                            {  
                                // TODO - fix this and recreate to test new dynamic prepare X 2 !!!
                                
                                /*
                                
                                // NOT NEEDED AS THIS SHOULD BE HANDLE BY TX PREPARE
                                
                                // NEED A NORMAL ADDRESS TO GET SOL ON
                                
                                var parent = false;
                                var ata_address = false;
                                var token_address = false;

                                try
                                {
                                    ata_address = cortex.config.currencies.solana[options.network].contracts.ata;
                                    token_address = cortex.config.currencies.solana[options.network].contracts.tp;
                                    parent = cortex.config.currencies.solana[options.network].parent;
                                }
                                catch(e){ error = e; console.info('solana.e1', e) }

                                if
                                (
                                    parent
                                    && ata_address 
                                    && token_address
                                )
                                {
                                    var pk = new solanaWeb3.PublicKey(key);
                                    var mint = new solanaWeb3.PublicKey(parent);
                                    var token = new solanaWeb3.PublicKey(token_address);
                                    var ata = new solanaWeb3.PublicKey(ata_address);

                                    var source = await solanaWeb3.PublicKey.findProgramAddress
                                    (
                                        [pk.toBuffer(), token.toBuffer(), mint.toBuffer()],
                                        ata
                                    )
                                    
                                    var source_address = new solanaWeb3.PublicKey(source[0]);
                        
                                    var address = source_address.toBase58();

                                    cortex_address = {
                                        address: address,
                                        short: cortex.utils.shorten(address),
                                        format: 'stp',
                                        pub: address
                                    };
                                }
                                
                                */
                                
                                cortex_address = {
                                    address: key,
                                    short: cortex.utils.shorten(key),
                                    format: 'stp',
                                    pub: key
                                };
                            }
                            catch(e){ error = e; console.info('solana.e2', e) }
                            
                            if(typeof cortex_address == 'object')
                            {
                                if(!options.private)
                                {
                                    cortex_address.key = private;
                                    cortex_address.words = words;
                                }
                                addresses.push(cortex_address);
                            }
                            
                            cortex_address = false;
                        }
                        
                        if(addresses.length > 0 && !error)
                        {
                            results.success = true;
                            results.message = 'Solana addresses attached to data';
                            results.data = addresses;
                            callback(results);
                        }
                        else
                        {
                            results.message = 'Invalid Solana address format';
                            if(error)
                            {
                                results.message+= ': ' + error;
                            }
                            callback(results);
                        }
                    }
                    
                    if(options.seed)
                    {
                        cortex.solana.keys.get(options, function(k)
                        {
                            if(k.success)
                            {
                                if(options.private)
                                {
                                    getAddresses(k.data.pub);
                                }
                                else
                                {
                                    getAddresses(k.data.pub, k.data.key, k.data.words);
                                }
                            }
                            else
                            {
                                results.message = k.message;
                                callback(results);
                            }
                        })
                    }
                    else
                    {
                        getAddresses(options.key);
                    }
                }
                else
                {
                    callback(results);
                }
            }
        },
        supported: function(network = false, format = false)
        {
            var supported = false;
            if
            (
                typeof cortex.config.currencies.solana[network] == 'object'
                && typeof cortex.config.currencies.solana[network].formats == 'object'
                && cortex.config.currencies.solana[network].formats.length > 0
            )
            for(f = 0; f < cortex.config.currencies.solana[network].formats.length; f++)
            {
                var type = cortex.config.currencies.solana[network].formats[f];
                if(format && type == format)
                {
                    supported = true;
                }
            }
            return supported;
        }
    },
    wallet:
    {
        get: function(params = {}, callback = false)
        {
            var options = 
            {
                key: false,
                seed: false,
                path: false,
                network: 'testnet',
                format: 'all'
            };
            Object.assign(options, params);
            if
            (
                (options.seed || options.key) 
                && options.network && options.format 
                && typeof callback == 'function'

                // be sure only one of the four inputs is used ...
                
                && ! (options.seed && options.key) 
            )
            {
                var results =
                {
                    success: false,
                    message: 'Unable to get Solana addresses',
                    data: false
                };
                
                var get_addresses = function(opt, keys, specified_address = false)
                {
                    cortex.solana.addresses.get(opt, function(a)
                    {
                        if(a.success)
                        {
                            var addresses = a.data;
                            if(specified_address)
                            {
                                new_addresses = [];
                                for(a = 0; a < addresses.length; a++)
                                {
                                    if(addresses[a].address == specified_address)
                                    {
                                        new_addresses.push(addresses[a]);
                                    }
                                }
                                addresses = JSON.parse(JSON.stringify(new_addresses));
                            }
                            var wallet = 
                            {
                                counts:
                                {
                                    addresses: addresses.length
                                },
                                keys: keys,
                                addresses: addresses
                            };
                            results.success = true;
                            results.message = 'Solana wallet attached to data';
                            results.data = wallet;
                            callback(results);
                        }
                        else
                        {
                            results.message = a.message;
                            callback(results);
                        }
                    });
                }
                if(options.seed)
                {
                    cortex.solana.keys.get(options, function(k)
                    {
                        if(k.success)
                        {
                            var keys = k.data;
                            get_addresses(options, [keys]);
                        }
                        else
                        {
                            results.message = k.message;
                            callback(results);
                        }
                    });
                }
                else
                {
                    get_addresses(options, [{ pub: options.key}]);
                }
            }
            else if(typeof callback == 'function')
            {
                callback({
                    success: false,
                    message: 'Invalid options for solana.wallet.get function',
                    data: false
                })
            }
        }
    },
    multisig:
    {
        address: async function(params = {}, callback = false)
        {
            var options = 
            {
                key: false,
                format: false,
                keys: false,
                threshold: false,
                network: false
            };
            Object.assign(options, params);
            var results = 
            {
                success: false,
                message: 'Invalid options for solana.multisig.address',
                data: options
            }
            if
            (
                options.key
                && options.format
                && typeof options.keys == 'object'
                && options.keys.length > 0
                && parseInt(options.threshold) > 1
                && parseInt(options.threshold) <= (options.keys.length + 1)
                && cortex.solana.network(options.network)
                && typeof callback == 'function'
            )
            {
                results.message = 'Unable to process solana.multisig.address';
                
                var seed = false;
                var this_address = false;
                var address_keys = false;
                var unique_addresses = false;
                var node = cortex.solana.network(options.network);
                
                try
                {
                    var public_key = cortex.solana.utils.from_private_key(options.key);
                    var threshold = parseInt(options.threshold);
                    
                    var addresses = [ public_key ];
                    address_keys = [ ];
                    for(p = 0; p < options.keys.length; p++)
                    {
                        addresses.push(options.keys[p]);
                    }
                    addresses.sort();
                    unique_addresses = addresses.filter(function(item, pos, self) 
                    {
                        return self.indexOf(item) == pos;
                    });
                    
                    if(threshold <= unique_addresses.length)
                    {   
                        var ready = false;
                        var address = false;
                        var members = [];
                        
                        // And then ?
                    }
                    else
                    {
                        results.message = 'Threshold higher than unique solana keys';
                    }
                }
                catch(e){ console.info('solana.multisig.address.e', e) }
                
                callback(results);
            }
            else if(typeof callback == 'function')
            {
                callback(results);
            }
        },
        validate: async function(params = {}, callback = false)
        {
            var options = 
            {
                address: false,
                script: false,
                format: false,
                network: false
            };
            Object.assign(options, params);
            var results = 
            {
                success: false,
                message: 'Invalid options for solana.multisig.validate',
                data: options
            }
            if
            (
                options.address && options.format
                && cortex.solana.network(options.network)
                && typeof callback == 'function'
            )
            {
                results.message = 'Unable to validate solana multisig account';
                
                var keys = false;
                var addresses = false;
                var threshold = false;
                
                try
                {
                    
                }
                catch(e){ console.info('solana.multisig.validate.e', e) }
                
                if
                (
                    typeof addresses == 'object' 
                    && threshold && parseInt(threshold) > 1
                )
                {
                    results.success = true;
                    results.message = 'Solana multisig account attached to data';
                    results.data = 
                    {
                        address: options.address,
                        format: options.format,
                        short: cortex.utils.shorten(options.address),
                        addresses: addresses,
                        threshold: threshold,
                        ready: true,
                        redeem: false
                    }
                }
                callback(results);
            }
            else if(typeof callback == 'function')
            {
                callback(results);
            }
        }
    },
    prepare:
    {
        multisig: async function(params = {}, callback = false)
        {
            var options = 
            {
                from: false,
                destination: false,
                amount: false,
                network: false,
                format: false,
                method: 'submitTransaction',
                script: false,
                batch: true, // use batched signatures ?
                key: false, // private key
                memo: false, // only for non-contract calls
                fees: false
            };
            Object.assign(options, params);
            var results = 
            {
                success: false,
                message: 'Invalid options for solana.prepare.multisig',
                data: options
            }

            if
            (
                options.from
                && options.key
                && options.fees
                && options.format
                && options.script
                && parseInt(options.amount) > 0
                && cortex.solana.network(options.network)
                && typeof callback == 'function'
            )
            {   
                var wallet = await cortex.sdk.multisig('solana', 'validate', {
                    address: options.from,
                    script: options.script,
                    format: options.format,
                    network: options.network
                }).catch(error => wallet = error);
                
                if(wallet && typeof wallet.address != 'undefined' && wallet.address == options.from)
                {
                    
                }
                else
                {
                    callback(results);
                }
            }
            else if(typeof callback == 'function')
            {
                callback(results);
            }
        },
        send: async function(params = {}, callback = false)
        {
            var options = 
            {
                destination: false,
                amount: false,
                network: false,
                format: false,
                key: false,
                memo: false,
                fees: false
            };
            Object.assign(options, params);
            var results = 
            {
                success: false,
                message: 'Invalid options for solana.prepare.send',
                data: options
            }
            
            var valid_address = false;
            try
            {
                var pubkey = new solanaWeb3.PublicKey(options.destination);
                valid_address = solanaWeb3.PublicKey.isOnCurve(pubkey.toBuffer());
            }
            catch(e){}
            
            if
            (
                valid_address
                && options.key
                && options.fees
                && options.format
                && parseInt(options.amount) > 0
                && cortex.solana.network(options.network)
                && typeof callback == 'function'
            )
            {
                var node = cortex.solana.network(options.network);
                
                // CHECK FEES / LAST
                
                if(options.fees === 'auto')
                {
                    try
                    {
                        
                    }
                    catch(e){}
                }
                
                var unsigned_tx = false;
                
                try
                {       
                    var pk = new solanaWeb3.PublicKey(options.key);
                    var dpk = new solanaWeb3.PublicKey(options.destination);
                    var endpoint = 'https://corsproxy.io/?' + encodeURIComponent(node);
                    var connection = new solanaWeb3.Connection(endpoint);

                    var recentBlockhash = await connection.getRecentBlockhash();
                    var tx = new solanaWeb3.Transaction({
                        recentBlockhash: recentBlockhash.blockhash,
                        feePayer: pk,
                    });
                    
                    var parent = false;
                    var ata_address = false;
                    var memo_address = false;
                    var token_address = false;
                    
                    try
                    {
                        ata_address = cortex.config.currencies.solana[options.network].contracts.ata;
                        token_address = cortex.config.currencies.solana[options.network].contracts.tp;
                        memo_address = cortex.config.currencies.solana[options.network].contracts.memo;
                    }
                    catch(e){}
                    
                    try
                    {
                        if(!parent)
                        {
                            parent = cortex.config.currencies.solana[options.network].parent;
                        }
                    }
                    catch(e){}
                    
                    if(parent && !options.contract)
                    {
                        options.contract = parent;
                    }
                    
                    if
                    (
                        options.contract
                        && ata_address 
                        && token_address
                    )
                    {
                        var mint = new solanaWeb3.PublicKey(options.contract);
                        var token = new solanaWeb3.PublicKey(token_address);
                        var ata = new solanaWeb3.PublicKey(ata_address);
                        
                        var source = await solanaWeb3.PublicKey.findProgramAddress
                        (
                            [pk.toBuffer(), token.toBuffer(), mint.toBuffer()],
                            ata
                        )
                        
                        var destination = await solanaWeb3.PublicKey.findProgramAddress
                        (
                            [dpk.toBuffer(), token.toBuffer(), mint.toBuffer()],
                            ata
                        )
                        
                        var source_token_address = new solanaWeb3.PublicKey(source[0]);
                        var destination_address = new solanaWeb3.PublicKey(destination[0]);
                        
                        // check if destination matches / exists
                        var ta = await connection.getTokenAccountsByOwner(dpk, {mint: mint});
                        var tak = false;
                        
                        try
                        {
                            var mk = ta.value[0].pubkey;
                            if(mk == destination_address)
                            {
                                tak = mk;
                            }
                        }
                        catch(e){}
                        
                        if(!tak)
                        {   
                            var syskey = solanaWeb3.SystemProgram.programId;
                            
                            var activate_keys = 
                            [
                                { pubkey: pk, isSigner: true, isWritable: true },
                                { pubkey: destination_address, isSigner: false, isWritable: true },
                                { pubkey: dpk, isSigner: false, isWritable: false },
                                { pubkey: mint, isSigner: false, isWritable: false },
                                { pubkey: syskey, isSigner: false, isWritable: false },
                                { pubkey: token, isSigner: false, isWritable: false },
                            ];
                            
                            await tx.add(
                                new solanaWeb3.TransactionInstruction({
                                    keys: activate_keys,
                                    data: Buffer.from([1]),
                                    programId: ata,
                                })
                            );
                        }
                        
                        // if not - InitializeAccount first ...? // can be chained in same TX ?
                        
                        var token_keys = 
                        [
                            { pubkey: source_token_address, isSigner: false, isWritable: true },
                            { pubkey: destination_address, isSigner: false, isWritable: true },
                            { pubkey: pk, isSigner: true, isWritable: true }, // owner
                            { pubkey: pk, isSigner: true, isWritable: true } // owner multisigner
                        ];
                        
                        var layout = BufferLayout.struct(
                        [
                            BufferLayout.u8('instruction'),
                            BufferLayout.nu64('amount')
                        ]);
                        
                        var data = Buffer.alloc(layout.span);
                        layout.encode(
                            {
                                instruction: cortex.solana.utils.types.Transfer,
                                amount: BigNumber(options.amount)
                            },
                            data
                        );
                        
                        await tx.add(
                            new solanaWeb3.TransactionInstruction({
                                keys: token_keys,
                                data: data,
                                programId: token,
                            })
                        );
                    }
                    else
                    {
                        await tx.add(
                            solanaWeb3.SystemProgram.transfer({
                                fromPubkey: pk,
                                toPubkey: dpk,
                                lamports: parseInt(options.amount)
                            }),
                        );
                    }
                    
                    if(options.memo && memo_address)
                    {   
                        var memo_key = new solanaWeb3.PublicKey(memo_address);
                        await tx.add(
                            new solanaWeb3.TransactionInstruction({
                                keys: [{ 
                                    pubkey: pk, 
                                    isSigner: true, 
                                    isWritable: true 
                                }],
                                data: Buffer.from(options.memo, "utf-8"),
                                programId: memo_key,
                            })
                        );
                    }
                    
                    var buffed_tx = await tx.serialize({verifySignatures:false}); 
                    unsigned_tx = Buffer.from(buffed_tx).toString('hex'); 
                }
                catch(e)
                {
                    console.info('solana.prepare.send.e', e);
                }
                
                if(unsigned_tx)
                {
                    results.success = true;
                    results.message = 'Unsigned solana transaction attached to data';
                    results.data =
                    {
                        hex: unsigned_tx
                    }
                }
                
                callback(results);
            }
            else if(typeof callback == 'function')
            {
                callback(results);
            }
        }
    },
    sign:
    {
        message: async function(params = {}, callback = false)
        {
            var options = 
            {
                message: false,
                network: false,
                key: false
            };
            Object.assign(options, params);
            var results = 
            {
                success: false,
                message: 'Invalid options for solana.sign.message',
                data: options
            }            
            if
            (
                options.message
                && options.key
                && cortex.solana.network(options.network)
                && typeof options.message == 'string'
                && typeof callback == 'function'
            )
            {
                results.message = 'Unable to sign solana message';
                
                var signature = false;
                
                try
                {
                    var key = Buffer.from(options.key, 'hex');
                    var message = Buffer.from(options.message, 'utf8');
                    signature = Buffer.from(nacl.sign.detached(message, key)).toString('hex');
                }
                catch(e){}
                
                if(signature)
                {
                    results.success = true;
                    results.message = 'Signed solana message attached to data';
                    results.data = 
                    {
                        hex: signature
                    };
                }
                callback(results);
            }
            else if(typeof callback == 'function')
            {
                callback(results);
            }
        },
        transaction: async function(params = {}, callback = false)
        {
            var options = 
            {
                tx: false,
                network: false,
                key: false
            };
            Object.assign(options, params);
            var results = 
            {
                success: false,
                message: 'Invalid options for solana.sign.transaction',
                data: options
            }
            
            if
            (
                options.tx
                && options.key
                && cortex.solana.network(options.network)
                && typeof callback == 'function'
            )
            {
                var signed_tx = false;
                
                var kp = solanaWeb3.Keypair.fromSecretKey(Buffer.from(options.key, 'hex'));
                var tx = solanaWeb3.Transaction.from(Buffer.from(options.tx, 'hex'));
                var message = tx.serializeMessage();
                
                var msg = solanaWeb3.Message.from(message);
                var signature = nacl.sign.detached(message, Buffer.from(options.key, 'hex'));
                
                tx.addSignature(kp.publicKey, signature);
                
                var signed_tx = tx.serialize();
                
                if(signed_tx)
                {
                    results.success = true;
                    results.message = 'Signed solana transaction attached to data';
                    results.data = 
                    {
                        hex: Buffer.from(signed_tx).toString('hex')
                    };
                }
                callback(results);
            }
            else if(typeof callback == 'function')
            {
                callback(results);
            }
        }
    },
    verify:
    {
        message: async function(params = {}, callback = false)
        {
            var options = 
            {
                message: false,
                network: false,
                signature: false,
                address: false
            };
            Object.assign(options, params);
            var results = 
            {
                success: false,
                message: 'Invalid options for solana.verify.message',
                data: options
            }            
            if
            (
                options.message
                && options.address
                && options.signature
                && cortex.solana.network(options.network)
                && typeof callback == 'function'
            )
            {
                results.message = 'Unable to verify solana message';
                
                var verified = false;
                
                try
                {
                    var message = Buffer.from(options.message, 'utf8');
                    var signature = Buffer.from(options.signature, 'hex');
                    var key = new solanaWeb3.PublicKey(options.address).toBuffer();
                    verified = nacl.sign.detached.verify(message, signature, key)
                }
                catch(e){ console.info('solana.verify.e', e) }
                
                if(verified)
                {
                    results.success = true;
                    results.message = 'Solana message verified';
                    results.data = 
                    {
                        verified: verified
                    };
                }
                callback(results);
            }
            else if(typeof callback == 'function')
            {
                callback(results);
            }
        }
    },
    utils:
    {
        from_private_key: function(priv_hex = false)
        {
            var kp = solanaWeb3.Keypair.fromSecretKey(Buffer.from(priv_hex, 'hex'));
            var pk = new solanaWeb3.PublicKey(kp.publicKey);
            return pk.toBase58();
        },
        types:
        {
            InitializeMint: 0,
            InitializeAccount: 1,
            InitializeMultisig: 2,
            Transfer: 3,
            Approve: 4,
            Revoke: 5,
            SetAuthority: 6,
            MintTo: 7,
            Burn: 8,
            CloseAccount: 9,
            FreezeAccount: 10,
            ThawAccount: 11,
            TransferChecked: 12,
            ApproveChecked: 13,
            MintToChecked: 14,
            BurnChecked: 15,
            InitializeAccount2: 16,
            SyncNative: 17,
            InitializeAccount3: 18,
            InitializeMultisig2: 19,
            InitializeMint2: 20,
            GetAccountDataSize: 21,
            InitializeImmutableOwner: 22,
            AmountToUiAmount: 23,
            UiAmountToAmount: 24,
            InitializeMintCloseAuthority: 25,
            TransferFeeExtension: 26,
            ConfidentialTransferExtension: 27,
            DefaultAccountStateExtension: 28,
            Reallocate: 29,
            MemoTransferExtension: 30,
            CreateNativeMint: 31,
            InitializeNonTransferableMint: 32,
            InterestBearingMintExtension: 33,
            CpiGuardExtension: 34,
            InitializePermanentDelegate: 35,
            TransferHookExtension: 36,
            // ConfidentialTransferFeeExtension = 37,
            // WithdrawalExcessLamports = 38,
            MetadataPointerExtension: 39,
            GroupPointerExtension: 40,
            GroupMemberPointerExtension: 41
        }
    }
};