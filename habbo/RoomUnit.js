

class RoomUnit {

	static TYPE = {
		USER: 1,
		PET: 2,
		BOT: 3,
		RENTABLE_BOT: 4
	}

	id;
	username;
	custom;
	figure;
	roomIndex;
	x; y; z;
	direction;
	type;

	// RENTABLE_BOT
	botSkills;

	// RENTABLE_BOT & PET
	ownerId;
	ownerName;

	// PET
	subType;
	rarityLevel;
	hasSaddle;
	isRiding;
	canBreed;
	canHarvest;
	canRevive;
	hasBreedingPermission;
	petLevel;
	petPosture;

	// BOT & USER
	sex;

	// USER
	groupID;
	groupStatus;
	groupName;
	activityPoints;
	isModerator;

	constructor(packet){
		this.id = packet.readInt();
		this.username = packet.readString();
		this.custom = packet.readString();
		this.figure = packet.readString();
		this.roomIndex = packet.readInt();
		this.x = packet.readInt();
		this.y = packet.readInt();
		this.z = parseFloat(packet.readString());
		this.direction = packet.readInt();
		this.type = packet.readInt()

		if(this.type === 1){
			this.sex = this.getSex(packet.readString());
			this.groupID = ('' + packet.readInt());
			this.groupStatus = packet.readInt();
            this.groupName = packet.readString();

            const swimFigure = packet.readString();

            if(swimFigure !== '')
            	this.figure = this.convertSwimFigure(swimFigure, this.figure, this.sex);

            this.activityPoints = packet.readInt();
            this.isModerator = packet.readBoolean();
		}else if(this.type === 2){
            this.subType                = packet.readInt().toString();
            this.ownerId                = packet.readInt();
            this.ownerName              = packet.readString();
            this.rarityLevel            = packet.readInt();
            this.hasSaddle              = packet.readBoolean();
            this.isRiding               = packet.readBoolean();
            this.canBreed               = packet.readBoolean();
            this.canHarvest             = packet.readBoolean();
            this.canRevive              = packet.readBoolean();
            this.hasBreedingPermission  = packet.readBoolean();
            this.petLevel               = packet.readInt();
            this.petPosture             = packet.readString();
		}else if(this.type === 3){
            this.id = (this.roomIndex * -1);

            if(this.figure.indexOf('/') !== -1)
            	this.figure = 'hr-100-.hd-180-1.ch-876-66.lg-270-94.sh-300-64';

            this.sex = "M";
		}else if(this.type === 4){
            this.sex        = this.getSex(packet.readString());
            this.ownerId    = packet.readInt();
            this.ownerName  = packet.readString();

            const totalSkills = packet.readInt();

            if(totalSkills)
            {
                const skills = [];

                let j = 0;

                while(j < totalSkills)
                {
                    skills.push(packet.readShort());

                    j++;
                }

                this.botSkills = skills;
            }
		}
	}

	getSex(sex){
		return sex.substr(0, 1);
	}

	convertSwimFigure(k, _arg_2, _arg_3){
        const _local_4    = _arg_2.split('.');
        let _local_5    = 1;
        let _local_6    = 1;
        let _local_7    = 1;
        const _local_8    = 10000;
        let i           = 0;

        while(i < _local_4.length)
        {
            const _local_13 = _local_4[i];
            const _local_14 = _local_13.split('-');

            if(_local_14.length > 2)
            {
                const _local_15 = _local_14[0];

                if(_local_15 === 'hd') _local_5 = parseInt(_local_14[2]);
            }

            i++;
        }

        const _local_10 = ['238,238,238', '250,56,49', '253,146,160', '42,199,210', '53,51,44', '239,255,146', '198,255,152', '255,146,90', '157,89,126', '182,243,255', '109,255,51', '51,120,201', '255,182,49', '223,161,233', '249,251,50', '202,175,143', '197,198,197', '71,98,61', '138,131,97', '255,140,51', '84,198,39', '30,108,153', '152,79,136', '119,200,255', '255,192,142', '60,75,135', '124,44,71', '215,255,227', '143,63,28', '255,99,147', '31,155,121', '253,255,51'];
        const _local_11 = k.split('=');

        if(_local_11.length > 1)
        {
            const _local_16 = _local_11[1].split('/');
            const _local_17 = _local_16[0];
            const _local_18 = _local_16[1];

            if(_arg_3 === 'F') _local_7 = 10010;
            else _local_7 = 10011;

            const _local_19 = _local_10.indexOf(_local_18);

            _local_6 = ((_local_8 + _local_19) + 1);
        }

        return _arg_2 + ((((('.bds-10001-' + _local_5) + '.ss-') + _local_7) + '-') + _local_6);
    }

}

module.exports = RoomUnit;