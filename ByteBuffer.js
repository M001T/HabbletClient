

class ByteBuffer {

	data;
	offset = 0;

	constructor(data){
		// Garantir que os dados sejam um buffer

		if(data == void 0){
			data = Buffer.from([]);
		}

		if(!(data instanceof Buffer)){
			data = Buffer.from(data);
		}

		this.data = data;

	}

	writeByte(value=0){
		let buf = Buffer.alloc(1);
		buf.writeInt8(value);
		this.data = Buffer.concat([
			this.data,
			buf
		]);
	}

	writeShort(value=0){
		let buf = Buffer.alloc(2);
		buf.writeInt16BE(value);
		this.data = Buffer.concat([
			this.data,
			buf
		]);
	}

	writeString(text=""){
		let string = Buffer.from(text);
		this.writeShort(string.length);
		if(string.length){
			this.data = Buffer.concat([
				this.data,
				string
			])
		}
	}

	writeInt(value=0){
		let buf = Buffer.alloc(4);
		buf.writeInt32BE(value);
		this.data = Buffer.concat([
			this.data,
			buf
		]);
	}

	readBoolean(){
		return !!this.readByte();
	}

	readInt(){
		let data = this.data.readInt32BE(this.offset);
		this.offset += 4;
		return data;
	}

	readByte(){
		return this.data.readInt8(this.offset++);
	}

	readShort(){
		let data = this.data.readInt16BE(this.offset);
		this.offset += 2;
		return data;
	}

	readString(){
		let length = this.readShort();
		let string = this.data.slice(this.offset, this.offset+length).toString();
		this.offset += length;
		return string;
	}

	compose(){
		let length = Buffer.alloc(4);
		length.writeInt32BE(this.data.length);
		return Buffer.concat([
			length,
			this.data
		]);
	}

}

module.exports = ByteBuffer;