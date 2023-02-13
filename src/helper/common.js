const response = (res, result, status, message, success) => {
  const resultPrint = {};
  resultPrint.status = success ? "success" : "error";
  resultPrint.statusCode = status;
  resultPrint.data = result;
  resultPrint.message = message || null;
  res.status(status).json(resultPrint);
};

module.exports = { response };
