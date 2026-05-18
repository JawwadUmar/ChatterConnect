const express = require("express");

// const {
//   accessChat,
//   fetchChats,
//   createGroupChat,
//   removeFromGroup,
//   addToGroup,
//   renameGroup,
// } = require("../controllers/chatControllers");

const { protect } = require("../middleware/authMiddleware");
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require("../controllers/chatControllers");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: Chat management
 */

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Access or create a one-on-one chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chat accessed or created successfully
 *       400:
 *         description: UserId param not sent with request
 */
router.route("/").post(protect, accessChat);

/**
 * @swagger
 * /api/chat:
 *   get:
 *     summary: Fetch all chats for a user
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user chats
 *       400:
 *         description: Error fetching chats
 */
router.route("/").get(protect, fetchChats);

/**
 * @swagger
 * /api/chat/group:
 *   post:
 *     summary: Create a group chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - users
 *             properties:
 *               name:
 *                 type: string
 *               users:
 *                 type: string
 *                 description: JSON stringified array of user IDs
 *     responses:
 *       200:
 *         description: Group chat created successfully
 *       400:
 *         description: Please fill all the fields / More than 2 users are required
 */
router.route("/group").post(protect, createGroupChat);

/**
 * @swagger
 * /api/chat/rename:
 *   put:
 *     summary: Rename a group chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chatId
 *               - chatName
 *             properties:
 *               chatId:
 *                 type: string
 *               chatName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Group renamed successfully
 *       404:
 *         description: Chat not found
 */
router.route("/rename").put(protect, renameGroup);

/**
 * @swagger
 * /api/chat/groupremove:
 *   put:
 *     summary: Remove a user from a group
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chatId
 *               - userId
 *             properties:
 *               chatId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User removed successfully
 *       404:
 *         description: Chat not found
 */
router.route("/groupremove").put(protect, removeFromGroup);

/**
 * @swagger
 * /api/chat/groupadd:
 *   put:
 *     summary: Add a user to a group
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chatId
 *               - userId
 *             properties:
 *               chatId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added successfully
 *       404:
 *         description: Chat not found
 */
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;