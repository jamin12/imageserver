"use strict";

const logger = require("../config/logger");
const catchAsync = require("../utils/catchAsync");
const { fileService } = require("../service/index");
const resultDto = require("../dto/resultDTO");
const httpStatus = require("http-status");

const fileservice = new fileService();

const output = {
	getFile: catchAsync(async (req, res) => {
		const fileName = await fileservice.getImgFile(req.params.fid);
		res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
		res.redirect(`https://www.jaminimg.shop/images/${fileName.filename}`);
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
