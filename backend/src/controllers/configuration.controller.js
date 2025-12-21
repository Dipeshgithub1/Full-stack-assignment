const Configuration = require("../models/config.model");

// GET config by ID
exports.getConfiguration = async (req, res) => {
  try {
    const config = await Configuration.findOne({
      configurationId: req.params.id,
    });

    if (!config) {
      return res.status(404).json({ message: "Configuration not found" });
    }

    res.json(config.matrix);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE remark
exports.updateRemark = async (req, res) => {
  try {
    await Configuration.findOneAndUpdate(
      { configurationId: req.params.id },
      { remark: req.body.remark }
    );

    res.json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
