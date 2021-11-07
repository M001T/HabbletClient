

class ModtoolCFHTopics {

	Parse(packet, client){

		let data = {
			callForHelpCategories: new Array(packet.readInt())
		}

		for(let i = 0; i < data.callForHelpCategories.length; i++){
			let category = {
				name: packet.readString(),
				topics: new Array(packet.readInt())

			}

			for(let i = 0; i < category.topics.length; i++){
				category.topics[i] = {
					name: packet.readString(),
					id: packet.readInt(),
					_Str_18308: packet.readString()
				}
			}

			data.callForHelpCategories[i] = category;
		}

		// console.log(data);

	}

}

module.exports = ModtoolCFHTopics;