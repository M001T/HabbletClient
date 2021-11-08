

class RoomUnitChat {

	Parse(packet, client){

		let data = {
			roomIndex: packet.readInt(),
			message: packet.readString(),
			gesture: packet.readInt(),
			bubble: packet.readInt(),
		}

		client.emit("RoomUnitChat", data);

	}

}

module.exports = RoomUnitChat;