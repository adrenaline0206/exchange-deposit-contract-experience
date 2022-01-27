export const sendFundsContract = {
    "_format": "hh-sol-artifact-1",
    "contractName": "SendFunds",
    "sourceName": "contracts/SendFunds.sol",
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "balance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "address payable",
            "name": "receiver",
            "type": "address"
          }
        ],
        "name": "sendFunds",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      }
    ],
    "bytecode": "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163160018190555061021f8061009f6000396000f3fe6080604052600436106100345760003560e01c80638da5cb5b14610039578063b268677414610090578063b69ef8a8146100f2575b600080fd5b34801561004557600080fd5b5061004e61011d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100dc600480360360408110156100a657600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610142565b6040518082815260200191505060405180910390f35b3480156100fe57600080fd5b506101076101e3565b6040518082815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000826001541161015257600080fd5b8173ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051600060405180830381858888f19350505050158015610198573d6000803e3d6000fd5b506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1631600181905550600154905092915050565b6001548156fea2646970667358221220cea74607180ffe3e73727d2bf09429a529dbb0bc6d8c4de835858c392998d02c64736f6c634300060b0033",
    "deployedBytecode": "0x6080604052600436106100345760003560e01c80638da5cb5b14610039578063b268677414610090578063b69ef8a8146100f2575b600080fd5b34801561004557600080fd5b5061004e61011d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100dc600480360360408110156100a657600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610142565b6040518082815260200191505060405180910390f35b3480156100fe57600080fd5b506101076101e3565b6040518082815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000826001541161015257600080fd5b8173ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051600060405180830381858888f19350505050158015610198573d6000803e3d6000fd5b506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1631600181905550600154905092915050565b6001548156fea2646970667358221220cea74607180ffe3e73727d2bf09429a529dbb0bc6d8c4de835858c392998d02c64736f6c634300060b0033",
    "linkReferences": {},
    "deployedLinkReferences": {}
  }