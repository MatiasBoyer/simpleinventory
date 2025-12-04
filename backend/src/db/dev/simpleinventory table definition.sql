
-- HEADER
CREATE table public.inventory_hdr (
	id serial4 NOT NULL,
	"name" varchar(20) NOT NULL,
	"user" varchar(20) NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_at timestamp NULL,
	isactive bool DEFAULT true NOT NULL,
	CONSTRAINT inventories_pk PRIMARY KEY (id)
);

create trigger update_inventory_hdr before
update
    on
    public.inventory_hdr for each row execute function update_timestamp();

-- CONTENT
create table public.inventory_ctn (
	id serial not null,
	hdrId integer not null,
	name varchar(25) not null,
	quantity integer default 0 not null,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_at timestamp NULL,
	primary key (id),
	foreign key (hdrId) references inventory_hdr(id)
);

create trigger update_inventory_ctn before
update
    on
    public.inventory_ctn for each row execute function update_timestamp();

comment on column public.inventory_ctn.id is 'Unique auto-incremental item ID';
comment on column public.inventory_ctn.hdrId is 'Inventory header ID';
comment on column public.inventory_ctn.name is 'Item name';
comment on column public.inventory_ctn.quantity is 'Item quantity';

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO simpleinventory_api;
grant select, insert on inventory_hdr to simpleinventory_api;