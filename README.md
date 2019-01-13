# SerrandaManager
Controlling shutters using HTTP.


#### Installation
- ``git clone git@github.com:piermarcobarbe/SerrandaManager.git``
- ``cd SerrandaManager``
- ``npm install``
- ``node bin/www``


#### Configuration
The configuration is possible with a JSON you can find in the file ``config.js``.
The JSON has a structure like:
```javascript 
{
    0 : new buttonCouple("Switch 1", 1, 2),
    1 : new buttonCouple("Switch 2", 3, 4),
    2 : new buttonCouple("Switch 3", 5, 6)
}
```
The __key__ of your switches must be an __Integer__, the values must be __buttonCouple__ objects, where the constructor holds an __identifier(String)__ and a pair of __GPIO pins__, the first for opening up and the second for closing your shutters. 
