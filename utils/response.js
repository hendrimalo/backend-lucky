module.exports = {
  apiResponse: (res, status, message) => res.status(status).json({ message }),
  alertError: (req, action, data, error) => {
    req.flash('alertMessage', `Failed ${action} data ${data} ${error}`);
    req.flash('alertStatus', 'danger');
  },
  alertSuccess: (req, action, data) => {
    req.flash('alertMessage', `Success ${action} data ${data}`);
    req.flash('alertStatus', 'success');
  },
};
