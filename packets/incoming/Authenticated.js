

class Authenticated {

	Parse(data, client){

		console.log("Authenticated.")

		client.emit("Authenticated")

	}

}

module.exports = Authenticated;