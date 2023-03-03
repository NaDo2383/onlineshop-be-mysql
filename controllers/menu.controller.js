const { response } = require("express");
const fs = require("fs");
const { parse } = require("path");

const dataFile = process.cwd() + "/data/menu.json";

exports.getAll = (req, res) => {
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }

    const savedData = data ? JSON.parse(data) : [];

    return res.json({ status: true, result: savedData });
  });
};

exports.create = (req, res) => {
  const { menuName, link, position } = req.body;
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];

    const newObj = { id: Date.now().toString(), menuName, link, position };

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
  const { id, menuName, link, position } = req.body;
  fs.readFile(dataFile, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];

    const updatedData = parsedData.map((e) => {
      if (e.id == id) {
        return { ...e, menuName, link, position };
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
