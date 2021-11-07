

class AvatarEffects {
	
	Parse(packet, ws){

		let data = {
			totalEffects: packet.readInt(),
			effects: []
		}

		for(let i = 0; i < data.totalEffects; i++){
			data.effects.push({
				type: packet.readInt(),
				_Str_3882: packet.readInt(),
				duration: packet.readInt(),
				_Str_18572: packet.readInt(),
				_Str_12185: packet.readInt(),
				_Str_4010: packet.readInt()
			})
		}

		// console.log(data);
	}

}

module.exports = AvatarEffects;