<?php

class AdminAngularController extends ModuleAdminController
{
    public $_path = null;

    public function __construct()
    {
        parent::__construct();
        $ajax = Tools::getValue('ajax');

        if ($ajax) {
            $this->ajax = true;
            $this->display_header = false;
            $this->display_footer = false;
            $this->content_only = true;
        } else {
            $this->bootstrap = true;
            $this->display = 'view';
            $this->_path = __PS_BASE_URI__ . basename(_PS_MODULE_DIR_) . '/' . $this->module->name . '/';
        }

    }

    public function ajaxProcessTestRequest()
    {
        $method = Tools::getValue('method');
        die("Method called : ".$method);
    }

    public function ajaxProcessUpdateConfiguration()
    {
        $key = Tools::getValue('key');
        $value = file_get_contents('php://input');
        if ($this->updateConfiguration($key, $value)) {
            die("ok");
        }
        die("ko");
    }

    public function ajaxProcessGetConfiguration()
    {
        $key = Tools::getValue("key");
        if ($key)
            die($this->getConfiguration($key));
    }

    public function setMedia()
    {
        parent::setMedia();

        $this->setVendorMedia();

        $this->context->controller->addJs($this->_path . 'views/js/services.js');
        $this->context->controller->addJs($this->_path . 'views/js/controllers.js');
        $this->context->controller->addJs($this->_path . 'views/js/directives.js');

        $this->context->controller->addCss($this->_path . 'views/css/'.$this->module->name.'.css');
    }

    public function setVendorMedia()
    {
        $this->context->controller->addJs(array(
            $this->_path . 'views/vendor/angular/angular.js',
            $this->_path . 'views/vendor/angular-route/angular-route.min.js',
            $this->_path . 'views/vendor/angular-bootstrap/ui-bootstrap.min.js',
            $this->_path . 'views/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
        ));

        if (version_compare(_PS_VERSION_, '1.6', '<')) {
            $this->context->controller->addCss(
                array(
                    $this->_path . 'views/vendor/bootstrap/dist/css/bootstrap.min.css',
                )
            );
            $this->context->controller->addJs(
                array(
                    $this->_path . 'views/vendor/bootstrap/dist/js/bootstrap.min.js',
                )
            );
        }
    }

    public function hasConfiguration($key)
    {
        return Db::getInstance()->getValue('SELECT count(*) FROM `'._DB_PREFIX_.$this->module->name.'` WHERE `name` = "'.pSQL($key).'"');
    }

    public function updateConfiguration($key, $value)
    {
        if ($this->hasConfiguration($key))
            return Db::getInstance()->execute("UPDATE `"._DB_PREFIX_.$this->module->name."` SET `value` = '".$value."' WHERE `name` = '".pSQL($key)."'");
        else
            return Db::getInstance()->execute('INSERT INTO `'._DB_PREFIX_.$this->module->name.'` VALUES  (NULL,"'.pSQL($key).'","'.pSQL($value).'")');
    }

    public function getConfiguration($key)
    {
        return Db::getInstance()->getValue('SELECT `value` FROM `'._DB_PREFIX_.$this->module->name.'` WHERE `name` = "'.pSQL($key).'"');
    }
}