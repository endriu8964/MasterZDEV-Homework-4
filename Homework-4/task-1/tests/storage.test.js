const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("SimpleStorageUpgradeable", function() {
    let simpleStorage;
    let owner;
    let addr1;

    beforeEach(async function() {
        [owner, addr1] = await ethers.getSigners();

        const SimpleStorageUpgradeable = await ethers.getContractFactory("SimpleStorageUpgradeable");
        simpleStorage = await upgrades.deployProxy(SimpleStorageUpgradeable, [42]);
        await simpleStorage.deployed();
    });

    it("should return the initial value", async function() {
        expect(await simpleStorage.getValue()).to.equal(42);
    });

    it("should set a new value", async function() {
        await simpleStorage.connect(owner).setValue(100);
        expect(await simpleStorage.getValue()).to.equal(100);
    });

    it("should not allow non-owner to set a new value", async function() {
        await expect(
            simpleStorage.connect(addr1).setValue(100)
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });
});
