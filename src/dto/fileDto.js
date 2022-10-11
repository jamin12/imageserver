const { sequelize } = require("../models/index");

module.exports = [
	"fid",
	[
		sequelize.fn(
			"date_format",
			sequelize.col("files.created_at"),
			"%Y-%m-%d %H:%i"
		),
		"created_at",
	],
	[
		sequelize.fn(
			"date_format",
			sequelize.col("files.updated_at"),
			"%Y-%m-%d %H:%i"
		),
		"updated_at",
	],
];
