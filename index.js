let HabbletClient = require("./HabbletClient");

let client = new HabbletClient("f279d01a81817d52d29dcd545b46059ffe13abbc-a57992d63c509ca93672436c3e2016ed");

client.on("loaded", () => {

	client.EnterRoom(5126181);

})