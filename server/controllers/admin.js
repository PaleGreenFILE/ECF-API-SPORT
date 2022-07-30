import db from "../db/db.cjs";
import bcrypt from "bcryptjs";

//Update email
export const update = async (req, res, next) => {
  const client_id = req.params.id;
  const { technical_contact, commercial_contact } = { ...req.body };
  try {
    //request update database
    await db.query(
      "UPDATE api_clients SET technical_contact = $1, commercial_contact = $2 WHERE client_id = $3",
      [technical_contact, commercial_contact, client_id]
    );
    //verify update
    const user = await db.query(
      "SELECT * FROM api_clients WHERE client_id = $1",
      [client_id]
    );
    res.status(200).json(user.rows[0]);
  } catch (err) {
    next(err);
  }
};

// update passwordHash
export const updateHashSync = async (req, res, next) => {
  try {
    const client_id = req.params.id;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await db.query(
      `UPDATE API_CLIENTS SET password = $1 WHERE client_id = $2`,
      [hash, client_id]
    );
    res.status(200).send("Votre mot de passe a étè modifier et crypter");
    //verify update
    const user = await db.query(
      "SELECT * FROM api_clients WHERE client_id = $1",
      [client_id]
    );
    res.status(200).json(user.rows[0]);
  } catch (err) {
    next(err);
  }
};

//Delete users in database
export const deleteUser = async (req, res, next) => {
  const client_id = req.params.id;
  try {
    await db.query("DELETE FROM api_clients WHERE client_id = $1", [client_id]);
    res.status(200).send("Ce compte a bien étè supprimer");
  } catch (err) {
    next(err);
  }
};

//Get Partner  in database
export const getUsers = async (req, res, next) => {
  try {
    const user = await db.query(
      "SELECT * FROM api_clients WHERE role_as = 'partenaire'"
    );
    res.status(200).json(user.rows);
  } catch (err) {
    next(err);
  }
};

//Get Structure  in database
export const getStructure = async (req, res, next) => {
  try {
    const user = await db.query(
      "SELECT * FROM api_clients WHERE role_as = 'structure'"
    );
    res.status(200).json(user.rows);
  } catch (err) {
    next(err);
  }
};

//Get users byID in database
export const getUsersbyId = async (req, res, next) => {
  const client_id = req.params.id;
  try {
    const user = await db.query(
      "SELECT * FROM api_clients WHERE client_id = $1",
      [client_id]
    );
    res.status(200).json(user.rows);
  } catch (err) {
    next(err);
  }
};
// Disable user  only
export const disable = async (req, res, next) => {
  const client_id = req.params.id;
  try {
    await db.query(
      "UPDATE api_clients SET active = 'desactiver' WHERE client_id = $1",
      [client_id]
    );
    res.status(200).send("Ce compte a bien étè désactivé");
  } catch (err) {
    next(err);
  }
};

// Active user  only
export const active = async (req, res, next) => {
  const client_id = req.params.id;
  try {
    await db.query(
      "UPDATE api_clients SET active = 'activer' WHERE client_id = $1",
      [client_id]
    );
    res.status(200).send("Ce compte a bien étè activer");
  } catch (err) {
    next(err);
  }
};
