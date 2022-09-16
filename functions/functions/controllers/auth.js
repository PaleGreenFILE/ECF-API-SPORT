import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/db.cjs';
import { createError } from './../error/error.js';
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
  const { structure_name, structure_contact, active, short_desc, full_desc, logo_url, url_web, password, role_as } = req.body;
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: 'Password must be 6 characters or more',
    });
  try {
    //crypt password for security before insert into database
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await db.query('INSERT INTO structures ( structure_name, structure_contact, active, password, short_desc, full_desc, logo_url, url_web, role_as) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [
      structure_name,
      structure_contact,
      active,
      hash,
      short_desc,
      full_desc,
      logo_url,
      url_web,
      role_as,
    ]);
    res.status(200).json('Compte Structure créer avec succés!');
  } catch (err) {
    //next(err);
    next(createError(400, 'Compte Structure déja existant!'));
  }
};
export const registerPartners = async (req, res, next) => {
  const { partner_name, partner_contact, active, short_desc, full_desc, logo_url, url_web, password, role_as } = req.body;
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: 'Password must be 6 characters or more',
    });
  try {
    //crypt password for security before insert into database
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await db.query('INSERT INTO partenaires ( partner_name, partner_contact, active, password, short_desc, full_desc, logo_url, url_web, role_as) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [
      partner_name,
      partner_contact,
      active,
      hash,
      short_desc,
      full_desc,
      logo_url,
      url_web,
      role_as,
    ]);
    res.status(200).json('Compte Partenaires créer avec succés!');
  } catch (err) {
    //next(err);
    next(createError(400, 'Compte Partenaires déja existant!'));
  }
};

//Login Admin, Partners & Structures
export const signinAdmin = async (req, res, next) => {
  // Verify that the email is already exist in the database BDD
  const { email } = req.body;
  try {
    const admin = await db.query('SELECT * FROM clients WHERE email=$1', [email]);
    const partner = await db.query('SELECT * FROM partenaires WHERE partner_email=$1', [email]);
    const structure = await db.query('SELECT * FROM structures WHERE structure_email=$1', [email]);
    if (!admin.rows.length & !partner.rows.length & !structure.rows.length) return next(createError(404, 'Email non inscrit'));

    // compare password body & bcrypt hash on BDD
    if (admin.rows.length) {
      const isCorrect = await bcrypt.compare(req.body.password, admin.rows[0].password);
      if (!isCorrect) return next(createError(400, 'Mot de passe invalide!'));
      const { password, ...others } = admin.rows[0];
      // JSONWEBTOKEN with ExpiresIn = 1 hour
      const token = jwt.sign({ id: admin.client_id }, process.env.JWT, {
        expiresIn: '1h',
      });
      res
        .cookie('access_token', token, {
          maxAge: 1000 * 60 * 60,
          sameSite: 'none',
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json(others);
    } else if (partner.rows.length) {
      const isCorrect = await bcrypt.compare(req.body.password, partner.rows[0].password);
      if (!isCorrect) return next(createError(400, 'Mot de passe invalide!'));
      const { password, ...others } = partner.rows[0];
      // JSONWEBTOKEN with ExpiresIn = 1 hour
      const token = jwt.sign({ id: partner.client_id }, process.env.JWT, {
        expiresIn: '1h',
      });
      res
        .cookie('access_token', token, {
          maxAge: 1000 * 60 * 60,
          sameSite: 'none',
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json(others);
    } else if (structure.rows.length) {
      const isCorrect = await bcrypt.compare(req.body.password, structure.rows[0].password);
      if (!isCorrect) return next(createError(400, 'Mot de passe invalide!'));
      const { password, ...others } = structure.rows[0];
      // JSONWEBTOKEN with ExpiresIn = 1 hour
      const token = jwt.sign({ id: structure.client_id }, process.env.JWT, {
        expiresIn: '1h',
      });
      res
        .cookie('access_token', token, {
          maxAge: 1000 * 60 * 60,
          sameSite: 'none',
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json(others);
    }
  } catch (err) {
    next(err);
  }
};

//Logout Admin, Partners & Structures
export const logout = async (req, res, next) => {
  res.clearCookie('access_token').status(200).json('Vous avez bien été déconnecté');
};

// First connexion  Partners & Structures for change password
export const firstConnexionPartners = async (req, res, next) => {};
export const firstConnexionStructures = async (req, res, next) => {};
