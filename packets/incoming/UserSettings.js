

class UserSettings {

	Parse(packet, client){

		let data = {
			volumeSystem: packet.readInt(),
			volumeFurni: packet.readInt(),
			volumeTrax: packet.readInt(),
			oldChat: packet.readBoolean(),
			roomInvites: packet.readBoolean(),
			cameraFollow: packet.readBoolean(),
			flags: packet.readInt(),
			chatType: packet.readInt()
		}

		// console.log(data);
	}

}

module.exports = UserSettings;