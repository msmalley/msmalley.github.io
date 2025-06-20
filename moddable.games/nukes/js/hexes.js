var map_hexes = 
{
    r2: 
    {
        layout: "odd-r",
        rings: 2, // 12 hexes
        bases:
        {
            p2: ['R2D4','R2D10'],
            p3: ['R2D1','R2D5','R2D9'],
            p4: ['R2D2','R2D6','R2D8','R2D12'],
            p6: ['R2D2','R2D4','R2D6','R2D8','R2D10','R2D12']
        },
        hexes:
        {
            R1D1:{q:1,r:3,type:"random"},
            R1D2:{q:2,r:2,type:"random"},
            R1D3:{q:1,r:1,type:"random"},
            R1D4:{q:0,r:1,type:"random"},
            R1D5:{q:0,r:2,type:"random"},
            R1D6:{q:0,r:3,type:"random"},
            R2D1:{q:1,r:4,type:"random"},
            R2D2:{q:2,r:4,type:"random"},
            R2D3:{q:2,r:3,type:"random"},
            R2D4:{q:3,r:2,type:"base"},
            R2D5:{q:2,r:1,type:"random"},
            R2D6:{q:2,r:0,type:"random"},
            R2D7:{q:1,r:0,type:"random"},
            R2D8:{q:0,r:0,type:"random"},
            R2D9:{q:-1,r:1,type:"random"},
            R2D10:{q:-1,r:2,type:"base"},
            R2D11:{q:-1,r:3,type:"random"},
            R2D12:{q:0,r:4,type:"random"},
            R0:{q:1,r:2,type:"random"}
        }
    },
    r3: 
    {
        layout: "odd-r",
        rings: 3, // 18 hexes
        bases:
        {
            p2: ['R3D5','R3D14'],
            p3: ['R3D5','R3D11','R3D17'],
            p4: ['R3D2','R3D8','R3D11','R3D17'],
            p6: ['R3D2','R3D5','R3D8','R3D11','R3D14','R3D17']
        },
        hexes:
        {
            R1D1:{q:1,r:3,type:"random"},
            R1D2:{q:2,r:2,type:"random"},
            R1D3:{q:1,r:1,type:"random"},
            R1D4:{q:0,r:1,type:"random"},
            R1D5:{q:0,r:2,type:"random"},
            R1D6:{q:0,r:3,type:"random"},
            R2D1:{q:1,r:4,type:"random"},
            R2D2:{q:2,r:4,type:"random"},
            R2D3:{q:2,r:3,type:"random"},
            R2D4:{q:3,r:2,type:"random"},
            R2D5:{q:2,r:1,type:"random"},
            R2D6:{q:2,r:0,type:"random"},
            R2D7:{q:1,r:0,type:"random"},
            R2D8:{q:0,r:0,type:"random"},
            R2D9:{q:-1,r:1,type:"random"},
            R2D10:{q:-1,r:2,type:"random"},
            R2D11:{q:-1,r:3,type:"random"},
            R2D12:{q:0,r:4,type:"random"},
            R3D1:{q:1,r:5,type:"random"},
            R3D2:{q:2,r:5,type:"random"},
            R3D3:{q:3,r:4,type:"random"},
            R3D4:{q:3,r:3,type:"random"},
            R3D5:{q:4,r:2,type:"base"},
            R3D6:{q:3,r:1,type:"random"},
            R3D7:{q:3,r:0,type:"random"},
            R3D8:{q:2,r:-1,type:"random"},
            R3D9:{q:1,r:-1,type:"random"},
            R3D10:{q:0,r:-1,type:"random"},
            R3D11:{q:-1,r:-1,type:"random"},
            R3D12:{q:-1,r:0,type:"random"},
            R3D13:{q:-2,r:1,type:"random"},
            R3D14:{q:-2,r:2,type:"base"},
            R3D15:{q:-2,r:3,type:"random"},
            R3D16:{q:-1,r:4,type:"random"},
            R3D17:{q:-1,r:5,type:"random"},
            R3D18:{q:0,r:5,type:"random"},
            R0:{q:1,r:2,type:"random"}
        }
    },
    r4: 
    {
        layout: "odd-r",
        rings: 4, // 24 hexes
        bases:
        {
            p2: ['R4D7','R4D19'],
            p3: ['R4D7','R4D15','R4D23'],
            p4: ['R4D3','R4D11','R4D15','R4D23'],
            p6: ['R4D3','R4D7','R4D11','R4D15','R4D19','R4D23']
        },
        hexes:
        {
            R1D1:{q:1,r:3,type:"random"},
            R1D2:{q:2,r:2,type:"random"},
            R1D3:{q:1,r:1,type:"random"},
            R1D4:{q:0,r:1,type:"random"},
            R1D5:{q:0,r:2,type:"random"},
            R1D6:{q:0,r:3,type:"random"},
            R2D1:{q:1,r:4,type:"random"},
            R2D2:{q:2,r:4,type:"random"},
            R2D3:{q:2,r:3,type:"random"},
            R2D4:{q:3,r:2,type:"random"},
            R2D5:{q:2,r:1,type:"random"},
            R2D6:{q:2,r:0,type:"random"},
            R2D7:{q:1,r:0,type:"random"},
            R2D8:{q:0,r:0,type:"random"},
            R2D9:{q:-1,r:1,type:"random"},
            R2D10:{q:-1,r:2,type:"random"},
            R2D11:{q:-1,r:3,type:"random"},
            R2D12:{q:0,r:4,type:"random"},
            R3D1:{q:1,r:5,type:"random"},
            R3D2:{q:2,r:5,type:"random"},
            R3D3:{q:3,r:4,type:"random"},
            R3D4:{q:3,r:3,type:"random"},
            R3D5:{q:4,r:2,type:"random"},
            R3D6:{q:3,r:1,type:"random"},
            R3D7:{q:3,r:0,type:"random"},
            R3D8:{q:2,r:-1,type:"random"},
            R3D9:{q:1,r:-1,type:"random"},
            R3D10:{q:0,r:-1,type:"random"},
            R3D11:{q:-1,r:-1,type:"random"},
            R3D12:{q:-1,r:0,type:"random"},
            R3D13:{q:-2,r:1,type:"random"},
            R3D14:{q:-2,r:2,type:"random"},
            R3D15:{q:-2,r:3,type:"random"},
            R3D16:{q:-1,r:4,type:"random"},
            R3D17:{q:-1,r:5,type:"random"},
            R3D18:{q:0,r:5,type:"random"},
            R4D1:{q:1,r:6,type:"random"},
            R4D2:{q:2,r:6,type:"random"},
            R4D3:{q:3,r:6,type:"random"},
            R4D4:{q:3,r:5,type:"random"},
            R4D5:{q:4,r:4,type:"random"},
            R4D6:{q:4,r:3,type:"random"},
            R4D7:{q:5,r:2,type:"base"},
            R4D8:{q:4,r:1,type:"random"},
            R4D9:{q:4,r:0,type:"random"},
            R4D10:{q:3,r:-1,type:"random"},
            R4D11:{q:3,r:-2,type:"random"},
            R4D12:{q:2,r:-2,type:"random"},
            R4D13:{q:1,r:-2,type:"random"},
            R4D14:{q:0,r:-2,type:"random"},
            R4D15:{q:-1,r:-2,type:"random"},
            R4D16:{q:-2,r:-1,type:"random"},
            R4D17:{q:-2,r:0,type:"random"},
            R4D18:{q:-3,r:1,type:"random"},
            R4D19:{q:-3,r:2,type:"base"},
            R4D20:{q:-3,r:3,type:"random"},
            R4D21:{q:-2,r:4,type:"random"},
            R4D22:{q:-2,r:5,type:"random"},
            R4D23:{q:-1,r:6,type:"random"},
            R4D24:{q:0,r:6,type:"random"},
            R0:{q:1,r:2,type:"random"}
        }
    },
    r5: 
    {
        layout: "odd-r",
        rings: 5, // 30 hexes
        bases:
        {
            p2: ['R5D8','R5D23'],
            p3: ['R5D8','R5D18','R5D28'],
            p4: ['R5D3','R5D13','R5D18','R5D28'],
            p5: ['R5D4','R5D10','R5D16','R5D22','R5D28'],
            p6: ['R5D3','R5D8','R5D13','R5D18','R5D23','R5D28']
        },
        hexes:
        {
            R1D1:{q:1,r:3,type:"random"},
            R1D2:{q:2,r:2,type:"random"},
            R1D3:{q:1,r:1,type:"random"},
            R1D4:{q:0,r:1,type:"random"},
            R1D5:{q:0,r:2,type:"random"},
            R1D6:{q:0,r:3,type:"random"},
            R2D1:{q:1,r:4,type:"random"},
            R2D2:{q:2,r:4,type:"random"},
            R2D3:{q:2,r:3,type:"random"},
            R2D4:{q:3,r:2,type:"random"},
            R2D5:{q:2,r:1,type:"random"},
            R2D6:{q:2,r:0,type:"random"},
            R2D7:{q:1,r:0,type:"random"},
            R2D8:{q:0,r:0,type:"random"},
            R2D9:{q:-1,r:1,type:"random"},
            R2D10:{q:-1,r:2,type:"random"},
            R2D11:{q:-1,r:3,type:"random"},
            R2D12:{q:0,r:4,type:"random"},
            R3D1:{q:1,r:5,type:"random"},
            R3D2:{q:2,r:5,type:"random"},
            R3D3:{q:3,r:4,type:"random"},
            R3D4:{q:3,r:3,type:"random"},
            R3D5:{q:4,r:2,type:"random"},
            R3D6:{q:3,r:1,type:"random"},
            R3D7:{q:3,r:0,type:"random"},
            R3D8:{q:2,r:-1,type:"random"},
            R3D9:{q:1,r:-1,type:"random"},
            R3D10:{q:0,r:-1,type:"random"},
            R3D11:{q:-1,r:-1,type:"random"},
            R3D12:{q:-1,r:0,type:"random"},
            R3D13:{q:-2,r:1,type:"random"},
            R3D14:{q:-2,r:2,type:"random"},
            R3D15:{q:-2,r:3,type:"random"},
            R3D16:{q:-1,r:4,type:"random"},
            R3D17:{q:-1,r:5,type:"random"},
            R3D18:{q:0,r:5,type:"random"},
            R4D1:{q:1,r:6,type:"random"},
            R4D2:{q:2,r:6,type:"random"},
            R4D3:{q:3,r:6,type:"random"},
            R4D4:{q:3,r:5,type:"random"},
            R4D5:{q:4,r:4,type:"random"},
            R4D6:{q:4,r:3,type:"random"},
            R4D7:{q:5,r:2,type:"random"},
            R4D8:{q:4,r:1,type:"random"},
            R4D9:{q:4,r:0,type:"random"},
            R4D10:{q:3,r:-1,type:"random"},
            R4D11:{q:3,r:-2,type:"random"},
            R4D12:{q:2,r:-2,type:"random"},
            R4D13:{q:1,r:-2,type:"random"},
            R4D14:{q:0,r:-2,type:"random"},
            R4D15:{q:-1,r:-2,type:"random"},
            R4D16:{q:-2,r:-1,type:"random"},
            R4D17:{q:-2,r:0,type:"random"},
            R4D18:{q:-3,r:1,type:"random"},
            R4D19:{q:-3,r:2,type:"random"},
            R4D20:{q:-3,r:3,type:"random"},
            R4D21:{q:-2,r:4,type:"random"},
            R4D22:{q:-2,r:5,type:"random"},
            R4D23:{q:-1,r:6,type:"random"},
            R4D24:{q:0,r:6,type:"random"},
            R5D1:{q:1,r:7,type:"random"},
            R5D2:{q:2,r:7,type:"random"},
            R5D3:{q:3,r:7,type:"random"},
            R5D4:{q:4,r:6,type:"random"},
            R5D5:{q:4,r:5,type:"random"},
            R5D6:{q:5,r:4,type:"random"},
            R5D7:{q:5,r:3,type:"random"},
            R5D8:{q:6,r:2,type:"base"},
            R5D9:{q:5,r:1,type:"random"},
            R5D10:{q:5,r:0,type:"random"},
            R5D11:{q:4,r:-1,type:"random"},
            R5D12:{q:4,r:-2,type:"random"},
            R5D13:{q:3,r:-3,type:"random"},
            R5D14:{q:2,r:-3,type:"random"},
            R5D15:{q:1,r:-3,type:"random"},
            R5D16:{q:0,r:-3,type:"random"},
            R5D17:{q:-1,r:-3,type:"random"},
            R5D18:{q:-2,r:-3,type:"random"},
            R5D19:{q:-2,r:-2,type:"random"},
            R5D20:{q:-3,r:-1,type:"random"},
            R5D21:{q:-3,r:0,type:"random"},
            R5D22:{q:-4,r:1,type:"random"},
            R5D23:{q:-4,r:2,type:"base"},
            R5D24:{q:-4,r:3,type:"random"},
            R5D25:{q:-3,r:4,type:"random"},
            R5D26:{q:-3,r:5,type:"random"},
            R5D27:{q:-2,r:6,type:"random"},
            R5D28:{q:-2,r:7,type:"random"},
            R5D29:{q:-1,r:7,type:"random"},
            R5D30:{q:0,r:7,type:"random"},
            R0:{q:1,r:2,type:"random"}
        }
    },
    r6: 
    {
        layout: "odd-r",
        rings: 6, // 36 hexes
        bases:
        {
            p2: ['R6D10','R6D28'],
            p3: ['R6D10','R6D22','R6D34'],
            p4: ['R6D4','R6D16','R6D22','R6D34'],
            p6: ['R6D4','R6D10','R6D16','R6D22','R6D28','R6D34']
        },
        hexes:
        {
            R1D1:{q:1,r:3,type:"random"},
            R1D2:{q:2,r:2,type:"random"},
            R1D3:{q:1,r:1,type:"random"},
            R1D4:{q:0,r:1,type:"random"},
            R1D5:{q:0,r:2,type:"random"},
            R1D6:{q:0,r:3,type:"random"},
            R2D1:{q:1,r:4,type:"random"},
            R2D2:{q:2,r:4,type:"random"},
            R2D3:{q:2,r:3,type:"random"},
            R2D4:{q:3,r:2,type:"random"},
            R2D5:{q:2,r:1,type:"random"},
            R2D6:{q:2,r:0,type:"random"},
            R2D7:{q:1,r:0,type:"random"},
            R2D8:{q:0,r:0,type:"random"},
            R2D9:{q:-1,r:1,type:"random"},
            R2D10:{q:-1,r:2,type:"random"},
            R2D11:{q:-1,r:3,type:"random"},
            R2D12:{q:0,r:4,type:"random"},
            R3D1:{q:1,r:5,type:"random"},
            R3D2:{q:2,r:5,type:"random"},
            R3D3:{q:3,r:4,type:"random"},
            R3D4:{q:3,r:3,type:"random"},
            R3D5:{q:4,r:2,type:"random"},
            R3D6:{q:3,r:1,type:"random"},
            R3D7:{q:3,r:0,type:"random"},
            R3D8:{q:2,r:-1,type:"random"},
            R3D9:{q:1,r:-1,type:"random"},
            R3D10:{q:0,r:-1,type:"random"},
            R3D11:{q:-1,r:-1,type:"random"},
            R3D12:{q:-1,r:0,type:"random"},
            R3D13:{q:-2,r:1,type:"random"},
            R3D14:{q:-2,r:2,type:"random"},
            R3D15:{q:-2,r:3,type:"random"},
            R3D16:{q:-1,r:4,type:"random"},
            R3D17:{q:-1,r:5,type:"random"},
            R3D18:{q:0,r:5,type:"random"},
            R4D1:{q:1,r:6,type:"random"},
            R4D2:{q:2,r:6,type:"random"},
            R4D3:{q:3,r:6,type:"random"},
            R4D4:{q:3,r:5,type:"random"},
            R4D5:{q:4,r:4,type:"random"},
            R4D6:{q:4,r:3,type:"random"},
            R4D7:{q:5,r:2,type:"random"},
            R4D8:{q:4,r:1,type:"random"},
            R4D9:{q:4,r:0,type:"random"},
            R4D10:{q:3,r:-1,type:"random"},
            R4D11:{q:3,r:-2,type:"random"},
            R4D12:{q:2,r:-2,type:"random"},
            R4D13:{q:1,r:-2,type:"random"},
            R4D14:{q:0,r:-2,type:"random"},
            R4D15:{q:-1,r:-2,type:"random"},
            R4D16:{q:-2,r:-1,type:"random"},
            R4D17:{q:-2,r:0,type:"random"},
            R4D18:{q:-3,r:1,type:"random"},
            R4D19:{q:-3,r:2,type:"random"},
            R4D20:{q:-3,r:3,type:"random"},
            R4D21:{q:-2,r:4,type:"random"},
            R4D22:{q:-2,r:5,type:"random"},
            R4D23:{q:-1,r:6,type:"random"},
            R4D24:{q:0,r:6,type:"random"},
            R5D1:{q:1,r:7,type:"random"},
            R5D2:{q:2,r:7,type:"random"},
            R5D3:{q:3,r:7,type:"random"},
            R5D4:{q:4,r:6,type:"random"},
            R5D5:{q:4,r:5,type:"random"},
            R5D6:{q:5,r:4,type:"random"},
            R5D7:{q:5,r:3,type:"random"},
            R5D8:{q:6,r:2,type:"random"},
            R5D9:{q:5,r:1,type:"random"},
            R5D10:{q:5,r:0,type:"random"},
            R5D11:{q:4,r:-1,type:"random"},
            R5D12:{q:4,r:-2,type:"random"},
            R5D13:{q:3,r:-3,type:"random"},
            R5D14:{q:2,r:-3,type:"random"},
            R5D15:{q:1,r:-3,type:"random"},
            R5D16:{q:0,r:-3,type:"random"},
            R5D17:{q:-1,r:-3,type:"random"},
            R5D18:{q:-2,r:-3,type:"random"},
            R5D19:{q:-2,r:-2,type:"random"},
            R5D20:{q:-3,r:-1,type:"random"},
            R5D21:{q:-3,r:0,type:"random"},
            R5D22:{q:-4,r:1,type:"random"},
            R5D23:{q:-4,r:2,type:"random"},
            R5D24:{q:-4,r:3,type:"random"},
            R5D25:{q:-3,r:4,type:"random"},
            R5D26:{q:-3,r:5,type:"random"},
            R5D27:{q:-2,r:6,type:"random"},
            R5D28:{q:-2,r:7,type:"random"},
            R5D29:{q:-1,r:7,type:"random"},
            R5D30:{q:0,r:7,type:"random"},
            R6D1:{q:1,r:8,type:"random"},
            R6D2:{q:2,r:8,type:"random"},
            R6D3:{q:3,r:8,type:"random"},
            R6D4:{q:4,r:8,type:"random"},
            R6D5:{q:4,r:7,type:"random"},
            R6D6:{q:5,r:6,type:"random"},
            R6D7:{q:5,r:5,type:"random"},
            R6D8:{q:6,r:4,type:"random"},
            R6D9:{q:6,r:3,type:"random"},
            R6D10:{q:7,r:2,type:"base"},
            R6D11:{q:6,r:1,type:"random"},
            R6D12:{q:6,r:0,type:"random"},
            R6D13:{q:5,r:-1,type:"random"},
            R6D14:{q:5,r:-2,type:"random"},
            R6D15:{q:4,r:-3,type:"random"},
            R6D16:{q:4,r:-4,type:"random"},
            R6D17:{q:3,r:-4,type:"random"},
            R6D18:{q:2,r:-4,type:"random"},
            R6D19:{q:1,r:-4,type:"random"},
            R6D20:{q:0,r:-4,type:"random"},
            R6D21:{q:-1,r:-4,type:"random"},
            R6D22:{q:-2,r:-4,type:"random"},
            R6D23:{q:-3,r:-3,type:"random"},
            R6D24:{q:-3,r:-2,type:"random"},
            R6D25:{q:-4,r:-1,type:"random"},
            R6D26:{q:-4,r:0,type:"random"},
            R6D27:{q:-5,r:1,type:"random"},
            R6D28:{q:-5,r:2,type:"base"},
            R6D29:{q:-5,r:3,type:"random"},
            R6D30:{q:-4,r:4,type:"random"},
            R6D31:{q:-4,r:5,type:"random"},
            R6D32:{q:-3,r:6,type:"random"},
            R6D33:{q:-3,r:7,type:"random"},
            R6D34:{q:-2,r:8,type:"random"},
            R6D35:{q:-1,r:8,type:"random"},
            R6D36:{q:0,r:8,type:"random"},
            R0:{q:1,r:2,type:"random"}
        }
    }
};