const Team = require("../models/Team");

// ==========================================
// GENERATE NEXT MEMBER ID
// Example: HAM26-001, HAM26-002, HAM26-003
// ==========================================
const generateMemberId = async () => {
    const year = new Date().getFullYear().toString().slice(-2);
    const prefix = `HAM${year}-`;

    const members = await Team.find({
        memberId: { $regex: `^${prefix}` }
    }).select("memberId");

    let maxNumber = 0;

    members.forEach((member) => {
        if (!member.memberId) return;

        const numberPart = member.memberId.replace(prefix, "");
        const number = parseInt(numberPart, 10);

        if (!isNaN(number) && number > maxNumber) {
            maxNumber = number;
        }
    });

    const nextNumber = String(maxNumber + 1).padStart(3, "0");

    return `${prefix}${nextNumber}`;
};


// ==========================================
// GET ALL TEAM MEMBERS
// PUBLIC
// ==========================================
const getTeam = async (req, res) => {
    try {
        const team = await Team.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: team.length,
            team: team
        });

    } catch (error) {
        console.error("Get Team Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch team members",
            error: error.message
        });
    }
};


// ==========================================
// GET SINGLE TEAM MEMBER
// PUBLIC
// ==========================================
const getTeamMemberById = async (req, res) => {
    try {
        const member = await Team.findById(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            });
        }

        res.status(200).json({
            success: true,
            member: member
        });

    } catch (error) {
        console.error("Get Team Member Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch team member",
            error: error.message
        });
    }
};
// ==========================================
// GET MEMBER BY MEMBER ID
// Example: HAM26-001
// PUBLIC PROFILE
// ==========================================
const getMemberByMemberId = async (req, res) => {

    try {

        const member = await Team.findOne({
            memberId: req.params.memberId
        });

        if (!member) {

            return res.status(404).json({
                success: false,
                message: "Member not found"
            });

        }

        res.status(200).json({
            success: true,
            member: member
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch member",
            error: error.message
        });

    }

};


// ==========================================
// CREATE TEAM MEMBER
// ADMIN ONLY
// ==========================================
const createTeamMember = async (req, res) => {
    try {

        // Automatically generate Member ID
        const memberId = await generateMemberId();

        const memberData = {
            ...req.body,
            memberId: memberId
        };

        // If photo is uploaded
        if (req.file) {
            memberData.image = `/uploads/${req.file.filename}`;
        }

        const member = await Team.create(memberData);

        res.status(201).json({
            success: true,
            message: "Team member created successfully",
            member: member
        });

    } catch (error) {
        console.error("Create Team Member Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create team member",
            error: error.message
        });
    }
};


// ==========================================
// UPDATE TEAM MEMBER
// ADMIN ONLY
// ==========================================
const updateTeamMember = async (req, res) => {
    try {

        const existingMember = await Team.findById(req.params.id);

        if (!existingMember) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            });
        }

        const updateData = {
            ...req.body
        };

        // ======================================
        // EXISTING MEMBER WITHOUT MEMBER ID
        // Give it an automatic ID
        // ======================================
        if (!existingMember.memberId) {
            updateData.memberId = await generateMemberId();
        } else {
            // Never change the existing Member ID
            updateData.memberId = existingMember.memberId;
        }

        // ======================================
        // NEW PHOTO UPLOADED
        // ======================================
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const member = await Team.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Team member updated successfully",
            member: member
        });

    } catch (error) {
        console.error("Update Team Member Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update team member",
            error: error.message
        });
    }
};


// ==========================================
// DELETE TEAM MEMBER
// ADMIN ONLY
// ==========================================
const deleteTeamMember = async (req, res) => {
    try {

        const member = await Team.findByIdAndDelete(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Team member deleted successfully"
        });

    } catch (error) {
        console.error("Delete Team Member Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete team member",
            error: error.message
        });
    }
};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================
module.exports = {
    getTeam,
    getTeamMemberById,
    getMemberByMemberId,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember
};