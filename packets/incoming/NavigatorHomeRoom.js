let RoomEnterComposer = require("../outgoing/RoomEnterComposer")

class NavigatorHomeRoom {

	Parse(packet, client){

		let data = {
			homeRoomId: packet.readInt(),
			roomIdToEnter: packet.readInt()
		}

		client.emit("Loaded");

		// console.log(data);
	}

}

module.exports = NavigatorHomeRoom;