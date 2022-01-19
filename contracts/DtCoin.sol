//SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.11;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract DtCoin {
    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowed;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    using SafeMath for uint256;

    string _symbol = "DTC";
    string _name = "DT Coin";
    uint256 _totalSupply = 1000000;
    uint256 _currentSupply = 0;
    uint256 public _rate = 60000;
    uint256 public _decimals = 3;
    address payable public owner;

    modifier onlyOwner() {
        require(msg.sender != owner);
        _;
    }
    modifier onlyPayloadSize(uint256 size){
         assert(msg.data.length >= size + 4);
         _;
    }

    receive() external payable{
        createTokens(msg.sender);
    }

    constructor() public {
        owner = msg.sender;
        balances[owner] = _totalSupply;
    }

    function createTokens(address addr) public payable{
        require(msg.value > 0); 
        uint256 tokens = msg.value.mul(_rate).mul(1000).div(1 ether);
        require(_currentSupply.add(tokens) <= _totalSupply); 
        balances[owner] = balances[owner].sub(tokens);
        balances[addr] = balances[addr].add(tokens);
        emit Transfer(owner, addr, tokens);

        owner.transfer(msg.value);
        _currentSupply = _currentSupply.add(tokens);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbal() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint256) {
        return _decimals;
    }

    function totalSupply() public view returns (uint256) {
         return _totalSupply;
     }

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(
             balances[msg.sender] >= _value 
             && _value > 0
             ); 
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(
            balances[_from] >= _value
            && allowed[_from][msg.sender] >= _value
            && _value > 0
        );
            balances[_from] = balances[_from].sub(_value);
            allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
            balances[_to] = balances[_to].add(_value);
            Transfer(_from, _to, _value);
            return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256) {
        return allowed[_owner][_spender];
    }

}