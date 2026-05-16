create database book_store


create table books (
  id int primary key auto_increment,
  title varchar(100),
  description text,
  author varchar(100),
  pages int,
  rating int
)