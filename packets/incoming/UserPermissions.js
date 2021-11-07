let Parser = require("../../Parser");
let IncomingHeaders = require("../../IncomingHeaders");

class UserPermissions {

	Parse(packet, client){

		let data = {
			clubLevel: packet.readInt(),
			securityLevel: packet.readInt(),
			isAmbassador: packet.readBoolean()
		}

		// console.log(data);

	}

}

module.exports = UserPermissions;