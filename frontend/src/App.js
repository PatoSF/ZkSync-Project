import Header from './Header';
import React from 'react';
import './App.css';
import '@splinetool/viewer';
import { Contract, Web3Provider, Provider } from "zksync-web3";
import { ethers } from "ethers";
import abi from "./game-abi.json";
const contractABI = abi.abi;
const GREETER_CONTRACT_ADDRESS = "0x766e93c4E0D092B423e8235563324372042cd124";




function App() {
 

  async function setguessnum() {
    console.log("setguessnum called");
    try {
      const provider = new Provider('https://zksync2-testnet.zksync.dev');
      console.log("Initializing signer...");
      const signer = (new Web3Provider(window.ethereum)).getSigner();
      console.log("Initializing contract");
      const contract = new Contract(GREETER_CONTRACT_ADDRESS, contractABI, signer);

      console.log("Contract initialized successfully");
      const signerAddress = await signer.getAddress();
  
      console.log("Signer address:", signerAddress);
      console.log("Contract Address:",contract.address);

      let userInput = document.querySelector('#user-input').value;
      console.log("Input Number:", userInput);

      const ok2 = await contract.getContractBalance();
      console.log("Contract Token Balance:",ok2.toString());

      const gasPrice = await provider.getGasPrice();
      console.log("Gas Price:",gasPrice.toString());
      const newGasPrice = gasPrice.mul(2);

      let InputGuess = Number(userInput);
      const weiAmount = ethers.utils.parseEther('0.001');
      const tx = await contract.guess(InputGuess, { gasLimit: 5000000, gasPrice: newGasPrice, value: weiAmount });
      console.log("Pending Transaction...");
      await tx.wait();
      console.log("Guess submitted successfully");

    
      contract.on("PaymentReceived", (player ,amount) => {
      const amountInEther = ethers.utils.formatEther(amount);
      const feesButton = document.querySelector('#fees-button');
      feesButton.innerHTML = "Amount Paid: "+ amountInEther + " ETH"
      });
      contract.on("Loss", (player, InputGuess) => {
      const outcome = document.querySelector('#outcome-button');
      outcome.innerHTML =  "Wrong Number: " + InputGuess;
      });

      contract.on("NumberGuessed", (eeee ,InputGuess, winnings) => {
      const win = document.querySelector('#winnings-button');
      win.innerHTML = "You Received: " + winnings;
      const outcome = document.querySelector('#outcome-button');
      outcome.innerHTML =  "Correct Number: " + InputGuess;
      });


    } catch (error) {
      console.log("Error submitting guess:", error);
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="inbox" > <span class="hover-effect">Welcome to GuessIQ</span><br />
  <span>The place to increase your IQ</span><br />
  <span>If you guess the secret number</span><br />
  <span>you gain 80% of the contract's funds</span><br />
  <span>and 100 IQ tokens</span><br />
  <span>Do Your BEST</span>
  <br />
  <br />
  <input
            type="text"
            placeholder="Enter a number between 100-200"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.212) 0%, rgba(255, 255, 255, 0.2) 100%)",
              borderRadius: "20px",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
              zIndex: "1",
              fontFamily: "Arial, sans-serif",
              fontSize: "22px",
              fontWeight: "bold",
              padding: "20px",
              color: "red",
              WebkitTextStroke: "2px #0000001f",
              textAlign: "center",
              width: "70%",
              margin: "20px auto"
              
            }}
            id="user-input"
          />
              <button
    style={{
      background: "linear-gradient(180deg, rgba(0, 0, 0, 0.212) 0%, rgba(255, 255, 255, 0.2) 100%)",
      border: "none",
      borderRadius: "20px",
      color: "#000000",
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
      cursor: "pointer",
      fontFamily: "Arial, sans-serif",
      fontSize: "22px",
      fontWeight: "bold",
      padding: "20px",
      textAlign: "center",
      width: "79%",
      margin: "20px auto",
      display: "block"
    }}
    id="submit-button"
    onClick={() => {setguessnum()}} 
  >
    Submit
  </button>
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.212) 0%, rgba(255, 255, 255, 0.2) 100%)",
                borderRadius: "20px",
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
                zIndex: "1",
                fontFamily: "Arial, sans-serif",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#000000",
                padding: "20px",
                textAlign: "center",
                margin: "20px auto",
                width: "70%",
              }}
              id="fees-button"
            >
              Please pay the fee
      </div>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.212) 0%, rgba(255, 255, 255, 0.2) 100%)",
          borderRadius: "20px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
          zIndex: "1",
          fontFamily: "Arial, sans-serif",
          fontSize: "22px",
          fontWeight: "bold",
          color: "#000000",
          padding: "20px",
          textAlign: "center",
          margin: "20px auto",
          width: "70%",
        }}
        id="outcome-button"
      >
        Lose the Battle Win the War
      </div>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.212) 0%, rgba(255, 255, 255, 0.2) 100%)",
          borderRadius: "20px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
          zIndex: "1",
          fontFamily: "Arial, sans-serif",
          fontSize: "22px",
          fontWeight: "bold",
          color: "#000000",
          padding: "20px",
          textAlign: "center",
          margin: "20px auto",
          width: "70%",
        }}
        id="winnings-button"
      >
        Made By Patrick Sfeir
      </div>
  </div> 
        <script type="module" src="https://unpkg.com/@splinetool/viewer@0.9.256/build/spline-viewer.js"></script>
        <spline-viewer url="https://prod.spline.design/JoyhIEidcS48wg20/scene.splinecode"></spline-viewer>
      </div>
    </div>
  );
}
export default App;


