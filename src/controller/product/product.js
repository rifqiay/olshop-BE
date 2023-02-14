const { v4: uuidV4 } = require("uuid");
const { response } = require("../../helper/common");
const { uploadToCloudinary } = require("../../middleware/upload");
const { addPhoto, createProduct } = require("../../model/product/product");
const createError = require("http-errors");

const productController = {
  addProduct: async (req, res, next) => {
    try {
      const {
        name,
        price,
        stock,
        color,
        size,
        condition,
        description,
        sellerId,
        categoryId,
      } = req.body;

      // add photo
      const locaFilePath = req.file.path;
      const result = await uploadToCloudinary(locaFilePath);
      if (!result) throw new createError(400, "failed to upload image");

      let photoList = [];
      for (var i = 0; i < req.files.length; i++) {
        let locaFilePath = req.files[i].path;

        const resultList = await uploadToCloudinary(locaFilePath);
        photoList.push(`${resultList.id},${resultList.url}`);
      }
      const dataPhoto = {
        id: uuidV4(),
        cover: `${result.id},${result.url}`,
        photo1: photoList[0],
        photo2: photoList[1],
        photo3: photoList[2],
        photo4: photoList[3],
        photo5: photoList[4],
      };
      await addPhoto(dataPhoto)
        .then((result) => response(res, result.rows, 200, "Add photo success"))
        .catch((error) => next(new createError(error)));

      // add product
      const data = {
        id: uuidV4(),
        name,
        price,
        stock,
        color,
        size,
        condition,
        description,
        sellerId,
        categoryId,
      };
      console.log(data);
      createProduct(data)
        .then((result) =>
          response(res, result.rows, 200, "Add product success")
        )
        .catch((error) => next(new createError(error)));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
