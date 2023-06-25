// SPDX-License-Identifier: MIT

// 21852 of 24977

pragma solidity ^0.8.0;

contract AsciiLandPeople
{   
    struct person
    {
        uint8 head;
        uint8 cheaks;
        uint8 eyes;
        uint8 nose;
        uint8 left_hand;
        uint8 right_hand;
        uint8 arms;
        uint8 body;
        uint8 belt;
        uint8 legs;
        uint8 groin;
        uint8 feet;
    }
    
    address public owner;
    
    uint8 public head_count;
    uint8 public cheak_count;
    uint8 public eye_count;
    uint8 public body_count;
    uint8 public leg_count;
    uint8 public nose_count;
    uint8 public hand_count;
    uint8 public arm_count;
    uint8 public belt_count;
    uint8 public feet_count;
    
    mapping(uint8 => bytes1[]) internal _heads;
    mapping(uint8 => bytes1[]) internal _cheaks;
    mapping(uint8 => bytes1[]) internal _eyes;
    mapping(uint8 => bytes1[]) internal _bodies;
    mapping(uint8 => bytes1[]) internal _legs;
    mapping(uint8 => bytes1[]) internal _belts;
    mapping(uint8 => bytes1) internal _noses;
    mapping(uint8 => bytes1) internal _hands;
    mapping(uint8 => bytes1) internal _arms;
    mapping(uint8 => bytes1) internal _feet;
    
    constructor() 
    {
        owner = msg.sender;
        
        // Default head '/^^^\'
        bytes1[] memory head = new bytes1[](5);
        head[0] = 0x2f; // /
        head[1] = 0x5e; // ^
        head[2] = 0x5e; // ^
        head[3] = 0x5e; // ^
        head[4] = 0x5c; // \
        addHead(head);
        
        bytes1[] memory head2 = new bytes1[](5);
        head2[0] = 0x20; // 
        head2[1] = 0x2f; // /
        head2[2] = 0x5e; // ^
        head2[3] = 0x5c; // \
        head2[4] = 0x20; // 
        addHead(head2);
        
        bytes1[] memory head3 = new bytes1[](5);
        head3[0] = 0x20; // 
        head3[1] = 0x41; // A
        head3[2] = 0x5f; // _
        head3[3] = 0x41; // A
        head3[4] = 0x20; // 
        addHead(head3);
        
        bytes1[] memory head4 = new bytes1[](5);
        head4[0] = 0x41; // A
        head4[1] = 0x5f; // _
        head4[2] = 0x5f; // _
        head4[3] = 0x5f; // _
        head4[4] = 0x41; // A
        addHead(head4);
        
        bytes1[] memory head5 = new bytes1[](5);
        head5[0] = 0x20; // 
        head5[1] = 0x5f; // _
        head5[2] = 0x41; // A
        head5[3] = 0x5f; // _
        head5[4] = 0x20; // 
        addHead(head5);
        
        // Default cheaks '\/'
        bytes1[] memory cheaks = new bytes1[](2);
        cheaks[0] = 0x5c; // \
        cheaks[1] = 0x2f; // /
        addCheaks(cheaks);
        
        bytes1[] memory cheaks2 = new bytes1[](2);
        cheaks2[0] = 0x28; // (
        cheaks2[1] = 0x29; // )
        addCheaks(cheaks2);
        
        bytes1[] memory cheaks3 = new bytes1[](2);
        cheaks3[0] = 0x5b; // [
        cheaks3[1] = 0x5d; // ]
        addCheaks(cheaks3);
        
        // Default eyes 'oo'
        bytes1[] memory eyes = new bytes1[](2);
        eyes[0] = 0x6f;
        eyes[1] = 0x6f;
        addEyes(eyes);
        
        bytes1[] memory eyes2 = new bytes1[](2);
        eyes2[0] = 0x4f; // O
        eyes2[1] = 0x4f; // O
        addEyes(eyes2);
        
        bytes1[] memory eyes3 = new bytes1[](2);
        eyes3[0] = 0x6f; // o
        eyes3[1] = 0x4f; // O
        addEyes(eyes3);
        
        bytes1[] memory eyes4 = new bytes1[](2);
        eyes4[0] = 0x4f; // O
        eyes4[1] = 0x6f; // o
        addEyes(eyes4);
        
        bytes1[] memory eyes5 = new bytes1[](2);
        eyes5[0] = 0x2b; // +
        eyes5[1] = 0x2b; // +
        addEyes(eyes5);
        
        bytes1[] memory eyes6 = new bytes1[](2);
        eyes6[0] = 0x2b; // +
        eyes6[1] = 0x6f; // o
        addEyes(eyes6);
        
        bytes1[] memory eyes7 = new bytes1[](2);
        eyes7[0] = 0x6f; // o
        eyes7[1] = 0x2b; // +
        addEyes(eyes6);
        
        // Default body '[]'
        bytes1[] memory body = new bytes1[](2);
        body[0] = 0x5b; // [
        body[1] = 0x5d; // ]
        addBody(body);
        
        bytes1[] memory body2 = new bytes1[](2);
        body2[0] = 0x28; // (
        body2[1] = 0x29; // )
        addBody(body2);
        
        bytes1[] memory body3 = new bytes1[](2);
        body3[0] = 0x7b; // {
        body3[1] = 0x7d; // }
        addBody(body3);
        
        // Default legs '||'
        bytes1[] memory legs = new bytes1[](2);
        legs[0] = 0x7c;
        legs[1] = 0x7c;
        addLegs(legs);
        
        bytes1[] memory legs2 = new bytes1[](2);
        legs2[0] = 0x2f; // /
        legs2[1] = 0x5c; // \
        addLegs(legs2);
        
        bytes1[] memory legs3 = new bytes1[](2);
        legs3[0] = 0x21; // !
        legs3[1] = 0x21; // !
        addLegs(legs3);
        
        // Default belts (chest + groin) '=^'
        bytes1[] memory belts = new bytes1[](2);
        belts[0] = 0x3d;
        belts[1] = 0x5e;
        addBelts(belts);
        
        bytes1[] memory belts2 = new bytes1[](2);
        belts2[0] = 0x2a; // *
        belts2[1] = 0x48; // H
        addBelts(belts2);
        
        bytes1[] memory belts3 = new bytes1[](2);
        belts3[0] = 0x48; // H
        belts3[1] = 0x2e; // .
        addBelts(belts3);
        
        // Default nose '-'
        addNose(0x2d);
        
        addNose(0x2e); // .
        addNose(0x76); // v
        addNose(0x75); // u
        
        // Default hand '+'
        addHand(0x2b);
        
        addHand(0x6f); // o
        addHand(0x7c); // |
        addHand(0x3f); // ?
        addHand(0x54); // T
        addHand(0x2a); // *
        addHand(0x21); // !
        
        // Default arm '='
        addArm(0x3d);
        
        addArm(0x2d); // -
        addArm(0x7e); // ~
        
        // Default foot ' '
        addFeet(0x20);
        
        addFeet(0x5f); // _
        addFeet(0x2e); // .
    }
    
    function getRandomPerson(string memory seed) public view returns(string memory)
    {
        uint8[] memory numbers = _getRandomNumbers(seed, 0);
        
        return constructPerson(
            numbers[0],
            numbers[1],
            numbers[2],
            numbers[3],
            numbers[4],
            numbers[5],
            numbers[6],
            numbers[7],
            numbers[8],
            numbers[9],
            numbers[10]
        );
    }
    
    function getSpecificPerson
    (
        string memory seed, 
        uint blockNumber
    ) 
    public view returns(string memory)
    {
        uint8[] memory numbers = _getRandomNumbers(seed, blockNumber);
        
        return constructPerson(
            numbers[0],
            numbers[1],
            numbers[2],
            numbers[3],
            numbers[4],
            numbers[5],
            numbers[6],
            numbers[7],
            numbers[8],
            numbers[9],
            numbers[10]
        );
    }
    
    // TO BE MADE INTERNAL ONCE NFT WRAPPED ...
    function constructPerson
    (
        uint8 head,
        uint8 cheaks,
        uint8 eyes,
        uint8 nose,
        uint8 left_hand,
        uint8 right_hand,
        uint8 arms,
        uint8 body,
        uint8 belts,
        uint8 legs,
        uint8 feet
    ) 
    public view returns(string memory)
    {
        return string(abi.encodePacked(
            _line(),
            _build_head(head),
            _line(),
            _build_face(cheaks, eyes, nose),
            _line(),
            _build_body(left_hand, right_hand, arms, body, belts),
            _line(),
            _build_bottom(legs, belts, feet)
        ));
    }
    
    function addHead(bytes1[] memory head) public
    {
        require(_isOwner(msg.sender) == true);
        _heads[head_count] = head;
        head_count = head_count + 1;
    }
    
    function addCheaks(bytes1[] memory cheak) public
    {
        require(_isOwner(msg.sender) == true);
        _cheaks[cheak_count] = cheak;
        cheak_count = cheak_count + 1;
    }
    
    function addEyes(bytes1[] memory eyes) public
    {
        require(_isOwner(msg.sender) == true);
        _eyes[eye_count] = eyes;
        eye_count = eye_count + 1;
    }
    
    function addBody(bytes1[] memory bodies) public
    {
        require(_isOwner(msg.sender) == true);
        _bodies[body_count] = bodies;
        body_count = body_count + 1;
    }
    
    function addLegs(bytes1[] memory legs) public
    {
        require(_isOwner(msg.sender) == true);
        _legs[leg_count] = legs;
        leg_count = leg_count + 1;
    }

    function addBelts(bytes1[] memory belts) public
    {
        require(_isOwner(msg.sender) == true);
        _belts[belt_count] = belts;
        belt_count = belt_count + 1;
    }
    
    function addNose(bytes1 nose) public
    {
        require(_isOwner(msg.sender) == true);
        _noses[nose_count] = nose;
        nose_count = nose_count + 1;
    }
    
    function addHand(bytes1 hand) public
    {
        require(_isOwner(msg.sender) == true);
        _hands[hand_count] = hand;
        hand_count = hand_count + 1;
    }
    
    function addArm(bytes1 arm) public
    {
        require(_isOwner(msg.sender) == true);
        _arms[arm_count] = arm;
        arm_count = arm_count + 1;
    }
    
    function addFeet(bytes1 feet) public
    {
        require(_isOwner(msg.sender) == true);
        _feet[feet_count] = feet;
        feet_count = feet_count + 1;
    }
    
    /*
    
    INTERNAL FUNCTIONS
    
    */
    
    function _getRandomNumbers
    (
        string memory seed,
        uint optionalBlock
    ) 
    internal view returns(uint8[] memory)
    {
        uint8[] memory numbers = new uint8[](11);
        numbers[0] = _randomInt('head', 0, (head_count - 1), optionalBlock, seed);
        numbers[1] = _randomInt('cheaks', 0, (cheak_count - 1), optionalBlock, seed);
        numbers[2] = _randomInt('eyes', 0, (eye_count - 1), optionalBlock, seed);
        numbers[3] = _randomInt('nose', 0, (nose_count - 1), optionalBlock, seed);
        numbers[4] = _randomInt('left_hand', 0, (hand_count - 1), optionalBlock, seed);
        numbers[5] = _randomInt('right_hand', 0, (hand_count - 1), optionalBlock, seed);
        numbers[6] = _randomInt('arms', 0, (arm_count - 1), optionalBlock, seed);
        numbers[7] = _randomInt('body', 0, (body_count - 1), optionalBlock, seed);
        numbers[8] = _randomInt('belts', 0, (belt_count - 1), optionalBlock, seed);
        numbers[9] = _randomInt('legs', 0, (leg_count - 1), optionalBlock, seed);
        numbers[10] = _randomInt('feet', 0, (feet_count - 1), optionalBlock, seed);
        return numbers;
    }
    
    function _randomInt
    (
        string memory seed, 
        uint min, 
        uint max, 
        uint specificBlock,
        string memory optionalSecondSeed
    ) 
    internal view returns(uint8)
    {
        if(max <= min) return 0;
        else
        {
            uint blockNumber = block.number;
            if(specificBlock > 0) blockNumber = specificBlock;
            uint hash = uint256(keccak256(abi.encodePacked(
                seed, 
                address(this),
                blockNumber,
                optionalSecondSeed
            ))) % (max + (1 - min)) + min;
            return uint8(hash);
        }
    }
    
    function _isOwner(address Address) internal view returns(bool)
    {
        if(Address == owner) return true;
        else return false;
    }
    
    function _line() internal pure returns(bytes1)
    {
        return 0x0a;
    }
    
    function _space() internal pure returns(bytes1)
    {
        return 0x20;
    }
    
    function _build_head(uint8 head) internal view returns(bytes memory)
    {
        return abi.encodePacked(
            _space(),
            _heads[head][0],
            _heads[head][1],
            _heads[head][2],
            _heads[head][3],
            _heads[head][4],
            _space()
        );
    }
    
    function _build_face
    (
        uint8 cheaks, 
        uint8 eyes, 
        uint8 nose
    ) 
    internal view returns(bytes memory)
    {
        return abi.encodePacked(
            _space(),
            _cheaks[cheaks][0],
            _eyes[eyes][0],
            _noses[nose],
            _eyes[eyes][1],
            _cheaks[cheaks][1],
            _space()
        );
    }
    
    function _build_body
    (
        uint8 left_hand, 
        uint8 right_hand, 
        uint8 arms, 
        uint8 body,
        uint8 belts
    ) 
    internal view returns(bytes memory)
    {
        return abi.encodePacked(
            _hands[left_hand],
            _arms[arms],
            _bodies[body][0],
            _belts[belts][0],
            _bodies[body][1],
            _arms[arms],
            _hands[right_hand]
        );
    }
    
    function _build_bottom
    (
        uint8 legs, 
        uint8 belts, 
        uint8 feet
    ) 
    internal view returns(bytes memory)
    {
        return abi.encodePacked(
            _space(),
            _feet[feet],
            _legs[legs][0],
            _belts[belts][1],
            _legs[legs][1],
            _feet[feet],
            _space()
        );
    }
}