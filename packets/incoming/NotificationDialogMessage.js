

class NotificationDialogMessage {

	Parse(packet, client){

		let data = {
			type: packet.readString(),
			parameters: {}
		}

		let count = packet.readInt();

		for(let i = 0; i < count; i++){
			data.parameters[packet.readString()] = packet.readString();
		}

		// console.log(data);

	}

}

module.exports = NotificationDialogMessage;