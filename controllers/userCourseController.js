const userCourseModel = require("../models/userCourseModel");

exports.getCoursesByUserId = async (req, res) => {
    const { userId } = req.params;
    
    try {
      const rows = await userCourseModel.getCoursesByUserId(userId);
      res.status(200).json(rows);
    } catch (err) {
      console.error("Erreur userCourseController:", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

exports.getAllUserCourses = async (req, res) => {
  try {
    const rows = await userCourseModel.getAllUserCourses();
    res.status(200).json(rows);
  } catch (err) {
    console.error("Erreur userCourseController:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.isUserEnrolled = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const isEnrolled = await userCourseModel.isUserEnrolled(userId, courseId);
    res.status(200).json({ isEnrolled });
  } catch (err) {
    console.error("Erreur userCourseController:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
  

exports.addCourseToUser = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    await userCourseModel.addUserCourse(userId, courseId);
    res.status(200).json({ message: "Cours ajouté avec succès" });
  } catch (err) {
    console.error("Erreur userCourseController:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getUsersByCourseId = async (req, res) => {
  const { courseId } = req.params;

  try {
    const rows = await userCourseModel.getUsersByCourseId(courseId);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Erreur userCourseController:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}