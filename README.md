# SerrandaManager
Controlling shutters using HTTP.


#### Installation
- ``git clone git@github.com:piermarcobarbe/SerrandaManager.git``
- ``cd SerrandaManager``
- ``npm install``
- ``node bin/www``
- go to ``https://localhost:3000/``


#### Configuration

##### Controllers
The configuration is possible with a JSON you can find in the file ``config.js`` inside the ``SerrandaManager`` directory.
The JSON has a structure like:
```javascript 
{
    0 : new buttonCouple("Switch 1", 1, 2),
    1 : new buttonCouple("Switch 2", 3, 4),
    2 : new buttonCouple("Switch 3", 5, 6)
}
```
The __key__ of your switches must be an __Integer__, the values must be __buttonCouple__ objects, where the constructor holds an __identifier(String)__ and a pair of __GPIO pins__, the first for opening up and the second for closing your shutters. 

##### Users and Passwords
This configuration can be accomplished creating a file ``users.js`` inside the ``SerrandaManager`` directory.
The presence or the absence of this file results in an enabled or disabled Basic Auth module.
The whole SerrandaManager does not require authentication if this file is present, viceversa otherwise.
Inside this file, another json must be created. Its structure is the following:
```javascript
{
    "user1" : "password1",
    .
    .
    .
}
```
``user1`` may login using ``password1`` as password now.
