const ResourceModel = require('../models/resourceModel');

exports.getAll = (req, res) => {
    ResourceModel.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
}

exports.getById = (req, res) => {
    const id = req.params.id;
    ResourceModel.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Resource not found' });
        res.status(200).json(results[0]);
    });
}

exports.create = (req, res) => {
    const { title, description, date, type, category, external_url } = req.body;
    const download_url = req.file ? req.file.path : null; // Assuming you're using multer for file upload
    console.log(download_url);
    ResourceModel.create(title, description, date, type, category, download_url, external_url, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Resource created successfully', resourceId: result.insertId });
    });
}

exports.deleteResource = (req, res) => {
    const id = req.params.id;
    ResourceModel.deleteResource(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Resource not found' });
        res.status(200).json({ message: 'Resource deleted successfully' });
    });
}

exports.updateResource = (req, res) => {
    const id = req.params.id;
    const { title, description, date, type, category, external_url } = req.body;
    const download_url = req.file ? req.file.path : null; // Assuming you're using multer for file upload
    ResourceModel.updateResource(id, title, description, date, type, category, download_url, external_url, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Resource not found' });
        res.status(200).json({ message: 'Resource updated successfully' });
    });
}