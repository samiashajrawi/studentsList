CREATE DATABASE students_db;
CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  email VARCHAR not null unique DEFAULT,
  first_name character varying(60) NOT NULL CHECK (first_name <> ''),
  last_name character varying(60) NOT NULL CHECK (last_name <> ''),
);

CREATE OR REPLACE FUNCTION f_random_text(length integer )  RETURNS text AS    $body$             WITH chars AS (        SELECT unnest(string_to_array('A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9', ' ')) AS _char             ), charlist AS        ( SELECT _char FROM chars ORDER BY random() LIMIT $1             )  SELECT string_agg(_char, '')       FROM charlist      ;  $body$             LANGUAGE sql;
ALTER TABLE students
ADD COLUMN check_in_count INT DEFAULT 1,
majors character varying(100),
ADD COLUMN email VARCHAR not null unique DEFAULT f_random_text(12);