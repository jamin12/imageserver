const { files, sequelize } = require("../models/index");
const { v4: uuid } = require('uuid');
const logger = require("../config/logger");
const CustomError = require("../utils/Error/customError");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const fileDto = require("../dto/fileDto");

class FileService {
  constructor() {
  }

  async findLastOne(updateType) {
    const lastOne = await files.findOne({
      attributes: fileDto,
      order: [[updateType, 'DESC']]
    })

    return lastOne;
  }

  async createFile(fileInfo) {
    fileInfo.fid = uuid();
    fileInfo.ext = `.${fileInfo.originalname.split('.')[1]}`
    const createdFile = await files.create(
      fileInfo
    )
    return {
      fid: createdFile.fid,
      created_at: createdFile.created_at
    };
  }

  async getImgFile(fid) {
    return await files.findOne({
      attributes: ["filename"],
      where: {
        fid: fid
      }
    })
  }
}

module.exports = FileService;
