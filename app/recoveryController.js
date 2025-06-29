import { pool } from '../config/db.js'
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

// Function to send mail with recovery token
export const sendRecoveryEmail = async (req, res) => {
    const { email, type } = req.body;

    if (!email || !type) {
        return res.status(400).json({ error: 'Email and type are required' });
    }

    const table = type === 'organizer' ? 'organizers' : 'users';

    try {
        const [rows] = await pool.query(`SELECT id FROM ${table} WHERE email = ?`, [email]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Email not found' });
        }

        const token = uuidv4();
        const expiration = new Date(Date.now() + 3600 * 1000); // 1 hora

        await pool.query(
            `UPDATE ${table} SET recovery_token = ?, token_expires = ? WHERE email = ?`,
            [token, expiration, email]
        );

        const transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const resetLink = `${process.env.RESET_URL}/reset?token=${token}&type=${type}`;

        await transporter.sendMail({
            from: `"Soporte Técnico" <${process.env.MAIL_USER}>`,
            to: email,
            subject: 'Recuperación de Cuenta',
            html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetLink}">${resetLink}</a>`
        });

        return res.json({ message: 'Recovery email sent successfully' });

    } catch (err) {
        console.error('Error sending recovery email:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// Function to reset the password
export const resetPassword = async (req, res) => {
    const { token, newPassword, type } = req.body;

    if (!token || !newPassword || !type) {
        return res.status(400).json({ error: 'Token, new password, and type are required' });
    }

    const table = type === 'organizer' ? 'organizers' : 'users';

    try {
        const [rows] = await pool.query(
            `SELECT id, token_expires FROM ${table} WHERE recovery_token = ?`,
            [token]
        );

        if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        const user = rows[0];
        const expires = new Date(user.token_expires);

        if (expires < new Date()) {
            return res.status(400).json({ error: 'Token expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query(
            `UPDATE ${table} SET password = ?, recovery_token = NULL, token_expires = NULL WHERE id = ?`,
            [hashedPassword, user.id]
        );

        return res.json({ message: 'Password reset successful' });

    } catch (err) {
        console.error('Error resetting password:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};