import { Work } from "../models/workModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

// Get all works
export const getAllWorks = async (req: Request, res: Response) => {
  try {
    const works = await Work.find();
    res.status(200).json(works);
  } catch (err) {
    res.status(500).json({ message: "Server error"});
  }
};

export const getAllWorksForWork = async (req: Request, res: Response) => {
  try {
    const works = await Work.find();

    const WorksForWorks = works.map(work => ({
      title: work.title,
      year: work.year,
      tags: work.tags,
      description: work.description,
      projectImageUrl: work.projectImageUrl
    }));

    res.status(200).json(WorksForWorks);
  } catch (err) {
    res.status(500).json({ message: "Server error"});
  }
};

// Get single work by ID
export const getWorkById = async (req: Request, res: Response) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) {
      res.status(404).json({ message: "Not found" })
      return
    };
    res.status(200).json(work);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getWorksByIdsForHome = async (req: Request, res: Response) => {
  try{
    const { ids } = req.query;

    const rawIds = Array.isArray(ids) ? ids : [ids];
    const idArray = rawIds.map(id => String(id));

    const validIds = idArray.filter((id) => mongoose.Types.ObjectId.isValid(id));

    if (validIds.length === 0 ) {
      res.status(400).json({ message: "No valid IDs provided." });
      return
    }

    const works = await Work.find({ _id: { $in: validIds } });
    const WorksForHome = works.map(work => ({
      title: work.title,
      year: work.year,
      tags: work.tags,
      description: work.description,
      projectImageUrl: work.projectImageUrl
    }));

    res.status(200).json(WorksForHome);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// Create a new work
export const createWork = async (req: Request, res: Response) => {
  try {
    const newWork = new Work(req.body);
    const saved = await newWork.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
};

