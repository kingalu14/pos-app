const CART_STATUS = {
    OPEN: 'OPEN',
    CHECKOUT: 'CHECKOUT',
    COMPLETED: 'COMPLETED',
    ABANDONED: 'ABANDONED',
};
const PAYMENT_STATUS = {
    SUCCEEDED: 'SUCCEEDED',
    FAIL: 'FAIL',
    PENDING: 'PENDING',
};

const LOGGER_FILE = {
    INFO: 'info.log',
    WARNING: 'warning.log',
    ERROR: 'error.log',
    EXCEPTION: 'exceptions.log',
};

module.exports = {
    CART_STATUS,
    LOGGER_FILE,
    PAYMENT_STATUS,
};
