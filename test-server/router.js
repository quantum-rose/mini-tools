const router = require('express').Router();
const {
    getOpenid,
    book,
    getServertime,
    getUserInfo,
    captureFormId,
    tutorial,
    passport,
    gameResult
} = require('./ctrl');

router.get('/wx/openid', getOpenid);
router.post('/wx/book', book);
router.get('/link/servertime', getServertime);
router.get('/member/:openid', getUserInfo);
router.post('/wx/captureFormId', captureFormId);
router.post('/tutorial', tutorial);
router.get('/passport', passport);
router.get('/gameResult', gameResult);

module.exports = router;
