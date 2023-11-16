var express = require("express");
var router = express.Router();
var db = require("../util/dbconfig"); // 引入数据库方法

var bodyparser = require("body-parser");

//获取门店列表
router.get("/getCanteens", (req, res) => {
    var sql = "select * from canting";
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                code: 500,
                msg: "获取失败",
            });
        } else {
            res.send({
                list: data,
                code: 200,
                msg: "获取数据成功",
            });
        }
    });
});

// 创建预约
router.post("/createBooking", (req, res) => {
    // 提取所有必要的字段
    const {
        userName,
        userId,
        userPhone,
        bookingDate,
        bookingSeats,
        bookingTime,
        bookingStatus,
        canteenName,
    } = req.body;

    // 首先检查同用戶是否已有时间相同的预约
    const checkSql =
        "SELECT * FROM yuyue WHERE userId = ? AND bookingDate = ? AND bookingTime = ?";
    db.query(checkSql, [userId, bookingDate, bookingTime], (err, results) => {
        if (err) {
            res.status(500).send({ msg: "查询预约失败", error: err });
        } else if (results.length > 0) {
            // 如果找到了相同的预约，返回错误信息
            res.status(409).send({ msg: "已存在相同时间的预约" });
        } else {
            // 没有找到相同预约，可以创建新预约
            const sql = `
    INSERT INTO yuyue 
    (userName, userId, userPhone, bookingDate, bookingSeats, bookingTime, bookingStatus, canteenName) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

            // 执行 SQL 插入
            db.query(
                sql,
                [
                    userName,
                    userId,
                    userPhone,
                    bookingDate,
                    bookingSeats,
                    bookingTime,
                    bookingStatus,
                    canteenName,
                ],
                (err, result) => {
                    if (err) {
                        res.status(500).send({ msg: "创建预约失败", error: err });
                    } else {
                        res
                            .status(200)
                            .send({ msg: "创建预约成功", bookingId: result.insertId });
                    }
                }
            );
        }
    });
});

// 获取全部预约列表
router.get("/getBookings", (req, res) => {
    const sql = "SELECT * FROM yuyue";
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ msg: "获取预约失败", error: err });
        } else {
            res.status(200).send({ bookings: results });
        }
    });
});

// 根据用户ID获取预约信息
router.get('/getBookingsByUserId/:userId', (req, res) => {
    const userId = req.params.userId;

    const sql = 'SELECT * FROM yuyue WHERE userId = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            res.status(500).send({ msg: '查询预约失败', error: err });
        } else {
            res.status(200).send({ bookings: results });
        }
    });
});

// 更新预约
router.post("/updateBooking", (req, res) => {
    const { bookingId, bookingDate, bookingSeats, bookingTime, bookingStatus } =
        req.body;
    const sql =
        "UPDATE yuyue SET bookingDate = ?, bookingSeats = ?, bookingTime = ?, bookingStatus = ? WHERE bookingId = ?";
    db.query(
        sql,
        [bookingDate, bookingSeats, bookingTime, bookingStatus, bookingId],
        (err, result) => {
            if (err) {
                res.status(500).send({ msg: "更新预约失败", error: err });
            } else {
                res.status(200).send({ msg: "更新预约成功" });
            }
        }
    );
});

// 删除预约
router.delete("/deleteBooking", (req, res) => {
    const { bookingId } = req.body;
    const sql = "DELETE FROM yuyue WHERE bookingId = ?";
    db.query(sql, [bookingId], (err, result) => {
        if (err) {
            res.status(500).send({ msg: "删除预约失败", error: err });
        } else {
            res.status(200).send({ msg: "删除预约成功" });
        }
    });
});

module.exports = router;
