const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { fileController } = require('../controller/index');
const { upload } = require('../middleware/file');
// const multer = require('multer');

// // const upload = multer({
// //   dest: 'uploads/'
// // });

// const storage = multer.diskStorage({
//   destination: 'uploads/',// cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
//   filename: (req, file, cb) => {
//     cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
//   }
// })

// const upload = multer({ storage: storage })

router
  .route('/')
  .post(upload.single('file'), fileController.input.insertFile);


router
  .route('/:fid(\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12})')
  .get(fileController.output.getFile)




module.exports = router;