<?php

/**
 * @author Adeleye Benjamin Adesanoye <adeleye.benjamin@highbreedtech.com>
 */

require(__DIR__ . "/exception/TatumException.php");
if (!defined('TATUM') || !defined('TATUMIO') || !defined('TATUMPHP') || !defined('TATUMLIB')) {
    throw new \TatumException("Access Denied!");
}
