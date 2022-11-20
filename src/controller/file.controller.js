"use strict";

const logger = require("../config/logger");
const catchAsync = require("../utils/catchAsync");
const { fileService } = require("../service/index");
const passport = require("passport");
const resultDto = require("../dto/resultDTO");
const httpStatus = require("http-status");
const { readFile, readFileSync } = require("fs");
const { Blob } = require("buffer");

const fileservice = new fileService();

const output = {
	getFile: catchAsync(async (req, res) => {
		const fileName = await fileservice.getImgFile(req.params.fid);
		res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
		res.redirect(`http://39.120.8.109:3551/images/${fileName.filename}`);
	}),
};

const input = {
	insertFile: catchAsync(async (req, res) => {
		const resultFile = await fileservice.createFile(req.file);
		res.send(resultDto.makeResult(httpStatus.OK, "createFile success", resultFile));
	}),

};


module.exports = {
	output,
	input,
};
