//SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.11;

/**
 * @title SendFunds
 * @author adrenaline0206
 * @notice The contract from EAO or contract to transfer fund to EAO.
 * @dev The contract can check the address and balance,
 * and specify the transfer destination and remittance amount.
 */
contract SendFunds {
    /**
    * @dev owner is the address that called this contract, 
    * and balance is the address have amount.
    */
    address public owner;
    uint public balance;

    constructor () public {
        owner = msg.sender;
        balance = owner.balance;
    }
    /**
     *　　@param amount The amount which was forwarded.
     *　　@param receiver The receiver which was transfer destination.
     * @return Balance after remittance.
     * @dev The function from EAO or contract to transfer funds to EAO.
     */
    function sendFunds(uint amount, address payable receiver) public payable returns (uint) {
        require(balance>amount);
            receiver.transfer(amount);
        
        balance = owner.balance;
        return balance;
    }
}
