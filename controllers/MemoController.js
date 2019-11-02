const sequelize = require('sequelize')
const models = require('../models')
const Op = sequelize.Op;

const getMemo = function(req, res){
    const tableId = parseInt(req.params.tableId);
    models.Memo.findAll({ where: { tableId: tableId } })
    .then(memos => res.send({ memos: memos }))
}

const createMemo = function(req, res){
    const memo = {
        tableId: req.body.tableId,
        title: req.body.title,
        content: req.body.content
    }
    models.Memo.create(memo)
    .then(result => res.send({ message: '등록되었습니다' }))
}

const deleteMemo = function(req, res){
    const id = req.params.memoId;
    models.Memo.destroy({ where: {id: id} })
    .then(result => res.send({ message: '삭제되었습니다'}))
}

module.exports ={
    getMemo,
    createMemo,
    deleteMemo
}