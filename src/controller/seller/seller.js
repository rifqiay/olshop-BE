const { v4: uuidV4 } = require("uuid");
const createError = require("http-errors");
const { uploadToCloudinary, deleteImage } = require("../../middleware/upload");
const { edit, getProfile } = require("../../model/seller/editProfie");
const { response } = require("../../helper/common");
const { extractPublicId } = require("../../helper/extracPublicId");

const sellerController = {
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { email, phoneNumber, storeName, storeDescription } = req.body;
      const seller = await getProfile(id);
      const isPhoto = seller.rows[0].photo;
      if (isPhoto) {
        const public_id = extractPublicId(isPhoto);
        deleteImage(public_id);
      }

      const locaFilePath = req.file?.path;
      let photos;
      if (locaFilePath) {
        photos = await uploadToCloudinary(locaFilePath);
      }

      const data = {
        id,
        email,
        phoneNumber,
        storeName,
        photo: !photos ? isPhoto : `${photos.id},${photos.url}`,
        storeDescription,
      };
      edit(data)
        .then((result) =>
          response(res, result.rows, 200, "Edit profile succes", "succsess")
        )
        .catch((error) => next(new createError(error)));
    } catch (error) {
      next(error);
    }
  },
  getSellerById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await getProfile(id);
      delete result.rows[0].password;
      response(res, result.rows, 200, "Edit profile succes", "succsess");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = sellerController;
