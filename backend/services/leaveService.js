const leaveRepository = require("../repositories/leaveRepository");

const getAllLeaves = async () => {
  return await leaveRepository.getAllLeaves();
};

module.exports = {
  getAllLeaves
};