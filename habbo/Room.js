

class Room {

	static Units = [];

	static GetUnitByIndex(roomIndex){
		for(let unit of Room.Units)
			if(unit.roomIndex === roomIndex)
				return unit;
	}

	static GetUnitByName(username){
		for(let unit of Room.Units)
			if(unit.username === username)
				return unit;
	}

}

module.exports = Room;