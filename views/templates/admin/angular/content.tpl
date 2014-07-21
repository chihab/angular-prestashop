<script>
    var ctrl_token = '{$token}';
</script>
<div data-ng-app="angular-prestashop">
    <script type="text/ng-template" id="settings.html" data-ng-controller="SettingsCtrl">
        <h1>{l s='Settings'}</h1>
        <h2>{l s='Appearance'}</h2>
        <div id="messages" class="alert alert-dismissible" data-ng-class="alertClass()" data-ng-show="alert.message">
            //alert.message//
        </div>
        <form data-ng-submit="save()">
            <div class="margin-form">
                <label for="bgColor">{l s='Backgroud color'}</label>
                <input type="text" size="7" id="bgColor" name="bgColor" data-ng-model="config.bgColor"/>
            </div>
            <div class="margin-form">
                <label for="fgColor">{l s='Font color'}</label>
                <input type="text" size="7" id="fgColor" name="fgColor" data-ng-model="config.fgColor"/>
            </div>
            <div class="clear"></div>
            <div class="margin-form">
                <input type="submit" id="save" name="save" value="Save" data-ng-model="save"/>
            </div>
        </form>

        <h2>{l s='MD5 Hash'}</h2>
        <input type="text" data-ng-model="text" />
        <div class="clear"></div>
        Text: //text//
        <div class="clear"></div>
        Hash: //hash//
    </script>
    <div data-ng-view></div>
</div>
