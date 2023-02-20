const createError = require("http-errors");
const { uploadToCloudinary, deleteImage } = require("../../middleware/upload");
const { edit, getProfile } = require("../../model/customer/editProfie");
const { response } = require("../../helper/common");
const { extractPublicId } = require("../../helper/extracPublicId");

const customerController = {
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { name, email, phoneNumber, gender, birth } = req.body;
      const seller = await getProfile(id);
      const isPhoto = seller.rows[0].photo;
      if (isPhoto) {
        const public_id = extractPublicId(isPhoto);
        deleteImage(public_id);
      }

      const locaFilePath = req.file?.path;
      let result;
      if (locaFilePath) {
        result = await uploadToCloudinary(locaFilePath);
      }

      const data = {
        id,
        name,
        email,
        phoneNumber,
        gender,
        birth,
        photo: !result ? isPhoto : `${result.id},${result.url}`,
      };
      edit(data)
        .then((result) =>
          response(res, result.rows, 200, "Edit profile succes", "success")
        )
        .catch((error) => next(new createError(error)));
    } catch (error) {
      next(error);
    }
  },
  getCustomerById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await getProfile(id);
      response(res, result.rows, 200, "Get profile succes", "success");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = customerController;
