import db from '../db/db.cjs';
import bcrypt from 'bcryptjs';
import { createError } from './../error/error.js';

//Update email
export const updateAdmin = async (req, res, next) => {
  const client_id = req.params.id;
  const { technical_contact, commercial_contact } = { ...req.body };
  try {
    //request update database
    await db.query('UPDATE api_clients SET technical_contact = $1, commercial_contact = $2 WHERE client_id = $3', [technical_contact, commercial_contact, client_id]);
    //verify update
    const user = await db.query('SELECT * FROM api_clients WHERE client_id = $1', [client_id]);
    res.status(200).json(user.rows[0]);
  } catch (err) {
    next(err);
  }
};

// update passwordHash
export const updateHashSyncAdmin = async (req, res, next) => {
  try {
    const client_id = req.params.id;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await db.query(`UPDATE API_CLIENTS SET password = $1 WHERE client_id = $2`, [hash, client_id]);
    res.status(200).send('Votre mot de passe a étè modifier et crypter');
    //verify update
    const user = await db.query('SELECT * FROM api_clients WHERE client_id = $1', [client_id]);
    res.status(200).json(user.rows[0]);
  } catch (err) {
    next(err);
  }
};

//Delete users in database
export const deleteAdmin = async (req, res, next) => {
  const client_id = req.params.id;
  try {
    await db.query('DELETE FROM partenaires WHERE client_id = $1', [client_id]), await db.query('DELETE FROM structures WHERE structure_id = $1', [client_id]);
    res.status(200).send('Ce compte a bien étè supprimer');
  } catch (err) {
    next(err);
  }
};

//Get Partner  && structure in database
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await db.query('SELECT * FROM structures S FULL JOIN partenaires P ON S.structure_id = P.client_id ORDER BY P.client_id ASC, S.structure_id ASC');
    res.status(200).json(user.rows);
  } catch (err) {
    next(err);
  }
};

//Get Partner  in database
export const getUsers = async (req, res, next) => {
  try {
    const user = await db.query("SELECT * FROM partenaires WHERE role_as = 'partenaire'");
    res.status(200).json(user.rows);
  } catch (err) {
    next(err);
  }
};

//Get Structure  in database
export const getStructure = async (req, res, next) => {
  try {
    const user = await db.query("SELECT * FROM structures WHERE role_as = 'structure'");
    res.status(200).json(user.rows);
  } catch (err) {
    next(err);
  }
};

//Get users byID in database
export const getUsersbyId = async (req, res, next) => {
  const client_id = req.params.id;
  try {
    const user = await db.query('SELECT * FROM api_clients WHERE client_id = $1', [client_id]);
    res.status(200).json(user.rows);
  } catch (err) {
    next(err);
  }
};
// Disable Partner or Structures
export const disableAdmin = async (req, res, next) => {
  const client_id = req.params.id;
  try {
    await db.query("UPDATE partenaires SET active = 'desactiver' WHERE client_id = $1", [client_id]),
      await db.query("UPDATE structures SET structure_active = 'desactiver' WHERE  structure_id = $1", [client_id]);
    res.status(200).send('Ce compte a bien étè désactivé');
  } catch (err) {
    next(err);
  }
};

// Active Partner or Structures
export const activeAdmin = async (req, res, next) => {
  const client_id = req.params.id;
  try {
    await db.query("UPDATE partenaires SET active = 'activer' WHERE client_id = $1", [client_id]),
      await db.query("UPDATE structures SET structure_active = 'activer' WHERE structure_id = $1", [client_id]);
    res.status(200).send('Ce compte a bien étè activer');
  } catch (err) {
    next(err);
  }
};

//Register Admin, Partners & Structures
export const registerAdmin = async (req, res, next) => {
  const { client_name, technical_contact, commercial_contact, active, short_desc, full_desc, logo_url, url_web, password, role_as } = req.body;
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: 'Password must be 6 characters or more',
    });
  try {
    //crypt password for security before insert into database
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await db.query(
      'INSERT INTO clients ( client_name, technical_contact, commercial_contact, active, password, short_desc, full_desc, logo_url, url_web, role_as) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
      [client_name, technical_contact, commercial_contact, active, hash, short_desc, full_desc, logo_url, url_web, role_as]
    );
    res.status(200).json('Compte Administrateur créer avec succés!');
  } catch (err) {
    //next(err);
    next(createError(400, 'Compte Administrateur déja existant!'));
  }
};

export const registerStructures = async (req, res, next) => {
  const { name, email, active, short_desc, full_desc, logo_url, role_as } = req.body;
  try {
    //crypt password for security before insert into database
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await db.query(
      'INSERT INTO structures ( structure_name, structure_email, password,structure_active, structure_short_desc, structure_full_desc, structure_logo_url, structure_role) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
      [name, email, hash, active, short_desc, full_desc, logo_url, role_as]
    );
    res.status(200).json('Compte Structure créer avec succés!');
  } catch (err) {
    next(err);
    next(createError(400, 'Compte Structure déja existant!'));
  }
};

export const registerPartners = async (req, res, next) => {
  const { name, email, active, short_desc, full_desc, logo_url, role_as } = req.body;
  try {
    //crypt password for security before insert into database
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await db.query('INSERT INTO partenaires ( partner_name, partner_email, password, active , short_desc, full_desc, logo_url, role_as) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [
      name,
      email,
      hash,
      active,
      short_desc,
      full_desc,
      logo_url,
      role_as,
    ]);
    res.status(200).json('Compte Partenaires créer avec succés!');
  } catch (err) {
    //next(err);
    next(createError(400, 'Compte Partenaires déja existant!'));
  }
};
