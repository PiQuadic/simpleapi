
CREATE TABLE `relay` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `relay_id` VARCHAR(255),
  `name` VARCHAR(255),
  `position` VARCHAR(3)
  `prev_position` VARCHAR(3),
  `prev_log` DATETIME,
  `enabled` INTEGER,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
);
