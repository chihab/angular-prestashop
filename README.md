angular-prestashop
==================

A great starting point for writing Prestashop Addons based on AngularJS.

## Usage
Rename module's name:
```
mv angular-prestashop angular
```

Install JavaScript dependencies:
```
cd angular/views
bower install
```
## Configuration
Indicate BaseUrl to angular on angular/views/js/services.js:
```javascript
   prestashopProvider.setBaseUrl('/admin-dev/index.php');
```

Enjoy!

Chihab Otmani
