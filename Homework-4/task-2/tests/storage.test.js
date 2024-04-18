const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTFactory", function () {
  let NFTFactory;
  let nftFactory;
  let NFT;
  let nft;

  beforeEach(async function () {
    NFTFactory = await ethers.getContractFactory("NFTFactory");
    nftFactory = await NFTFactory.deploy();
    await nftFactory.deployed();

    NFT = await ethers.getContractFactory("NFT");
    
  });

  it("should deploy the NFT factory and create a new NFT", async function () {
    const name = "MyNFT";
    const symbol = "MNFT";
    const tokenURI = "https://mytokenuri.com/token/1";

    const txResp = await nftFactory.createNFT(name, symbol, tokenURI);
    const receipt = await txResp.wait();
    const nftAddress = await receipt.events

    nft = await ethers.getContractAt("NFT",nftAddress);

    const owner = await nft.owner()
    console.log(owner)
    //expect(owner).to.equal(await ethers.provider.getSigner(0).getAddress());

    const tokenURIStored = await nft.tokenURI(1);
    expect(tokenURIStored).to.equal(tokenURI);
  });
});
