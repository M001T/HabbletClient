let Authenticated = new (require("./Authenticated"))();
let UserPermissions = new (require("./UserPermissions"))();
let AvailabilityStatusMessage = new (require("./AvailabilityStatusMessage"))();
let UserSettings = new (require("./UserSettings"))();
let NavigatorHomeRoom = new (require("./NavigatorHomeRoom"))();
let FurnitureListInvalidate = new (require("./FurnitureListInvalidate"))();
let AvatarEffects = new (require("./AvatarEffects"))();
let ModtoolCFHTopics = new (require("./ModtoolCFHTopics"))();
let NotificationDialogMessage = new (require("./NotificationDialogMessage"))();
let RoomUnitChat = new (require("./RoomUnitChat"))();
let RoomUnitEvent = new (require("./RoomUnitEvent"))();
let IncomingHeaders = require("../../IncomingHeaders");
let Parser = require("../../Parser");

let parsers = {
	2491: Authenticated,
	411: UserPermissions,
	2033: AvailabilityStatusMessage,
	513: UserSettings,
	2875: NavigatorHomeRoom,
	3151: FurnitureListInvalidate,
	340: AvatarEffects,
	325: ModtoolCFHTopics,
	1992: NotificationDialogMessage,
	1446: RoomUnitChat,
	374: RoomUnitEvent,
};

class Incoming {

	static RegisterPackets(){
	}

	static Parse(packet, client){
		let length = packet.readInt();
		let header = packet.readShort();
		let result = {
			length: length,
			header: header
		}

		if(!parsers[header]){
			return result;
		}

		result.success = true;

		// packet = Parser.Decode(packet, header);
		parsers[header].Parse(packet, client);

		return result;

	}

}

module.exports = Incoming;