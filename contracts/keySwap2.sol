// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

 contract KeySwap{
    //stores the id/number for the next order
    uint public orderNumber = 0; 

    // Order Object
    struct Order {
        string name;
		address buyer;
		address seller;
		uint256 price;
		uint256 duration; //difference between start time and end time in seconds
		uint256 startTime;  //timestamp
    }

    // Mappings to store orders for unique address and order data at indices
    mapping(address => uint[]) public listOfOrders; 
    mapping(uint => Order) public orderMap;

    // Sell Event
    event SellOrderEvent(
        string name,
        uint256 orderNumber,
        address seller,
        uint256 price,
        uint256 duration
    );

    // Buy Order Event
    event BuyOrderEvent(
        string name,
        uint256 orderNumber,
        address buyer,
        uint256 startTime,
        uint256 price,
        uint256 duration
    );

    // Constructor to initialize values
    constructor() {}

    // Sell Message Function
        function sellMessage(string memory name,uint256 price, uint256 duration) external {
        // Check if price and duration aren't zero
        require(price != 0);
        require(duration != 0);

        // Set values in Order object for particular order/index
        orderMap[orderNumber].name = name;
        orderMap[orderNumber].seller = msg.sender;
        orderMap[orderNumber].price = price;
        orderMap[orderNumber].duration = duration;
        
        // If address doesn't exist create a new list to store orders
        if (listOfOrders[msg.sender].length == 0) {
            listOfOrders[msg.sender] = new uint256[](0);
        } 
        // Push the Order number
        listOfOrders[msg.sender].push(orderNumber);
       
        // emit the event
        emit SellOrderEvent(
            name,
            orderNumber,
            msg.sender,
            price,
            duration
        );

        //if this were to overflow, it should fail and revert the entire smart contract
        //which is why its probably safe to emit the Event before then to save gas
        orderNumber += 1;
    }

    // Buy Message Function
    function buyMessage(uint _orderNumber) payable external {
        
        require(orderMap[_orderNumber].price != 0, "Order does not exist or was withdrawn");
        require(orderMap[_orderNumber].buyer == address(0), "Order already bought.");
        require(msg.value == orderMap[_orderNumber].price, "Eth sent is the incorrect amount");
        orderMap[_orderNumber].buyer = msg.sender;
        uint256 startTime = block.timestamp + 1 hours;
        orderMap[_orderNumber].startTime = startTime;
        //we add one hour so that buyer has 1 hour to wait to receive the api key
        //if the buyer does not receive the api key, they can withdraw the order
        //and get all of their money back, minus the transaction fees

        emit BuyOrderEvent(
            orderMap[_orderNumber].name,
            _orderNumber,
            msg.sender,
            startTime,
            orderMap[_orderNumber].price,
            orderMap[_orderNumber].duration
        );

    }

    // Function to get Next Order Number
    function getOrderNextNumber() public view returns (uint) {
        return orderNumber;
    }

    // Function to get Order Details
    function getOrder(uint _orderNumber) public view returns (Order memory) {
        return orderMap[_orderNumber];
    }
     
    // Function to get all orders of particular address
    function getAddressOrder(address user) public view returns (uint256[] memory) {
        return listOfOrders[user];
    }

 }