// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTFactory  {
    event NFTCreated(address indexed owner, address indexed nftAddress);

    function createNFT(string memory _name, string memory _symbol, string memory _tokenURI) external returns(address) {
        ERC721Enumerable nft = new NFT(_name, _symbol, _tokenURI);
        emit NFTCreated(msg.sender, address(nft));
        return address(nft);
    }
}

contract NFT is ERC721Enumerable, Ownable {
    constructor(string memory _name, string memory _symbol, string memory _tokenURI) ERC721(_name, _symbol) Ownable(msg.sender) {
        _mint(msg.sender, 1);
    }
}
