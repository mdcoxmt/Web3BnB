//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Airbnb3 {
struct Property {
    uint256 id;
    string name;
    string description;
    string location;
    string[] images;
    bool isActive;
    uint256 price;
    string currency;
    address owner;
    bool[] isBooked;
  }


  struct Booking {
    uint256 bookingId;
    uint256 propertyId;
    string checkInDate;
    string checkOutDate;
    uint256 checkInDay;
    uint256 checkOutDay;
    uint256 totalPrice;
    bool isConfirmed;
    bool isDeleted;
    address renter;
  }

  mapping(uint256 => Property) public properties;
  mapping(uint256 => Booking) public bookings;

  uint256 public bookingId;
  uint256 public propertyId;

    // emit when a new  apartment is listed
  event NewProperty(uint256 indexed propertyId);

  // emit when a new booking is made
  event NewBooking(uint256 indexed propertyId, uint256 indexed bookingId);

    // emit when a booking is confirmed
  event ConfirmBooking(uint256 indexed bookingId);


  function listProperty(
    string memory name,
    string memory description,
    string memory location,
    string[] memory images,
    uint256 price,
    string memory currency
  ) public returns (uint256) {
    uint256 curPropertyId= propertyId;
    Property memory newProperty = Property(
      curPropertyId,
      name,
      description,
      location,
      images,
      true, /* isActive */
      price,
      currency,
      msg.sender, /* owner */
      new bool[](365)
    );

    properties[curPropertyId] = newProperty;
    emit NewProperty(propertyId++);
    return curPropertyId;
  }

   function getAllProperties() public view returns (Property[] memory) {
    Property[] memory allProperties = new Property[](propertyId);

    for (uint256 i = 0; i < propertyId; i++) {
      allProperties[i] = properties[i];
    }

    return allProperties;
  }

  function rentProperty(
    uint256 _propertyId,
    string memory checkInDate,
    string memory checkOutDate,
    uint256 checkInDay,
    uint256 checkOutDay
  ) public {
    Property storage property = properties[_propertyId];
    require(property.isActive == true, 'property with this ID is not active');

    for (uint256 i = checkInDay; i < checkOutDay; i++) {
      if (property.isBooked[i] == true) {
        revert('property is not available for the selected dates');
      }
    }

    uint256 totalPrice = property.price * (checkOutDay - checkInDay);

    createBooking(
      _propertyId,
      checkInDate,
      checkOutDate,
      checkInDay,
      checkOutDay,
      totalPrice,
      msg.sender
    );
  }

  function createBooking(
    uint256 _propertyId,
    string memory checkInDate,
    string memory checkOutDate,
    uint256 checkInDay,
    uint256 checkOutDay,
    uint256 totalPrice,
    address renter
  ) internal {
    bookings[bookingId] = Booking(
      bookingId,
      _propertyId,
      checkInDate,
      checkOutDate,
      checkInDay,
      checkOutDay,
      totalPrice,
      false,
      false,
      renter
    );

    Property storage property = properties[_propertyId];

    for (uint256 i = checkInDay; i < checkOutDay; i++) {
      property.isBooked[i] = true;
    }

    emit NewBooking(_propertyId, bookingId++);
  }

  function sendFunds(address beneficiary, uint256 value) internal {
    payable(beneficiary).transfer(value);
  }


   function confirmBooking(uint256 _bookingId) public payable {
    Booking memory currentBooking = bookings[_bookingId];
    Property memory currentProperty = properties[currentBooking.propertyId];
    require(
      currentBooking.isDeleted == false,
      'booking with this ID is already deleted'
    );
    require(
      currentProperty.isActive == true,
      'property with this ID is not active'
    );
    require(
      currentBooking.renter == msg.sender,
      'not the person who originally made the booking'
    );

    uint256 totalPrice = currentProperty.price *
      (currentBooking.checkOutDay - currentBooking.checkInDay);

    require(msg.value >= totalPrice, 'Sent insufficient funds');

    currentBooking.isConfirmed = true;
    bookings[_bookingId] = currentBooking;
    sendFunds(currentProperty.owner, currentBooking.totalPrice);

    emit ConfirmBooking(currentBooking.bookingId);
  }


}
