/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : coffee

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 15/11/2023 20:12:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for canting
-- ----------------------------
DROP TABLE IF EXISTS `canting`;
CREATE TABLE `canting`  (
  `RestaurantId` varchar(10) CHARACTER SET utf32 COLLATE utf32_general_ci NOT NULL COMMENT '餐厅id',
  `RestaurantName` varchar(20) CHARACTER SET utf32 COLLATE utf32_general_ci NULL DEFAULT NULL COMMENT '餐厅名',
  `Address` varchar(40) CHARACTER SET utf32 COLLATE utf32_general_ci NULL DEFAULT NULL COMMENT '地址',
  `PhoneNumber` int(0) NULL DEFAULT NULL COMMENT '电话',
  `BusinessHours` time(6) NULL DEFAULT NULL COMMENT '营业时间',
  `DeskId` char(10) CHARACTER SET utf32 COLLATE utf32_general_ci NULL DEFAULT NULL COMMENT '桌号',
  `DeskStatu` tinyint(0) NULL DEFAULT NULL COMMENT '预约状态',
  `AuditStatu` tinyint(0) NULL DEFAULT NULL COMMENT '审核状态',
  PRIMARY KEY (`RestaurantId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf32 COLLATE = utf32_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for dingdan
-- ----------------------------
DROP TABLE IF EXISTS `dingdan`;
CREATE TABLE `dingdan`  (
  `dingdan_id` int(0) NOT NULL AUTO_INCREMENT,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `yuanliao` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `money` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `active` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `shopNum` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_chucan` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  `is_queren` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  `bianhao` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`dingdan_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dingdan
-- ----------------------------
INSERT INTO `dingdan` VALUES (48, '13638138365', '南瓜粥', 'http://127.0.0.1:5000/image/7.jpg', '南瓜、水、糖', '6', '0', '3', '31', '0', '0', '7411');
INSERT INTO `dingdan` VALUES (49, '13638138365', '银耳汤', 'http://127.0.0.1:5000/image/8.jpg', '银耳、枸杞水、糖', '5', '0', '1', '32', '0', '0', '4161');
INSERT INTO `dingdan` VALUES (50, '13638138365', '龙井虾仁', 'http://127.0.0.1:5000/image/10.jpg', '虾仁', '20.56', '0', '1', '34', '0', '0', '0090');

-- ----------------------------
-- Table structure for fenlei
-- ----------------------------
DROP TABLE IF EXISTS `fenlei`;
CREATE TABLE `fenlei`  (
  `fenlei_id` int(0) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`fenlei_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fenlei
-- ----------------------------
INSERT INTO `fenlei` VALUES (1, '主食');
INSERT INTO `fenlei` VALUES (2, '小炒菜');
INSERT INTO `fenlei` VALUES (3, '甜粥');
INSERT INTO `fenlei` VALUES (4, '饮品');
INSERT INTO `fenlei` VALUES (5, '粉面类');
INSERT INTO `fenlei` VALUES (6, '其他');

-- ----------------------------
-- Table structure for gonggao
-- ----------------------------
DROP TABLE IF EXISTS `gonggao`;
CREATE TABLE `gonggao`  (
  `msg_id` int(0) NOT NULL AUTO_INCREMENT,
  `msg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`msg_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gonggao
-- ----------------------------
INSERT INTO `gonggao` VALUES (1, '欢迎光临本餐厅，祝大家有一个良好的用餐体验！做的光盘行动，杜绝浪费！');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_id` int(0) NOT NULL AUTO_INCREMENT,
  `fenlei_id` int(0) NULL DEFAULT 0,
  `yuanliao` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `money` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`goods_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('牛肉面', 25, 5, '牛肉、低筋面', '8', 'http://127.0.0.1:5000/image/1.jpg');
INSERT INTO `goods` VALUES ('米饭', 26, 1, '大米', '3', 'http://127.0.0.1:5000/image/2.jpg');
INSERT INTO `goods` VALUES ('酸梅汤', 27, 4, '梅子、冰糖、水', '5', 'http://127.0.0.1:5000/image/3.jpg');
INSERT INTO `goods` VALUES ('柠檬水', 28, 4, '柠檬、水、糖', '3', 'http://127.0.0.1:5000/image/4.jpg');
INSERT INTO `goods` VALUES ('咖啡', 29, 4, '咖啡粉、牛奶', '10', 'http://127.0.0.1:5000/image/5.jpg');
INSERT INTO `goods` VALUES ('小米粥', 30, 3, '小米、水、糖', '6', 'http://127.0.0.1:5000/image/6.jpg');
INSERT INTO `goods` VALUES ('南瓜粥', 31, 3, '南瓜、水、糖', '6', 'http://127.0.0.1:5000/image/7.jpg');
INSERT INTO `goods` VALUES ('银耳汤', 32, 3, '银耳、枸杞水、糖', '5', 'http://127.0.0.1:5000/image/8.jpg');
INSERT INTO `goods` VALUES ('宫保鸡丁', 33, 2, '鸡肉、辣椒、盐、鸡精等', '15.56', 'http://127.0.0.1:5000/image/9.jpg');
INSERT INTO `goods` VALUES ('龙井虾仁', 34, 2, '虾仁', '20.56', 'http://127.0.0.1:5000/image/10.jpg');
INSERT INTO `goods` VALUES ('青椒肉丝', 35, 2, '里脊肉、青椒', '15.99', 'http://127.0.0.1:5000/image/11.jpg');
INSERT INTO `goods` VALUES ('羊肉粉', 36, 5, '羊肉、米粉', '7', 'http://127.0.0.1:5000/image/12.jpg');
INSERT INTO `goods` VALUES ('糖醋里脊', 37, 2, '猪里脊、冰糖', '36.89', 'http://127.0.0.1:5000/image/13.jpg');
INSERT INTO `goods` VALUES ('西湖醋鱼', 39, 2, '鱼', '38.9', 'http://127.0.0.1:5000/image/14.jpg');
INSERT INTO `goods` VALUES ('大盘鸡', 40, 2, '鸡肉、彩椒', '32', 'http://127.0.0.1:5000/image/15.jpg');
INSERT INTO `goods` VALUES ('炸酱面', 42, 5, '肉末、面条', '15', 'http://127.0.0.1:5000/image/16.jpg');
INSERT INTO `goods` VALUES ('幽兰拿铁', 43, 4, '咖啡粉', '16.69', 'http://127.0.0.1:5000/image/17.jpg');
INSERT INTO `goods` VALUES ('矿泉水', 57, 4, '水', '3', 'http://127.0.0.1:5000/image/18.jpg');

-- ----------------------------
-- Table structure for luck
-- ----------------------------
DROP TABLE IF EXISTS `luck`;
CREATE TABLE `luck`  (
  `luck_id` int(0) NOT NULL AUTO_INCREMENT,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `msg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `shijian` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `num` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`luck_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pinglun
-- ----------------------------
DROP TABLE IF EXISTS `pinglun`;
CREATE TABLE `pinglun`  (
  `pinglun_id` int(0) NOT NULL AUTO_INCREMENT,
  `goods_id` int(0) NULL DEFAULT NULL,
  `star` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `shijian` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nickName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `msg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`pinglun_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for star
-- ----------------------------
DROP TABLE IF EXISTS `star`;
CREATE TABLE `star`  (
  `star_id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `yuanliao` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `money` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_id` int(0) NULL DEFAULT NULL,
  `fenlei_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`star_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of star
-- ----------------------------
INSERT INTO `star` VALUES (30, '柠檬水', '13638138365', '柠檬、水、糖', '3', 'http://127.0.0.1:5000/image/4.jpg', 28, 4);
INSERT INTO `star` VALUES (32, '南瓜粥', '13638138365', '南瓜、水、糖', '6', 'http://127.0.0.1:5000/image/7.jpg', 31, 3);
INSERT INTO `star` VALUES (33, '青椒肉丝', '13638138365', '里脊肉、青椒', '15.99', 'http://127.0.0.1:5000/image/11.jpg', 35, 2);
INSERT INTO `star` VALUES (34, '银耳汤', '13638138365', '银耳、枸杞水、糖', '5', 'http://127.0.0.1:5000/image/8.jpg', 32, 3);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `paw` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `xingming` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `xingbie` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (9, '13638138365', '123456', NULL, NULL);

-- ----------------------------
-- Table structure for yuyue
-- ----------------------------
DROP TABLE IF EXISTS `yuyue`;
CREATE TABLE `yuyue`  (
  `BookingId` varchar(10) CHARACTER SET utf32 COLLATE utf32_general_ci NOT NULL COMMENT '预约号',
  `ClientName` char(10) CHARACTER SET utf32 COLLATE utf32_general_ci NULL DEFAULT NULL COMMENT '客户名',
  `ClientNumber` int(0) NULL DEFAULT NULL COMMENT '客户号码',
  `BookingData` date NULL DEFAULT NULL COMMENT '预约日期',
  `DeskId` char(10) CHARACTER SET utf32 COLLATE utf32_general_ci NULL DEFAULT NULL COMMENT '桌号',
  `BookingTime` time(6) NULL DEFAULT NULL COMMENT '预约时间',
  `BookingStatu` tinyint(0) NULL DEFAULT NULL COMMENT '预约状态',
  PRIMARY KEY (`BookingId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf32 COLLATE = utf32_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
