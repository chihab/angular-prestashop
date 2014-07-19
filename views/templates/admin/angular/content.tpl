<script>
    var ctrl_token = '{$token}';
</script>
<div ng-app="angular-prestashop">
    <script type="text/ng-template" id="settings.html">
        <h3>{l s='Appearance'}</h3>
        <form ng-submit="save()" ng-controller="SettingsCtrl">
            <label for="bgColor">{l s='Backgroud color'}</label>
            <div class="margin-form"><input type="text" size="7" id="bgColor" name="bgColor" ng-model="config.bgColor" /></div>
            <label for="fgColor">{l s='Font color'}</label>
            <div class="margin-form"><input type="text" size="7" id="fgColor" name="fgColor" ng-model="config.fgColor" /></div>
            <div class="clear"></div>
            <div class="margin-form">
                <input type="submit" id="save" name="save" value="Save" ng-model="save" />
            </div>
        </form>
    </script>
    <div ng-view></div>
</div>
