import PromoCode from 'model/PromoCode';
import { parseQueryOptions } from 'lib/utils';

export function queryPromoCode(params) {
  const options = parseQueryOptions(params);
  const query = {};
  if (params.id) {
    query._id = params.id;
  }
  if (params.search) {
    query.$or = [
      {
        user: new RegExp(params.search, 'gi')
      },
      {
        code: new RegExp(params.search, 'gi')
      }
    ];
  }
  if (params.user) {
    query.user = {
      $regex: new RegExp(params.user, 'gi')
    };
  }
  if (params.code) {
    query.code = {
      $regex: new RegExp(params.code, 'gi')
    };
  }
  return PromoCode.paginate(query, options).then(result => {
    const data = {
      ...result,
      promoCode: result.docs
    };
    delete data.docs;
    return data;
  });
}

export function getSinglePromoCode(id) {
  return PromoCode.findById(id);
}

export async function createPromoCode(data, creator = null) {
  data.user = creator;
  return PromoCode.create(data);
}

export function updatePromoCode(id, data) {
  return PromoCode.findById(id).then(promoCode => {
    promoCode.mergeWithData(data);
    return promoCode.save();
  });
}

export function deletePromoCode(id, deletedBy) {
  return PromoCode.findById(id).then(promoCode => promoCode.delete(deletedBy));
}
