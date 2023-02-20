const { v4: uuidV4 } = require("uuid");
const { response } = require("../../helper/common");
const { uploadToCloudinary, deleteImage } = require("../../middleware/upload");
const {
  createProduct,
  getOne,
  update,
  countData,
  getNewProduct,
  getAllProduct,
  destroy,
} = require("../../model/product/product");
const crypto = require("crypto");
const createError = require("http-errors");
const { extractPublicId } = require("../../helper/extracPublicId");

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
      let photoList = [];
      // const photos = req.files.map((file) => file);
      const photos = req.files;

      console.log(photos);
      // for (var i = 0; i < req.files.length; i++) {
      //   let originalname = req.files[i].originalname;
      //   originalname = crypto.randomBytes(5).toString("hex");
      //   let locaFilePath = req.files[i].path;

      //   // const resultList = await uploadToCloudinary(locaFilePath, originalname);
      //   // photoList.push(`${resultList.id},${resultList.url}`);
      // }

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
        photo0: photoList[0],
        photo1: photoList[1],
        photo2: photoList[2],
        photo3: photoList[3],
        photo4: photoList[4],
        photo5: photoList[5],
        sellerId,
        categoryId,
      };
      // console.log(data);
      // const result = await createProduct(data);
      // response(res, result.rows, 200, "Add product success", "success");
    } catch (error) {
      next(error);
    }
  },
  getById: (req, res, next) => {
    const { id } = req.params;
    getOne(id)
      .then((result) => {
        console.log(result);
        response(res, result.rows, 200, "Get product success", "success");
      })
      .catch((error) => next(new createError(error)));
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;
      const {
        name,
        price,
        stock,
        color,
        size,
        condition,
        description,
        categoryId,
      } = req.body;

      const isProduct = await getOne(id);
      const { photo0, photo1, photo2, photo3, photo4, photo5 } =
        isProduct.rows[0];
      const checkPhoto = [photo0, photo1, photo2, photo3, photo4, photo5];
      checkPhoto.forEach((photo) => {
        if (photo) {
          const public_id = extractPublicId(photo);
          deleteImage(public_id);
        }
      });

      let photoList = [];
      let resultList;

      for (var i = 0; i < req.files.length; i++) {
        let originalname = req.files[i].originalname;
        originalname = crypto.randomBytes(5).toString("hex");
        let locaFilePath = req.files[i].path;

        const resultList = await uploadToCloudinary(locaFilePath, originalname);
        photoList.push(`${resultList.id},${resultList.url}`);
      }

      if (!resultList) throw new createError(400, "failed to upload image");

      const data = {
        name,
        price,
        stock,
        color,
        size,
        condition,
        description,
        photo0: photoList[0],
        photo1: photoList[1],
        photo2: photoList[2],
        photo3: photoList[3],
        photo4: photoList[4],
        photo5: photoList[5],
        categoryId,
        id,
      };
      update(data)
        .then((result) =>
          response(res, result.rows, 200, "Edit product success", "success")
        )
        .catch((error) => next(new createError(error)));
    } catch (error) {
      next(error);
    }
  },
  newProduct: async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const result = await getNewProduct({ limit, offset });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      response(
        res,
        result.rows,
        200,
        "Get new product success",
        "success",
        pagination
      );
    } catch (error) {
      next(new createError(error));
    }
  },
  allProduct: async (req, res, next) => {
    try {
      const search = req.query.search || "";
      const orderBy = req.query.orderBy || "createat";
      const sort = req.query.sort || "ASC";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const result = await getAllProduct({
        search,
        sort,
        orderBy,
        limit,
        offset,
      });
      const totalData = result.rowCount;
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      response(
        res,
        result.rows,
        200,
        "Get new product success",
        "success",
        pagination
      );
    } catch (error) {
      next(new createError(error));
    }
  },
  remove: async (req, res, next) => {
    try {
      const { id } = req.params;

      const isProduct = await getOne(id);
      const { photo0, photo1, photo2, photo3, photo4, photo5 } =
        isProduct.rows[0];
      const checkPhoto = [photo0, photo1, photo2, photo3, photo4, photo5];
      checkPhoto.forEach((photo) => {
        if (photo) {
          const public_id = extractPublicId(photo);
          deleteImage(public_id);
        }
      });
      const result = destroy(id);
      if (!result) throw next(new createError(400));
      response(res, result.rows, 200, "Delete product success", "success");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
