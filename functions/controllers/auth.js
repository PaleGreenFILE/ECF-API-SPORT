import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/db.cjs';
import { createError } from './../error/error.js';

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
      const token = jwt.sign({ id: structure.structure_id }, process.env.JWT, {
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
export const firstConnexion = async (req, res, next) => {
  const { email } = req.body;
  try {
    const partner = await db.query('SELECT * FROM partenaires WHERE partner_email=$1', [email]);
    const structure = await db.query('SELECT * FROM structures WHERE structure_email=$1', [email]);
    if (!partner.rows.length & !structure.rows.length) return next(createError(404, "Votre Email n'est pas inscrit"));

    if (partner.rows.length) {
      //crypt password for security before insert into database
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      await db.query('UPDATE partenaires SET password = $1 WHERE partner_email =$2', [hash, email]);
      res.status(200).json('Mot de passe changé avec succés');
    } else if (structure.rows.length) {
      //crypt password for security before insert into database
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      await db.query('UPDATE structures SET password = $1 WHERE structure_email =$2', [hash, email]);
      res.status(200).json('Mot de passe changé avec succés');
    }
  } catch (err) {
    //next(err);
    next(createError(408, 'Erreur lors du changement du mot de passe'));
  }
};
