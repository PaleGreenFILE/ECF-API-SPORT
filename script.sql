create table api_clients
(
    client_id          serial
        constraint api_clients_pk
            primary key,
    client_name        varchar(50)  not null,
    technical_contact  varchar(100) not null,
    commercial_contact varchar(100),
    password           varchar(100) not null,
    active             varchar(35)  not null,
    short_desc         varchar(50),
    full_desc          varchar(255),
    logo_url           varchar(125),
    url_web            varchar(125),
    created_at         timestamp default now(),
    update_at          timestamp default CURRENT_TIMESTAMP,
    role_as            varchar(45)  not null
);

alter table api_clients
    owner to jzugdbxlqotxsp;

create unique index api_clients_technical_contact_uindex
    on api_clients (technical_contact);

create table partenaires
(
    partner_id      serial
        primary key,
    partner_name    varchar(50)  not null
        unique,
    partner_contact varchar(100) not null
        unique,
    password        varchar(100) not null,
    active          varchar(35)  not null,
    short_desc      varchar(50),
    full_desc       varchar(255),
    logo_url        varchar(125),
    url_web         varchar(125),
    created_at      timestamp default now(),
    update_at       timestamp default CURRENT_TIMESTAMP,
    role_as         varchar(20)  not null
);

alter table partenaires
    owner to jzugdbxlqotxsp;

create table permissions
(
    perms_id         serial
        primary key,
    planning         boolean default false,
    sell_newsletter  boolean default false,
    sell_boissons    boolean default false,
    sell_vêtements   boolean default false,
    sell_équipements boolean default false
);

alter table permissions
    owner to jzugdbxlqotxsp;

create table clients
(
    client_id          serial
        primary key,
    client_name        varchar(50)  not null,
    technical_contact  varchar(100) not null
        unique,
    commercial_contact varchar(100),
    password           varchar(100) not null,
    active             varchar(35)  not null,
    short_desc         varchar(50),
    full_desc          varchar(255),
    logo_url           varchar(125),
    url_web            varchar(125),
    created_at         timestamp default now(),
    update_at          timestamp default CURRENT_TIMESTAMP,
    role_as            varchar(20)  not null
);

alter table clients
    owner to jzugdbxlqotxsp;

create table structures
(
    structure_id      serial
        primary key,
    structure_name    varchar(50)  not null
        unique,
    structure_contact varchar(100) not null
        unique,
    password          varchar(100) not null,
    active            varchar(35)  not null,
    short_desc        varchar(50),
    full_desc         varchar(255),
    logo_url          varchar(125),
    url_web           varchar(125),
    created_at        timestamp default now(),
    update_at         timestamp default CURRENT_TIMESTAMP,
    role_as           varchar(20)  not null
);

alter table structures
    owner to jzugdbxlqotxsp;

