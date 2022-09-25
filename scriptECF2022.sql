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
    structure_name       varchar(50)  not null
        unique,
    structure_email      varchar(100) not null
        constraint structures_structure_contact_key
            unique,
    password             varchar(100) not null,
    structure_active     varchar(35)  not null,
    structure_short_desc varchar(50),
    structure_full_desc  varchar(255),
    structure_logo_url   varchar(125),
    structure_created_at timestamp default now(),
    structure_update_at  timestamp default CURRENT_TIMESTAMP,
    structure_role       varchar(20)  not null,
    structures_id        integer   default 0
);

alter table structures
    owner to dffwgrxd;

create table partenaires
(
    client_id     integer      not null
        primary key,
    partner_name  varchar(50)  not null
        unique,
    partner_email varchar(100) not null,
    password      varchar(100) not null,
    active        varchar(35)  not null,
    short_desc    varchar(50),
    full_desc     varchar(255),
    logo_url      varchar(125),
    created_at    timestamp default now(),
    update_at     timestamp default CURRENT_TIMESTAMP,
    role_as       varchar(20)  not null,
    partner_id    integer   default 0
);

alter table partenaires
    owner to dffwgrxd;

create table permissions
(
    perms_id         serial
        primary key,
    planning         boolean default false,
    sell_newsletter  boolean default false,
    sell_boissons    boolean default false,
    sell_vêtements   boolean default false,
    sell_équipements boolean default false,
    permission_id    integer default 0
);

alter table permissions
    owner to dffwgrxd;


