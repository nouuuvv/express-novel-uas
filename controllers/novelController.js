// controllers/novelController.js
import Novel from "../models/Novel.js";

export const getAllNovels = async (req, res) => {
  try {
    const novels = await Novel.findAll();
    res.json(novels);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

export const getNovelById = async (req, res) => {
  const { id } = req.params;
  try {
    const novel = await Novel.findByPk(id);
    if (!novel) return res.status(404).json({ msg: "Novel tidak ditemukan!" });
    res.json(novel);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

export const createNovel = async (req, res) => {
  const { title, author, genre, description, pages, cover_url } = req.body;
  try {
    const newNovel = await Novel.create({
      title,
      author,
      genre,
      description,
      pages,
      cover_url,
    });
    res.status(201).json(newNovel);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

export const updateNovel = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, description, pages, cover_url } = req.body;

  try {
    const novel = await Novel.findByPk(id);
    if (!novel) return res.status(404).json({ msg: "Novel tidak ditemukan!" });

    novel.title = title;
    novel.author = author;
    novel.genre = genre;
    novel.description = description;
    novel.pages = pages;
    novel.cover_url = cover_url;

    await novel.save();
    res.json(novel);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

export const deleteNovel = async (req, res) => {
  const { id } = req.params;

  try {
    const novel = await Novel.findByPk(id);
    if (!novel) return res.status(404).json({ msg: "Novel tidak ditemukan!" });

    await novel.destroy();
    res.json({ msg: "Novel berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};
