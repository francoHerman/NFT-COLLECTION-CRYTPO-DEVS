const { run, ethers, network } = require("hardhat")
const { WHITELiST_CONTRACT_ADDRESS, META_DATA_URL } = require("../constants")
module.exports = async ({ getNamedAccounts, deployments }) => {
    console.log("deploying the contract")
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const arg = [META_DATA_URL, WHITELiST_CONTRACT_ADDRESS]
    const depol = await deploy("CryptoDevs", {
        from: deployer,
        log: true,
        args: arg,
    })
    console.log(`the address of the contract is ${depol.address}`)
    console.log("deployed-----------------------------------------------------")

    console.log("verfying the function ----------------------------")

    const verify = async (contractAddress, args) => {
        console.log("Verifying contract...")
        try {
            await run("verify:verify", {
                address: contractAddress,
                constructorArguments: args,
                waitConfirmations: 5,
            })
        } catch (e) {
            if (e.message.toLowerCase().includes("already verified")) {
                console.log("Already verified!")
            } else {
                console.log(e)
            }
        }
    }
    await verify(depol.address, arg)
}

module.exports.tags = ["all", "BuyMe"]
