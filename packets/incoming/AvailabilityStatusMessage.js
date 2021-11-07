

class AvailabilityStatusMessage {

	Parse(packet, client){

		let data = {
			isOpen: packet.readBoolean(),
			onShutdown: packet.readBoolean(),
		}
		if(packet.offset !== packet.data.length)
			packet.isAuthenticUser = packet.readBoolean();

		// console.log(data);
	}

}

module.exports = AvailabilityStatusMessage;