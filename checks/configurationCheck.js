checkConfiguration = function (config) {
    // console.log(config);
    for(p in config){
        if(config.hasOwnProperty(p)){
            checkProperty(config[p]);
        }
    }
}

checkProperty = function(prop){
    console.log(prop);
    testProperty(prop.identifier, "Field 'identifier'", 'string');
    testProperty(prop.activePin, "Field 'activePin'", 'number');
    testProperty(prop.status, "Function 'status'", 'function');
    testProperty(prop.status(), "Function status call", 'string');
    testProperty(prop.up, "Function 'up'", 'function');
}


testProperty  = function(prop, propName, expectedType){
    console.log(propName + ": " + prop);
    if(prop === null || prop === undefined) throw new Error(propName + " is missing.");
    if(typeof prop !== expectedType) throw new Error("Property type: " + typeof prop + ". Expected type: " + expectedType + "." );
};

module.exports = checkConfiguration;