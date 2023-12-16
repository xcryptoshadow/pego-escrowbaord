import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, upgrades } from "hardhat";
import { EscrowHub } from "../types/EscrowHub";
import { ContractReceipt } from "ethers";

const eventFired = (eventName: string, receipt: ContractReceipt) => receipt.events?.find((ev) => ev.event === eventName)??undefined

describe("EscrowHub Contract", () => {
	const setupEscrowHub = async () => {
		const contractFactory = await ethers.getContractFactory("EscrowHub");
		const [owner, address1, address2] = await ethers.getSigners();
		const EscrowHubProxy = await upgrades.deployProxy(contractFactory, {
			kind: "uups",
		});

		let escrowHub: EscrowHub =
			(await EscrowHubProxy.deployed()) as unknown as EscrowHub;

		return { contractFactory, escrowHub, owner, address1, address2 };
	};

	describe("Deployment", () => {
		it("Must match the owner", async () => {
			const { escrowHub, owner } = await loadFixture(setupEscrowHub);
			expect(await escrowHub.owner()).to.equal(owner.address);
		});

		it("Should Return 0 Escrows", async () => {
			const { escrowHub } = await loadFixture(setupEscrowHub);
			const escrows = await escrowHub.fetchMyEscrows();
			expect(escrows.length).to.equal(0);
		});
	});
});
