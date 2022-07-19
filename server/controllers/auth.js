import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/db.cjs";
import { createError } from "../error/error.js";

//Register partner or structur
export const signup = async (req, res, next) => {
  const {
    client_name,
    technical_contact,
    commercial_contact,
    active,
    short_desc,
    full_desc,
    logo_url,
    url_web,
  } = req.body;
  try {
    //crypt password for security before insert into database
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await db.query(
      "INSERT INTO api_clients ( client_name, technical_contact, commercial_contact, active, password, short_desc, full_desc, logo_url, url_web) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        client_name,
        technical_contact,
        commercial_contact,
        active,
        hash,
        short_desc,
        full_desc,
        logo_url,
        url_web,
      ]
    );
    res.status(200).send("Compte créer avec succés!");
  } catch (err) {
    //next(err);
    next(createError(400, "Compte déja existant!"));
  }
};
//Login admin partner or  structur
export const signin = async (req, res, next) => {
  // Verify that the email is already exist in the database BDD
  const { technical_contact, commercial_contact } = req.body;
  try {
    const user = await db.query(
      "SELECT * FROM api_clients WHERE technical_contact = $1 or commercial_contact = $2",
      [technical_contact, commercial_contact]
    );
    if (!user.rows.length) return next(createError(404, "Email non inscrit"));

    // compare password body & bcrypt hash on BDD
    const isCorrect = await bcrypt.compare(
      req.body.password,
      user.rows[0].password
    );
    if (!isCorrect) return next(createError(400, "Mot de passe invalide!"));

    // JSONWEBTOKEN
    const token = jwt.sign({ id: user.user_id }, process.env.JWT);
    const { password, ...others } = user.rows;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
