const Logger= (req, res, next) => {
    console.log('Logging..cxkcnxcn..');
    next();
};

module.exports = Logger;