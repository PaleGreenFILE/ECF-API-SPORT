import db from "../db/db.cjs";
import bcrypt from "bcryptjs";
import { createError } from "./../error/error.js";

//Update email
export const updateAdmin = async (req, res, next) => {
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

export const updateUserInfoPartnerStructure = async (req, res, next) => {
  const client_id = req.params.id;
  const {
    adresse,
    email,
    full_desc,
    logo_url,
    name,
    postalCode,
    sell_boissons,
    sell_newsletter,
    sell_vêtements,
    sell_équipements,
    short_desc,
    ville,
  } = req.body;
  try {
    //request update database partner
    await db.query(
      "UPDATE partenaires SET adresse = $1, partner_email = $2, full_desc =$3, logo_url =$4, partner_name =$5, code_postal =$6, sell_boissons_partner = $7, sell_newsletter_partner = $8, sell_vêtements_partner =$9, sell_équipements_partner =$10, short_desc =$11, ville_partner =$12 WHERE client_id = $13",
      [
        adresse,
        email,
        full_desc,
        logo_url,
        name,
        postalCode,
        sell_boissons,
        sell_newsletter,
        sell_vêtements,
        sell_équipements,
        short_desc,
        ville,
        client_id,
      ]
    );

    //verify update partner
    const partner = await db.query(
      "SELECT * FROM partenaires WHERE client_id = $1",
      [client_id]
    );
    res.status(200).json(partner.rows[0]);

    //request update database structure
    await db.query(
      "UPDATE structures SET adresse_structure = $1, structure_email = $2, structure_full_desc =$3, structure_logo_url =$4, structure_name =$5, codepostal_structure =$6, sell_boissons = $7, sell_newsletter = $8, sell_vêtements =$9, sell_équipements =$10, structure_short_desc =$11, ville =$12 WHERE structure_id = $13",
      [
        adresse,
        email,
        full_desc,
        logo_url,
        name,
        postalCode,
        sell_boissons,
        sell_newsletter,
        sell_vêtements,
        sell_équipements,
        short_desc,
        ville,
        client_id,
      ]
    );
    //verify update structure
    const structure = await db.query(
      "SELECT * FROM structures WHERE client_id = $1",
      [client_id]
    );
    res.status(200).json(structure.rows[0]);
  } catch (err) {
    next(createError(408, "Erreur, impossible de modifier les données."));
  }
};

//Delete users in database
export const deleteAdmin = async (req, res, next) => {
  const client_id = req.params.id;
  try {
    await db.query("DELETE FROM partenaires WHERE client_id = $1", [client_id]),
      await db.query("DELETE FROM structures WHERE structure_id = $1", [
        client_id,
      ]);
    res.status(200).send("Ce compte a bien étè supprimer");
  } catch (err) {
    next(err);
  }
};

//Get All || Partner  || structure in database
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await db.query(
      "SELECT * FROM structures S FULL JOIN partenaires P ON S.structure_id = P.client_id ORDER BY P.client_id ASC, S.structure_id ASC"
    );
    //const user = await db.query('SELECT * FROM partenaires P LEFT JOIN structures S ON P.client_id = S.structure_id ORDER BY P.client_id ASC, S.structure_id ASC');
    res.status(200).json(user.rows);
  } catch (err) {
    next(err);
  }
};

export const getAllPartners = async (req, res, next) => {
  try {
    const partners = await db.query(
      "SELECT client_id , partner_name FROM partenaires ORDER BY partner_name"
    );
    res.status(200).json(partners.rows);
  } catch (err) {
    next(err);
  }
};

//Get Partner  in database
export const getUsers = async (req, res, next) => {
  try {
    const user = await db.query(
      "SELECT * FROM partenaires WHERE role_as = 'partenaire'"
    );
    res.status(200).json(user.rows);
  } catch (err) {
    next(err);
  }
};

//Get Structure  in database
export const getStructureByPartnerById = async (req, res, next) => {
  const structure_id = req.params.id;
  try {
    const user = await db.query(
      "SELECT * FROM structures JOIN partenaires ON structures.partner_linked = partenaires.client_id WHERE partenaires.client_id = $1 ",
      [structure_id]
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
    const partner = await db.query(
      "SELECT * FROM partenaires WHERE client_id = $1",
      [client_id]
    );
    const structure = await db.query(
      "SELECT * FROM structures WHERE structure_id = $1",
      [client_id]
    );

    if (!partner.rows.length && !structure.rows.length)
      return next(createError(404, "Erreur , aucune données disponible"));
    if (structure.rows.length) {
      res.status(200).json(structure.rows);
    } else if (partner.rows.length) {
      res.status(200).json(partner.rows);
    }
  } catch (err) {
    next(err);
  }
};

// Disable Partner or Structures
export const disableAdmin = async (req, res, next) => {
  const client_id = req.params.id;
  try {
    await db.query(
      "UPDATE partenaires SET active = 'desactiver' WHERE client_id = $1",
      [client_id]
    ),
      await db.query(
        "UPDATE structures SET structure_active = 'desactiver' WHERE  structure_id = $1",
        [client_id]
      );
    res.status(200).send("Ce compte a bien étè désactivé");
  } catch (err) {
    next(err);
  }
};

// Active Partner or Structures
export const activeAdmin = async (req, res, next) => {
  const client_id = req.params.id;
  try {
    await db.query(
      "UPDATE partenaires SET active = 'activer' WHERE client_id = $1",
      [client_id]
    ),
      await db.query(
        "UPDATE structures SET structure_active = 'activer' WHERE structure_id = $1",
        [client_id]
      );
    res.status(200).send("Ce compte a bien étè activer");
  } catch (err) {
    next(err);
  }
};

//Register Admin , Partners & Structures
export const registerAdmin = async (req, res, next) => {
  const {
    client_name,
    technical_contact,
    commercial_contact,
    active,
    short_desc,
    full_desc,
    logo_url,
    url_web,
    password,
    role_as,
  } = req.body;
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: "Password must be 6 characters or more",
    });
  try {
    //crypt password for security before insert into database
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await db.query(
      "INSERT INTO clients ( client_name, technical_contact, commercial_contact, active, password, short_desc, full_desc, logo_url, url_web, role_as) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
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
        role_as,
      ]
    );
    res.status(200).json("Compte Administrateur créer avec succés!");
  } catch (err) {
    //next(err);
    next(createError(400, "Compte Administrateur déja existant!"));
  }
};

export const registerStructures = async (req, res, next) => {
  const {
    name,
    email,
    active,
    short_desc,
    full_desc,
    logo_url,
    role_as,
    partner_linked,
    name_partner_linked,
  } = req.body;
  try {
    //crypt password for security before insert into database
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await db.query(
      "INSERT INTO structures ( structure_name, structure_email, password,structure_active, structure_short_desc, structure_full_desc, structure_logo_url, structure_role, partner_linked , name_partner_linked) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        name,
        email,
        hash,
        active,
        short_desc,
        full_desc,
        logo_url,
        role_as,
        partner_linked,
        name_partner_linked,
      ]
    );
    res.status(200).json("Compte Structure créer avec succés!");
  } catch (err) {
    next(err);
    next(createError(400, "Compte Structure déja existant!"));
  }
};

export const registerPartners = async (req, res, next) => {
  const { name, email, active, short_desc, full_desc, logo_url, role_as } =
    req.body;
  try {
    //crypt password for security before insert into database
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await db.query(
      "INSERT INTO partenaires ( partner_name, partner_email, password, active , short_desc, full_desc, logo_url, role_as) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [name, email, hash, active, short_desc, full_desc, logo_url, role_as]
    );
    res.status(200).json("Compte Partenaires créer avec succés!");
  } catch (err) {
    //next(err);
    next(createError(400, "Compte Partenaires déja existant!"));
  }
};
