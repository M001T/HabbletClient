let RoomUnit = require("../../habbo/RoomUnit");
let Room = require("../../habbo/Room");

class RoomUnitEvent {

	Parse(packet, client){

		let data = {
			users: new Array(packet.readInt())
		}

		for(let i = 0; i < data.users.length; i++){
			data.users[i] = new RoomUnit(packet);
			Room.Units.push(data.users[i]);
		}

		client.emit("UnitEnterRoom", data);

	}

}

module.exports = RoomUnitEvent;