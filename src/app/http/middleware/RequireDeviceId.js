import Device from 'model/Device';
import UnauthorizedError from 'exceptions/UnauthorizedError';
import NotFoundError from 'exceptions/NotFoundError';

module.exports.RequireDeviceId = async (req, _res, next) => {
  if (req.path === '/devices' && req.method === 'POST') {
    return next();
  }
  if (!req.headers['x-device-id']) {
    return next(new UnauthorizedError('Device ID is required'));
  }
  Device.findById(req.headers['x-device-id']).then((device) => {
    if (!device) {
      return next(
        new NotFoundError(
          `Device with id ${req.headers['x-device-id']} doesn't exist`
        )
      );
    }
    req.device = device;
    next();
  }).catch(next);
};
