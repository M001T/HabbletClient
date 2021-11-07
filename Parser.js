let ByteBuffer = require("./ByteBuffer");

/*
	._______________________________.
	| Symb  | Name		| Size		|
	|-------------------------------|
	| s  	| short   	| 2 bytes	|
	| b  	| byte    	| 1 byte	|
	| i  	| int     	| 4 bytes	|
	| z  	| boolean 	| 1 byte	|
	| c  	| char		| 1 byte	|
	| c*	| string	| 2-n bytes	|
	'''''''''''''''''''''''''''''''''
	Packet default struct
	{s:header,...}
*/

class Parser {

	static patterns = {};

	static RegisterPattern(pattern, name){
		pattern = pattern.replace(/[\{\}]/g, '').split(",").map(x => x.split(":"));

		Parser.patterns[name] = pattern;
	}

	// Lê Buffers
	static Decode(buffer, patternName){
		let pattern = Parser.patterns[patternName];
		if(!pattern){
			return {};
		}
		let data = {}

		for(let prop of pattern){
			let p = [prop[0], prop[1]]

			if(p[1].startsWith("?") && buffer.offset !== buffer.data.length){
				p[1] = p[1].substr(1);
			}
			switch(p[0]){
				case "c*":
					data[p[1]] = buffer.readString();
					break;
				case "s":
					data[p[1]] = buffer.readShort();
					break;
				case "i":
					data[p[1]] = buffer.readInt();
					break;
				case "z":
					data[p[1]] = buffer.readBoolean();
			}
		}

		return data;

	}

	// Cria Buffers
	static Encode(data, patternName){
		let pattern = Parser.patterns[patternName];
		let buffer = new ByteBuffer();
		buffer.writeShort(Number(patternName));

		for(let i = 0; i < data.length; i++){

			switch(pattern[i][0]){
				case "c*":
					buffer.writeString(data[i]);
					break;
				case "s":
					buffer.writeShort(data[i]);
					break;
				case "i":
					buffer.writeInt(data[i]);
					break;
			}

		}

		return buffer;

	}

}

module.exports = Parser;