let HabbletClient = require("./HabbletClient");

//ontem eu comi as 20 novinhas e eu n peguei nenhum DST confia rapa
let client = new HabbletClient(
	"a6e01d4c727e927487d507dc6bd382ceba4c7e34-36fe32dc8cd73326fdf3b92b9d62794c"
);

client.on("Loaded", () => {

	client.EnterRoom(5126181);

});

client.on("RoomUnitChat", data => {
	let unit = client.Room.GetUnitByIndex(data.roomIndex);
	(unit && unit.username !== "bot00001") && client.SendMessage(data.message);
});