const getAllEventTypes = async (req, res) => {
    try {
      res.status(200).json({ data: [ { id: 1, description: 'Fleet Racing' } ] });
    } catch (error) {
      res.status(400).json({ error: 'database error' });
    }
  };

  module.exports = {
    getAllEventTypes,
  };