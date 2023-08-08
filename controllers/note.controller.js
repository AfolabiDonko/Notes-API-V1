const db = require('../models');
const { getUserFromToken } = require('../helpers/noteHelper');

const Note = db.notes;

exports.create = async (req, res) => {
  const { content } = req.body;
  const token = req.headers['x-access-token'];
  try {
    const user = await getUserFromToken(token, res);
    const note = new Note({ content, userId: user._id });
    // creer la note
    await note.save();
    return res.status(200).json({
      message: 'Note created successfully.',
    });
  } catch (error) {
    return res.status(403).json({ error: 'Token missing. Access denied.' });
  }
};

exports.findAll = async (req, res) => {
  const token = req.headers['x-access-token'];
  try {
    const user = await getUserFromToken(token, res);
    // recuperer toute la liste des notes de cet utilisateur
    const notes = await Note.find({ userId: user._id }).sort({ createdAt: -1 });
    // les regrouper en tableau
    const allContent = notes.map((note) => note.content);
    return res.status(200).json({ content: allContent });
  } catch (error) {
    return res.status(403).json({ error: 'Token missing. Access denied.' });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const token = req.headers['x-access-token'];
  try {
    const user = await getUserFromToken(token, res);
    const note = await Note.findOne({ _id: id, userId: user._id });
    if (!note) {
      return res
        .status(404)
        .json({ error: 'Note not found or unauthorized access.' });
    }
    // modifier la note apres avoir tout testé
    await Note.findOneAndUpdate(
      { _id: id, userId: user._id },
      { content: req.body.content },
      { new: true }
    );
    return res.status(200).json({ message: 'Note updated successfully.' });
  } catch (error) {
    return res.status(403).json({ error: 'Token missing. Access denied.' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const token = req.headers['x-access-token'];
  try {
    const user = await getUserFromToken(token, res);
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Identifiant missed.' });
    }
    if (note.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Access denied to this note.' });
    }
    // supprimer la note
    await Note.findOneAndDelete({ _id: id, userId: user._id });
    return res.status(200).json({ message: 'Note supprimée avec succès.' });
  } catch (error) {
    return res.status(403).json({ error: 'Token missing. Access denied.' });
  }
};
