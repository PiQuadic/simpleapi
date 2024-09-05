CREATE TABLE `relay` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `relay_id` VARCHAR(255),
  `name` VARCHAR(255),
  `position` INTEGER, 
  `enabled` INTEGER,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP
);
