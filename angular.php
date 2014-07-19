<?php

if (!defined('_PS_VERSION_'))
    exit;

class Angular extends Module
{
    public function __construct()
    {
        $this->name = 'angular';
        $this->version = '0.1';
        $this->author = 'Chihab Otmani';
        $this->tab = 'administration';
        $this->displayName = $this->l('Prestashop Module based on AngularJS');
        $this->description = $this->l('A great starting point for writing Prestashop Modules based on AngularJS');

        parent::__construct();
    }

    public function install()
    {
        Db::getInstance()->execute('
                CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . $this->name . '` (
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    name VARCHAR(32) NOT NULL,
                    value LONGTEXT NOT NULL
                ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8;');
        return $this->installTab("Admin".get_class(), $this->l('Angular Module'), "AdminParentStats") && parent::install();
    }

    public function uninstall()
    {
        Db::getInstance()->execute('DROP TABLE IF EXISTS ' . _DB_PREFIX_ . $this->name);
        return $this->uninstallTab("Admin".get_class()) && parent::uninstall();
    }

    private function installTab($class, $name, $parent)
    {
        $nameLang = array();
        foreach (Language::getLanguages() as $language)
            $nameLang[$language['id_lang']] = $name;
        $tab = new Tab();
        $tab->name = $nameLang;
        $tab->class_name = $class;
        $tab->module = $this->name;
        $tab->id_parent = Tab::getIdFromClassName($parent);
        return $tab->save();
    }

    private function uninstallTab($class)
    {
        $idTab = Tab::getIdFromClassName($class);
        if ($idTab != 0) {
            $tab = new Tab($idTab);
            return $tab->delete();
        }
        return true;
    }
}