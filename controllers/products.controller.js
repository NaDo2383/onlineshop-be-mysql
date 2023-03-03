const { response } = require("express");
const fs = require("fs");
const { parse } = require("path");

const dataFile = process.cwd() + "/data/products.json";

exports.getAll = (req, res) => {
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }

    const savedData = data ? JSON.parse(data) : [];

    return res.json({ status: true, result: savedData });
  });
};

exports.getOne = (req, res) => {
  const { id } = req.params;
  console.log(id);
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];
    const savedData = parsedData.filter((e) => e.id == id);

    return res.json({ status: true, result: savedData });
  });
};

exports.create = (req, res) => {
  const {
    productName,
    cateId,
    price,
    thumbImage,
    images,
    salePer,
    quantity,
    brandId,
    description,
    createdDated,
    updatedDate,
    createdUserId,
    updatedUser,
    categoryId,
  } = req.body;
  console.log("body", req.body);
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];

    const newObj = {
      id: Date.now().toString() + "product",
      createdDated: Date.now(),
      productName,
      cateId,
      price,
      thumbImage,
      images,
      salePer,
      quantity,
      brandId,
      description,
      createdUserId,
      updatedDate,
      updatedUser,
      categoryId,
    };
    console.log(newObj);
    parsedData.push(newObj);

    fs.writeFile(dataFile, JSON.stringify(parsedData), (writeErr) => {
      if (writeErr) {
        return res.json({ status: false, message: writeErr });
      }

      return res.json({ status: true, result: parsedData });
    });
  });
};

exports.update = (req, res) => {
  const {
    id,
    productName,
    cateId,
    price,
    thumbImage,
    images,
    salePer,
    quantity,
    brandId,
    description,
    createdDated,
    updatedDate,
    createdUser,
    updatedUser,
    categoryId,
  } = req.body;
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];

    const updatedData = parsedData.map((e) => {
      if (e.id == id) {
        return {
          ...e,
          productName,
          cateId,
          price,
          thumbImage,
          images,
          salePer,
          quantity,
          brandId,
          description,
          createdDated,
          updatedDate: Date.now(),
          createdUser,
          updatedUser,
          categoryId,
        };
      } else {
        return e;
      }
    });

    fs.writeFile(dataFile, JSON.stringify(updatedData), (writeErr) => {
      if (writeErr) {
        return res.json({ status: false, message: writeErr });
      }

      return res.json({ status: true, result: updatedData });
    });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  console.log(id);
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];
    const updatedData = parsedData.filter((e) => e.id != id);

    fs.writeFile(dataFile, JSON.stringify(updatedData), (writeErr) => {
      if (writeErr) {
        return res.json({ status: false, message: writeErr });
      }

      return res.json({ status: true, result: updatedData });
    });
  });
};

exports.deleteSelected = (req, res) => {
  const body = req.body;

  console.log(body);
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, uermessage: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];

    body.map((e) => {
      parsedData.map((a, index) => {
        if (a.id == e) {
          parsedData.splice(index, 1);
        }
      });
    });

    fs.writeFile(dataFile, JSON.stringify(parsedData), (writeErr) => {
      if (writeErr) {
        return res.json({ status: false, message: writeErr });
      }

      return res.json({ status: true, result: parsedData });
    });
  });
};
