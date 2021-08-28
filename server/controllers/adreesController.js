import shippingAddressM from "../models/shippingAddress.js";
export const getadress = async (req, res) => {
  try {
    const user = req.userData.id;

    const Useradress = await shippingAddressM.find({ user: user });
    res.status(200).json({
      adress: Useradress,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
