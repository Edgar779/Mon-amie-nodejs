export function ExtendableBuiltin(cls) {
  function ExtendableBuiltin(...args) {
    // eslint-disable-line no-shadow
    Reflect.apply(cls, this, args);
  }
  ExtendableBuiltin.prototype = Object.create(cls.prototype);
  Reflect.setPrototypeOf(ExtendableBuiltin, cls);

  return ExtendableBuiltin;
}

export function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function parseQueryOptions(query, defs = {}) {
  const options = JSON.parse(JSON.stringify(defs));
  const { page = 1, page_size: pageSize = 100 } = query;
  options.page = Number(page);
  options.limit = Number(pageSize);
  options.deleted = query.deleted || false;
  if (query.sort_by) {
    let sortBy = query.sort_by;
    if (sortBy === 'id') {
      sortBy = '_id';
    }
    options.sort = {};
    options.sort[sortBy] = query.sort_in === 'DESC' ? -1 : 1;
  }
  return options;
}

export function createResponse(data, message = null, status = 200) {
  const success = status < 400;
  return {
    success,
    message,
    data
  };
}

export const createNotification = registrationToken => {
  //instead of registrationToken can also be topic and condition
  const message = {
    data: {
      score: '850',
      time: '2:45'
    },
    // token: registrationToken
    // here we have topic to make test function work without providing real FCM token
    topic: registrationToken
  };

  return message;
};

export const parseFormField = data => {
  return data
    .split('[')
    .join(' ')
    .replace(new RegExp(']', 'g'), '')
    .split(' ');
};

export const createPaymentUrl = id => {
  return `https://testpayments.ameriabank.am/forms/frm_paymentstype.aspx?paymentid=${id}&lang=en`;
};

export const getRequestUrl = req => {
  return `${req.protocol}://${req.get('host')}`;
};

export const hashCode = string => {
  let hash = 0
  let chr;
  if (string.length === 0) return hash;
  for (let i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
