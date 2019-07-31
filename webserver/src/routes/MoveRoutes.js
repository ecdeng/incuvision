// NPM imports
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const consts = require('../consts.js');
const custom_utils = require('../utils.js');

router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

router.post('/move', (req, res) => {
    let io = app.get('io');
    let err_status = '';
    moveStr = req.body.moveStr;
    if (!custom_utils.isValidPointStr(moveStr)) {
        // todo: fix error handling
        res.send(consts.invalid_move_str_err);
    }
    io.emit(consts.web_command_route, moveStr);
    io.on(consts.error_status_route, (msg) => {
        err_status = msg;
    }).then(() => 
        res.send(err_status)
    );
});

module.exports.router = router;