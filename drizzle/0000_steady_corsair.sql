CREATE TABLE `jokes_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`joke` text NOT NULL,
	`submitter` text NOT NULL,
	`rating` integer NOT NULL,
	`date` text NOT NULL
);
