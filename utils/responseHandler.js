const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);
const created = (res, data) => responseWithData(res, 201, data);
export default {
  created,
};
