let HabbletClient = require("./HabbletClient");

// Nicolas na escuta?
// Hello

let client = new HabbletClient("edb5289839928000a5e7fdf7a86717eb0a6e119e-36fe32dc8cd73326fdf3b92b9d62794c");

client.on("loaded", () => {

	client.EnterRoom(5126181);

})