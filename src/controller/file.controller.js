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
		const fileOriginName = await fileservice.getImgFile(req.params.fid);
		const test = readFileSync('./public/images/111.png');
		const encodeImg = Buffer.from(test).toString('base64'); //파일 인코딩
		const decoingImg = Buffer.from(encodeImg, 'base64');
		console.log(encodeImg);
		res.redirect(`http://127.0.0.1:3551/images/${fileOriginName.originalname}`);
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
