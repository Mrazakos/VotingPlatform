export const environment = {
  production: false,
  contractAddress: 'YOUR_SMART_CONTRACT_ADDRESS',
  contractABI: [
    {
      "constant": true,
      "inputs": [{ "name": "proposal", "type": "string" }],
      "name": "getVoteCount",
      "outputs": [{ "name": "", "type": "uint256" }],
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{ "name": "proposal", "type": "string" }],
      "name": "vote",
      "type": "function"
    }
  ],
  firebaseConfig: {
    apiKey: "AIzaSyDhLdH1m3RmJPr80Hl887ZqssgFtwQtRX0",
    authDomain: "decentralized-voting-58099.firebaseapp.com",
    projectId: "decentralized-voting-58099",
    storageBucket: "decentralized-voting-58099.firebasestorage.app",
    messagingSenderId: "10379247093",
    appId: "1:10379247093:web:92165fac52b3fb87b034bc",
    measurementId: "G-V5JML4D98L"  
  }
};
