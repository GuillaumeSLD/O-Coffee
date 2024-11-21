DROP TABLE IF EXISTS "coffee";
DROP TABLE IF EXISTS "origin";
DROP TABLE IF EXISTS "taste";

CREATE TABLE "origin"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(64) NOT NULL
);

CREATE TABLE "taste"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(64) NOT NULL
);

CREATE TABLE "coffee"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(64) NOT NULL,
    "reference" INT NOT NULL,
    "description" TEXT NOT NULL,
    "origin" INT NOT NULL,
    "taste" INT NOT NULL,
    "price_kg" INT NOT NULL,
    "availability" VARCHAR(64) NOT NULL,
    CONSTRAINT "fk_origin" FOREIGN KEY ("origin") REFERENCES "origin"("id"),
    CONSTRAINT "fk_taste" FOREIGN KEY ("taste") REFERENCES "taste"("id")
);

-- Insertion des origines
INSERT INTO "origin" ("name") VALUES
('Italie'),
('Colombie'),
('Éthiopie'),
('Brésil'),
('Guatemala'),
('Kenya'),
('Indonésie'),
('Costa Rica'),
('Vietnam'),
('Tanzanie'),
('Jamaïque'),
('Rwanda'),
('Panama'),
('Pérou'),
('Hawaï'),
('Nicaragua');

-- Insertion des goûts
INSERT INTO "taste" ("name") VALUES
('Corsé'),
('Acide'),
('Fruité'),
('Doux'),
('Épicé'),
('Chocolaté');

-- Insertion des cafés
INSERT INTO "coffee" ("name", "reference", "description", "origin", "taste", "price_kg", "availability") VALUES
('Espresso', 100955890, 'Café fort et concentré préparé en faisant passer de l''eau chaude à travers du café finement moulu.', (SELECT "id" FROM "origin" WHERE "name" = 'Italie'), (SELECT "id" FROM "taste" WHERE "name" = 'Corsé'), 20.99, 'Oui'),
('Columbian', 100955894, 'Café moyennement corsé avec une acidité vive et une saveur riche.', (SELECT "id" FROM "origin" WHERE "name" = 'Colombie'), (SELECT "id" FROM "taste" WHERE "name" = 'Acide'), 18.75, 'Oui'),
('Ethiopian Yirgacheffe', 105589090, 'Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.', (SELECT "id" FROM "origin" WHERE "name" = 'Éthiopie'), (SELECT "id" FROM "taste" WHERE "name" = 'Fruité'), 22.50, 'Oui'),
('Brazilian Santos', 134009550, 'Café doux et lisse avec un profil de saveur de noisette.', (SELECT "id" FROM "origin" WHERE "name" = 'Brésil'), (SELECT "id" FROM "taste" WHERE "name" = 'Doux'), 17.80, 'Oui'),
('Guatemalan Antigua', 256505890, 'Café corsé avec des nuances chocolatées et une pointe d''épice.', (SELECT "id" FROM "origin" WHERE "name" = 'Guatemala'), (SELECT "id" FROM "taste" WHERE "name" = 'Corsé'), 21.25, 'Oui'),
('Kenyan AA', 295432730, 'Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.', (SELECT "id" FROM "origin" WHERE "name" = 'Kenya'), (SELECT "id" FROM "taste" WHERE "name" = 'Acide'), 23.70, 'Oui'),
('Sumatra Mandheling', 302932754, 'Café profond et terreux avec un corps lourd et une faible acidité.', (SELECT "id" FROM "origin" WHERE "name" = 'Indonésie'), (SELECT "id" FROM "taste" WHERE "name" = 'Corsé'), 19.95, 'Oui'),
('Costa Rican Tarrazu', 327302954, 'Café vif et net avec une finition propre et une acidité vive.', (SELECT "id" FROM "origin" WHERE "name" = 'Costa Rica'), (SELECT "id" FROM "taste" WHERE "name" = 'Acide'), 24.50, 'Oui'),
('Vietnamese Robusta', 549549090, 'Café audacieux et fort avec une saveur robuste distinctive.', (SELECT "id" FROM "origin" WHERE "name" = 'Vietnam'), (SELECT "id" FROM "taste" WHERE "name" = 'Épicé'), 16.75, 'Oui'),
('Tanzanian Peaberry', 582954954, 'Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.', (SELECT "id" FROM "origin" WHERE "name" = 'Tanzanie'), (SELECT "id" FROM "taste" WHERE "name" = 'Fruité'), 26.80, 'Oui'),
('Jamaican Blue Mountain', 589100954, 'Reconnu pour sa saveur douce, son acidité vive et son absence d''amertume.', (SELECT "id" FROM "origin" WHERE "name" = 'Jamaïque'), (SELECT "id" FROM "taste" WHERE "name" = 'Doux'), 39.25, 'Oui'),
('Rwandan Bourbon', 650753915, 'Café avec des notes florales prononcées, une acidité vive et un corps moyen.', (SELECT "id" FROM "origin" WHERE "name" = 'Rwanda'), (SELECT "id" FROM "taste" WHERE "name" = 'Fruité'), 21.90, 'Oui'),
('Panamanian Geisha', 795501340, 'Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.', (SELECT "id" FROM "origin" WHERE "name" = 'Panama'), (SELECT "id" FROM "taste" WHERE "name" = 'Fruité'), 42.00, 'Oui'),
('Peruvian Arabica', 954589100, 'Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.', (SELECT "id" FROM "origin" WHERE "name" = 'Pérou'), (SELECT "id" FROM "taste" WHERE "name" = 'Chocolaté'), 19.40, 'Non'),
('Hawaiian Kona', 958090105, 'Café rare au goût riche, une acidité douce et des nuances subtiles.', (SELECT "id" FROM "origin" WHERE "name" = 'Hawaï'), (SELECT "id" FROM "taste" WHERE "name" = 'Doux'), 55.75, 'Non'),
('Nicaraguan Maragogipe', 691550753, 'Café avec des notes de fruits, une acidité vive et un corps plein.', (SELECT "id" FROM "origin" WHERE "name" = 'Nicaragua'), (SELECT "id" FROM "taste" WHERE "name" = 'Fruité'), 28.60, 'Non');