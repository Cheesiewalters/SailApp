function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getAllMemberRoles = async (req, res) => {
	try {
		res.status(200).json({
			data: [
				{ id: 1, role: "Helm" },
				{ id: 1, role: "Crew" },
				{ id: 1, role: "Owner" },
				{ id: 1, role: "Trimmer" },
			],
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const postMemberRoles = async (req, res) => {
	try {
		const id = randomInteger(0, 10);
		const role = req.body.role;
		res.status(200).json({
			newMemberRole: {
				id: id,
				role: role,
			},
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const getAllMembers = async (req, res) => {
	try {
		res.status(200).json({
			data: [
				{
					id: 1,
					name: "Conor Walters",
					roleId: 3,
				},
				{
					id: 2,
					name: "Tom Purdon",
					roleId: 2,
				},
				{
					id: 3,
					name: "Niall Walters",
					roleId: 1,
				},
				{
					id: 4,
					name: "Mark Brown",
					roleId: 4,
				},
			],
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const getMemberByID = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(200).json({
			data: [
				{
					id: id,
					name: "Mark Brown",
					roleId: 4,
					roleName: "trimer",
				},
			],
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const postMember = async (req, res) => {
	try {
		const name = req.body.name;
		const roleId = req.body.roleId;
		const id = randomInteger(0, 10);
		res.status(200).json({
			newMember: {
				id: id,
				name: name,
				roleId: roleId,
			},
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const updateMember = async (req, res) => {
	try {
		const name = req.body.name;
		const roleId = req.body.roleId;
		const id = req.params.id;
		res.status(200).json({
			updatedMember: {
				id: id,
				name: name,
				roleId: roleId,
			},
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const deleteMember = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(200).json({
			message: `Successfully deleted member with id: ${id}`,
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

module.exports = {
	getAllMemberRoles,
	postMemberRoles,
	getAllMembers,
	getMemberByID,
	postMember,
	updateMember,
	deleteMember,
};
