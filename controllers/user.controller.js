const { response } = require("express");
const fs = require("fs");
const { parse } = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";

const dataFile = process.cwd() + "/data/user.json";

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
  const {
    userName,
    firstName,
    lastName,
    age,
    address,
    isAdmin,
    password,
    email,
  } = req.body;
  fs.readFile(dataFile, "utf-8", async (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];

    const newPassword = await bcrypt.hash(password, saltRounds);

    console.log(newPassword);

    const newObj = {
      id: Date.now().toString() + "user",
      userName,
      firstName,
      lastName,
      age,
      address,
      isAdmin,
      email,
      favoriteProducs: [],
      mostViewProducts: [],
      password: newPassword,
    };

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
    userName,
    firstName,
    lastName,
    age,
    address,
    isAdmin,
    email,
    favoriteProducs,
    mostViewProducts,
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
          userName,
          firstName,
          lastName,
          age,
          address,
          isAdmin,
          email,
          favoriteProducs,
          mostViewProducts,
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

exports.login = (request, response) => {
  const { email, password } = request.body;

  if (!email || !password)
    return response.json({
      status: false,
      message: "medeellee buren buglunu uu",
    });

  fs.readFile(dataFile, "utf-8", async (readErr, data) => {
    if (readErr) {
      return response.json({ status: false, message: readErr });
    }

    const parsedData = data ? JSON.parse(data) : [];
    let user;
    for (let i = 0; i < parsedData.length; i++) {
      if (email == parsedData[i].email) {
        const decrypt = await bcrypt.compare(password, parsedData[i].password);

        if (decrypt) {
          user = {
            id: parsedData[i].id,
            email: parsedData[i].email,
            lastName: parsedData[i].lastName,
            firstName: parsedData[i].firstName,
          };
          break;
        }
      }
    }

    console.log(user);

    if (user) {
      return response.json({
        status: true,
        result: user,
      });
    } else {
      return response.json({
        status: false,
        message: "Tanii email eswel nuuts ug buruu bna",
      });
    }
  });
};
