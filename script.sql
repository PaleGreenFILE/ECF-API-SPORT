create table api_clients
(
    client_id          serial
        constraint api_clients_pk
            primary key,
    client_name        varchar(50)  not null,
    technical_contact  varchar(100),
    commercial_contact varchar(100),
    password           varchar(100) not null,
    active             varchar(35)  not null,
    short_desc         varchar(50),
    full_desc          varchar(255),
    logo_url           varchar(125),
    url_web            varchar(125),
    created_at         timestamp default now(),
    update_at          timestamp default CURRENT_TIMESTAMP,
    role_as            varchar(45)
);

alter table api_clients
    owner to jzugdbxlqotxsp;

create unique index api_clients_technical_contact_uindex
    on api_clients (technical_contact);

create table api_clients_grants
(
    client_id  serial
        primary key,
    install_id integer,
    active     boolean   default false not null,
    perms      varchar(50)             not null,
    branch_id  integer,
    created_at timestamp default now(),
    update_at  timestamp default CURRENT_TIMESTAMP
);

alter table api_clients_grants
    owner to jzugdbxlqotxsp;


