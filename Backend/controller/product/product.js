const Response = require("../../helper/errHandler");
const productModel = require("../../models/productschema");
const { productCreateSchema,productUpdateSchema,productIdSchema, }=require("../../helper/joi")

const createProduct = async (req, res) => {
  try {
    const { title, description } = req.body;

    const { error } = productCreateSchema.validate({ title, description });
    if (error) {
      return Response.Error({
        res,
        status: 400,
        message: error.details[0].message,
      });
    }

    const image = req.file?.filename;
    if (!image) {
      return Response.Error({
        res,
        status: 400,
        message: "Image file is required",
      });
    }

    const imageUrl = `http://localhost:3030/uploads/images/${image}`;

    const createproduct = await productModel.create({
      image: imageUrl,
      title,
      description,
    });

    return Response.Success({
      res,
      status: 200,
      message: "Product created successfully",
      data: createproduct,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.stack,
    });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const product = await productModel.find().sort({ createdAt: -1 });
    if (!product || product.length === 0) {
      return Response.Error({
        res,
        status: 400,
        message: "no data found",
      });
    }
    return Response.Success({
      res,
      status: 200,
      message: "Fetched all product",
      data: product,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.param;
    const file = req.file;

    if (!id) {
      return Response.Error({
        res,
        status: 400,
        message: "Product ID is required",
      });
    }

    // Prepare data to update
    const updateData = {};
    // console.log('updateData', updateData)
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (file) {
      const imageUrl = `http://localhost:3030/uploads/images/${file.filename}`;
      updateData.image = imageUrl;
    }
    // Perform update
    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    // console.log('updatedProduct', updatedProduct)
    if (!updatedProduct) {
      return Response.Error({
        res,
        status: 404,
        message: "Product not found",
      });
    }

    return Response.Success({
      res,
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { error } = productIdSchema.validate(req.params);
    if (error) {
      return Response.Error({
        res,
        status: 400,
        message: error.details[0].message,
      });
    }

    const deleted = await productModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return Response.Error({
        res,
        status: 404,
        message: "Product not found",
      });
    }

    return Response.Success({
      res,
      status: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};
module.exports = { createProduct, updateProduct, deleteProduct, getAllProduct };
