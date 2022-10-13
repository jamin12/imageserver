const appRoot = require('app-root-path');
const multer = require('multer');
const validator = require('validator');
const config = require('../config/config');
const httpStatus = require('http-status');
const ApiError = require('../utils/Error/customError');
const logger = require('../config/logger');

const limits = {
  filedNameSize: 200,             // default 100bytes
  filedSize: 10 * 1024 * 1024,    // default 1MB
  fields: 10,                      // default INF
  filesize: 20 * 1024 * 1024,     // default INF
  files: 10                       // default INF
};

/**
 * @description Filtering upload file using mimetype
 * @param {Object} req request
 * @param {Object} file
 * {
 *   fieldname: 'file',
 *   originalname: 'example.png',
 *   encoding: '7bit',
 *   mimetype: 'image/png',
 * }
 * @param {Function} next allow or deny file upload
 */
const fileFilter = (req, file, next) => {
  const typeArray = file.mimetype.split('/');
  const fileType = typeArray[1];

  if (validator.contains('jpg,jpeg,png', fileType)) {
    next(null, true);
  } else {
    const err = new ApiError(httpStatus.FORBIDDEN, 'Forbidden file extension.');
    next(err, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/images`) // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  // TODO: 파일 이름 랜덤으로 저장
  filename: (req, file, cb) => {
    cb(null, `${file.filename}.${file.originalname.split('.')[1]}`) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})


const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter
});

module.exports = {
  upload
};
