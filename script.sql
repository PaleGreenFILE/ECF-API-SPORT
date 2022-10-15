create table clients
(
    client_id   serial
        primary key,
    client_name varchar(50)  not null,
    email       varchar(100) not null,
    password    varchar(100) not null,
    active      varchar(35)  not null,
    short_desc  varchar(50),
    created_at  timestamp default now(),
    update_at   timestamp default CURRENT_TIMESTAMP,
    role_as     varchar(20)  not null
);

alter table clients
    owner to dffwgrxd;

create table structures
(
    structure_id         serial
        primary key,
    structure_name       varchar(50)  not null,
    structure_email      varchar(100) not null,
    password             varchar(100) not null,
    structure_active     varchar(35)  not null,
    structure_short_desc varchar(50),
    structure_full_desc  varchar(255),
    structure_logo_url   varchar(125),
    structure_created_at timestamp default now(),
    structure_update_at  timestamp default CURRENT_TIMESTAMP,
    structure_role       varchar(20)  not null,
    structures_id        integer   default 0,
    adresse_structure    varchar(150),
    codepostal_structure integer   default 0,
    ville                varchar(20),
    sell_newsletter      boolean   default false,
    sell_boissons        boolean   default false,
    sell_vêtements       boolean   default false,
    sell_équipements     boolean   default false
);

alter table structures
    owner to dffwgrxd;

create table partenaires
(
    client_id                serial
        primary key,
    partner_name             varchar(50)  not null,
    partner_email            varchar(100) not null,
    password                 varchar(100) not null,
    active                   varchar(35)  not null,
    short_desc               varchar(50),
    full_desc                varchar(255),
    logo_url                 varchar(125),
    created_at               timestamp default now(),
    update_at                timestamp default CURRENT_TIMESTAMP,
    role_as                  varchar(20)  not null,
    partner_id               integer   default 0,
    "Adresse"                varchar(150),
    code_postal              integer   default 0,
    ville_partner            varchar(20),
    sell_newsletter_partner  boolean   default false,
    sell_boissons_partner    boolean   default false,
    sell_vêtements_partner   boolean   default false,
    sell_équipements_partner boolean   default false
);

alter table partenaires
    owner to dffwgrxd;


