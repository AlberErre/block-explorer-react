pragma solidity ^0.5.0;

contract Explorer {
  uint sampleuint;

  function set(uint x) public {
    sampleuint = x;
  }

  function get() public view returns (uint) {
    return sampleuint;
  }
}
