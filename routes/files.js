const router = require('express').Router();
const { filesStorageDest } = require('../config');
const multer = require('multer');

const upload = multer({ dest: filesStorageDest });
const validate = require('../middleware/validate');
const filesController = require('../controllers/files');


router.post('/', [upload.single('file'), validate], filesController.uploadFile);
router.get('/:fileName', filesController.getFile);
router.patch('/:fileName', validate, filesController.updateFile);
router.delete('/:fileName', filesController.deleteFile);


module.exports = router;

