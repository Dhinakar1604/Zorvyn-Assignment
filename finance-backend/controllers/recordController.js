import Record from "../models/Record.js";

export const createRecord = async (req, res) => {
  const record = await Record.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(record);
};

export const getRecords = async (req, res) => {
  const { page = 1, limit = 5, type, category, search } = req.query;

  let filter = {};

  if (type) filter.type = type;
  if (category) filter.category = category;
  
  if (search) {
    filter.$or = [
      { category: { $regex: search, $options: "i" } },
      { notes: { $regex: search, $options: "i" } }
    ];
  }

  const records = await Record.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Record.countDocuments(filter);

  res.json({
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    data: records
  });
};

export const updateRecord = async (req, res) => {
  const record = await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(record);
};

export const deleteRecord = async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};