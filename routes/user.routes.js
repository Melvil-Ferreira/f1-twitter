const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const userModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const multer = require("multer");

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user display
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../client/public/uploads/profil/`);
  },
  filename: function (req, file, cb) {
    console.log(req.body.name)
    cb(null, req.body.name + ".jpg");
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async function (req, res) {
  console.log(req.body.name)
  try {
    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 5000000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  try {
    userModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          picture: "./uploads/profil/" + req.body.name + ".jpg",
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: "err" });
  }
});

module.exports = router;
