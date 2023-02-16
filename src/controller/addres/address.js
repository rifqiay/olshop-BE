const { v4: uuidV4 } = require("uuid");
const { response } = require("../../helper/common");
const { addAddress, setPrimaryAddress } = require("../../model/address/addres");

const addressController = {
  addNewAddress: async (req, res, next) => {
    try {
      const {
        addressAs,
        recipientName,
        recipientPhoneNumber,
        fullAddress,
        city,
        poscode,
        setPrimary,
        customerId,
      } = req.body;

      const data = {
        id: uuidV4(),
        addressAs,
        recipientName,
        recipientPhoneNumber,
        fullAddress,
        city,
        poscode,
        customerId,
      };
      const result = await addAddress(data);

      if (setPrimary) {
        await setPrimaryAddress({
          customerId,
          addressId: data.id,
        });
      }
      response(res, result.rows, 200, "Add address success", "success");
    } catch (error) {
      next(error);
    }
  },
  primaryAddress: async (req, res, next) => {
    try {
      const { customerId, addressId } = req.body;
      const result = await setPrimaryAddress({ customerId, addressId });
      response(res, result.rows, 200, "Set address success", "success");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = addressController;
