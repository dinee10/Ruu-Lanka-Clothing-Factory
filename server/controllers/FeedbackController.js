const Feedback = require("../models/FeedbackModel")

//Display all feedback
const getAllFeedback = async (req, res) => {
    let feedback;

    try{
        feedback = await Feedback.find();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while fetching orders" });
    }

    //If no feedback found
    if (!feedback || feedback.length === 0) {
        return res.status(404).json({ message: "Feedback not found" });
    }
    //display all feedback
    return res.status(200).json({ feedback });
};

//Insert a new feedback
const addFeedback = async (req, res) => {
    const {email, title, message} = req.body;
  
    let feedback;

    try{
        feedback = new Feedback({email, title, message});
        await feedback.save();
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to add feedback" });
    }

    return res.status(201).json({ feedback });
}

//Delete feedback
const deleteFeedback = async (req, res) => {
    const id = req.params.id;

    let feedback;

    try {
        feedback = await Feedback.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while deleting feedback" });
    }

    //If feedback not found for deletion
    if(!feedback){
        return res.status(404).json({ message: "Feedback not delete" });
    }
    return res.status(200).json({ message: "Feedback deleted successfully", feedback });
}

module.exports = {
    getAllFeedback,
    addFeedback,
    deleteFeedback,
}