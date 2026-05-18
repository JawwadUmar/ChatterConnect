const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { sendMessage, allMessages } = require("../controllers/messageControllers");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management
 */

/**
 * @swagger
 * /api/message:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - chatId
 *             properties:
 *               content:
 *                 type: string
 *               chatId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Invalid data passed into request
 */
router.route("/").post(protect, sendMessage);

/**
 * @swagger
 * /api/message/{chatId}:
 *   get:
 *     summary: Get all messages for a chat
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the chat
 *     responses:
 *       200:
 *         description: List of messages
 *       400:
 *         description: Error fetching messages
 */
router.route("/:chatId").get(protect, allMessages);


module.exports = router;