const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("gm");
  
    await domainContract.deployed();
  
    console.log("deployed to : ", domainContract.address);
  
    let txn = await domainContract.register("reimagined", {
      value: hre.ethers.utils.parseEther("0.1"),
    });
  
    await txn.wait();
  
    const domainOwner = await domainContract.getAddress("reimagined");
    console.log("domainOwner : ", domainOwner);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
  
    console.log("balance : ", hre.ethers.utils.formatEther(balance));
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
  