ALTER TABLE public.page_category RENAME TO category;
alter table category add description text;

ALTER TABLE public.category RENAME COLUMN id_default_page TO "idDefaultPage" ;

ALTER TABLE public.category RENAME COLUMN can_list_contents TO "canListContents" ;
ALTER TABLE public.category RENAME COLUMN default_layout TO "defaultLayout" ;

alter table category add status integer not null default 0;
alter table category add "createdBy" integer not null default 1;

alter table category add "createdAt" timestamp not null default current_timestamp;
alter table category add "updatedAt" timestamp null;

update page set url='' where url='/'
update page set url='' where url='_'

ALTER TABLE public.page RENAME COLUMN date_updated TO "updatedAt" ;
ALTER TABLE public.page RENAME COLUMN id_category TO "idCategory" ;
ALTER TABLE public.page RENAME COLUMN id_creator TO "createdBy" ;
ALTER TABLE public.page RENAME COLUMN page_type TO "pageType" ;
ALTER TABLE public.page RENAME COLUMN publish_date TO "publishDate" ;

update page set "idCategory"=null where "idCategory"=1;
delete from category where id=1

ALTER TABLE public."user" add "confirmKey" varchar(255) null;
ALTER TABLE public."user" RENAME COLUMN date_created TO "createdAt" ;
ALTER TABLE public."user" add "updatedAt" timestamp null;
createdAt
