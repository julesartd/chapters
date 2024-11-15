const Chapter = require('../models/Chapter');
const { Error } = require("mongoose");

const createChapter = async (req, res, next) => {
    try {
        const body = req.body;

        const existingChapter = await Chapter.findOne({ title: body.title });

        if (existingChapter) {
            return res.jsonError('Chapter already exists', 409);
        }

        const chapter = new Chapter({ ...body });

        await chapter.save();

        return res.jsonSuccess(chapter, 201);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.jsonError(error.message, 422);
        }
        next(error);
        return res.jsonError('Internal server error', 500);
    }
}

const getChapters = async (req, res, next) => {
    try {
        const chapters = await Chapter.find();
        return res.jsonSuccess(chapters, 200);
    } catch (error) {
        next(error);
        return res.jsonError('Internal server error', 500);
    }
}

const getChapter = async (req, res, next) => {
    try {
        const chapter = await Chapter.findById(req.params.id);
        if (!chapter) {
            return res.jsonError('Chapter not found', 404);
        }
        return res.jsonSuccess(chapter, 200);
    } catch (error) {
        next(error);
        return res.jsonError('Internal server error', 500);
    }
}

const deleteChapter = async (req, res, next) => {
    try {
        const chapter = await Chapter.findById(req.params.id);
        if (!chapter) {
            return res.jsonError('Chapter not found', 404);
        }
        await chapter.deleteOne();
        return res.jsonSuccess({ message: 'Chapter deleted' }, 204);
    } catch (error) {
        next(error);
        return res.jsonError('Internal server error', 500);
    }
}

const searchChapters = async (req, res, next) => {
    try {
        const { title } = req.query;
        const chapters = await Chapter.find({ title: new RegExp(title, 'i') });
        return res.jsonSuccess(chapters, 200);
    } catch (error) {
        next(error);
        return res.jsonError('Internal server error', 500);
    }
}

module.exports = {
    createChapter,
    getChapters,
    getChapter,
    deleteChapter,
    searchChapters
}