/*
 Navicat Premium Data Transfer

 Source Server         : ticket
 Source Server Type    : MySQL
 Source Server Version : 50558
 Source Host           : localhost:3306
 Source Schema         : book_curd_example

 Target Server Type    : MySQL
 Target Server Version : 50558
 File Encoding         : 65001

 Date: 13/03/2020 02:06:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20200310140428-create-todo.js');

-- ----------------------------
-- Table structure for todos
-- ----------------------------
DROP TABLE IF EXISTS `todos`;
CREATE TABLE `todos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `print` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `publish_time` datetime NULL DEFAULT NULL,
  `intro` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of todos
-- ----------------------------
INSERT INTO `todos` VALUES (43, 'ss', 'oo', 's', 's', '2020-03-27 16:00:00', 's', 's', '2020-03-12 16:57:45', '2020-03-12 16:57:45');
INSERT INTO `todos` VALUES (44, '123', 'biubiu', 'thsac', 'sca', '2020-03-04 16:00:00', '巴拉拉小莫吸纳', 'sca', '2020-03-12 17:05:51', '2020-03-12 17:05:51');

SET FOREIGN_KEY_CHECKS = 1;
